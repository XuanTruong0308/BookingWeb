import { useState } from 'react';
import { Card, Rate, Space, Tag, Button, Input, Tabs, Empty, Typography, List, Avatar } from 'antd';
import { StarOutlined, MessageOutlined } from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import type { Review } from '@/types';

const { TextArea } = Input;
const { Text } = Typography;

// Mock data
const mockReviews: Review[] = [
  {
    id: 'REV001',
    serviceId: 'SV001',
    customerId: 'USER001',
    customerName: 'Nguyễn Thị A',
    rating: 5,
    content: 'Dịch vụ rất tốt, chuyên viên trang điểm có tay nghề cao. Sẽ quay lại lần sau.',
    timestamp: '2024-03-20T09:00:00Z',
  },
  {
    id: 'REV002',
    serviceId: 'SV001',
    customerId: 'USER002',
    customerName: 'Trần Văn B',
    rating: 4,
    content: 'Nhân viên nhiệt tình, trang điểm đẹp. Tuy nhiên giá hơi cao.',
    timestamp: '2024-03-19T15:30:00Z',
    reply: 'Cảm ơn bạn đã sử dụng dịch vụ. Chúng tôi sẽ xem xét điều chỉnh giá phù hợp hơn.',
  },
];

export default function PartnerReviewsPage() {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const handleReply = (review: Review) => {
    console.log('Reply to review:', { reviewId: review.id, reply: replyText });
    setReplyText('');
    setSelectedReview(null);
  };

  const renderReview = (review: Review) => (
    <List.Item
      key={review.id}
      className="bg-white rounded-lg p-6"
    >
      <List.Item.Meta
        avatar={
          <Avatar>{review.customerName[0]}</Avatar>
        }
        title={
          <Space align="center">
            <span className="font-medium">{review.customerName}</span>
            <Rate disabled defaultValue={review.rating} />
            <Text type="secondary" className="text-sm">
              {formatDistanceToNow(new Date(review.timestamp), {
                addSuffix: true,
                locale: vi,
              })}
            </Text>
          </Space>
        }
        description={
          <div className="space-y-4">
            <Text>{review.content}</Text>

            {/* Reply section */}
            {review.reply ? (
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <Text type="secondary" className="block mb-2">Phản hồi của bạn:</Text>
                <Text>{review.reply}</Text>
              </div>
            ) : selectedReview?.id === review.id ? (
              <div className="space-y-2">
                <TextArea
                  rows={3}
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Nhập phản hồi của bạn..."
                />
                <Space>
                  <Button type="primary" onClick={() => handleReply(review)}>
                    Gửi phản hồi
                  </Button>
                  <Button onClick={() => {
                    setSelectedReview(null);
                    setReplyText('');
                  }}>
                    Hủy
                  </Button>
                </Space>
              </div>
            ) : (
              <Button 
                type="link" 
                className="p-0"
                icon={<MessageOutlined />}
                onClick={() => setSelectedReview(review)}
              >
                Phản hồi
              </Button>
            )}
          </div>
        }
      />
    </List.Item>
  );

  // Calculate stats
  const totalReviews = mockReviews.length;
  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;
  const unrepliedCount = mockReviews.filter(review => !review.reply).length;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <Space direction="vertical">
            <Text type="secondary">Đánh giá trung bình</Text>
            <Space>
              <Text className="text-2xl font-bold">{averageRating.toFixed(1)}</Text>
              <Rate disabled defaultValue={averageRating} />
            </Space>
          </Space>
        </Card>

        <Card>
          <Space direction="vertical">
            <Text type="secondary">Tổng số đánh giá</Text>
            <Text className="text-2xl font-bold">{totalReviews}</Text>
          </Space>
        </Card>

        <Card>
          <Space direction="vertical">
            <Text type="secondary">Chưa phản hồi</Text>
            <Text className="text-2xl font-bold">{unrepliedCount}</Text>
          </Space>
        </Card>
      </div>

      {/* Reviews List */}
      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'all',
              label: 'Tất cả',
              children: (
                <List
                  itemLayout="vertical"
                  dataSource={mockReviews}
                  renderItem={renderReview}
                  pagination={{
                    pageSize: 5,
                  }}
                  locale={{
                    emptyText: <Empty description="Chưa có đánh giá nào" />
                  }}
                />
              ),
            },
            {
              key: 'unreplied',
              label: `Chưa phản hồi (${unrepliedCount})`,
              children: (
                <List
                  itemLayout="vertical"
                  dataSource={mockReviews.filter(review => !review.reply)}
                  renderItem={renderReview}
                  pagination={{
                    pageSize: 5,
                  }}
                  locale={{
                    emptyText: <Empty description="Không có đánh giá nào chưa phản hồi" />
                  }}
                />
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}