FROM node:18-alpine

WORKDIR /usr/src/app

RUN npm cache clean --force
RUN rm -rf node_modules

COPY package.json .

RUN npm install

COPY . .

CMD  npm start