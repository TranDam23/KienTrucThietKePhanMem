package org.fit.bai2.state_pattern;

public class Order {
    private OrderState state;

    public Order() {
        // Khi mới tạo, đơn hàng luôn ở trạng thái NewState
        this.state = new NewState();
    }

    // Cho phép thay đổi trạng thái
    public void setState(OrderState state) {
        this.state = state;
    }

    // Ủy quyền (delegate) hành động cho trạng thái hiện tại
    public void processCurrentAction() {
        state.processAction();
    }

    public void proceedToNext() {
        state.nextState(this);
    }

    public void cancel() {
        state.cancelOrder(this);
    }
}
