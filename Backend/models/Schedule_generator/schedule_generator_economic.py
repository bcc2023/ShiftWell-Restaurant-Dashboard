from ortools.sat.python import cp_model
import numpy as np
import pandas as pd
import requests

def schedule_employees(df):
    ##### variables ------------------------------------####
    url = 'http://127.0.0.1:5000/employee'
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
    else:
        print(f"Failed to fetch data. HTTP Status Code: {response.status_code}")
        return None
    
    #employee (name, employment_status, age, is_chef, hourly_salary)
    df_employee = pd.DataFrame(data)
    df_employee['name'] = df_employee['name'].astype('string')
    df_employee['employment_status'] = df_employee['employment_status'].astype('string')
    df_employee['age'] = df_employee['age'].astype('int')
    df_employee['is_chef'] = df_employee['is_chef'].astype('bool')
    df_employee['hourly_salary'] = df_employee['hourly_salary'].astype('int')
    
    all_days = df['day_of_week'].unique()
   
    df['demand'] = df['demand']
    all_shifts = ['morning' ,'afternoon', 'evening']
    
    all_employee = df_employee['name'].tolist()
    fulltimers = df_employee[df_employee['employment_status'] == 'full-time']['name'].tolist()
    parttimers = df_employee[df_employee['employment_status'] == 'part-time']['name'].tolist()
    chef = df_employee[df_employee['is_chef'] == True]['name'].tolist()
    other_fulltimers = fulltimers.copy() - chef.copy()
    
    ##### initialize model------------------------------------####
    model = cp_model.CpModel()

    shifts = {}
    for x in all_employee:
        for d in all_days:
            for s in all_shifts:
                shifts[(x, d, s)] = model.NewBoolVar(f'shift_{x}_{d}_{s}')
    
    ##### constraints ----------------------------------#######
        
    ## constraint: maximum 48 hrs (12 shifts) per week for full-timers
    for x in fulltimers:
        model.add(sum([shifts[(x, d, s)] for d in all_days for s in all_shifts]) <= 12)
        
    ## constraint minimum 40 hrs (10 shifts) per week for full-timers
    for x in fulltimers:
        model.add(sum([shifts[(x, d, s)] for d in all_days for s in all_shifts]) >= 10)
        
    ## constraint: minimum 32 hrs (16 shifts) per week for part-timers
    for x in parttimers:
        model.add(sum([shifts[(x, d, s)] for d in all_days for s in all_shifts]) >= 8)
        
    ## constraint: maximum 36 hrs (9 shifts) per week for part-timers
    for x in parttimers:
        model.add(sum([shifts[(x, d, s)] for d in all_days for s in all_shifts]) <= 9)
        
    ## constraint: each staff can only work no more than 2 shifts per day
    for x in all_employee:
        for d in all_days:
            model.add(sum([shifts[(x, d, s)] for s in all_shifts]) <= 2)
    
    ## constraint: each shift has at leats 1 chef
    for d in all_days:
        for s in all_shifts:
            model.add(sum([shifts[(c,d,s)] for c in chef]) >= 1)
        
     ## constraint: each shift has exactly x staff based on the demand
    for d in all_days:
        for s in all_shifts:
            demand = df[(df['day_of_week'] == d) & (df['shift'] == s)]['demand'].iloc[0]
            model.add(sum([shifts[(x, d, s)] for x in all_employee]) == (demand))

   ## constraint at least 2 full-timers per shift
    for d in all_days:
        for s in all_shifts:
            model.add(sum([shifts[(x, d, s)] for x in fulltimers]) >= 2)

###------------------------------------####
    total_cost = 0
    for x in all_employee:
        cost = df_employee.loc[df_employee['name'] == x, 'hourly_salary'].iloc[0]
        for d in all_days:
            flg_is_ph = df.loc[(df['day_of_week'] == d) & (df['shift'] == s), 'flg_is_ph'].iloc[0]
            for s in all_shifts:
                if d < 5:
                    if flg_is_ph == 1:
                        total_cost += shifts[(x, d, s)] * (cost+2) * 4
                    else:
                        total_cost += shifts[(x, d, s)] * (cost) * 4
                elif d >= 5:
                    if flg_is_ph:
                        total_cost += shifts[(x, d, s)] * (cost+2) * 4
                    else:
                        total_cost += shifts[(x, d, s)] * (cost+1) * 4
                
    
    model.minimize(cost)

    solver = cp_model.CpSolver()
    solver.parameters.linearization_level = 0
    status = solver.solve(model)
    
    
    if status == cp_model.OPTIMAL:
        print(f"Total cost: {solver.ObjectiveValue()}")
        
        # Create a list to hold the data
        schedule_data = []
        
        for d in all_days:
            for s in all_shifts:
                for x in all_employee:
                    if solver.Value(shifts[(x, d, s)]) == 1:
                        # Append a dictionary for each assigned shift
                        schedule_data.append({
                            'Day': d,
                            'Shift': s,
                            'Staff': x
                        })
        
        # Convert the list of dictionaries to a pandas DataFrame
        schedule_df = pd.DataFrame(schedule_data)
    else:
        print("No solution found.")
        schedule_df = pd.DataFrame()  # Empty DataFrame if no solution 
    
    return schedule_df


   