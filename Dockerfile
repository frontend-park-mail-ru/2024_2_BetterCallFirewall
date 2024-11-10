FROM node:latest as build

WORKDIR /app

COPY package.json .

# RUN yarn install
RUN npm install

COPY . .

# EXPOSE 8000

RUN npm start
# CMD [ "npm", "start"]

FROM nginx:latest

COPY --from=build /app /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
