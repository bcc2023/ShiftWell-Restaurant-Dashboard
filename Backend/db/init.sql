-- Create database
CREATE DATABASE shiftwell_db;
use shiftwell_db;

-- Create the employee table
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    employment_status VARCHAR(20),
    is_chef BOOLEAN NOT NULL,
    age INT,
    hourly_salary DECIMAL(10, 2)
);

-- Insert some sample data
INSERT INTO employee (name, employment_status, age, is_chef, hourly_salary)
VALUES
    ('John Doe', 'Full Time', 45, TRUE, 25.00),
    ('Jane Smith', 'Full Time', 42, TRUE, 25.00),
    ('Alice Johnson', 'Full Time', 50, FALSE, 25.00),
    ('Bob Williams', 'Full Time', 33, FALSE, 25.00),
    ('Michael Brown', 'Full Time', 53,FALSE, 25.00),
    ('Emily Davis', 'Part Time', 41, FALSE, 15.00),
    ('David Miller', 'Part Time', 43, FALSE, 15.00),
    ('Sarah Wilson', 'Part Time', 52, FALSE, 15.00),
    ('Daniel Taylor', 'Part Time', 49, FALSE, 15.00),
    ('Olivia Martinez', 'Part Time', 30, FALSE, 15.00);

-- Create the reservation table
CREATE TABLE reservation (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    phone_number VARCHAR(20),
    reservation_time DATETIME,
    party_size INT,
    special_requests TEXT
);

INSERT INTO reservation (customer_name, phone_number, reservation_time, party_size, special_requests) 
VALUES 
    ('John Doe', '123-456-7890', '2024-04-08 18:00:00', 4, 'Vegetarian preferences'),
    ('Jane Smith', '987-654-3210', '2024-04-09 19:30:00', 2, 'Table by the window'),
    ('Alice Johnson', '555-123-4567', '2024-04-10 20:00:00', 6, 'Birthday celebration');



