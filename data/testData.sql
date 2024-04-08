CREATE DATABASE shiftwell_db;
USE shiftwell_db;

-- Create the employee table
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    employment_status VARCHAR(20),
    age INT,
    hourly_salary DECIMAL(10, 2),
    is_chef BOOLEAN
);

-- Insert some sample data
INSERT INTO employee (name, employment_status, age, hourly_salary, is_chef)
VALUES
('John Doe', 'Full Time', 45, 25.00, 1),
('Jane Smith', 'Full Time', 42, 25.00, 1),
('Alice Johnson', 'Full Time', 50, 25.00, 1),
('Bob Williams', 'Full Time', 33, 25.00, 1),
('Michael Brown', 'Full Time', 53, 25.00, 0),
('Emily Davis', 'Part Time', 41, 15.00, 0),
('David Miller', 'Part Time', 43, 15.00, 0),
('Sarah Wilson', 'Part Time', 52, 15.00, 0),
('Daniel Taylor', 'Part Time', 49, 15.00, 0),
('Olivia Martinez', 'Part Time', 30, 15.00, 0);
