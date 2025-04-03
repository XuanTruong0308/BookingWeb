package com.bookingweb.module.auth.repository;

import com.bookingweb.common.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository // Đánh dấu đây là repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Tìm user theo email, trả về Optional để xử lý null safety
    Optional<User> findByEmail(String email);
    
    // Kiểm tra email đã tồn tại chưa
    boolean existsByEmail(String email);
}