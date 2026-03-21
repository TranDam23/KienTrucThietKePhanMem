package org.fit.bai2.strategy_pattern;

public class VatTaxStrategy implements TaxStrategy {
    @Override
    public double calculateTax(double price) {
        System.out.println(" -> Áp dụng Thuế VAT (10%)");
        return price * 0.10; // Thuế 10%
    }
}
