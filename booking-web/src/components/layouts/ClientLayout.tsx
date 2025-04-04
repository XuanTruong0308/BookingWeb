import { Layout } from 'antd';
import ClientHeader from './headers/ClientHeader';
import ClientFooter from './footers/ClientFooter';

const { Content } = Layout;

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Layout className="min-h-screen bg-background">
      <ClientHeader />
      <Content>{children}</Content>
      <ClientFooter />
    </Layout>
  );
}