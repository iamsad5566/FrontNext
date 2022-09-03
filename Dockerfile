FROM node:lts as dependencies
WORKDIR /yk-web/src
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /yk-web/src
COPY . .
COPY ./setting.js /yk-web/
COPY --from=dependencies /yk-web/src/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /yk-web/src
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /yk-web/src/next.config.js ./
COPY --from=builder /yk-web/src/public ./public
COPY --from=builder /yk-web/src/.next ./.next
COPY --from=builder /yk-web/src/node_modules ./node_modules
COPY --from=builder /yk-web/src/package.json ./package.json

EXPOSE 3000
CMD ["node", "server.js"]