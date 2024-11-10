FROM node:latest

WORKDIR /app

COPY package.json .

# RUN yarn install
RUN npm install

COPY . .

EXPOSE 8000

# RUN npm build
CMD [ "npm", "start"]

# FROM nginx:latest

# WORKDIR /app

# COPY --from=build /app .

# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

# CMD [ "nginx", "-g", "daemon off;" ]
