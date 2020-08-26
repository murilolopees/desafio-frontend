FROM node:13-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json /app/

RUN rm -rf ~/.npm
RUN rm -rf node-modules
RUN npm cache verify
RUN npm install --silent

CMD ["npm", "start"]