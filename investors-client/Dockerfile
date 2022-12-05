FROM node:16.13.0-alpine
WORKDIR /usr/src/app/acebook/investors-client
COPY package*.json ./
COPY . .

ENV FRAMEWORK_PROVIDER="graphql"
ENV NEXT_PUBLIC_GRAPHQL_API_ENDPOINT="https://acebook-api.acemcbohol.ph/graphql"
ENV NEXT_PUBLIC_GRAPHQL_API_ENDPOINT_SUBSCRIPTION_DEV="wss://acebook-api.acemcbohol.ph/graphql"
ENV NEXT_PUBLIC_PROD_FRONTEND_ENDPOINT="https://acebook.acemcbohol.ph"
ENV NEXT_PUBLIC_SITE_URL="https://acebook.acemcbohol.ph"
ENV NEXT_PUBLIC_FILE_SERVER_PROD = "https://acebook-flsrv.acemcbohol.ph/ftp/uploads/"
ENV SECRET=ACEBOOK123!!
ENV GOOGLE_CLIENT_SECRET=232432
ENV NEXT_PUBLIC_PROD_INVESTOR_ENDPOINT = "https://asm.acemcbohol.ph/"


RUN yarn

RUN yarn build:gql
EXPOSE 3003

CMD ["yarn", "start"]

