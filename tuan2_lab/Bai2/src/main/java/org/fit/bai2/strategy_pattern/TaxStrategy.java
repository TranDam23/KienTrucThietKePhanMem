package org.fit.bai2.strategy_pattern;

public interface TaxStrategy {
    // Phương thức tính thuế dựa trên giá gốc của sản phẩm
    double calculateTax(double price);
}
