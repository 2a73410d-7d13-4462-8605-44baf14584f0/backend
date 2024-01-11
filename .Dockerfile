FROM node:20.9.0
WORKDIR /src/main
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 8080
CMD [ "yarn", 'run', 'start' ]