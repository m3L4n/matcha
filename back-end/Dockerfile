FROM node:17-alpine

RUN yarn global  add  nodemon

WORKDIR /app

COPY package.json .

RUN yarn install
COPY . .
COPY .env .env

EXPOSE 4000
# required for docker desktop port mapping
CMD ["sh", "-c", " sleep 10s && node ./db/init-db.js && yarn run dev"]
