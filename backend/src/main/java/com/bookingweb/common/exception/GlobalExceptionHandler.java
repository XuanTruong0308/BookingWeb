package com.bookingweb.common.exception;

import com.bookingweb.common.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.security.web.csrf.InvalidCsrfTokenException;
import org.springframework.security.web.csrf.MissingCsrfTokenException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice // Xử lý exception cho toàn bộ controller
public class GlobalExceptionHandler {

    // Xử lý lỗi validation
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ApiResponse<Map<String, String>> response = ApiResponse.<Map<String, String>>builder()
            .success(false)
            .message("Dữ liệu không hợp lệ")
            .data(errors)
            .build();

        return ResponseEntity.badRequest().body(response);
    }

    // Xử lý lỗi xác thực
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiResponse<String>> handleAuthenticationException(AuthenticationException ex) {
        String errorMessage;
        
        if (ex instanceof BadCredentialsException) {
            errorMessage = "Email hoặc mật khẩu không đúng";
        } else if (ex instanceof UsernameNotFoundException) {
            errorMessage = "Không tìm thấy tài khoản với email này";
        } else {
            errorMessage = "Lỗi xác thực: " + ex.getMessage();
        }
        
        ApiResponse<String> response = ApiResponse.<String>builder()
            .success(false)
            .message(errorMessage)
            .build();
            
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    // Xử lý lỗi CSRF
    @ExceptionHandler({InvalidCsrfTokenException.class, MissingCsrfTokenException.class})
    public ResponseEntity<ApiResponse<String>> handleCsrfException(Exception ex) {
        ApiResponse<String> response = ApiResponse.<String>builder()
            .success(false)
            .message("Lỗi bảo mật: Token CSRF không hợp lệ hoặc bị thiếu")
            .build();
            
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
    }

    // Xử lý lỗi phân quyền
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<String>> handleAccessDeniedException(AccessDeniedException ex) {
        ApiResponse<String> response = ApiResponse.<String>builder()
            .success(false)
            .message("Bạn không có quyền truy cập tài nguyên này")
            .build();
            
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
    }

    // Xử lý các lỗi khác
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleGlobalException(Exception ex) {
        ApiResponse<String> response = ApiResponse.<String>builder()
            .success(false)
            .message("Có lỗi xảy ra: " + ex.getMessage())
            .build();
            
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
