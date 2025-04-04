import { useSelector } from 'react-redux';
import { List, Avatar, Badge } from 'antd';
import { RootState } from '@/lib/store';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function OnlineUsers() {
  const { onlineUsers } = useSelector((state: RootState) => state.chat);

  return (
    <List
      dataSource={onlineUsers}
      renderItem={(user) => (
        <List.Item className="cursor-pointer hover:bg-gray-50">
          <List.Item.Meta
            avatar={
              <Badge dot color="green" offset={[-5, 5]}>
                <Avatar src={user.avatar}>
                  {user.name[0]}
                </Avatar>
              </Badge>
            }
            title={user.name}
            description={
              <span className="text-xs text-green-500">
                Đang hoạt động
              </span>
            }
          />
        </List.Item>
      )}
      locale={{
        emptyText: 'Không có người dùng nào đang hoạt động'
      }}
    />
  );
}