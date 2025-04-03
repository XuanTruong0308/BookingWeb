package com.bookingweb.common.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter // Tự động tạo các phương thức getter
@Setter // Tự động tạo các phương thức setter
@MappedSuperclass // Đánh dấu đây là lớp cha cho các entity khác kế thừa
@EntityListeners(AuditingEntityListener.class) // Tự động cập nhật createdAt và updatedAt
public abstract class BaseEntity {
    @Id // Đánh dấu đây là khóa chính
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Tự động tăng giá trị
    private Long id;

    @CreatedDate // Tự động set thời gian khi tạo mới
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate // Tự động cập nhật thời gian khi sửa
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at") // Thời gian xóa mềm (soft delete)
    private LocalDateTime deletedAt;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true; // Trạng thái hoạt động của record
}
