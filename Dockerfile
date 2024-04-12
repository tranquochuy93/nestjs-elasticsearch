FROM node:14.18.1 as builder
WORKDIR /app
COPY . .
RUN npm i
RUN npm i -g typeorm pg
RUN npm run build
RUN npm run static
RUN rm -rf s*
RUN rm -rf t*
CMD ["sh", "-c", "typeorm migration:run; node /app/dist/src/main.js"]
