# Base image Node.js
FROM node:18

# Thư mục làm việc trong container
WORKDIR /app

# Copy source code vào container
COPY app.js .

# Expose port 3000
EXPOSE 3000

# Chạy ứng dụng
CMD ["node", "app.js"]