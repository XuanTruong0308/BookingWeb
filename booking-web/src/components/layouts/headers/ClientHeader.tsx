import { Layout, Menu, Button, Space } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

const { Header } = Layout;

export default function ClientHeader() {
  const menuItems = [
    { key: 'services', label: <Link href="/services">Dịch vụ</Link> },
    { key: 'portfolio', label: <Link href="/portfolio">Portfolio</Link> },
    { key: 'blog', label: <Link href="/blog">Blog</Link> },
    { key: 'contact', label: <Link href="/contact">Liên hệ</Link> },
  ];

  return (
    <Header className="bg-white/80 backdrop-blur-md fixed w-full z-50 flex items-center justify-between px-4 h-16">
      <Link href="/" className="flex items-center">
        <Image src="/next.svg" alt="Logo" width={120} height={30} priority className="dark:invert" />
      </Link>

      <div className="flex items-center gap-4">
        <Menu mode="horizontal" items={menuItems} className="border-none" />
        <Space>
          <Link href="/account/profile">
            <Button>Đăng nhập</Button>
          </Link>
          <Link href="/bookings/new">
            <Button type="primary">Đặt lịch</Button>
          </Link>
        </Space>
      </div>
    </Header>
  );
}