FROM node:20.9.0
WORKDIR /src/app/be-short-url

COPY package*.json ./
COPY package-lock.json ./
COPY yarn.lock ./

# POSGRES
ENV DB_HOST=dbShortUrl
ENV DB_NAME=postgres
ENV DB_PORT=5432
ENV DB_USER=postgres
ENV DB_PASS=admin

# REDIS
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379
ENV REDIS_PASSWORD=

RUN yarn
COPY . .
EXPOSE 8080
CMD [ "yarn", "start" ]