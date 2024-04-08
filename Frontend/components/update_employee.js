// Function to update data on backend
const updateDataOnBackend = async (data) => {
    try {
        const response = await fetch('http://localhost:4000/updateData', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        console.error('Error updating data on backend:', error);
        throw error;
    }
};

// Function to fetch updated data after successful update
const fetchUpdatedData = async () => {
    try {
        const response = await fetch('http://localhost:4000/getData');
        return response.json();
    } catch (error) {
        console.error('Error fetching updated data:', error);
        throw error;
    }
};

// Function to add a new row to the employee table
const addRowToEmployeeTable = (employee) => {
    const tableBody = document.querySelector('#employeeTable tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${employee.id}</td>
        <td>${employee.name}</td>
        <td>${employee.shiftId}</td>
    `;
    tableBody.appendChild(row);
};

// Function to display success message
const showSuccessMessage = () => {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
};

// Handle form submission to add employee
document.getElementById('addEmployeeForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    const employeeId = document.getElementById('employeeId').value;
    const employeeName = document.getElementById('employeeName').value;
    const employeeShift = document.getElementById('employeeShift').value;

    // Create a new employee object
    const newEmployee = {
        id: employeeId,
        name: employeeName,
        shiftId: employeeShift
    };

    try {
        // Call function to update data on backend
        await updateDataOnBackend(newEmployee);
        
        // Fetch updated data after successful update
        const updatedData = await fetchUpdatedData();
        
        // Update UI with updated data
        // For example, you could update the employee table with the updated data
        addRowToEmployeeTable(updatedData);

        // Show success message
        showSuccessMessage();

        // Clear the form fields
        document.getElementById('addEmployeeForm').reset();
    } catch (error) {
        console.error('Error adding employee:', error);
    }
});
