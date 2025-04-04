import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';
import type { MenuProps } from 'antd';
import NotificationCenter from '@/components/features/partner/NotificationCenter';

const { Header } = Layout;

export default function PartnerHeader() {
  const { user } = useSelector((state: RootState) => state.auth);

  const userMenu: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Thông tin cá nhân',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true,
    },
  ];

  return (
    <Header className="bg-white px-6 flex items-center justify-between">
      <div className="flex items-center">
        <img src="/logo.svg" alt="Logo" className="h-8 mr-8" />
        <span className="text-lg font-semibold">Partner Dashboard</span>
      </div>

      <div className="flex items-center gap-4">
        <NotificationCenter />
        
        <Dropdown menu={{ items: userMenu }} trigger={['click']}>
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar icon={<UserOutlined />}>
              {user?.name?.[0]}
            </Avatar>
            <span className="font-medium">{user?.name}</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
}