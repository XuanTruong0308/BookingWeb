import { Layout } from 'antd';
import NotificationCenter from '../features/partner/NotificationCenter';
import PartnerHeader from './headers/PartnerHeader';
import PartnerSidebar from './sidebars/PartnerSidebar';

const { Content } = Layout;

interface PartnerLayoutProps {
  children: React.ReactNode;
}

export default function PartnerLayout({ children }: PartnerLayoutProps) {
  return (
    <Layout className="min-h-screen">
      <PartnerHeader />
      <Layout>
        <PartnerSidebar />
        <Layout className="p-6 bg-gray-50">
          <Content className="bg-white rounded-lg p-6 min-h-[280px]">
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}