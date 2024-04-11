# goodolddays-shiftwell-system

### Backend Organization

    ├── README.md          <- The top-level README for developers using this project.
    ├── data
    │   ├── external       <- Data from third party sources.
    │   ├── processed      <- The final, canonical data sets for modeling.
    │   └── raw            <- The original, immutable data dump.
    │
    ├── models             <- Trained and serialized models, model predictions, or model summaries
    │
    ├── app         <- flask application files
    │
    │
    │── notebooks   <- python notebooks for EDA and model building
    │
    ├── db          <- files for initialize database and tables
    │
    └── docker-compose.yml  <-configure application's services

---

Run with Docker 🐳

- `cd ..` to go to project root directory
- then `docker-compose up --build`

Access the REST API at `localhost:5000`

<p><small>Project based on the <a target="_blank" href="https://drivendata.github.io/cookiecutter-data-science/">cookiecutter data science project template</a></p>
