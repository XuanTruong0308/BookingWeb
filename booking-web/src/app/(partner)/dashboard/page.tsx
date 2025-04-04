import { Card, Row, Col, Statistic, Table, Space, Tag, DatePicker } from 'antd';
import { 
  DollarOutlined, 
  CalendarOutlined, 
  StarOutlined,
  ArrowUpOutlined,
  UserOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface DashboardStats {
  totalEarnings: number;
  totalBookings: number;
  averageRating: number;
  totalCustomers: number;
  earningsGrowth: number;
  bookingsGrowth: number;
  customerGrowth: number;
}

interface RecentBooking {
  id: string;
  customerName: string;
  service: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: number;
  commission: number;
}

const mockStats: DashboardStats = {
  totalEarnings: 25000000,
  totalBookings: 48,
  averageRating: 4.8,
  totalCustomers: 42,
  earningsGrowth: 15.2,
  bookingsGrowth: 12.5,
  customerGrowth: 8.9,
};

const recentBookings: RecentBooking[] = [
  {
    id: 'BK001',
    customerName: 'Nguyễn Văn A',
    service: 'Trang điểm cô dâu',
    date: '2024-03-20 09:00',
    status: 'completed',
    amount: 2500000,
    commission: 1750000,
  },
  // More bookings...
];

const bookingColumns: ColumnsType<RecentBooking> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Khách hàng',
    dataIndex: 'customerName',
    key: 'customerName',
  },
  {
    title: 'Dịch vụ',
    dataIndex: 'service',
    key: 'service',
  },
  {
    title: 'Ngày giờ',
    dataIndex: 'date',
    key: 'date',
    render: (date: string) => new Date(date).toLocaleString('vi-VN'),
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
    render: (status: string) => {
      const statusConfig = {
        pending: { color: 'processing', text: 'Chờ xác nhận' },
        confirmed: { color: 'warning', text: 'Đã xác nhận' },
        completed: { color: 'success', text: 'Hoàn thành' },
        cancelled: { color: 'error', text: 'Đã hủy' },
      };
      const config = statusConfig[status as keyof typeof statusConfig];
      return <Tag color={config.color}>{config.text}</Tag>;
    },
  },
  {
    title: 'Doanh thu',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right',
    render: (amount: number) => new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount),
  },
  {
    title: 'Hoa hồng',
    dataIndex: 'commission',
    key: 'commission',
    align: 'right',
    render: (commission: number) => new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(commission),
  },
];

export default function PartnerDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <Card>
        <Space>
          <DatePicker.RangePicker 
            placeholder={['Từ ngày', 'Đến ngày']}
          />
        </Space>
      </Card>

      {/* Stats Overview */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={mockStats.totalEarnings}
              precision={0}
              prefix={<DollarOutlined />}
              suffix="đ"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
            <div className="text-success mt-2">
              <ArrowUpOutlined /> {mockStats.earningsGrowth}% so với tháng trước
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Số lượt đặt"
              value={mockStats.totalBookings}
              prefix={<CalendarOutlined />}
            />
            <div className="text-success mt-2">
              <ArrowUpOutlined /> {mockStats.bookingsGrowth}% so với tháng trước
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đánh giá trung bình"
              value={mockStats.averageRating}
              precision={1}
              prefix={<StarOutlined />}
              suffix="/5"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Số khách hàng"
              value={mockStats.totalCustomers}
              prefix={<UserOutlined />}
            />
            <div className="text-success mt-2">
              <ArrowUpOutlined /> {mockStats.customerGrowth}% so với tháng trước
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Bookings */}
      <Card title="Lịch đặt gần đây">
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