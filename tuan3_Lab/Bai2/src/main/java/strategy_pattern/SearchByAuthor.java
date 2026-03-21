import factory_method.Book;

import java.util.ArrayList;
import java.util.List;

public class SearchByAuthor implements SearchStrategy {
    public List<Book> search(List<Book> books, String keyword) {
        List<Book> result = new ArrayList<>();
        for (Book b : books) if (b.getAuthor().toLowerCase().contains(keyword.toLowerCase())) result.add(b);
        return result;
    }
}
