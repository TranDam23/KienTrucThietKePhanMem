package org.fit.bai2.state_pattern;

public class ProcessingState implements OrderState {
    @Override
    public void processAction() {
        System.out.println("[Trạng thái ĐANG XỬ LÝ] Thực hiện: Đóng gói và vận chuyển...");
    }

    @Override
    public void nextState(Order order) {
        System.out.println("-> Chuyển đơn hàng sang trạng thái: ĐÃ GIAO.");
        order.setState(new DeliveredState());
    }

    @Override
    public void cancelOrder(Order order) {
        System.out.println("-> Hủy đơn hàng ĐANG XỬ LÝ (Thu hồi hàng đang giao).");
        order.setState(new CanceledState());
    }
}
