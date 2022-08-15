FROM node:16

WORKDIR /usr/src/app

#installs app dependencies
COPY package*.json ./
RUN npm install

#bundles app source
COPY . .

EXPOSE 5000

CMD ["node", "index.js"]