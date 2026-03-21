import factory_method.Book;

public class BasicBorrow implements BorrowService {
    private Book book;
    public BasicBorrow(Book book) { this.book = book; }
    public String getDescription() {
        return "Mượn sách cơ bản: '" + book.getTitle() + "' (7 ngày).";
    }
}
