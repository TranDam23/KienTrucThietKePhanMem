package org.fit.bai2.strategy_pattern;

public class LuxuryTaxStrategy implements TaxStrategy {
    @Override
    public double calculateTax(double price) {
        System.out.println(" -> Áp dụng Thuế Hàng Xa xỉ (20%)");
        return price * 0.20; // Thuế 20%
    }
}
