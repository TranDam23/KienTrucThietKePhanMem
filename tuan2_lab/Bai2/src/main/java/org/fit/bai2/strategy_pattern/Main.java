package org.fit.bai2.strategy_pattern;

public class Main {
    public static void main(String[] args) {
        // 1. Tạo các chiến lược thuế để sẵn sàng sử dụng
        TaxStrategy vatTax = new VatTaxStrategy();
        TaxStrategy consumptionTax = new ConsumptionTaxStrategy();
        TaxStrategy luxuryTax = new LuxuryTaxStrategy();

        // 2. Mua Nước suối -> Áp dụng thuế tiêu thụ 5%
        Product water = new Product("Nước suối", 10.0, consumptionTax);
        water.printInfo();

        // 3. Mua Máy tính -> Áp dụng thuế VAT 10%
        Product laptop = new Product("Máy tính xách tay", 1000.0, vatTax);
        laptop.printInfo();

        // 4. Mua Đồng hồ Rolex -> Áp dụng thuế xa xỉ 20%
        Product rolex = new Product("Đồng hồ Rolex", 5000.0, luxuryTax);
        rolex.printInfo();

        // 5. Tính năng đặc biệt: Đổi luật thuế ngay trong lúc chạy!
        System.out.println("--- CẬP NHẬT LUẬT: Nước suối bị áp thuế VAT ---");
        water.setTaxStrategy(vatTax); // Thay đổi strategy chỉ bằng 1 dòng code
        water.printInfo();
    }
}