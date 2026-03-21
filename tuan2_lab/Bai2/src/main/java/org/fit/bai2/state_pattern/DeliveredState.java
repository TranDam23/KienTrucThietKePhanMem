package org.fit.bai2.state_pattern;

public class DeliveredState implements OrderState {
    @Override
    public void processAction() {
        System.out.println("[Trạng thái ĐÃ GIAO] Thực hiện: Cập nhật trạng thái đơn hàng là đã giao thành công.");
    }

    @Override
    public void nextState(Order order) {
        System.out.println("! LỖI: Đơn hàng đã giao xong, không thể đi tiếp quy trình nào nữa.");
    }

    @Override
    public void cancelOrder(Order order) {
        System.out.println("! LỖI: Đơn hàng đã giao thành công, không thể hủy.");
    }
}