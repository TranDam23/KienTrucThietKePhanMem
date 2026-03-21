import factory_method.Book;

import java.util.List;

// ==========================================
// 2. STRATEGY PATTERN: Các chiến lược tìm kiếm
// ==========================================
public interface SearchStrategy {
    List<Book> search(List<Book> books, String keyword);
}
