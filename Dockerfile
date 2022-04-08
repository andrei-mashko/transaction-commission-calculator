FROM node:16-alpine3.15 AS builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./
RUN yarn build

FROM node:16-alpine3.15
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY --from=builder /usr/src/app/dist/ dist/
CMD [ "yarn", "start:prod" ]
