#-------Deps-------#

FROM node:14-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY ./package*.json ./

RUN npm install

#-------Builder-------#

FROM node:14-alpine as builder

WORKDIR /app

COPY ./ ./

COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

#-------Runner-------#

FROM node:14-alpine as runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/build ./build

COPY --from=builder /app/node_modules ./node_modules

RUN npm install -g pm2

EXPOSE 3000

CMD ["pm2-runtime","build/index.js"]