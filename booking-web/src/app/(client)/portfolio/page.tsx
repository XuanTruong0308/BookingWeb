import { useState } from 'react';
import { Typography, Row, Col, Card, Select, Image, Space, Tag } from 'antd';
import { HeartOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  tags: string[];
  likes: number;
  views: number;
  artist: string;
}

// Mock data - will be replaced with API call
const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Trang điểm cô dâu phong cách Hàn Quốc',
    category: 'bridal',
    image: '/images/portfolio/bridal-1.jpg',
    tags: ['wedding', 'korean-style', 'makeup'],
    likes: 245,
    views: 1200,
    artist: 'Anna Nguyễn'
  },
  // More items...
];

const categories = [
  { value: 'all', label: 'Tất cả' },
  { value: 'bridal', label: 'Trang điểm cô dâu' },
  { value: 'party', label: 'Trang điểm dự tiệc' },
  { value: 'wedding-photos', label: 'Ảnh cưới' },
  { value: 'dresses', label: 'Váy cưới' },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Title>Bộ sưu tập hình ảnh</Title>
        <Paragraph className="text-gray-500">
          Khám phá những tác phẩm đẹp nhất từ đội ngũ chuyên gia của chúng tôi
        </Paragraph>
      </div>

      {/* Filter */}
      <div className="mb-8 text-center">
        <Select
          size="large"
          style={{ width: 200 }}
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={categories}
        />
      </div>

      {/* Gallery Grid */}
      <Row gutter={[16, 16]}>
        {filteredItems.map(item => (
          <Col xs={24} sm={12} lg={8} xl={6} key={item.id}>
            <Card
              hoverable
              cover={
                <div className="relative group">
                  <Image
                    alt={item.title}
                    src={item.image}
                    className="h-64 object-cover"
                    preview={false}
                    onClick={() => {
                      setPreviewImage(item.image);
                      setPreviewVisible(true);
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <EyeOutlined className="text-white text-2xl" />
                  </div>
                </div>
              }
            >
              <Space direction="vertical" className="w-full">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-gray-500">by {item.artist}</p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map(tag => (
                    <Tag key={tag}>#{tag}</Tag>
                  ))}
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>
                    <EyeOutlined className="mr-1" />
                    {item.views}
                  </span>
                  <span>
                    <HeartOutlined className="mr-1" />
                    {item.likes}
                  </span>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Image Preview */}
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{
            visible: previewVisible,
            onVisibleChange: vis => setPreviewVisible(vis),
          }}
        >
          {galleryItems.map(item => (
            <Image key={item.id} src={item.image} />
          ))}
        </Image.PreviewGroup>
      </div>
    </div>
  );
}