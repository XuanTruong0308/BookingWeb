import { useState } from 'react';
import { Layout, Tabs, Card, Badge, Select, Input, Button, Space, Tag } from 'antd';
import { SearchOutlined, FilterOutlined, StarOutlined } from '@ant-design/icons';
import ChatHistory from '@/components/features/chat/ChatHistory';
import ConversationList from '@/components/features/chat/ConversationList';
import OnlineUsers from '@/components/features/chat/OnlineUsers';
import QuickReplyManager from '@/components/features/chat/QuickReplyManager';

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

export default function PartnerChatPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isQuickReplyManagerOpen, setIsQuickReplyManagerOpen] = useState(false);

  // Quick reply templates
  const quickReplies = [
    {
      id: '1',
      content: 'Xin chào! Cảm ơn bạn đã quan tâm đến dịch vụ của chúng tôi.',
      category: 'greeting'
    },
    {
      id: '2',
      content: 'Dạ vâng, bạn có thể cho mình biết thêm về nhu cầu của bạn được không ạ?',
      category: 'inquiry'
    },
    {
      id: '3',
      content: 'Bạn có thể đặt lịch trực tiếp trên website hoặc để lại số điện thoại để mình tư vấn thêm ạ.',
      category: 'booking'
    },
    // More templates...
  ];

  return (
    <Layout className="h-[calc(100vh-64px)]">
      <Sider width={320} theme="light" className="border-r">
        <div className="p-4">
          {/* Search and Filter */}
          <Space.Compact className="w-full mb-4">
            <Input
              placeholder="Tìm kiếm..."
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select
              defaultValue="all"
              value={filter}
              onChange={setFilter}
              options={[
                { value: 'all', label: 'Tất cả' },
                { value: 'unread', label: 'Chưa đọc' },
                { value: 'starred', label: 'Đánh dấu sao' },
                { value: 'bookings', label: 'Đặt lịch' },
              ]}
            />
          </Space.Compact>
        </div>

        {/* Conversation Tabs */}
        <Tabs defaultActiveKey="conversations">
          <TabPane 
            tab={
              <Badge count={5}>
                Tin nhắn
              </Badge>
            } 
            key="conversations"
          >
            <div className="h-[calc(100vh-200px)] overflow-y-auto">
              <ConversationList />
            </div>
          </TabPane>
          <TabPane tab="Đang hoạt động" key="online">
            <div className="h-[calc(100vh-200px)] overflow-y-auto">
              <OnlineUsers />
            </div>
          </TabPane>
        </Tabs>
      </Sider>

      <Layout>
        <Content className="bg-white">
          <div className="h-full flex flex-col">
            <ChatHistory />
            
            {/* Quick Replies */}
            <Card className="border-t" size="small">
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Trả lời nhanh</span>
                  <Button 
                    type="link" 
                    size="small"
                    onClick={() => setIsQuickReplyManagerOpen(true)}
                  >
                    Quản lý mẫu câu
                  </Button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {quickReplies.map(reply => (
                    <Tag
                      key={reply.id}
                      className="cursor-pointer hover:bg-blue-50"
                      onClick={() => {
                        // Insert quick reply to chat input
                        const input = document.querySelector('textarea');
                        if (input) {
                          input.value = reply.content;
                          input.focus();
                        }
                      }}
                    >
                      {reply.content.slice(0, 30)}...
                    </Tag>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </Content>
      </Layout>

      {/* Quick Reply Manager Modal */}
      <QuickReplyManager
        open={isQuickReplyManagerOpen}
        onClose={() => setIsQuickReplyManagerOpen(false)}
      />
    </Layout>
  );
}