FROM node:latest

WORKDIR /app

COPY package.json .

# RUN yarn install
RUN npm install

COPY . .

EXPOSE 80

CMD [ "npm", "start"]
