FROM node:latest

WORKDIR /app

COPY package.json .

RUN yarn install
# RUN npm install --verbose
RUN yarn add -D webpack-cli

COPY . .

EXPOSE 8000

CMD [ "npm", "start"]
