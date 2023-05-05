ARG FRONTEND_SOURCE_IMAGE=node:16.9.1-alpine3.13
ARG NGINX_SOURCE_IMAGE=nginx:1.19.7-alpine

FROM $FRONTEND_SOURCE_IMAGE AS builder

RUN apk add --update --no-cache git openssh python2 make g++ gettext libintl && \
    ln -sf python2 /usr/bin/python

WORKDIR /app
EXPOSE 8090

RUN npm config set cache
RUN npm install -g npm@7.24.1

ARG NODE_ENV=production
ENV NODE_OPTIONS --max-old-space-size=8192

COPY package.json package-lock.json ./

RUN NODE_ENV=development npm install

ARG API_BASE_URL=/api
ARG APP_VERSION=unknown

COPY . /app

RUN envsubst < config.js.template > config.js
RUN cat config.js

RUN NODE_OPTIONS=$NODE_OPTIONS npm run build

CMD /bin/sh

FROM $NGINX_SOURCE_IMAGE

RUN rm /etc/nginx/conf.d/*

COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /app

WORKDIR /app
EXPOSE 8090
