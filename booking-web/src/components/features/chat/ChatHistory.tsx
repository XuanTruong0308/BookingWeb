import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/lib/hooks';
import { Card, List, Avatar, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { RootState } from '@/lib/store';
import { fetchMessages, sendMessage, setCurrentChat } from '@/features/chat/chatSlice';

const ChatHistory = () => {
  const dispatch = useAppDispatch();
  const { messages, currentChat, loading } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (currentChat) {
      dispatch(fetchMessages(currentChat));
    }
  }, [currentChat, dispatch]);

  const handleSend = (content: string) => {
    if (currentChat && content.trim()) {
      dispatch(sendMessage({ receiverId: currentChat, content }));
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        <List
          loading={loading}
          dataSource={messages}
          renderItem={(message) => (
            <List.Item className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start gap-2 max-w-[70%] ${message.senderId === user?.id ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar>{message.senderId === user?.id ? user?.name[0] : currentChat?.[0] || ''}</Avatar>
                <div className={`p-3 rounded-lg ${
                  message.senderId === user?.id ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}>
                  {message.content}
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
      
      <div className="flex gap-2">
        <Input.TextArea
          autoSize={{ minRows: 1, maxRows: 4 }}
          placeholder="Nhập tin nhắn..."
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              handleSend((e.target as HTMLTextAreaElement).value);
              (e.target as HTMLTextAreaElement).value = '';
            }
          }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={(e) => {
            const input = (e.target as HTMLElement).closest('.flex')?.querySelector('textarea');
            if (input) {
              handleSend(input.value);
              input.value = '';
            }
          }}
        >
          Gửi
        </Button>
      </div>
    </Card>
  );
};

export default ChatHistory;