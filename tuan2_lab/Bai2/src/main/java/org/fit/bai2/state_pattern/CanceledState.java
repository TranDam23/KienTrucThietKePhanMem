package org.fit.bai2.state_pattern;

public class CanceledState implements OrderState {
    @Override
    public void processAction() {
        System.out.println("[Trạng thái ĐÃ HỦY] Thực hiện: Hủy đơn hàng và hoàn tiền cho khách.");
    }

    @Override
    public void nextState(Order order) {
        System.out.println("! LỖI: Đơn hàng đã bị hủy, không thể tiếp tục xử lý.");
    }

    @Override
    public void cancelOrder(Order order) {
        System.out.println("! LỖI: Đơn hàng đã ở trạng thái hủy rồi.");
    }
}
