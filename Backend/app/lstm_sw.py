from tensorflow.keras.models import model_from_json
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import re
import json
import pickle
from scipy.stats import skewnorm
from sklearn.preprocessing import MinMaxScaler

# Load the LSTM model
with open('model_architecture.json', 'r') as json_file: # architecture
    loaded_model_json = json_file.read()
model = model_from_json(loaded_model_json)
model.load_weights('model_weights.weights.h5') # weights
with open('scaler.pkl', 'rb') as scaler_file:
    loaded_scaler = pickle.load(scaler_file) # scaler

def weather_data_processing():
    data = json.load(open('next_7_day.json'))
    df = pd.DataFrame(data)
    df = df.iloc[0:7]
    df['heavy_rainfall_flg'] = np.where(df['weatherCondition'].str.contains('shower|storm',case=False), 1, 0)
    df.drop(columns=['feelsLike','weatherIcon','wind','humidity','precipitationChance','precipitationAmount','description'], inplace=True)

    def clean_text(text):
        """Remove HTML tags and unwanted spaces from text."""
        text = re.sub('<[^<]+?>', '', text) 
        text = text.replace('&nbsp;', ' ')   
        text = re.sub('\s+', ' ', text)  
        return text.strip()
    
    df['temperature'] = df['temperature'].apply(clean_text)
    df['day'] = df['day'].apply(clean_text)
    
    
    today = datetime.now().date()
    df['date'] = [today + timedelta(days=i) for i in range(7)]
    df['date'] = pd.to_datetime(df['date'])

    df.drop(columns=['day'], inplace=True)

    df['max_temp'] = df['temperature'].str.slice(0,2)
    df['min_temp'] = df['temperature'].str.slice(4,7)
    df.drop(columns=['temperature'], inplace=True)


    df['max_temp'] = df['max_temp'].astype(int)
    df['min_temp'] = df['min_temp'].astype(int)
    df['Temperature'] = (df['max_temp'] + df['min_temp']) / 2

    df.drop(columns=['max_temp','min_temp'], inplace=True)
    return df

def generate_holiday_df(year):
    import datetime 
    start_date = datetime.date(year, 1, 1)
    end_date = datetime.date(year, 12, 31)

    # List of holidays in Singapore for the given year
    holidays_sg = [
        datetime.date(year, 1, 1), datetime.date(year, 2, 10), datetime.date(year, 2, 11),
        datetime.date(year, 3, 29), datetime.date(year, 4, 10), datetime.date(year, 5, 1),
        datetime.date(year, 5, 20), datetime.date(year, 6, 17), datetime.date(year, 8, 9),
        datetime.date(year, 10, 31), datetime.date(year, 12, 25)
    ]

    day_to_number = {
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6,
        'Sunday': 7
    }

    holiday_sg_24 = []
    current_date = start_date
    while current_date <= end_date:
        day_of_week = current_date.strftime('%A')
        holiday_flg_sg = 1 if current_date in holidays_sg else 0
        holiday_sg_24.append([current_date.strftime('%Y-%m-%d'), day_of_week, holiday_flg_sg])
        current_date += datetime.timedelta(days=1)

    holiday_sg_24 = pd.DataFrame(holiday_sg_24, columns=['calendar_date', 'day_of_week', 'holiday_flg_sg'])
    holiday_sg_24['day_of_week'] = holiday_sg_24['day_of_week'].map(day_to_number)

    return holiday_sg_24

