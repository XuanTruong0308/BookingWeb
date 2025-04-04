import type { Metadata } from "next";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import StoreProvider from '@/lib/store/StoreProvider';
import "./globals.css";

export const metadata: Metadata = {
  title: "Beauty Booking",
  description: "Nền tảng đặt lịch dịch vụ làm đẹp",
};

const theme = {
  token: {
    colorPrimary: '#FF4D4F',
    colorSecondary: '#722ED1',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <StoreProvider>
          <AntdRegistry>
            <ConfigProvider theme={theme}>
              <div className="layout-container">
                <header className="layout-header">Beauty Booking Header</header>
                <main className="layout-main">{children}</main>
                <footer className="layout-footer">Beauty Booking Footer</footer>
              </div>
            </ConfigProvider>
          </AntdRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
