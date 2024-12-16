FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .
RUN cp -R ./node_modules/handlebars/dist ./dist

EXPOSE 8000

CMD [ "npm", "run", "build"]
