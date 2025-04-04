import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Avatar, Badge } from 'antd';
import { RootState } from '@/lib/store';
import { fetchConversations, setCurrentChat } from '@/features/chat/chatSlice';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function ConversationList() {
  type AppDispatch = typeof import('@/lib/store').store.dispatch;
  const dispatch = useDispatch<AppDispatch>();
  const { conversations, currentChat, onlineUsers } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  return (
    <List
      dataSource={conversations}
      renderItem={(conversation) => {
        const isOnline = onlineUsers.some(user => user.id === conversation.user.id);
        return (
          <List.Item 
            className={`cursor-pointer hover:bg-gray-50 ${
              currentChat === conversation.id ? 'bg-gray-100' : ''
            }`}
            onClick={() => dispatch(setCurrentChat(conversation.id))}
          >
            <List.Item.Meta
              avatar={
                <Badge dot={isOnline} color="green" offset={[-5, 5]}>
                  <Avatar src={conversation.user.avatar}>
                    {conversation.user.name[0]}
                  </Avatar>
                </Badge>
              }
              title={
                <div className="flex justify-between">
                  <span>{conversation.user.name}</span>
                  {conversation.lastMessage && (
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(conversation.lastMessage.timestamp), {
                        addSuffix: true,
                        locale: vi
                      })}
                    </span>
                  )}
                </div>
              }
              description={
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 truncate max-w-[180px]">
                    {conversation.lastMessage?.content || 'Bắt đầu cuộc trò chuyện'}
                  </span>
                  {conversation.unreadCount > 0 && (
                    <Badge count={conversation.unreadCount} />
                  )}
                </div>
              }
            />
          </List.Item>
        );
      }}
    />
  );
}