*18 Mar*
- implemented a real-time weather-by-hour scraper in javascript

*20 Mar*
- building connection between backend and frontend, in progress

**Instructions to run code**
Note: There is no need to create an environment for this, as npm installs packages to the directory itself.
1. use "npm i" to install packages needed in package.json 
2. use "npm start" to run code and start api
3. to test Frontend alone, in your browser, enter http://localhost:8000/weather to get real-time weather-by-hour at sentosa, you can install a json viewer for better readability.


**Let's aim to build up this project backbone bit by bit**:

## 1. Root Directory
- Configuration Files
  - `package.json` (for Node.js projects)
  - `.gitignore`
  - `README.md`

## 2. Backend Directory
- Backend Code
  - `index.js` or `app.js`: Entry point for the backend server
  - `routes/`: Directory for defining API routes
  - `controllers/`: Directory for defining route controllers
  - `models/`: Directory for defining database models
  - `middlewares/`: Directory for storing custom middleware functions
  - `config/`: Directory for configuration files
  - `utils/`: Directory for utility functions

## 3. Frontend Directory
- Frontend Code
  - `index.html` or `index.jsx`: Main HTML or JSX file for the frontend
  - `components/`: Directory for React components or UI elements
  - `styles/`: Directory for CSS or SCSS files
  - `assets/`: Directory for images, fonts, or static assets
  - `services/`: Directory for frontend services (e.g., API service)
  - `utils/`: Directory for frontend-specific utility functions