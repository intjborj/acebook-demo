FROM node:16.13.0-alpine
WORKDIR /usr/src/app/acebook/api
COPY package*.json ./
COPY . .

ENV DATABASE_URL="mongodb://172.16.10.101:7001/acebook?directConnection=true"
ENV DATABASE_URL_DEV="mongodb://172.16.10.101:7001/acebook?directConnection=true"
ENV SMS_URL="http://139.135.152.75:8087/cgi/WebCGI?1500101=account=apiuser&password=apipass&port=1"
ENV DATABASE_NAME=acebook
ENV SYS_ENV=production

RUN yarn

RUN yarn build
EXPOSE 4000

CMD ["yarn", "start:prod"]