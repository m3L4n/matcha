FROM node:18-alpine

RUN yarn global add nodemon

WORKDIR /app

COPY package.json .

RUN yarn
COPY . .
COPY .env .env

EXPOSE 4000
# required for docker desktop port mapping
CMD ["sh", "-c", "yarn seed && yarn dev"]
