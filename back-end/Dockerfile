FROM node:17-alpine

RUN yarn global  add  nodemon

WORKDIR /app

COPY package.json .

RUN yarn install
COPY . .
COPY .env .env

EXPOSE 4000
# required for docker desktop port mapping

CMD ["sh", "-c", "node wait-for-postgres.js && yarn run dev"]
