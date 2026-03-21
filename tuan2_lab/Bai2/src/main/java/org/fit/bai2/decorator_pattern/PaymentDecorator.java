package org.fit.bai2.decorator_pattern;

// Lớp này vừa implement Payment, vừa CHỨA một đối tượng Payment bên trong nó
public abstract class PaymentDecorator implements Payment {
    protected Payment wrappedPayment; // Đối tượng bị bọc bên trong

    public PaymentDecorator(Payment payment) {
        this.wrappedPayment = payment;
    }

    @Override
    public double getAmount() {
        return wrappedPayment.getAmount(); // Gọi lớp bên trong
    }

    @Override
    public String getDescription() {
        return wrappedPayment.getDescription(); // Gọi lớp bên trong
    }
}
