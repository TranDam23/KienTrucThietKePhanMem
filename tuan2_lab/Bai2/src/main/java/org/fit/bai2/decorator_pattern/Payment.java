package org.fit.bai2.decorator_pattern;

public interface Payment {
    double getAmount();          // Lấy tổng số tiền
    String getDescription();     // Lấy mô tả chi tiết của gói thanh toán
}