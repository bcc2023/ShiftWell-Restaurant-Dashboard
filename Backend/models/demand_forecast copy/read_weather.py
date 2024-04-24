import json

def read_weather_data():
    try:
        # Open the JSON file
        with open('weather_data.json', 'r') as file:
            # Load data from the JSON file
            weather_data = json.load(file)
        
        # Print the weather data
        for entry in weather_data:
            print(entry)
    except FileNotFoundError:
        print("File not found. Please check the filename and try again.")
    except json.JSONDecodeError:
        print("Error decoding JSON. Please check the JSON file for errors.")

# Run the function
read_weather_data()


