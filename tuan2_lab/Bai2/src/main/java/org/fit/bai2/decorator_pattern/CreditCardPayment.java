package org.fit.bai2.decorator_pattern;

public class CreditCardPayment implements Payment {
    private double amount;

    public CreditCardPayment(double amount) {
        this.amount = amount;
    }

    @Override
    public double getAmount() {
        return this.amount;
    }

    @Override
    public String getDescription() {
        return "Thanh toán bằng Thẻ tín dụng";
    }
}