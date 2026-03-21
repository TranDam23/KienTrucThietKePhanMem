package org.fit.bai2.decorator_pattern;

public class DiscountDecorator extends PaymentDecorator {
    public DiscountDecorator(Payment payment) {
        super(payment);
    }

    @Override
    public double getAmount() {
        // Lấy tiền hiện tại giảm đi 10%
        return super.getAmount() * 0.9;
    }

    @Override
    public String getDescription() {
        return super.getDescription() + " (- 10% Mã giảm giá)";
    }
}
