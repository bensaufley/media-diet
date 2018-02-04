FROM node:9.5.0
LABEL maintainer="Ben Saufley <contact@bensaufley.com>"
ENV NODE_ENV development

WORKDIR /tmp
COPY package.json yarn.lock /tmp/
RUN yarn install
RUN mkdir -p /usr/src/media-diet/ && cp -a /tmp/node_modules /usr/src/media-diet

WORKDIR /usr/src/media-diet
COPY . /usr/src/media-diet

EXPOSE 80
EXPOSE 8788
