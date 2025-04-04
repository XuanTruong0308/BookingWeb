import { useState } from 'react';
import { Card, Table, Tag, Button, Space, Statistic, Row, Col, Badge, Rate, Modal, Form, Input, InputNumber, Select } from 'antd';
import { ShopOutlined, CalendarOutlined, StarOutlined, RiseOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  status: 'active' | 'inactive' | 'pending';
  rating: number;
  totalBookings: number;
  completionRate: number;
  image?: string;
}

interface ServiceStats {
  totalActive: number;
  totalBookings: number;
  averageRating: number;
  totalRevenue: number;
  revenueGrowth: number;
  bookingGrowth: number;
}

const mockStats: ServiceStats = {
  totalActive: 8,
  totalBookings: 156,
  averageRating: 4.8,
  totalRevenue: 45000000,
  revenueGrowth: 15.2,
  bookingGrowth: 12.5,
};

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Trang điểm cô dâu',
    description: 'Dịch vụ trang điểm chuyên nghiệp cho cô dâu',
    price: 2500000,
    duration: 120,
    category: 'makeup',
    status: 'active',
    rating: 4.9,
    totalBookings: 45,
    completionRate: 98,
    image: '/images/services/bridal-makeup.jpg',
  },
  // More services...
];

export default function PartnerServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form] = Form.useForm();

  const columns: ColumnsType<Service> = [
    {
      title: 'Dịch vụ',
      key: 'service',
      render: (_, record) => (
        <Space>
          {record.image && (
            <img
              src={record.image}
              alt={record.name}
              className="w-12 h-12 object-cover rounded"
            />
          )}
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-gray-500 text-sm">{record.duration} phút</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (price) => new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price),
    },
    {
      title: 'Đánh giá',
      key: 'rating',
      render: (_, record) => (
        <Space>
          <Rate disabled defaultValue={record.rating} />
          <span>({record.rating})</span>
        </Space>
      ),
    },
    {
      title: 'Lượt đặt',
      key: 'bookings',
      render: (_, record) => (
        <div>
          <div>{record.totalBookings} lượt đặt</div>
          <div className="text-gray-500 text-sm">
            {record.completionRate}% hoàn thành
          </div>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => {
        const statusConfig = {
          active: { color: 'success', text: 'Đang hoạt động' },
          inactive: { color: 'default', text: 'Tạm ngừng' },
          pending: { color: 'processing', text: 'Chờ duyệt' },
        };
        const config = statusConfig[record.status];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />}
            onClick={() => {
              setEditingService(record);
              form.setFieldsValue(record);
              setIsModalOpen(true);
            }}
          >
            Sửa
          </Button>
          <Button 
            icon={<EyeOutlined />}
            onClick={() => {
              // View service analytics
            }}
          >
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    setIsModalOpen(false);
    form.resetFields();
    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Dịch vụ đang hoạt động"
              value={mockStats.totalActive}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng lượt đặt"
              value={mockStats.totalBookings}
              prefix={<CalendarOutlined />}
            />
            <div className="text-success mt-2">
              <RiseOutlined /> {mockStats.bookingGrowth}% so với tháng trước
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
              title="Doanh thu"
              value={mockStats.totalRevenue}
              precision={0}
              prefix="₫"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
            <div className="text-success mt-2">
              <RiseOutlined /> {mockStats.revenueGrowth}% so với tháng trước
            </div>
          </Card>
        </Col>
      </Row>

      {/* Services Table */}
      <Card
        title="Danh sách dịch vụ"
        extra={
          <Space>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Thêm dịch vụ
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={mockServices}
          rowKey="id"
        />
      </Card>

      {/* Service Form Modal */}
      <Modal
        title={editingService ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setEditingService(null);
        }}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="name"
                label="Tên dịch vụ"
                rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="category"
                label="Danh mục"
                rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
              >
                <Select
                  options={[
                    { value: 'makeup', label: 'Trang điểm' },
                    { value: 'hair', label: 'Làm tóc' },
                    { value: 'spa', label: 'Spa' },
                    { value: 'nail', label: 'Làm móng' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Giá (VNĐ)"
                rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duration"
                label="Thời gian thực hiện (phút)"
                rules={[{ required: true, message: 'Vui lòng nhập thời gian' }]}
              >
                <InputNumber style={{ width: '100%' }} min={15} step={15} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="status"
            label="Trạng thái"
            initialValue="active"
          >
            <Select
              options={[
                { value: 'active', label: 'Đang hoạt động' },
                { value: 'inactive', label: 'Tạm ngừng' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}