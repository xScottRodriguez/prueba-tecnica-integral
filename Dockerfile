FROM node:21-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN npm install -g @nestjs/cli
RUN pnpm install 
COPY . .

RUN pnpm build

FROM node:21-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./
COPY --from=builder /usr/src/app/dist ./dist

RUN pnpm install --production

EXPOSE 5000
ENV PORT 5000

CMD ["pnpm","start:prod"]
