import { Layout, Row, Col, Typography, Space } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Title, Text } = Typography;

export default function ClientFooter() {
  return (
    <Footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} lg={8}>
            <div className="mb-8">
              <Image src="/next.svg" alt="Logo" width={120} height={30} className="invert mb-4" />
              <Text className="text-gray-400 block">
                Nền tảng đặt lịch dịch vụ làm đẹp hàng đầu
              </Text>
            </div>
            <Space size="large">
              <Link href="#" className="text-white hover:text-primary">
                <FacebookOutlined style={{ fontSize: '24px' }} />
              </Link>
              <Link href="#" className="text-white hover:text-primary">
                <InstagramOutlined style={{ fontSize: '24px' }} />
              </Link>
              <Link href="#" className="text-white hover:text-primary">
                <TwitterOutlined style={{ fontSize: '24px' }} />
              </Link>
            </Space>
          </Col>
          
          <Col xs={24} sm={12} lg={8}>
            <Title level={4} className="text-white mb-4">Liên kết nhanh</Title>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-primary">
                  Dịch vụ
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-primary">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </Col>
          
          <Col xs={24} sm={12} lg={8}>
            <Title level={4} className="text-white mb-4">Liên hệ</Title>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contact@example.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Street Name, City, Country</li>
            </ul>
          </Col>
        </Row>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <Text className="text-gray-400">
            © {new Date().getFullYear()} Beauty Booking. All rights reserved.
          </Text>
        </div>
      </div>
    </Footer>
  );
}