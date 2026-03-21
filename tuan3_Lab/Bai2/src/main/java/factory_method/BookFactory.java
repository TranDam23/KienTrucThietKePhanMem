public class BookFactory {
    // Nhà máy sản xuất sách theo yêu cầu
    public static Book createBook(String type, String title, String author, String category) {
        if (type.equalsIgnoreCase("PAPER")) return new PaperBook(title, author, category);
        if (type.equalsIgnoreCase("EBOOK")) return new EBook(title, author, category);
        throw new IllegalArgumentException("Loại sách không hỗ trợ!");
    }
}
