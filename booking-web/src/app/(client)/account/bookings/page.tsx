import { Table, Tag, Button, Card, Tabs, Space, Rate, Modal, Input } from 'antd';
import { CalendarOutlined, LockOutlined, UserOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { TabsProps } from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;

interface Booking {
  id: string;
  services: string[];
  date: string;
  time: string;
  specialist: string;
  location: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'paid' | 'unpaid' | 'partial';
}

const bookings: Booking[] = [
  {
    id: 'BK001',
    services: ['Trang điểm cô dâu', 'Chụp ảnh cưới'],
    date: '2024-03-20',
    time: '09:00',
    specialist: 'Anna Nguyễn',
    location: 'Tại cửa hàng',
    status: 'confirmed',
    totalAmount: 5000000,
    paymentStatus: 'partial'
  },
  // Thêm dữ liệu mẫu khác
];

const getStatusColor = (status: Booking['status']) => {
  const colors = {
    pending: 'gold',
    confirmed: 'blue',
    completed: 'green',
    cancelled: 'red'
  };
  return colors[status];
};

const getStatusText = (status: Booking['status']) => {
  const texts = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy'
  };
  return texts[status];
};

export default function BookingsPage() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  const columns = [
    {
      title: 'Dịch vụ',
      dataIndex: 'services',
      key: 'services',
      render: (services: string[]) => (
        <Space direction="vertical">
          {services.map(service => (
            <Tag key={service} color="blue">{service}</Tag>
          ))}
        </Space>
      )
    },
    {
      title: 'Thời gian',
      key: 'datetime',
      render: (record: Booking) => (
        <Space direction="vertical" size="small">
          <span>
            <CalendarOutlined className="mr-2" />
            {dayjs(record.date).format('DD/MM/YYYY')}
          </span>
          <span>
            <LockOutlined className="mr-2" />
            {record.time}
          </span>
        </Space>
      )
    },
    {
      title: 'Chuyên viên',
      dataIndex: 'specialist',
      key: 'specialist',
      render: (specialist: string) => (
        <span>
          <UserOutlined className="mr-2" />
          {specialist}
        </span>
      )
    },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
      key: 'location',
      render: (location: string) => (
        <span>
          <EnvironmentOutlined className="mr-2" />
          {location}
        </span>
      )
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (record: Booking) => (
        <Space direction="vertical" size="small">
          <Tag color={getStatusColor(record.status)}>
            {getStatusText(record.status)}
          </Tag>
          <Tag color={record.paymentStatus === 'paid' ? 'green' : 'orange'}>
            {record.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
          </Tag>
        </Space>
      )
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => (
        <span className="font-semibold">
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(amount)}
        </span>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (record: Booking) => (
        <Space>
          {record.status === 'completed' && (
            <Button 
              type="primary"
              onClick={() => {
                setCurrentBooking(record);
                setIsReviewModalOpen(true);
              }}
            >
              Đánh giá
            </Button>
          )}
          {record.status === 'confirmed' && (
            <Button danger>Hủy lịch</Button>
          )}
          <Button>Chi tiết</Button>
        </Space>
      )
    }
  ];

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: 'Tất cả',
      children: <Table columns={columns} dataSource={bookings} rowKey="id" />
    },
    {
      key: 'upcoming',
      label: 'Sắp tới',
      children: <Table 
        columns={columns} 
        dataSource={bookings.filter(b => b.status === 'confirmed')} 
        rowKey="id" 
      />
    },
    {
      key: 'completed',
      label: 'Đã hoàn thành',
      children: <Table 
        columns={columns} 
        dataSource={bookings.filter(b => b.status === 'completed')} 
        rowKey="id" 
      />
    },
    {
      key: 'cancelled',
      label: 'Đã hủy',
      children: <Table 
        columns={columns} 
        dataSource={bookings.filter(b => b.status === 'cancelled')} 
        rowKey="id" 
      />
    }
  ];

  const handleSubmitReview = () => {
    console.log({
      bookingId: currentBooking?.id,
      rating,
      review
    });
    setIsReviewModalOpen(false);
    setRating(5);
    setReview('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <Tabs defaultActiveKey="all" items={items} />
      </Card>

      <Modal
        title="Đánh giá dịch vụ"
        open={isReviewModalOpen}
        onOk={handleSubmitReview}
        onCancel={() => setIsReviewModalOpen(false)}
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Chất lượng dịch vụ</label>
            <Rate value={rating} onChange={setRating} />
          </div>
          <div>
            <label className="block mb-2">Nhận xét của bạn</label>
            <TextArea 
              rows={4} 
              value={review}
              onChange={e => setReview(e.target.value)}
              placeholder="Chia sẻ trải nghiệm của bạn..."
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}