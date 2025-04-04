import { Card, Row, Col, Statistic, Space, Tag, Button, Table, DatePicker, Select, Rate } from 'antd';
import { ArrowUpOutlined, CalendarOutlined, StarOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/plots';
import type { ColumnsType } from 'antd/es/table';

interface ServiceAnalytics {
  id: string;
  name: string;
  category: string;
  price: number;
  stats: {
    totalBookings: number;
    completionRate: number;
    averageRating: number;
    totalRevenue: number;
    bookingGrowth: number;
    revenueGrowth: number;
    repeatCustomerRate: number;
  };
  bookingHistory: {
    date: string;
    bookings: number;
    revenue: number;
  }[];
  recentBookings: {
    id: string;
    customerName: string;
    date: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    rating?: number;
    review?: string;
  }[];
}

const mockData: ServiceAnalytics = {
  id: '1',
  name: 'Trang điểm cô dâu',
  category: 'makeup',
  price: 2500000,
  stats: {
    totalBookings: 45,
    completionRate: 98,
    averageRating: 4.9,
    totalRevenue: 112500000,
    bookingGrowth: 15.5,
    revenueGrowth: 18.2,
    repeatCustomerRate: 35,
  },
  bookingHistory: [
    { date: '2024-03-01', bookings: 3, revenue: 7500000 },
    { date: '2024-03-02', bookings: 2, revenue: 5000000 },
    // More historical data...
  ],
  recentBookings: [
    {
      id: 'BK001',
      customerName: 'Nguyễn Thị A',
      date: '2024-03-20',
      status: 'completed',
      rating: 5,
      review: 'Dịch vụ rất tốt, chuyên viên trang điểm có tay nghề cao.',
    },
    // More bookings...
  ],
};

export default function ServiceAnalyticsPage() {
  const { stats, bookingHistory, recentBookings } = mockData;

  const statusConfig = {
    pending: { color: 'processing', text: 'Chờ xác nhận' },
    confirmed: { color: 'warning', text: 'Đã xác nhận' },
    completed: { color: 'success', text: 'Hoàn thành' },
    cancelled: { color: 'error', text: 'Đã hủy' },
  };
  
  const bookingColumns: ColumnsType<(typeof recentBookings)[0]> = [
    {
      title: 'Khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      render: (status: keyof typeof statusConfig) => {
        const config = statusConfig[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: 'Đánh giá',
      key: 'rating',
      render: (_, record) => record.rating ? (
        <Space>
          <Rate disabled defaultValue={record.rating} />
          <span>({record.rating})</span>
        </Space>
      ) : '-',
    },
  ];

  const config = {
    data: bookingHistory,
    xField: 'date',
    yField: 'bookings',
    point: {
      size: 5,
      shape: 'circle',
    },
    tooltip: {
      formatter: (datum: any) => ({
        name: 'Lượt đặt',
        value: datum.bookings,
      }),
    },
  };

  return (
    <div className="space-y-6">
      {/* Service Info */}
      <Card>
        <Space className="w-full" align="start" direction="vertical">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">{mockData.name}</h2>
              <Tag color="blue">{mockData.category}</Tag>
            </div>
            <Button type="primary">
              Chỉnh sửa dịch vụ
            </Button>
          </div>
          <div className="text-lg">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(mockData.price)}
          </div>
        </Space>
      </Card>

      {/* Stats Overview */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng lượt đặt"
              value={stats.totalBookings}
              prefix={<CalendarOutlined />}
            />
            <div className="text-success mt-2">
              <ArrowUpOutlined /> {stats.bookingGrowth}% so với tháng trước
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tỷ lệ hoàn thành"
              value={stats.completionRate}
              precision={1}
              prefix={<LockOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đánh giá trung bình"
              value={stats.averageRating}
              precision={1}
              prefix={<StarOutlined />}
              suffix="/5"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Khách hàng quay lại"
              value={stats.repeatCustomerRate}
              prefix={<UserOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {/* Booking Trends */}
      <Card title="Xu hướng đặt lịch">
        <Space className="w-full mb-4" size="middle">
          <DatePicker.RangePicker />
          <Select
            defaultValue="bookings"
            style={{ width: 120 }}
            options={[
              { value: 'bookings', label: 'Lượt đặt' },
              { value: 'revenue', label: 'Doanh thu' },
            ]}
          />
        </Space>
        <Line {...config} />
      </Card>

      {/* Recent Bookings */}
      <Card 
        title="Lịch đặt gần đây"
        extra={
          <Button type="link">Xem tất cả</Button>
        }
      >
        <Table
          columns={bookingColumns}
          dataSource={recentBookings}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
}