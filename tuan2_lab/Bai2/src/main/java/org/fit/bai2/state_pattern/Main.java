package org.fit.bai2.state_pattern;

public class Main {
    public static void main(String[] args) {
        System.out.println("--- KỊCH BẢN 1: ĐƠN HÀNG THÀNH CÔNG ---");
        Order order1 = new Order();

        order1.processCurrentAction(); // Đang ở Mới tạo
        order1.proceedToNext();        // Chuyển sang Đang xử lý

        order1.processCurrentAction(); // Đang ở Đang xử lý
        order1.proceedToNext();        // Chuyển sang Đã giao

        order1.processCurrentAction(); // Đang ở Đã giao
        order1.cancel();               // Thử hủy khi đã giao -> Sẽ báo lỗi

        System.out.println("\n--- KỊCH BẢN 2: ĐƠN HÀNG BỊ HỦY ---");
        Order order2 = new Order();
        order2.processCurrentAction(); // Đang ở Mới tạo
        order2.cancel();               // Khách bấm hủy ngay
        order2.processCurrentAction(); // Xử lý việc hoàn tiền
        order2.proceedToNext();        // Thử xử lý tiếp -> Sẽ báo lỗi

    }
}