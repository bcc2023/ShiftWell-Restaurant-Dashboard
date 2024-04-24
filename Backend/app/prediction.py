import pandas as pd
import schedule_generator_economic
import schedule_generator_default
import schedule_generator_quality
import lstm_sw

def predict_demand():
    daily_output = lstm_sw.generate_daily_prediction()
    prediction_7days = lstm_sw.generate_daily_prediction()
    hourly_output = lstm_sw.generate_hourly_data(prediction_7days)
    return daily_output, hourly_output

def predict_shift_economic(config):

    if type(config) == list:
        df = pd.DataFrame(config)
    else:
        df = config
    
    y_pred = schedule_generator_economic.schedule_employees(df)
    
    return y_pred

def predict_shift_default(config):

    if type(config) == list:
        df = pd.DataFrame(config)
    else:
        df = config
    
    y_pred = schedule_generator_default.schedule_employees(df)
    
    return y_pred

def predict_shift_quality(config):

    if type(config) == list:
        df = pd.DataFrame(config)
    else:
        df = config
    
    y_pred = schedule_generator_quality.schedule_employees(df)
    
    return y_pred