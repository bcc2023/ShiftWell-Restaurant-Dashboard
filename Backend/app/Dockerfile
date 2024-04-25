FROM python:3.9-slim

EXPOSE  5000
WORKDIR /app

COPY . /app

RUN apt-get update && \
    apt-get install -y gcc pkg-config libhdf5-dev python3-h5py
RUN pip install -r requirements.txt

CMD python app.py