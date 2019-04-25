
FROM node:carbon

WORKDIR /app


COPY package*.json ./

RUN npm install

# RUN npm install --only=production

COPY src src
COPY public public


EXPOSE 3000
CMD [ "npm", "start" ]
