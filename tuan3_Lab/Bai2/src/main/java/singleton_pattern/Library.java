import factory_method.Book;
import observer_pattern.UserObserver;
import strategy_pattern.SearchStrategy;

import java.util.ArrayList;
import java.util.List;

// ==========================================
// 5. SINGLETON PATTERN: Lớp quản lý Thư Viện
// (Kết hợp làm Subject cho Observer)
// ==========================================
class Library {
    // 5.1 Singleton: Biến static lưu trữ instance duy nhất
    private static Library instance;

    private List<Book> books = new ArrayList<>();
    private List<UserObserver> subscribers = new ArrayList<>();

    // Private constructor ngăn không cho tạo instance mới từ bên ngoài bằng lệnh new
    private Library() {}

    // Method lấy instance duy nhất
    public static Library getInstance() {
        if (instance == null) {
            instance = new Library();
        }
        return instance;
    }

    // --- Logic của Observer ---
    public void subscribe(UserObserver user) { subscribers.add(user); }
    private void notifySubscribers(String message) {
        for (UserObserver user : subscribers) user.update(message);
    }

    // --- Logic Quản lý Sách ---
    public void addBook(Book book) {
        books.add(book);
        System.out.println("Thư viện vừa nhập: " + book.getTitle() + " (" + book.getBookType() + ")");
        // Tự động báo cho người dùng khi có sách mới
        notifySubscribers("Sách mới cực hot đã về: " + book.getTitle() + " của " + book.getAuthor() + "!");
    }

    // --- Logic Tìm kiếm (Dùng Strategy) ---
    public void searchBooks(SearchStrategy strategy, String keyword) {
        System.out.println("\n--- Đang tìm kiếm với từ khóa: '" + keyword + "' ---");
        List<Book> results = strategy.search(this.books, keyword);
        if (results.isEmpty()) System.out.println("Không tìm thấy kết quả nào.");
        for (Book b : results) {
            System.out.println("- " + b.getTitle() + " | " + b.getAuthor() + " | " + b.getBookType());
        }
    }
}