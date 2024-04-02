const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 8080;

// Simulated user data (replace with your actual user storage)
const users = [
  { id: 1, username: 'Manager Mei', password: 'admin123', role: 'Manager' },
  { id: 2, username: 'Chef Xue', password: 'user123', role: 'Chef' }
];

// Middleware to parse request bodies
app.use(express.json());

// Security middleware
app.use(helmet());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Simulated authentication middleware (replace with your actual authentication logic)
function authenticate(req, res, next) {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}

// Authorization middleware
function authorize(roles) {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  };
}

// API endpoint for fetching staff counts (accessible only to admin role)
app.get('/api/staff-counts', authenticate, authorize(['admin']), (req, res) => {
  res.json({ fullTimeCount: 8, partTimeCount: 2 });
});

// API endpoint for fetching demand forecast data (accessible to both admin and user roles)
app.get('/api/demand-forecast', authenticate, authorize(['admin', 'user']), (req, res) => {
  res.json({ /* demand forecast data */ });
});

// API endpoint for fetching staff schedule data (accessible to both admin and user roles)
app.get('/api/staff-schedule', authenticate, authorize(['admin', 'user']), (req, res) => {
  res.json({ /* staff schedule data */ });
});

// API endpoint for fetching estimated cost data (accessible only to admin role)
app.get('/api/estimated-cost', authenticate, authorize(['admin']), (req, res) => {
  res.json({ /* estimated cost data */ });
});

// API endpoint for fetching employee data (accessible only to admin role)
app.get('/api/employees', authenticate, authorize(['admin']), (req, res) => {
  res.json(/* employee data */);
});

// API endpoint for adding a new employee (accessible only to admin role)
app.post('/api/employees', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Employee added successfully' });
});

// API endpoint for updating an employee (accessible only to admin role)
app.put('/api/employees/:id', authenticate, authorize(['admin']), (req, res) => {
  const employeeId = req.params.id;
  res.json({ message: 'Employee updated successfully' });
});

// API endpoint for removing an employee (accessible only to admin role)
app.delete('/api/employees/:id', authenticate, authorize(['admin']), (req, res) => {
  const employeeId = req.params.id;
  res.json({ message: 'Employee removed successfully' });
});

// Route to serve the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'project.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});