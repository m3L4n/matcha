FROM node:17-alpine

RUN yarn global  add  nodemon

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 4000
# required for docker desktop port mapping

CMD ["yarn", "run", "dev"]