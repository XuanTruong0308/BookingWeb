package com.bookingweb.module.auth.service;

import com.bookingweb.common.entity.User;
import com.bookingweb.module.auth.dto.LoginRequest;
import com.bookingweb.module.auth.dto.LoginResponse;
import com.bookingweb.module.auth.dto.RegisterRequest;
import com.bookingweb.module.auth.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager; // Xử lý xác thực
    private final PasswordEncoder passwordEncoder; // Mã hóa mật khẩu
    private final JwtService jwtService; // Xử lý JWT
    private final UserRepository userRepository; // Thao tác với DB

    // Constructor injection
    public AuthService(
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            UserRepository userRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    // Xử lý đăng nhập
    public LoginResponse login(LoginRequest request) {
        // Xác thực thông tin đăng nhập
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        // Nếu xác thực thành công, tìm user
        var user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Tạo JWT token
        String token = jwtService.generateToken(user);

        // Tạo response với token và thông tin user
        return LoginResponse.builder()
                .token(token)
                .user(LoginResponse.UserInfo.fromUser(user))
                .build();
    }

    // Xử lý đăng ký
    public User register(RegisterRequest request) {
        // Kiểm tra email đã tồn tại chưa
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        // Tạo user mới
        var user = User.builder()
                .fullName(request.getFull_name())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) // Mã hóa mật khẩu
                .phone(request.getPhone())
                .role(User.Role.valueOf(request.getRole()))
                .build();

        // Lưu vào database
        return userRepository.save(user);
    }
}