FROM node:alpine

WORKDIR /project

COPY package*.json .

RUN npm install
# RUN npm i concurrently --save-dev

COPY . .

ENTRYPOINT [ "npm" , "run" , "start:all:dev" ]