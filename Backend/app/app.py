from flask import Flask, request, redirect
from flask_restful import Resource, Api
from flask_cors import CORS
from flask import jsonify
import os
import prediction
import mysql.connector

app = Flask(__name__)

conn = mysql.connector.connect(
    host="db",
    port=3306,
    user="root",
    password="password",
    database="shiftwell_db"
)

cors = CORS(app, resources={r"*": {"origins": "*"}})
api = Api(app)

@app.route('/', methods=['GET'])
def home():
    return 'Welcome to API for Shift-well System!'

@app.route('/getPredictedDemand', methods=['GET'])
def get__demand_without_data():
        return "Please input data for demand prediction."

@app.route('/getPredictedDemand', methods=['POST'])
def get_predicted_demand():
        try:
            data = request.get_json()
            predict = prediction.predict_shift_economic(data)
            predictOutput = predict
            return {'predict':predictOutput.to_json(orient="split")}

        except Exception as error:
            return {'error': error}
       
@app.route('/getPredictedSchedule', methods=['GET'])
def get_without_data():
        return "Please input visitor demand for schedule prediction."
        
@app.route('/getPredictedSchedule', methods=['POST'])
def get_predicted_schedule():
        try:
            data = request.get_json()
            predict = prediction.predict_shift_economic(data)
            predictOutput = predict
            return {'predict':predictOutput.to_json(orient="split")}

        except Exception as error:
            return {'error': error}

@app.route('/employee', methods=['GET'])
def get_employee():
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM employee")
        employee_data = cursor.fetchall()
        return jsonify(employee_data)
    except Exception as error:
        return {'error': error}
    finally:
        cursor.close()        

@app.route('/employee', methods=['POST'])
def insert_employee():
    new_employee = request.json
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO employee (name, employment_status, age, is_chef, hourly_salary) VALUES (%s, %s, %s, %s, %s)", (new_employee['name'], new_employee['employment_status'], new_employee['age'],new_employee['is_chef'],new_employee['hourly_salary']))
        conn.commit()
        return jsonify({'message': 'Employee added successfully'}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()

@app.route('/reservation', methods=['GET'])
def get_reservation():
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM reservation")
        reservation_data = cursor.fetchall()
        return jsonify(reservation_data)
    except Exception as error:
        return {'error': error}
    finally:
        cursor.close()      

@app.route('/reservation', methods=['POST'])
def insert_reservation():
    new_reservation = request.json
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO reservation (customer_name, phone_number, reservation_time, party_size, special_requests) VALUES (%s, %s, %s, %s, %s)", (new_reservation['customer_name'], new_reservation['phone_number'], new_reservation['reservation_time'], new_reservation['party_size'], new_reservation['special_requests']))
        conn.commit()
        return jsonify({'message': 'Reservation added successfully'}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()     

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
