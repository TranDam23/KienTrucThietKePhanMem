# ===== Stage 1: generate data =====
FROM alpine AS stage1
WORKDIR /data

# tạo file lớn ~50MB
RUN dd if=/dev/zero of=raw_data.bin bs=1M count=50

# ===== Stage 2: process data =====
FROM alpine AS stage2
WORKDIR /data

# copy data từ stage1
COPY --from=stage1 /data/raw_data.bin .

# nén lại (giảm size)
RUN gzip raw_data.bin

# ===== Stage 3: final =====
FROM alpine AS final
WORKDIR /data

# chỉ copy file đã nén
COPY --from=stage2 /data/raw_data.bin.gz .

CMD ["sh"]