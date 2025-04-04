import { useState } from 'react';
import { Drawer, List, Badge, Tabs, Tag, Space, Button, Empty } from 'antd';
import { BellOutlined, CalendarOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import type { Notification } from '@/types';

interface NotificationCenterProps {
  notifications?: Notification[];
  onRead?: (id: string) => void;
  onReadAll?: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'booking',
    title: 'Lịch hẹn mới',
    description: 'Nguyễn Văn A đã đặt lịch dịch vụ Trang điểm cô dâu',
    timestamp: '2024-03-20T09:00:00Z',
    read: false,
    data: {
      bookingId: 'BK001',
      serviceName: 'Trang điểm cô dâu',
      customerName: 'Nguyễn Văn A',
      scheduledTime: '2024-03-25T14:00:00Z',
    },
  },
  {
    id: '2',
    type: 'message',
    title: 'Tin nhắn mới',
    description: 'Trần Thị B: Xin chào, tôi muốn hỏi thêm về dịch vụ...',
    timestamp: '2024-03-20T08:45:00Z',
    read: false,
    data: {
      conversationId: 'CONV001',
      senderId: 'USER002',
      senderName: 'Trần Thị B',
    },
  },
  {
    id: '3',
    type: 'review',
    title: 'Đánh giá mới',
    description: 'Dịch vụ Trang điểm cô dâu nhận được đánh giá 5 sao',
    timestamp: '2024-03-20T08:30:00Z',
    read: true,
    data: {
      serviceId: 'SV001',
      serviceName: 'Trang điểm cô dâu',
      rating: 5,
      comment: 'Dịch vụ rất tốt, chuyên viên trang điểm có tay nghề cao.',
    },
  },
];

export default function NotificationCenter({ 
  notifications: propNotifications,
  onRead,
  onReadAll
}: NotificationCenterProps = {}) {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(propNotifications || mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleRead = (id: string) => {
    onRead?.(id);
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleReadAll = () => {
    onReadAll?.();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const renderIcon = (type: string) => {
    const icons = {
      booking: <CalendarOutlined style={{ color: '#1890ff' }} />,
      message: <MessageOutlined style={{ color: '#52c41a' }} />,
      review: <StarOutlined style={{ color: '#faad14' }} />,
    };
    return icons[type as keyof typeof icons];
  };

  const renderNotification = (notification: Notification) => (
    <List.Item
      className={`cursor-pointer transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
      onClick={() => handleRead(notification.id)}
    >
      <List.Item.Meta
        avatar={renderIcon(notification.type)}
        title={
          <div className="flex items-center gap-2">
            <span>{notification.title}</span>
            {!notification.read && <Badge status="processing" />}
          </div>
        }
        description={
          <Space direction="vertical" size={1}>
            <div>{notification.description}</div>
            <div className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(notification.timestamp), {
                addSuffix: true,
                locale: vi,
              })}
            </div>
          </Space>
        }
      />
    </List.Item>
  );

  return (
    <>
      <Badge count={unreadCount} offset={[-5, 5]}>
        <Button
          icon={<BellOutlined />}
          shape="circle"
          onClick={() => setVisible(true)}
        />
      </Badge>

      <Drawer
        title="Thông báo"
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
        width={400}
        extra={
          unreadCount > 0 && (
            <Button type="link" onClick={handleReadAll}>
              Đánh dấu tất cả đã đọc
            </Button>
          )
        }
      >
        <Tabs
          defaultActiveKey="all"
          items={[
            {
              key: 'all',
              label: 'Tất cả',
              children: (
                <List
                  dataSource={notifications}
                  renderItem={renderNotification}
                  locale={{
                    emptyText: <Empty description="Không có thông báo" />
                  }}
                />
              ),
            },
            {
              key: 'unread',
              label: (
                <Badge count={unreadCount} size="small">
                  Chưa đọc
                </Badge>
              ),
              children: (
                <List
                  dataSource={notifications.filter(n => !n.read)}
                  renderItem={renderNotification}
                  locale={{
                    emptyText: <Empty description="Không có thông báo chưa đọc" />
                  }}
                />
              ),
            },
          ]}
        />
      </Drawer>
    </>
  );
}