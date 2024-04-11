FROM node:alpine

EXPOSE 8000
RUN mkdir /app
WORKDIR /app

COPY ./package.json /app
RUN npm i

COPY . /app
CMD ["npm", "start"]