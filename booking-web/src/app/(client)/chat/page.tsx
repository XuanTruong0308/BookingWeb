import { Layout, Tabs } from 'antd';
import ChatHistory from '@/components/features/chat/ChatHistory';
import ConversationList from '@/components/features/chat/ConversationList';
import OnlineUsers from '@/components/features/chat/OnlineUsers';

const { Sider, Content } = Layout;

export default function ChatPage() {
  return (
    <Layout className="h-screen">
      <Sider width={300} className="bg-white p-4 border-r">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: 'Tin nhắn',
              children: (
                <div className="h-[calc(100vh-120px)] overflow-y-auto">
                  <ConversationList />
                </div>
              ),
            },
            {
              key: '2',
              label: 'Đang hoạt động',
              children: (
                <div className="h-[calc(100vh-120px)] overflow-y-auto">
                  <OnlineUsers />
                </div>
              ),
            },
          ]}
        />
      </Sider>
      <Content className="bg-white p-4">
        <ChatHistory />
      </Content>
    </Layout>
  );
}