import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  CalendarOutlined,
  ShopOutlined,
  MessageOutlined,
  StarOutlined,
  WalletOutlined,
  SettingOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Sider } = Layout;

export default function PartnerSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/partner">Tổng quan</Link>,
    },
    {
      key: 'schedule',
      icon: <CalendarOutlined />,
      label: <Link href="/partner/schedule">Lịch làm việc</Link>,
    },
    {
      key: 'services',
      icon: <ShopOutlined />,
      label: 'Dịch vụ',
      children: [
        {
          key: 'service-list',
          label: <Link href="/partner/services">Danh sách dịch vụ</Link>,
        },
        {
          key: 'service-analytics',
          label: <Link href="/partner/services/analytics">Phân tích dịch vụ</Link>,
        }
      ],
    },
    {
      key: 'chat',
      icon: <MessageOutlined />,
      label: <Link href="/partner/chat">Tin nhắn</Link>,
    },
    {
      key: 'reviews',
      icon: <StarOutlined />,
      label: <Link href="/partner/reviews">Đánh giá</Link>,
    },
    {
      key: 'wallet',
      icon: <WalletOutlined />,
      label: <Link href="/partner/wallet">Ví của tôi</Link>,
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: <Link href="/partner/settings">Cài đặt</Link>,
    }
  ];

  return (
    <Sider width={260} className="bg-white" collapsible>
      <Menu
        mode="inline"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={['services']}
        items={menuItems}
        className="h-full border-r-0"
      />
    </Sider>
  );
}