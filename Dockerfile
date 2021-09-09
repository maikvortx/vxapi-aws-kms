FROM node:14-alpine AS builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

## Install dependencies
COPY ./package*.json ./
RUN npm install --only=prod

## Add source code
COPY "./src" "/usr/src/app/src/"
COPY "./*.env.*" "/usr/src/app/"

EXPOSE 80

ARG ENV_FILE=stg
RUN rm -rf .env
RUN mv .env.$ENV_FILE .env

ENTRYPOINT [ "npm", "start" ]