package org.fit.bai2.decorator_pattern;

public class Main {
    public static void main(String[] args) {
        System.out.println("--- GIAO DỊCH 1: Chỉ dùng Thẻ tín dụng ---");
        Payment order1 = new CreditCardPayment(100.0);
        System.out.println(order1.getDescription());
        System.out.println("Tổng tiền: $" + order1.getAmount());

        System.out.println("\n--- GIAO DỊCH 2: Thẻ tín dụng + Phí xử lý ---");
        Payment order2 = new CreditCardPayment(100.0);
        order2 = new ProcessingFeeDecorator(order2); // Bọc thêm lớp Phí
        System.out.println(order2.getDescription());
        System.out.println("Tổng tiền: $" + order2.getAmount());

        System.out.println("\n--- GIAO DỊCH 3: PayPal + Mã giảm giá + Phí xử lý ---");
        Payment order3 = new PayPalPayment(100.0);
        order3 = new DiscountDecorator(order3);      // Bọc lớp Giảm giá (còn 90$)
        order3 = new ProcessingFeeDecorator(order3); // Bọc thêm lớp Phí (thành 92$)

        System.out.println(order3.getDescription());
        System.out.println("Tổng tiền: $" + order3.getAmount());
    }
}