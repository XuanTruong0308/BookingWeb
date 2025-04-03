package com.bookingweb.module.auth.controller;

import com.bookingweb.common.dto.ApiResponse;
import com.bookingweb.common.entity.User;
import com.bookingweb.module.auth.dto.LoginRequest;
import com.bookingweb.module.auth.dto.LoginResponse;
import com.bookingweb.module.auth.dto.RegisterRequest;
import com.bookingweb.module.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // Đánh dấu đây là REST controller
@RequestMapping("/api/auth") // Base URL cho các endpoint
@CrossOrigin // Cho phép CORS
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register") // Endpoint đăng ký: POST /api/auth/register
    public ResponseEntity<ApiResponse<String>> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok(ApiResponse.<String>builder()
            .success(true)
            .message("Đăng ký tài khoản thành công")
            .build());
    }

    @PostMapping("/login") // Endpoint đăng nhập: POST /api/auth/login
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.<LoginResponse>builder()
            .success(true)
            .message("Đăng nhập thành công")
            .data(response)
            .build());
    }
}