def feature_engineering():
    visitor_data = pd.read_csv("synthetic_visit_data.csv")
    visitor_data['visit_date'] = pd.to_datetime(visitor_data['visit_date'])
    weather_data = pd.read_csv("weather_data_cleaned.csv")
    weather_data['Date'] = pd.to_datetime(weather_data['Date'])
    columns_to_drop = weather_data.columns[0:3].tolist()  # Dropping columns by indices
    weather_data.drop(columns=columns_to_drop, inplace=True)
    holiday_data = pd.read_csv("date_info_2324.csv")
    holiday_data['calendar_date'] = pd.to_datetime(holiday_data['calendar_date'])
    holiday_data.rename(columns={'calendar_date': 'calender_date'}, inplace=True)
    holiday_data.drop(columns="day_of_week", inplace=True)

    merged_data = pd.merge(visitor_data, weather_data, left_on='visit_date', right_on='Date', how='left')
    merged_data = pd.merge(merged_data, holiday_data, left_on='visit_date', right_on='calender_date', how='left')
    merged_data.drop(columns=["Date","calender_date","Highest 30 min Rainfall (mm)","Highest 60 min Rainfall (mm)","Highest 120 min Rainfall (mm)","Maximum Temperature (°C)","Minimum Temperature (°C)","Mean Wind Speed (km/h)","Max Wind Speed (km/h)"], inplace=True)
    merged_data.head()

    day_mapping = {
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6,
        'Sunday': 7
    }

    # Extract date components
    merged_data['month'] = pd.to_datetime(merged_data['visit_date']).dt.month
    merged_data['day'] = pd.to_datetime(merged_data['visit_date']).dt.day
    merged_data['week_of_year'] = pd.to_datetime(merged_data['visit_date']).dt.isocalendar().week
    merged_data['day_of_week'] = merged_data['day_of_week'].replace(day_mapping)

    # Feature engineering
    merged_data['heavy_rainfall_flg'] = (merged_data['Daily Rainfall Total (mm)'] > 20).astype(int)

    merged_data['temperature_category'] = pd.cut(merged_data['Mean Temperature (°C)'],
                                                bins=[-np.inf, 15, 25, np.inf],
                                                labels=['cold', 'mild', 'hot'])

    merged_data['is_holiday'] = merged_data[['holiday_flg_sg', 'holiday_flg_cn', 'holiday_flg_in']].max(axis=1)

    # Encoding categorical variables
    merged_data = pd.get_dummies(merged_data, 'temperature_category')

    # Drop unnecessary columns
    merged_data.drop(columns=["Daily Rainfall Total (mm)", "Mean Temperature (°C)", 
                            "holiday_flg_sg", "holiday_flg_cn", "holiday_flg_in", 'visit_date'], inplace=True)

    # Creating lag and rolling features
    for lag in range(1, 8):  # 7 days lag
        merged_data[f'visitors_lag_{lag}'] = merged_data['visitors'].shift(lag)

    merged_data['rolling_mean_visitors'] = merged_data['visitors'].rolling(window=7).mean().shift(1)
    merged_data['rolling_std_visitors'] = merged_data['visitors'].rolling(window=7).std().shift(1)

    merged_data.fillna(method='bfill', inplace=True)
    return merged_data

def prediction_data():
    weather_df = weather_data_processing()
    holiday_sg_24 = generate_holiday_df(2024)

    weather_df['date'] = pd.to_datetime(weather_df['date'])
    holiday_sg_24['calendar_date'] = pd.to_datetime(holiday_sg_24['calendar_date'])
    prediction_df = pd.merge(weather_df, holiday_sg_24, left_on='date', right_on='calendar_date', how='left')
    prediction_df.drop(columns=['weatherCondition', 'calendar_date'], inplace=True)
    prediction_df['day_of_week'] = prediction_df['date'].dt.day_name()
    prediction_df['week_of_year'] = pd.to_datetime(prediction_df['date']).dt.isocalendar().week
    prediction_df['temperature_category'] = pd.cut(prediction_df['Temperature'], bins=[-np.inf, 15, 25, np.inf], labels=['cold', 'mild', 'hot'])
    prediction_df.drop(columns='Temperature', inplace=True)
    prediction_df = pd.get_dummies(prediction_df, columns=['temperature_category'])
    prediction_df.rename(columns={'holiday_flg_sg': 'is_holiday'}, inplace=True)

    day_mapping = {
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6,
        'Sunday': 7
    }

    prediction_df['month'] = pd.to_datetime(prediction_df['date']).dt.month
    prediction_df['day'] = pd.to_datetime(prediction_df['date']).dt.day
    prediction_df['week_of_year'] = pd.to_datetime(prediction_df['date']).dt.isocalendar().week
    prediction_df['day_of_week'] = prediction_df['day_of_week'].replace(day_mapping)
    prediction_df.set_index('date', inplace=True)
    feature_df = feature_engineering()
    prediction_df = pd.merge(prediction_df, feature_df[['visitors_lag_1','visitors_lag_2','visitors_lag_3','visitors_lag_4','visitors_lag_5','visitors_lag_6', 'visitors_lag_7', 'rolling_mean_visitors', 'rolling_std_visitors', 'month', 'day']], on=['month', 'day'], how='left')

    return prediction_df

X_predict = prediction_data()

