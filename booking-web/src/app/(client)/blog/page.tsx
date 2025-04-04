import { useState } from 'react';
import { Typography, Card, Row, Col, Input, Select, Pagination, Tag, Space } from 'antd';
import { SearchOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}

// Mock data - will be replaced with API call
const posts: BlogPost[] = [
  {
    id: '1',
    title: 'Xu hướng trang điểm cô dâu 2024',
    excerpt: 'Khám phá những xu hướng trang điểm cô dâu mới nhất trong năm 2024...',
    category: 'Makeup',
    author: 'Anna Nguyễn',
    date: '2024-03-15',
    image: '/images/blog/bridal-makeup-2024.jpg',
    tags: ['makeup', 'wedding', 'trends']
  },
  // More posts...
];

const categories = [
  { value: 'all', label: 'Tất cả' },
  { value: 'makeup', label: 'Trang điểm' },
  { value: 'wedding', label: 'Cưới hỏi' },
  { value: 'fashion', label: 'Thời trang' },
  { value: 'beauty', label: 'Làm đẹp' },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Title>Blog & Tin Tức</Title>
        <Paragraph className="text-gray-500">
          Cập nhật những xu hướng làm đẹp mới nhất và các mẹo hữu ích
        </Paragraph>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <Row gutter={16} justify="center">
          <Col xs={24} sm={12} md={6}>
            <Input 
              placeholder="Tìm kiếm bài viết..."
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Chọn danh mục"
              style={{ width: '100%' }}
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categories}
            />
          </Col>
        </Row>
      </div>

      {/* Blog Posts Grid */}
      <Row gutter={[24, 24]} className="mb-8">
        {posts.map(post => (
          <Col xs={24} sm={12} lg={8} key={post.id}>
            <Link href={`/blog/${post.id}`}>
              <Card
                hoverable
                cover={
                  <img
                    alt={post.title}
                    src={post.image}
                    className="h-48 object-cover"
                  />
                }
              >
                <Space direction="vertical" size="small" className="w-full">
                  <Tag color="blue">{post.category}</Tag>
                  <Meta
                    title={post.title}
                    description={post.excerpt}
                  />
                  <Space split="|" className="text-gray-500 text-sm">
                    <span>
                      <CalendarOutlined className="mr-1" />
                      {new Date(post.date).toLocaleDateString('vi-VN')}
                    </span>
                    <span>
                      <UserOutlined className="mr-1" />
                      {post.author}
                    </span>
                  </Space>
                  <div className="mt-2">
                    {post.tags.map(tag => (
                      <Tag key={tag} className="mr-1">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </Space>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div className="text-center">
        <Pagination 
          total={50}
          pageSize={9}
          current={1}
          onChange={(page) => console.log(page)}
        />
      </div>
    </div>
  );
}