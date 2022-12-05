FROM node:16.13.0-alpine
WORKDIR /usr/src/app/acebook/file-srv
COPY package*.json ./
COPY . .

RUN npm install
RUN npm install -g nodemon

EXPOSE 3002

CMD ["yarn", "start"]

