FROM node:18-alpine

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN chown -R 1000:1000 /usr/local/lib/node_modules/
RUN chown -R 1000:1000 /usr/local/bin/
RUN chown -R 1000:1000 /usr/local/share/

COPY ./ ./

USER node

RUN npm install

COPY --chown=node:node . .

CMD [ "npm", "start" ]