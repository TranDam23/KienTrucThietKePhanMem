# ===== Stage 1: Build =====
FROM node:18 AS build

WORKDIR /app

# Copy package.json
COPY package*.json ./

# Cài dependencies (nếu có)
RUN npm install

# Copy source code
COPY . .

# Build (tạo file trong dist)
RUN npm run build


# ===== Stage 2: Run =====
FROM node:18-alpine

WORKDIR /app

# Chỉ copy file đã build
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Cài lại dependencies nhẹ hơn
RUN npm install --omit=dev

# Chạy app
CMD ["npm", "start"]