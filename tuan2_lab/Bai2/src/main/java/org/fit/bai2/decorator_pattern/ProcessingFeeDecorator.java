package org.fit.bai2.decorator_pattern;

public class ProcessingFeeDecorator extends PaymentDecorator {
    public ProcessingFeeDecorator(Payment payment) {
        super(payment); // Truyền đối tượng bị bọc cho lớp cha
    }

    @Override
    public double getAmount() {
        // Lấy tiền gốc + 2.0$ phí xử lý
        return super.getAmount() + 2.0;
    }

    @Override
    public String getDescription() {
        return super.getDescription() + " (+ 2.0$ Phí xử lý)";
    }
}
