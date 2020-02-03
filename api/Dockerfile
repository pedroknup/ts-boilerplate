FROM node:10.15.2

ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /usr/src/ws
WORKDIR /usr/src/ws

COPY package.json package-lock.json /usr/src/ws/

RUN npm install

COPY . /usr/src/ws

CMD ["npm", "run", "prod"]

EXPOSE 3001