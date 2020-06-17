FROM node:14-alpine
WORKDIR /syfomodiaperson

COPY ./.env .
COPY ./server.js .
COPY ./package.json .

COPY ./node_modules ./
COPY ./img ./
COPY ./dist ./

EXPOSE 8080
CMD ["node", "server.js"]
