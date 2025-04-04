import { Layout } from 'antd';
import AdminHeader from './headers/AdminHeader';
import AdminSidebar from './sidebars/AdminSidebar';

const { Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <Layout className="min-h-screen">
      <AdminHeader />
      <Layout>
        <AdminSidebar />
        <Layout className="p-6 bg-gray-50">
          <Content className="bg-white rounded-lg p-6 min-h-[280px]">
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}