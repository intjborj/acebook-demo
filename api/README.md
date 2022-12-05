cd api
yarn
yarn start:dev


<!-- Running docker -->

docker build . -t jacksemis101/ace-book-api
<!-- docker run -d jacksemis101/ace-book-api -->
docker run -p "4000:4000" jacksemis101/ace-book-api



___________


creating migration

$ yarn migrate-mongo create <migration-name>
$ yarn migrate-mongo up