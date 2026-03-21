# Stage 1: Build React app
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Chạy app
FROM node:18-alpine

WORKDIR /app

# Cài serve để chạy build
RUN npm install -g serve

# Copy build từ stage 1
COPY --from=build /app/build ./build

# Mở port
EXPOSE 3000

# Chạy React app
CMD ["serve", "-s", "build", "-l", "3000"]