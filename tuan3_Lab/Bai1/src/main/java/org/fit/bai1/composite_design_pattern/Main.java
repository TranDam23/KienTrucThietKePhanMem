package org.fit.bai1;

import org.fit.bai1.composite_design_pattern.FileSystemNode;

import java.io.File;

public class Main {
    public static void main(String[] args) {
        // Tạo các tập tin đơn lẻ
        FileSystemNode file1 = new File("tai_lieu.docx");
        FileSystemNode file2 = new File("hinh_anh.png");
        FileSystemNode file3 = new File("source_code.java");

        // Tạo thư mục và gộp tập tin
        Folder folderTaiLieu = new Folder("Tài Liệu Của Tôi");
        folderTaiLieu.addComponent(file1);
        folderTaiLieu.addComponent(file2);

        Folder folderDuAn = new Folder("Dự Án CMS");
        folderDuAn.addComponent(file3);

        // Thư mục gốc chứa các thư mục con
        Folder rootFolder = new Folder("Ổ đĩa C:");
        rootFolder.addComponent(folderTaiLieu);
        rootFolder.addComponent(folderDuAn);

        // Hiển thị toàn bộ cấu trúc cây
        rootFolder.hienThiThongTin("");
    }
}