def generate_daily_prediction():
    scaler_y = MinMaxScaler()
    df = feature_engineering()
    y = df['visitors']
    scaler_y.fit_transform(y.values.reshape(-1, 1))
    X_predict_scaled = loaded_scaler.fit_transform(X_predict)
    X_predict_scaled = X_predict_scaled.reshape(X_predict_scaled.shape[0], 1, X_predict_scaled.shape[1])
    prediction_7days = model.predict(X_predict_scaled)
    prediction_7days_inv = scaler_y.inverse_transform(prediction_7days)
    prediction_7days_inv
    daily_prediction_df = pd.DataFrame(prediction_7days_inv, columns=['Predicted Values'])
    daily_prediction_df

    future_dates = pd.date_range(start=datetime.today(), periods=7, freq='D')
    future_predictions = pd.DataFrame({
        'date': future_dates,
        'predicted_visitors': np.round(daily_prediction_df['Predicted Values']).clip(upper=300) # maximum capacity of restairant = 300
    })
    daily_predictions_7days = future_predictions
    daily_predictions_7days['date'] = pd.to_datetime(daily_predictions_7days['date']).dt.date
    return daily_predictions_7days

def simulate_hourly_arrival(predicted_daily_visitors):
    time_intervals_1 = np.linspace(8, 16, 9)  # From 8 AM to 4 PM (9 hours)
    time_intervals_2 = np.linspace(17, 23, 7)  # From 5 PM to 11 PM (7 hours)
    time_intervals_strings = [f'{int(hour)}:00' for hour in np.concatenate((time_intervals_1, time_intervals_2), axis=None)]
    
    visitor_counts_1 = skewnorm.pdf(time_intervals_1, a=2, loc=12)  # Skew towards noon
    visitor_counts_2 = skewnorm.pdf(time_intervals_2, a=5, loc=19)  # Skew towards evening
    visitor_counts_1 = visitor_counts_1 / visitor_counts_1.max()  # Normalize to [0, 1]
    visitor_counts_2 = visitor_counts_2 / visitor_counts_2.max()
    
    visitor_counts_1 = np.round(visitor_counts_1 * predicted_daily_visitors * 0.4 / visitor_counts_1.sum()).astype(int)
    visitor_counts_2 = np.round(visitor_counts_2 * predicted_daily_visitors * 0.6 / visitor_counts_2.sum()).astype(int)
    
    hourly_counts = np.concatenate((visitor_counts_1, visitor_counts_2), axis=None)
    return time_intervals_strings, hourly_counts

def generate_hourly_data(prediction_7days):
    output_df = pd.DataFrame(columns=['date', 'time', 'estimated_arrival_count'])

    for idx, row in prediction_7days.iterrows():
        time_strings, hourly_visitors = simulate_hourly_arrival(row['predicted_visitors'])
        day_df = pd.DataFrame({
            'date': [row['date']] * len(time_strings),
            'time': time_strings,
            'estimated_arrival_count': hourly_visitors
        })
        output_df = pd.concat([output_df, day_df], ignore_index=True)

    output_df['date'] = pd.to_datetime(output_df['date']).dt.date
    return output_df



def predicted_demand_data_processing(hourly_output):
    df = hourly_output.copy()
    shift_mapper = {"8:00" :"Morning", "9:00" :"Morning", "10:00" :"Morning", "11:00" :"Morning", "12:00" :"Morning",
              "13:00" :"Morning", "14:00" :"Afternoon", "15:00" :"Afternoon", "17:00" :"Afternoon", "18:00" :"Afternoon", 
              "19:00" :"Evening", "20:00" :"Evening", "21:00" :"Evening", "22:00" :"Evening", "23:00" :"Evening"}

    df['shift'] = df['time'].map(shift_mapper)
    grouped_df = df.groupby(['date', 'shift'])['estimated_arrival_count'].sum().reset_index()
    grouped_df['demand'] = grouped_df['estimated_arrival_count'].apply(lambda x: 3 if  x < 100 else max(3, x//50+1))
    year = datetime.now().year 
    ph = generate_holiday_df(year)
    grouped_df['date'] = grouped_df['date'].astype(str)
    ## rename calendar_date to date
    ph.rename(columns = {'calendar_date':'date'}, inplace = True)
    ph.rename(columns={'holiday_flg_sg':'flg_is_ph'}, inplace=True)
    ph['date'] = ph['date'].astype(str)
    final_df = pd.merge(ph, grouped_df, how='inner')
    return final_df
    