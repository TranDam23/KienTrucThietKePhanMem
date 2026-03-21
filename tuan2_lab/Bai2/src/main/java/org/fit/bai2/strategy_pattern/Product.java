package org.fit.bai2.strategy_pattern;

public class Product {
    private String name;
    private double price;
    private TaxStrategy taxStrategy; // Lưu trữ chiến lược tính thuế

    // Khi tạo sản phẩm, ta truyền luôn chiến lược thuế vào
    public Product(String name, double price, TaxStrategy taxStrategy) {
        this.name = name;
        this.price = price;
        this.taxStrategy = taxStrategy;
    }

    // Cho phép thay đổi chiến lược thuế bất kỳ lúc nào (Linh hoạt)
    public void setTaxStrategy(TaxStrategy taxStrategy) {
        this.taxStrategy = taxStrategy;
    }

    // Tính giá cuối cùng bao gồm thuế
    public double getFinalPrice() {
        double tax = taxStrategy.calculateTax(this.price);
        return this.price + tax;
    }

    public void printInfo() {
        System.out.println("Sản phẩm: " + this.name + " | Giá gốc: " + this.price + "$");
        System.out.println("Giá cuối cùng (đã tính thuế): " + this.getFinalPrice() + "$\n");
    }
}
