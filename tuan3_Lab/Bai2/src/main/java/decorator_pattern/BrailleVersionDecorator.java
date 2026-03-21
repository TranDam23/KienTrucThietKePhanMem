class BrailleVersionDecorator extends BorrowDecorator {
    public BrailleVersionDecorator(BorrowService wrappedBorrow) { super(wrappedBorrow); }
    public String getDescription() {
        return super.getDescription() + " [+ Tính năng: Kèm bản chữ nổi Braille]";
    }
}
