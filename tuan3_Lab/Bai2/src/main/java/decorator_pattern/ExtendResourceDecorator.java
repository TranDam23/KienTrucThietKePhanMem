public class ExtendResourceDecorator extends BorrowDecorator {
    public ExtendResourceDecorator(BorrowService wrappedBorrow) { super(wrappedBorrow); }
    public String getDescription() {
        return super.getDescription() + " [+ Tính năng: Gia hạn thêm 14 ngày]";
    }
}
