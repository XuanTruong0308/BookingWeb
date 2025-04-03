package com.bookingweb.module.auth.service;

import com.bookingweb.module.auth.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Service tùy chỉnh để load thông tin user cho Spring Security
 * Implements UserDetailsService của Spring Security để tích hợp với hệ thống xác thực
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {
    // Repository để truy vấn thông tin user từ database
    private final UserRepository userRepository;

    /**
     * Constructor injection UserRepository
     * @param userRepository repository để thao tác với bảng users
     */
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Load thông tin user từ database dựa vào email
     * Method này sẽ được Spring Security gọi khi cần xác thực user
     *
     * @param email email của user (được sử dụng như username)
     * @return UserDetails chứa thông tin của user
     * @throws UsernameNotFoundException nếu không tìm thấy user với email tương ứng
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Tìm user theo email, nếu không tìm thấy thì throw exception
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }
} 