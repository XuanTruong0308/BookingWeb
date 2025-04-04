import { useState } from 'react';
import { Table, Card, Button, Input, Select, Space, Tag, Modal, Form, Avatar, Tabs, Statistic } from 'antd';
import { UserOutlined, SearchOutlined, EditOutlined, MessageOutlined, HistoryOutlined } from '@ant-design/icons';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'blocked';
  gender: 'male' | 'female' | 'other';
  totalBookings: number;
  totalSpent: number;
  lastBooking?: string;
  joinDate: string;
  address?: string;
  notes?: string;
}

interface BookingHistory {
  id: string;
  date: string;
  services: string[];
  amount: number;
  status: 'completed' | 'cancelled';
}

const mockCustomers: Customer[] = [
  {
    id: 'CUS001',
    name: 'Nguyễn Thị A',
    email: 'nguyena@example.com',
    phone: '0987654321',
    avatar: '/avatars/customer1.jpg',
    status: 'active',
    gender: 'female',
    totalBookings: 5,
    totalSpent: 12500000,
    lastBooking: '2024-03-15',
    joinDate: '2024-01-01',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    notes: 'Khách hàng VIP',
  },
  // Thêm dữ liệu mẫu khác
];

export default function CustomersPage() {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Khách hàng',
      key: 'customer',
      render: (record: Customer) => (
        <div className="flex items-center gap-3">
          <Avatar 
            src={record.avatar}
            icon={<UserOutlined />}
            size={40}
          />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-gray-500 text-sm">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Tổng đặt lịch',
      key: 'bookings',
      render: (record: Customer) => (
        <div>
          <div>{record.totalBookings} lần</div>
          <div className="text-gray-500 text-sm">
            Gần nhất: {record.lastBooking || 'Chưa có'}
          </div>
        </div>
      ),
    },
    {
      title: 'Tổng chi tiêu',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (amount: number) => (
        <span className="font-medium text-primary">
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(amount)}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = {
          active: { color: 'success', text: 'Hoạt động' },
          inactive: { color: 'default', text: 'Không hoạt động' },
          blocked: { color: 'error', text: 'Đã chặn' },
        };
        return (
          <Tag color={statusConfig[status].color}>
            {statusConfig[status].text}
          </Tag>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (record: Customer) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedCustomer(record);
              form.setFieldsValue(record);
              setIsEditModalOpen(true);
            }}
          >
            Sửa
          </Button>
          <Button
            icon={<HistoryOutlined />}
            onClick={() => {
              setSelectedCustomer(record);
              setIsViewModalOpen(true);
            }}
          >
            Chi tiết
          </Button>
          <Button icon={<MessageOutlined />}>
            Nhắn tin
          </Button>
        </Space>
      ),
    },
  ];

  // Mock data cho lịch sử đặt lịch
  const mockHistory: BookingHistory[] = [
    {
      id: 'BK001',
      date: '2024-03-15',
      services: ['Trang điểm cô dâu', 'Làm tóc'],
      amount: 3500000,
      status: 'completed',
    },
    // Thêm dữ liệu mẫu khác
  ];

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between mb-4">
          <div className="flex gap-4">
            <Input.Search
              placeholder="Tìm kiếm theo tên, email, SĐT"
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
            />
            <Select
              placeholder="Trạng thái"
              style={{ width: 200 }}
              allowClear
              options={[
                { value: 'active', label: 'Hoạt động' },
                { value: 'inactive', label: 'Không hoạt động' },
                { value: 'blocked', label: 'Đã chặn' },
              ]}
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={mockCustomers}
          rowKey="id"
        />
      </Card>

      {/* Modal xem chi tiết khách hàng */}
      <Modal
        title="Chi tiết khách hàng"
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
        width={800}
      >
        {selectedCustomer && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Avatar 
                src={selectedCustomer.avatar}
                icon={<UserOutlined />}
                size={64}
              />
              <div>
                <h2 className="text-xl font-semibold">{selectedCustomer.name}</h2>
                <div className="text-gray-500">{selectedCustomer.email}</div>
              </div>
            </div>

            <Tabs defaultActiveKey="info">
              <Tabs.TabPane tab="Thông tin" key="info">
                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <Statistic
                      title="Tổng đặt lịch"
                      value={selectedCustomer.totalBookings}
                      suffix="lần"
                    />
                  </Card>
                  <Card>
                    <Statistic
                      title="Tổng chi tiêu"
                      value={selectedCustomer.totalSpent}
                      formatter={value => 
                        new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(value as number)
                      }
                    />
                  </Card>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <div className="font-medium">Số điện thoại</div>
                    <div>{selectedCustomer.phone}</div>
                  </div>
                  <div>
                    <div className="font-medium">Địa chỉ</div>
                    <div>{selectedCustomer.address || 'Chưa cập nhật'}</div>
                  </div>
                  <div>
                    <div className="font-medium">Ngày tham gia</div>
                    <div>{selectedCustomer.joinDate}</div>
                  </div>
                  <div>
                    <div className="font-medium">Ghi chú</div>
                    <div>{selectedCustomer.notes || 'Không có ghi chú'}</div>
                  </div>
                </div>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Lịch sử đặt lịch" key="history">
                <div className="space-y-4">
                  {mockHistory.map(booking => (
                    <Card key={booking.id} size="small">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">{booking.date}</div>
                          <div className="text-gray-500">
                            {booking.services.join(', ')}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-primary">
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND'
                            }).format(booking.amount)}
                          </div>
                          <Tag color={booking.status === 'completed' ? 'success' : 'error'}>
                            {booking.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                          </Tag>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        )}
      </Modal>

      {/* Modal chỉnh sửa thông tin khách hàng */}
      <Modal
        title="Chỉnh sửa thông tin khách hàng"
        open={isEditModalOpen}
        onOk={() => {
          form.validateFields()
            .then(values => {
              console.log('Success:', values);
              setIsEditModalOpen(false);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
        onCancel={() => setIsEditModalOpen(false)}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
          >
            <Select
              options={[
                { value: 'active', label: 'Hoạt động' },
                { value: 'inactive', label: 'Không hoạt động' },
                { value: 'blocked', label: 'Chặn' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="notes"
            label="Ghi chú"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}