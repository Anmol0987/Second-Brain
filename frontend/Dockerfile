FROM node:22-alpine

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173
CMD ["npm", "run", "dev"]