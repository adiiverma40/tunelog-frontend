FROM node:20-alpine

ARG APP_VERSION=unknown
ENV APP_VERSION=${APP_VERSION}
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
