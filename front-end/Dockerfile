FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 8080
# required for docker desktop port mapping

CMD ["yarn", "start"]