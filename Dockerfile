FROM mhart/alpine-node:8.9.4

WORKDIR /animaris
COPY package.json /animaris/package.json
RUN npm i --production --registry=https://registry.npm.taobao.org

COPY src /animaris/src
COPY view /animaris/view
COPY www /animaris/www
COPY production.js /animaris/production.js

ENV DOCKER=true
EXPOSE 8360
CMD [ "node", "/animaris/production.js" ]