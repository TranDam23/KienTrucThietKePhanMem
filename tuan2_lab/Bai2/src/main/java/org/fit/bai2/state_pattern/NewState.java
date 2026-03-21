package org.fit.bai2.state_pattern;

public class NewState implements OrderState {
    @Override
    public void processAction() {
        System.out.println("[Trạng thái MỚI TẠO] Thực hiện: Kiểm tra thông tin đơn hàng...");
    }

    @Override
    public void nextState(Order order) {
        System.out.println("-> Chuyển đơn hàng sang trạng thái: ĐANG XỬ LÝ.");
        order.setState(new ProcessingState()); // Chuyển state
    }

    @Override
    public void cancelOrder(Order order) {
        System.out.println("-> Hủy đơn hàng MỚI TẠO.");
        order.setState(new CanceledState());
    }
}
