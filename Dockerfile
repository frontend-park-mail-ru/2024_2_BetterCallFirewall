FROM node:latest AS build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

RUN cp -R node_modules/handlebars/dist/ public

EXPOSE 80
EXPOSE 443

FROM nginx:alpine

WORKDIR /nginx

COPY --from=build /app/public /nginx/var/www/frontend

CMD [ "nginx", "-g", "daemon off;"]
