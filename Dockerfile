FROM node:lts-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .
COPY ./.env.example ./.env

RUN npm run build
CMD ["npm", "run", "start:dev"]

FROM node:lts-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
COPY ./.env.example ./.env

COPY --from=development /app/dist ./dist
CMD ["npm", "run", "start:prod"]
