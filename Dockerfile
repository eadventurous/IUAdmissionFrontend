FROM node:11.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
EXPOSE 3000
CMD [ "npm", "start" ]
