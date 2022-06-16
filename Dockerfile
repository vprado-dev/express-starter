## Dependencies

FROM endeveit/docker-jq AS dependencies

COPY package.json /tmp/package.json

RUN jq '{ dependencies, devDependencies }' </tmp/package.json >/tmp/deps.json

## Build

FROM node:alpine as build

WORKDIR /usr/src/app

COPY --from=dependencies /tmp/deps.json ./package.json

COPY yarn.lock ./yarn.lock

RUN yarn install

COPY . .

RUN yarn build

## Server

FROM node:alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json /usr/src/app/package.json

COPY --from=build /usr/src/app/yarn.lock /usr/src/app/yarn.lock

COPY --from=build /usr/src/app/build /usr/src/app/build

COPY --from=build /usr/src/app/.env.example /usr/src/app/.env.example

COPY --from=build /usr/src/app/schemas.yml /usr/src/app/schemas.yml

COPY --from=build /usr/src/app/LICENSE /usr/src/app/LICENSE

RUN yarn install --production

CMD [ "yarn", "start" ]