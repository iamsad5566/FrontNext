FROM node:lts
WORKDIR /yk-web/src
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
COPY ./setting.js /yk-web/
RUN yarn build

ENV NODE_ENV production

EXPOSE 3000
CMD ["yarn", "start"]