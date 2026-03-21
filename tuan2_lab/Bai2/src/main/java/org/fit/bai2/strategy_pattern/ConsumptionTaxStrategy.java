package org.fit.bai2.strategy_pattern;

public class ConsumptionTaxStrategy implements TaxStrategy {
    @Override
    public double calculateTax(double price) {
        System.out.println(" -> Áp dụng Thuế Tiêu thụ thông thường (5%)");
        return price * 0.05; // Thuế 5%
    }
}
