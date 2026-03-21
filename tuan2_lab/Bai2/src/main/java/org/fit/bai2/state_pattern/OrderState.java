package org.fit.bai2.state_pattern;

public interface OrderState {
    void processAction();

    void nextState(Order order);

    void cancelOrder(Order order);
}
