# Use official Node.js image as builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build




EXPOSE 4173
CMD ["npm", "run", "preview"]