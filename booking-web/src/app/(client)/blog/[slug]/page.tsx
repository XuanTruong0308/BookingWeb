import { Typography, Card, Row, Col, Avatar, Tag, Divider, Button, Space } from 'antd';
import { CalendarOutlined, UserOutlined, EyeOutlined, ShareAltOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  image: string;
  tags: string[];
  views: number;
}

// Mock data - will be replaced with API call
const post: BlogPost = {
  id: '1',
  title: 'Xu hướng trang điểm cô dâu 2024',
  content: `
    <h2>Xu hướng trang điểm cô dâu năm 2024</h2>
    <p>Trong năm 2024, xu hướng trang điểm cô dâu đang hướng đến vẻ đẹp tự nhiên...</p>
    <h3>1. Trang điểm trong suốt</h3>
    <p>Lớp nền mỏng nhẹ, trong suốt giúp làn da có độ căng bóng tự nhiên...</p>
    <h3>2. Son môi nude hồng</h3>
    <p>Màu son nude hồng giúp đôi môi trông căng mọng mà vẫn tự nhiên...</p>
  `,
  category: 'Makeup',
  author: {
    name: 'Anna Nguyễn',
    avatar: '/images/avatars/anna.jpg',
    role: 'Chuyên gia trang điểm'
  },
  date: '2024-03-15',
  image: '/images/blog/bridal-makeup-2024.jpg',
  tags: ['makeup', 'wedding', 'trends'],
  views: 1234
};

const relatedPosts: Array<Omit<BlogPost, 'content'>> = [
  // Related posts data
];

export default function BlogPostPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Row gutter={24}>
        <Col xs={24} lg={16}>
          {/* Main Content */}
          <Card className="mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg mb-6"
            />
            
            <div className="mb-6">
              <Tag color="blue">{post.category}</Tag>
              <Title level={1} className="mt-4 mb-6">{post.title}</Title>
              
              <Space split="|" className="text-gray-500">
                <span>
                  <CalendarOutlined className="mr-1" />
                  {new Date(post.date).toLocaleDateString('vi-VN')}
                </span>
                <span>
                  <EyeOutlined className="mr-1" />
                  {post.views} lượt xem
                </span>
              </Space>
            </div>

            {/* Author Info */}
            <div className="flex items-center mb-6">
              <Avatar 
                size={64} 
                src={post.author.avatar}
                icon={<UserOutlined />}
              />
              <div className="ml-4">
                <h3 className="font-semibold text-lg">{post.author.name}</h3>
                <p className="text-gray-500">{post.author.role}</p>
              </div>
            </div>

            {/* Article Content */}
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <Divider />
            <div className="flex justify-between items-center">
              <div>
                {post.tags.map(tag => (
                  <Tag key={tag} className="mr-2">
                    #{tag}
                  </Tag>
                ))}
              </div>
              <Button icon={<ShareAltOutlined />}>
                Chia sẻ
              </Button>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          {/* Sidebar */}
          <Card title="Bài viết liên quan" className="mb-8">
            <div className="space-y-4">
              {relatedPosts.map(post => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <div className="flex space-x-4 hover:bg-gray-50 p-2 rounded">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium mb-1">{post.title}</h4>
                      <p className="text-gray-500 text-sm">
                        <CalendarOutlined className="mr-1" />
                        {new Date(post.date).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Categories */}
          <Card title="Danh mục">
            <div className="space-y-2">
              <Link href="/blog?category=makeup" className="block hover:text-primary">
                Trang điểm (15)
              </Link>
              <Link href="/blog?category=wedding" className="block hover:text-primary">
                Cưới hỏi (12)
              </Link>
              <Link href="/blog?category=fashion" className="block hover:text-primary">
                Thời trang (8)
              </Link>
              <Link href="/blog?category=beauty" className="block hover:text-primary">
                Làm đẹp (20)
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}