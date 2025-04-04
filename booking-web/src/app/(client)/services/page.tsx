import { useState } from 'react';
import { Card, Row, Col, Select, Input, Button, Space, Tag, Empty, Rate, Typography, Tabs } from 'antd';
import { SearchOutlined, FilterOutlined, ClockCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import type { Service } from '@/types';

const { Title, Text, Paragraph } = Typography;

// Mock data
const categories = [
  { value: 'all', label: 'Tất cả dịch vụ' },
  { value: 'makeup', label: 'Trang điểm' },
  { value: 'hair', label: 'Làm tóc' },
  { value: 'spa', label: 'Spa' },
  { value: 'combo', label: 'Combo' },
];

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Trang điểm cô dâu',
    description: 'Dịch vụ trang điểm chuyên nghiệp cho cô dâu với các sản phẩm high-end',
    price: 2500000,
    duration: 120,
    category: 'makeup',
    status: 'active',
    image: '/images/services/bridal-makeup.jpg',
  },
  // More services...
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState('all');

  const filterServices = () => {
    let filtered = [...mockServices];

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(service => service.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(service =>
        service.price >= min && (max ? service.price <= max : true)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'duration':
        filtered.sort((a, b) => a.duration - b.duration);
        break;
      // 'popular' is default, no sorting needed
    }

    return filtered;
  };

  const filteredServices = filterServices();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <Title>Dịch vụ của chúng tôi</Title>
        <Paragraph className="text-gray-500">
          Khám phá các dịch vụ chất lượng cao, được thực hiện bởi đội ngũ chuyên viên hàng đầu
        </Paragraph>
      </div>

      {/* Category Navigation */}
      <div className="mb-8">
        <Tabs
          activeKey={activeCategory}
          onChange={setActiveCategory}
          items={categories.map(cat => ({
            key: cat.value,
            label: cat.label,
          }))}
        />
      </div>

      {/* Search and Filters */}
      <Row gutter={16} className="mb-8">
        <Col flex="auto">
          <Input
            placeholder="Tìm kiếm dịch vụ..."
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col>
          <Space>
            <Select
              value={sortBy}
              onChange={setSortBy}
              style={{ width: 200 }}
              options={[
                { value: 'popular', label: 'Phổ biến nhất' },
                { value: 'price-asc', label: 'Giá: Thấp đến cao' },
                { value: 'price-desc', label: 'Giá: Cao đến thấp' },
                { value: 'duration', label: 'Thời gian thực hiện' },
              ]}
            />
            <Select
              value={priceRange}
              onChange={setPriceRange}
              style={{ width: 200 }}
              placeholder="Khoảng giá"
              options={[
                { value: 'all', label: 'Tất cả mức giá' },
                { value: '0-500000', label: 'Dưới 500,000đ' },
                { value: '500000-1000000', label: '500,000đ - 1,000,000đ' },
                { value: '1000000-2000000', label: '1,000,000đ - 2,000,000đ' },
                { value: '2000000', label: 'Trên 2,000,000đ' },
              ]}
            />
          </Space>
        </Col>
      </Row>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <Row gutter={[24, 24]}>
          {filteredServices.map(service => (
            <Col key={service.id} xs={24} sm={12} lg={8}>
              <Link href={`/services/${service.id}`}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={service.name}
                      src={service.image}
                      className="h-64 w-full object-cover"
                    />
                  }
                >
                  <Card.Meta
                    title={
                      <Space className="w-full justify-between">
                        <Text strong>{service.name}</Text>
                        <Tag color="blue">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          }).format(service.price)}
                        </Tag>
                      </Space>
                    }
                    description={
                      <Space direction="vertical" className="w-full">
                        <Text className="text-gray-500">{service.description}</Text>
                        <Space split={<Text type="secondary">•</Text>}>
                          <Space>
                            <ClockCircleOutlined />
                            <Text>{service.duration} phút</Text>
                          </Space>
                          <Rate disabled defaultValue={4.5} />
                        </Space>
                        <Button type="primary" block>
                          Đặt lịch ngay
                        </Button>
                      </Space>
                    }
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          description="Không tìm thấy dịch vụ nào phù hợp"
          className="py-16"
        />
      )}
    </div>
  );
}