import { Button, Card, Carousel, Col, Rate, Row, Space, Typography } from 'antd';
import {
  UserOutlined,
  StarOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';

const { Title, Text, Paragraph } = Typography;

// Mock data
const featuredServices = [
  {
    id: '1',
    title: 'Trang điểm cô dâu',
    description: 'Dịch vụ trang điểm chuyên nghiệp cho ngày trọng đại',
    image: '/next.svg', // Tạm thời sử dụng hình có sẵn
  },
  {
    id: '2',
    title: 'Làm tóc',
    description: 'Tạo kiểu tóc theo xu hướng mới nhất',
    image: '/vercel.svg', // Tạm thời sử dụng hình có sẵn
  },
  {
    id: '3',
    title: 'Combo cô dâu',
    description: 'Trọn gói make-up, làm tóc cho cô dâu',
    image: '/next.svg', // Tạm thời sử dụng hình có sẵn
  },
];

const testimonials = [
  {
    id: '1',
    name: 'Nguyễn Thị A',
    avatar: '/vercel.svg', // Tạm thời sử dụng hình có sẵn
    rating: 5,
    comment: 'Dịch vụ trang điểm cô dâu tuyệt vời, makeup artist rất tận tâm và chuyên nghiệp.',
    service: 'Trang điểm cô dâu',
  },
];

const statistics = [
  { number: '5,000+', label: 'Khách hàng hài lòng' },
  { number: '100+', label: 'Nghệ sĩ trang điểm' },
  { number: '4.9/5', label: 'Đánh giá trung bình' },
  { number: '20+', label: 'Giải thưởng' },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0">
          <div className="relative w-full h-full bg-gradient-to-r from-primary to-secondary">
            <Image
              src="/next.svg"
              alt="Hero background"
              fill
              className="object-contain opacity-10"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-4 relative text-white text-center">
          <Title className="text-white mb-6">
            Tỏa sáng trong khoảnh khắc đặc biệt của bạn
          </Title>
          <Paragraph className="text-lg text-gray-200 mb-8">
            Đội ngũ chuyên gia trang điểm hàng đầu, sẵn sàng mang đến cho bạn vẻ đẹp hoàn hảo nhất
          </Paragraph>
          <Space>
            <Link href="/services">
              <Button type="primary" size="large">
                Đặt lịch ngay
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="large" ghost>
                Xem portfolio
              </Button>
            </Link>
          </Space>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Title level={2}>Dịch vụ nổi bật</Title>
            <Paragraph className="text-gray-500">
              Khám phá các dịch vụ chất lượng cao của chúng tôi
            </Paragraph>
          </div>
          <Row gutter={[24, 24]}>
            {featuredServices.map(service => (
              <Col key={service.id} xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  cover={
                    <div className="h-64 relative">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  }
                >
                  <Card.Meta
                    title={service.title}
                    description={service.description}
                  />
                  <Link href={`/services/${service.id}`}>
                    <Button type="link" className="mt-4 p-0">
                      Xem chi tiết <ArrowRightOutlined />
                    </Button>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <Row gutter={[32, 32]} justify="center">
            {statistics.map((stat, index) => (
              <Col key={index} xs={12} md={6}>
                <div className="text-center">
                  <Title level={2} className="text-white mb-2">
                    {stat.number}
                  </Title>
                  <Text className="text-gray-200">{stat.label}</Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Title level={2}>Khách hàng nói gì về chúng tôi</Title>
            <Paragraph className="text-gray-500">
              Những đánh giá từ khách hàng đã sử dụng dịch vụ
            </Paragraph>
          </div>
          <Carousel autoplay>
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="px-4">
                <Card className="max-w-2xl mx-auto">
                  <Space direction="vertical" align="center" className="w-full">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <Rate disabled defaultValue={testimonial.rating} />
                    <Paragraph className="italic text-gray-600">
                      "{testimonial.comment}"
                    </Paragraph>
                    <div className="text-center">
                      <Text strong>{testimonial.name}</Text>
                      <br />
                      <Text type="secondary">{testimonial.service}</Text>
                    </div>
                  </Space>
                </Card>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Title level={2}>Sẵn sàng để tỏa sáng?</Title>
          <Paragraph className="text-gray-500 mb-8">
            Đặt lịch ngay hôm nay để trải nghiệm dịch vụ của chúng tôi
          </Paragraph>
          <Space size="large">
            <Link href="/services">
              <Button type="primary" size="large">
                Xem dịch vụ
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="large">
                Liên hệ tư vấn
              </Button>
            </Link>
          </Space>
        </div>
      </section>
    </div>
  );
}