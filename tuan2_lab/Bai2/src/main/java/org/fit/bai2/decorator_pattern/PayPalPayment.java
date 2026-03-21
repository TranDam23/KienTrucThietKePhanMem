package org.fit.bai2.decorator_pattern;

public class PayPalPayment implements Payment {
    private double amount;

    public PayPalPayment(double amount) {
        this.amount = amount;
    }

    @Override
    public double getAmount() {
        return this.amount;
    }

    @Override
    public String getDescription() {
        return "Thanh toán bằng PayPal";
    }
}
