FROM node:16

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml /app/

RUN npm i -g pnpm

RUN pnpm i -s

COPY . .

RUN pnpm prebuild; pnpm build

ENV NODE_ENV=prod
ENV PORT=8080
EXPOSE 8080

CMD pnpm start:prod