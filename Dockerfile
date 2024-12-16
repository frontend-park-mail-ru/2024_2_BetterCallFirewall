FROM node:latest AS build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# RUN cp -R /node_modules/handlebars/dist /dist

EXPOSE 80
EXPOSE 443

FROM nginx:alpine

WORKDIR /nginx

COPY --from=build /app/dist /nginx/usr/share/nginx/html

RUN ls -la /nginx/usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;"]
