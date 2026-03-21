abstract class BorrowDecorator implements BorrowService {
    protected BorrowService wrappedBorrow;
    public BorrowDecorator(BorrowService wrappedBorrow) { this.wrappedBorrow = wrappedBorrow; }
    public String getDescription() { return wrappedBorrow.getDescription(); }
}