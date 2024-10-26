FROM node:latest

WORKDIR /app

COPY package.json .

RUN yarn install
# RUN npm install --verbose

COPY . .

EXPOSE 8000

CMD [ "npm", "start"]
