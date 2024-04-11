/* document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addEmployeeForm').addEventListener('submit', handleFormSubmit);
    fetchEmployees(); // Fetch existing employees when the page loads
}); */

const fetchEmployees = async () => {
    try {
        const response = await fetch('http://localhost:5000/employee');
        if (!response.ok) throw new Error('Failed to fetch employees');

        const employees = await response.json();
        populateEmployeeTable(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
    }
};

const populateEmployeeTable = (employees) => {
    const tableBody = document.getElementById('employeeTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows before adding new ones

    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.age}</td>
            <td>${employee.employment_status}</td>
            <td>${employee.hourly_salary}</td>
            <td>${employee.is_chef ? 'Yes' : 'No'}</td>
        `;
        tableBody.appendChild(row);
    });
};

const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newEmployee = Object.fromEntries(formData.entries());
    newEmployee.is_chef = !!+newEmployee.isChef; // Convert "1"/"0" string to boolean and ensure the property name matches the Flask route expectation
    delete newEmployee.isChef; // Remove the isChef field to avoid confusion

    const payload = {
        name: newEmployee.name,
        employment_status: newEmployee.employmentStatus,
        age: parseInt(newEmployee.age, 10), // Ensure age is an integer
        is_chef: newEmployee.is_chef,
        hourly_salary: newEmployee.hourlySalary
    };

    try {
        const response = await fetch('http://localhost:5000/employee', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Failed to add employee');

        document.getElementById('addEmployeeForm').reset();
        showSuccessMessage();
        fetchEmployees(); // Fetch and display updated employee data
    } catch (error) {
        console.error('Error adding employee:', error);
    }
};

const showSuccessMessage = () => {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const message = document.createElement('div');
    message.classList.add('modal-content');
    message.textContent = 'Employee added successfully!';

    modal.appendChild(message);
    document.body.appendChild(modal);

    modal.style.display = 'flex';
    modal.style.justifyContent = 'center'; // Center horizontally
    modal.style.alignItems = 'center'; // Center vertically
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

    // Style the message
    message.style.backgroundColor = '#fff';
    message.style.padding = '20px';
    message.style.borderRadius = '5px';
    message.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)'; // Drop shadow


    // Hide the modal after 1 second
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    }, 1000);
};

module.exports = {fetchEmployees, populateEmployeeTable, handleFormSubmit, showSuccessMessage};