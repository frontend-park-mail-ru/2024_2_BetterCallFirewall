FROM node:latest

WORKDIR /app

COPY package.json .

# RUN yarn install
RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "start"]
