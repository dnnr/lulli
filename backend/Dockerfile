FROM node:10

WORKDIR /usr/src/lulli/backend

COPY node_modules/ ./node_modules/
COPY src/          ./src/
COPY package.json  .

EXPOSE 9001

CMD ["npm", "run", "start"]
