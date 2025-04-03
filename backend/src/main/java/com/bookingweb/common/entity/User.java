package com.bookingweb.common.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter // Tự động tạo getter
@Setter // Tự động tạo setter
@NoArgsConstructor // Constructor không tham số
@AllArgsConstructor // Constructor đầy đủ tham số
@Builder // Hỗ trợ tạo đối tượng theo builder pattern
@Entity // Đánh dấu đây là entity
@Table(name = "users") // Map với bảng users trong database
public class User extends BaseEntity implements UserDetails {
    @Column(nullable = false)
    private String fullName; // Họ tên người dùng

    @Column(nullable = false, unique = true)
    private String email; // Email, dùng để đăng nhập

    @Column(nullable = false)
    private String password; // Mật khẩu đã được mã hóa

    @Column(nullable = false)
    private String phone; // Số điện thoại

    private String avatar; // URL ảnh đại diện

    @Column(nullable = false)
    @Enumerated(EnumType.STRING) // Lưu enum dưới dạng STRING trong DB
    private Role role; // Vai trò người dùng

    // Enum định nghĩa các vai trò trong hệ thống
    public enum Role {
        ROLE_CLIENT,    // Khách hàng
        ROLE_ADMIN,     // Quản trị viên
        ROLE_PARTNER    // Đối tác cung cấp dịch vụ
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return getIsActive();
    }
}
