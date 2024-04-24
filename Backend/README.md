# goodolddays-shiftwell-system
    
- 📁 Backend
  - 📁 app               (flask application files)
    - 📄 Dockerfile      (Dockefile for building the Flask application image)
  - 📁 db                (files for initializing database and tables)
  - 📁 models            (Trained and serialized models, model predictions, or model summaries
  - 📄 README.md         (The README for developers using the backend application)
  - 📄 index.js          (Backend entry point)

### Run with Docker 🐳

- `cd ..` to go to project root directory
- then `docker-compose up`
### Access the REST API at 

`localhost:5000`

### Notes
Directories including **notebooks**(python notebooks for EDA and model building), **models**(Trained and serialized models, model predictions, or model summaries), and **data**(external, synthesized, and preprocessed data) are partially or not included in this repo as most are not needed during the application development stage. Instead of having all copies of the large files, we have moved the essential models inside the **app** directory, and only save the necessary data and model configurations here for building the application. 

For more details of the directories not included, please visit [https://github.com/DSA3101AY2324S2-ByteForce/goodolddays-shiftwell-system-backend](https://github.com/DSA3101AY2324S2-ByteForce/goodolddays-shiftwell-system-backend). Note that you need to have access to it as it is a private repository.
