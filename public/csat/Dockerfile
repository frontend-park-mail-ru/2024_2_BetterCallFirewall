FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install webpack-cli
RUN npm install

COPY . .

EXPOSE 8001

CMD [ "npm", "start"]
