import { Layout, Menu } from 'antd';
import {
  CalendarOutlined,
  ShoppingOutlined,
  UserOutlined,
  MessageOutlined,
  HeartOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Sider } = Layout;

export default function ClientSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      key: 'account',
      icon: <UserOutlined />,
      label: 'Tài khoản',
      children: [
        { key: 'profile', label: <Link href="/account/profile">Thông tin cá nhân</Link> },
        { key: 'settings', label: <Link href="/account/settings">Cài đặt</Link> },
      ],
    },
    {
      key: 'bookings',
      icon: <CalendarOutlined />,
      label: 'Đặt lịch',
      children: [
        { key: 'new-booking', label: <Link href="/bookings/new">Đặt lịch mới</Link> },
        { key: 'my-bookings', label: <Link href="/account/bookings">Lịch hẹn của tôi</Link> },
      ],
    },
    {
      key: 'services',
      icon: <ShoppingOutlined />,
      label: 'Dịch vụ',
      children: [
        { key: 'makeup', label: <Link href="/services/makeup">Trang điểm</Link> },
        { key: 'dress', label: <Link href="/services/dress">Cho thuê váy</Link> },
        { key: 'photo', label: <Link href="/services/photo">Chụp ảnh</Link> },
        { key: 'combo', label: <Link href="/services/combo">Combo</Link> },
      ],
    },
    {
      key: 'communication',
      icon: <MessageOutlined />,
      label: 'Liên lạc',
      children: [
        { key: 'chat', label: <Link href="/chat">Tin nhắn</Link> },
        { key: 'support', label: <Link href="/support">Hỗ trợ</Link> },
      ],
    },
    {
      key: 'favorites',
      icon: <HeartOutlined />,
      label: <Link href="/favorites">Yêu thích</Link>,
    },
    {
      key: 'history',
      icon: <HistoryOutlined />,
      label: <Link href="/history">Lịch sử</Link>,
    },
  ];

  return (
    <Sider width={250} className="bg-white" collapsible>
      <Menu
        mode="inline"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={['account', 'bookings', 'services', 'communication']}
        items={menuItems}
        className="h-full border-r-0"
      />
    </Sider>
  );
}