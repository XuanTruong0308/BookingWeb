import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  CalendarOutlined,
  ShopOutlined,
  UserOutlined,
  TeamOutlined,
  WalletOutlined,
  MessageOutlined,
  FileTextOutlined,
  SettingOutlined,
  PictureOutlined,
  BankOutlined,
  GiftOutlined,
  BarsOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Sider } = Layout;

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/admin">Tổng quan</Link>,
    },
    {
      key: 'bookings',
      icon: <CalendarOutlined />,
      label: 'Quản lý đặt lịch',
      children: [
        {
          key: 'booking-list',
          label: <Link href="/admin/bookings">Danh sách đặt lịch</Link>,
        },
        {
          key: 'booking-calendar',
          label: <Link href="/admin/bookings/calendar">Lịch làm việc</Link>,
        },
      ],
    },
    {
      key: 'services',
      icon: <ShopOutlined />,
      label: 'Quản lý dịch vụ',
      children: [
        {
          key: 'service-list',
          label: <Link href="/admin/services">Danh sách dịch vụ</Link>,
        },
        {
          key: 'service-categories',
          label: <Link href="/admin/services/categories">Danh mục dịch vụ</Link>,
        },
        {
          key: 'service-combos',
          label: <Link href="/admin/services/combos">Combo dịch vụ</Link>,
        },
      ],
    },
    {
      key: 'customers',
      icon: <UserOutlined />,
      label: <Link href="/admin/customers">Khách hàng</Link>,
    },
    {
      key: 'staff',
      icon: <TeamOutlined />,
      label: 'Quản lý nhân viên',
      children: [
        {
          key: 'staff-list',
          label: <Link href="/admin/staff">Danh sách nhân viên</Link>,
        },
        {
          key: 'staff-schedule',
          label: <Link href="/admin/staff/schedule">Lịch làm việc</Link>,
        },
        {
          key: 'staff-performance',
          label: <Link href="/admin/staff/performance">Hiệu suất</Link>,
        },
      ],
    },
    {
      key: 'partners',
      icon: <TeamOutlined />,
      label: 'Quản lý đối tác',
      children: [
        {
          key: 'partner-list',
          label: <Link href="/admin/partners">Danh sách đối tác</Link>,
        },
        {
          key: 'partner-services',
          label: <Link href="/admin/partners/services">Dịch vụ đối tác</Link>,
        },
        {
          key: 'partner-commission',
          label: <Link href="/admin/partners/commission">Hoa hồng</Link>,
        },
      ],
    },
    {
      key: 'finance',
      icon: <WalletOutlined />,
      label: 'Tài chính',
      children: [
        {
          key: 'finance-overview',
          label: <Link href="/admin/finance">Tổng quan</Link>,
        },
        {
          key: 'transactions',
          label: <Link href="/admin/finance/transactions">Giao dịch</Link>,
        },
        {
          key: 'withdrawals',
          label: <Link href="/admin/finance/withdrawals">Yêu cầu rút tiền</Link>,
        },
      ],
    },
    {
      key: 'marketing',
      icon: <GiftOutlined />,
      label: 'Marketing',
      children: [
        {
          key: 'promotions',
          label: <Link href="/admin/marketing/promotions">Khuyến mãi</Link>,
        },
        {
          key: 'vouchers',
          label: <Link href="/admin/marketing/vouchers">Mã giảm giá</Link>,
        },
      ],
    },
    {
      key: 'content',
      icon: <FileTextOutlined />,
      label: 'Quản lý nội dung',
      children: [
        {
          key: 'blog',
          label: <Link href="/admin/content/blog">Bài viết</Link>,
        },
        {
          key: 'portfolio',
          label: <Link href="/admin/content/portfolio">Hình ảnh</Link>,
        },
        {
          key: 'banners',
          label: <Link href="/admin/content/banners">Banners</Link>,
        },
      ],
    },
    {
      key: 'chat',
      icon: <MessageOutlined />,
      label: <Link href="/admin/chat">Tin nhắn</Link>,
    },
    {
      key: 'gallery',
      icon: <PictureOutlined />,
      label: <Link href="/admin/gallery">Thư viện ảnh</Link>,
    },
    {
      key: 'reports',
      icon: <BarsOutlined />,
      label: 'Báo cáo',
      children: [
        {
          key: 'booking-reports',
          label: <Link href="/admin/reports/bookings">Báo cáo đặt lịch</Link>,
        },
        {
          key: 'revenue-reports',
          label: <Link href="/admin/reports/revenue">Báo cáo doanh thu</Link>,
        },
        {
          key: 'customer-reports',
          label: <Link href="/admin/reports/customers">Báo cáo khách hàng</Link>,
        },
      ],
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
      children: [
        {
          key: 'general-settings',
          label: <Link href="/admin/settings">Cài đặt chung</Link>,
        },
        {
          key: 'user-roles',
          label: <Link href="/admin/settings/roles">Phân quyền</Link>,
        },
        {
          key: 'notifications',
          label: <Link href="/admin/settings/notifications">Thông báo</Link>,
        },
      ],
    },
  ];

  return (
    <Sider width={260} className="bg-white" collapsible>
      <Menu
        mode="inline"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={['bookings', 'services', 'staff', 'finance']}
        items={menuItems}
        className="h-full border-r-0"
      />
    </Sider>
  );
}