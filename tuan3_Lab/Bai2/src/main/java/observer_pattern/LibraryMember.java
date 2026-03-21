public class LibraryMember implements UserObserver {
    private String name;
    public LibraryMember(String name) { this.name = name; }
    public void update(String message) {
        System.out.println("[Thông báo cho " + name + "] " + message);
    }
}
