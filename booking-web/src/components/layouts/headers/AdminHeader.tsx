import { Layout, Menu, Button, Avatar, Badge, Dropdown } from 'antd';
import { BellOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';

const { Header } = Layout;

export default function AdminHeader() {
  const { user } = useSelector((state: RootState) => state.auth);

  const userMenu = [
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
        <span className="text-lg font-semibold">Admin Dashboard</span>
      </div>

      <div className="flex items-center gap-4">
        <Badge count={5}>
          <Button icon={<BellOutlined />} shape="circle" />
        </Badge>

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