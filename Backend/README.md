# goodolddays-shiftwell-system

### Overview

This project aims to enhance the manpower management efficiency of the GoodOldDays restaurant through manpower scheduling optimization using advanced statistical methods

### Project Organization

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

Run with Docker

`docker-compose up --build`

Access the REST API at `localhost:5000`

<p><small>Project based on the <a target="_blank" href="https://drivendata.github.io/cookiecutter-data-science/">cookiecutter data science project template</a></p>
