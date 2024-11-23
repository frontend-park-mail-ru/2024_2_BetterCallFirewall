FROM node:latest

WORKDIR /app

COPY package.json .

RUN yarn install
# RUN npm install

COPY . .

EXPOSE 8001

CMD [ "npm", "start"]
