import { Card, Row, Col, Statistic, Table, Calendar, Badge } from 'antd';
import { 
  UserOutlined, 
  CalendarOutlined, 
  DollarOutlined, 
  StarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';

interface DashboardStats {
  totalBookings: number;
  totalCustomers: number;
  totalRevenue: number;
  averageRating: number;
  bookingGrowth: number;
  revenueGrowth: number;
  customerGrowth: number;
}

const mockStats: DashboardStats = {
  totalBookings: 1234,
  totalCustomers: 890,
  totalRevenue: 123456789,
  averageRating: 4.8,
  bookingGrowth: 12.5,
  revenueGrowth: 15.7,
  customerGrowth: 8.9,
};

interface RecentBooking {
  id: string;
  customerName: string;
  service: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: number;
}

const recentBookings: RecentBooking[] = [
  {
    id: 'BK001',
    customerName: 'Nguyễn Văn A',
    service: 'Trang điểm cô dâu',
    date: '2024-03-20 09:00',
    status: 'confirmed',
    amount: 2500000,
  },
  // Thêm dữ liệu mẫu khác
];

const bookingColumns = [
  {
    title: 'Mã đặt lịch',
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
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      const colors = {
        pending: 'gold',
        confirmed: 'blue',
        completed: 'green',
        cancelled: 'red',
      };
      return <Badge color={colors[status]} text={status} />;
    },
  },
  {
    title: 'Số tiền',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount: number) => 
      new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(amount),
  },
];

export default function DashboardPage() {
  const dateCellRender = (value: Dayjs) => {
    // Mock data - sẽ được thay thế bằng dữ liệu thực
    const date = value.date();
    if (date % 3 === 0) {
      return (
        <ul className="events">
          <li>
            <Badge status="warning" text={`${date % 2 + 2} đặt lịch`} />
          </li>
        </ul>
      );
    }
    return null;
  };

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <div className="space-y-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng số đặt lịch"
              value={mockStats.totalBookings}
              prefix={<CalendarOutlined />}
              suffix={
                <span className="text-green-500 text-sm">
                  <ArrowUpOutlined /> {mockStats.bookingGrowth}%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng số khách hàng"
              value={mockStats.totalCustomers}
              prefix={<UserOutlined />}
              suffix={
                <span className="text-green-500 text-sm">
                  <ArrowUpOutlined /> {mockStats.customerGrowth}%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Doanh thu"
              value={mockStats.totalRevenue}
              prefix={<DollarOutlined />}
              suffix={
                <span className="text-green-500 text-sm">
                  <ArrowUpOutlined /> {mockStats.revenueGrowth}%
                </span>
              }
              formatter={(value) => 
                new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(value)
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đánh giá trung bình"
              value={mockStats.averageRating}
              prefix={<StarOutlined />}
              precision={1}
              suffix="/5"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Đặt lịch gần đây">
            <Table
              columns={bookingColumns}
              dataSource={recentBookings}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Lịch đặt hẹn">
            <Calendar
              fullscreen={false}
              dateCellRender={dateCellRender}
              onPanelChange={onPanelChange}
            />
          </Card>
        </Col>
      </Row>

      {/* Thêm các biểu đồ thống kê khác */}
    </div>
  );
}