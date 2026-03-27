# ===== Stage 1: Build =====
FROM golang:1.20-alpine AS build

WORKDIR /app

# Copy source code
COPY main.go .

# Tắt module
ENV GO111MODULE=off

# Build binary
RUN go build -o app


# ===== Stage 2: Run (siêu nhẹ) =====
FROM alpine:latest

WORKDIR /app

# Copy binary từ stage build
COPY --from=build /app/app .

# Chạy app
CMD ["./app"]