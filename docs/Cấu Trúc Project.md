project/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (client)/
│   │   │   │   ├── page.tsx                    # Trang chủ
│   │   │   │   ├── layout.tsx                  # Layout chung cho client
│   │   │   │   ├── services/
│   │   │   │   │   ├── page.tsx               # Danh sách dịch vụ
│   │   │   │   │   ├── [category]/            # Chi tiết loại dịch vụ
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   └── [id]/page.tsx      # Chi tiết một dịch vụ
│   │   │   │   ├── booking/
│   │   │   │   │   ├── page.tsx               # Form đặt lịch
│   │   │   │   │   └── [id]/                  # Chi tiết đặt lịch
│   │   │   │   │       ├── page.tsx
│   │   │   │   │       └── payment/page.tsx   # Thanh toán
│   │   │   │   ├── account/
│   │   │   │   │   ├── page.tsx              # Thông tin tài khoản
│   │   │   │   │   ├── bookings/page.tsx     # Lịch sử đặt lịch
│   │   │   │   │   └── reviews/page.tsx      # Đánh giá của tôi
│   │   │   │   └── support/
│   │   │   │       ├── page.tsx              # Trang hỗ trợ
│   │   │   │       └── chat/page.tsx         # Chat hỗ trợ
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── layout.tsx                # Layout admin
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx             # Thống kê tổng quan
│   │   │   │   ├── bookings/
│   │   │   │   │   ├── page.tsx             # Quản lý đặt lịch
│   │   │   │   │   └── [id]/page.tsx        # Chi tiết đặt lịch
│   │   │   │   ├── services/
│   │   │   │   │   ├── page.tsx             # Quản lý dịch vụ
│   │   │   │   │   └── [id]/page.tsx        # Thêm/sửa dịch vụ
│   │   │   │   ├── finance/
│   │   │   │   │   ├── overview/page.tsx    # Tổng quan tài chính
│   │   │   │   │   ├── commissions/page.tsx # Cài đặt hoa hồng
│   │   │   │   │   └── withdrawals/page.tsx # Duyệt rút tiền
│   │   │   │   └── settings/page.tsx        # Cài đặt hệ thống
│   │   │   │
│   │   │   └── partner/
│   │   │       ├── layout.tsx               # Layout đối tác
│   │   │       ├── dashboard/page.tsx       # Thống kê cá nhân
│   │   │       ├── schedule/page.tsx        # Lịch làm việc
│   │   │       └── wallet/
│   │   │           ├── page.tsx            # Tổng quan ví
│   │   │           └── withdraw/page.tsx   # Rút tiền
│   │   │
│   │   ├── components/
│   │   │   ├── common/                    # Components dùng chung
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Select.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── Table.tsx
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   └── features/                  # Components theo tính năng
│   │   │       ├── booking/
│   │   │       │   ├── BookingForm.tsx
│   │   │       │   └── BookingCalendar.tsx
│   │   │       └── payment/
│   │   │           ├── PaymentForm.tsx
│   │   │           └── PaymentMethods.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useBooking.ts
│   │   │   ├── usePayment.ts
│   │   │   └── useWallet.ts
│   │   │
│   │   ├── services/                     # API Services
│   │   │   ├── api.ts                   # Axios instance
│   │   │   ├── auth.service.ts
│   │   │   ├── booking.service.ts
│   │   │   ├── payment.service.ts
│   │   │   └── wallet.service.ts
│   │   │
│   │   └── types/                       # TypeScript types
│   │       ├── auth.types.ts
│   │       ├── booking.types.ts
│   │       └── payment.types.ts
│   │
├── backend/
│   └── src/main/java/com/bookingweb/
│       ├── config/
│       │   ├── SecurityConfig.java      # Cấu hình bảo mật
│       │   ├── WebConfig.java          # Cấu hình web
│       │   └── PaymentConfig.java      # Cấu hình thanh toán
│       │
│       ├── module/
│       │   ├── auth/                   # Module xác thực
│       │   │   ├── controller/
│       │   │   │   └── AuthController.java
│       │   │   ├── dto/
│       │   │   │   ├── LoginRequest.java
│       │   │   │   └── RegisterRequest.java
│       │   │   └── service/
│       │   │       └── AuthService.java
│       │   │
│       │   ├── booking/               # Module đặt lịch
│       │   │   ├── controller/
│       │   │   │   ├── BookingController.java
│       │   │   │   └── AdminBookingController.java
│       │   │   ├── entity/
│       │   │   │   └── Booking.java
│       │   │   ├── repository/
│       │   │   │   └── BookingRepository.java
│       │   │   └── service/
│       │   │       └── BookingService.java
│       │   │
│       │   ├── payment/              # Module thanh toán
│       │   │   ├── controller/
│       │   │   │   └── PaymentController.java
│       │   │   ├── entity/
│       │   │   │   └── Payment.java
│       │   │   └── service/
│       │   │       └── PaymentService.java
│       │   │
│       │   └── wallet/              # Module ví điện tử
│       │       ├── controller/
│       │       │   ├── WalletController.java
│       │       │   └── AdminWalletController.java
│       │       ├── entity/
│       │       │   ├── Wallet.java
│       │       │   ├── Transaction.java
│       │       │   └── Withdrawal.java
│       │       ├── repository/
│       │       │   ├── WalletRepository.java
│       │       │   └── TransactionRepository.java
│       │       └── service/
│       │           ├── WalletService.java
│       │           └── CommissionService.java
│       │
│       └── common/                  # Shared code
│           ├── entity/
│           │   ├── BaseEntity.java
│           │   └── User.java
│           ├── exception/
│           │   ├── GlobalExceptionHandler.java
│           │   └── BusinessException.java
│           └── util/
│               ├── DateUtils.java
│               └── MoneyUtils.java