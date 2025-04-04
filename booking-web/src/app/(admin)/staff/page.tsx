import { useState } from 'react';
import { Table, Card, Button, Input, Select, Space, Tag, Modal, Form, Avatar, Tabs, Rate, Progress } from 'antd';
import { UserOutlined, SearchOutlined, EditOutlined, CalendarOutlined, StarOutlined, PhoneOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'stylist' | 'makeup' | 'photographer';
  status: 'active' | 'inactive' | 'on_leave';
  experience: number;
  specialties: string[];
  rating: number;
  totalBookings: number;
  completedBookings: number;
  joinDate: string;
  schedule?: {
    available: boolean;
    nextAvailable?: string;
  };
}

interface Performance {
  month: string;
  bookings: number;
  completionRate: number;
  rating: number;
  revenue: number;
}

const mockStaff: Staff[] = [
  {
    id: 'STF001',
    name: 'Anna Nguyễn',
    email: 'anna@example.com',
    phone: '0987654321',
    avatar: '/avatars/staff1.jpg',
    role: 'makeup',
    status: 'active',
    experience: 5,
    specialties: ['Trang điểm cô dâu', 'Trang điểm dự tiệc'],
    rating: 4.8,
    totalBookings: 120,
    completedBookings: 115,
    joinDate: '2023-01-01',
    schedule: {
      available: true,
      nextAvailable: '2024-03-20 09:00',
    },
  },
  // Thêm dữ liệu mẫu khác
];

const roleLabels = {
  stylist: 'Chuyên viên tạo mẫu tóc',
  makeup: 'Chuyên viên trang điểm',
  photographer: 'Nhiếp ảnh',
};

const statusColors = {
  active: 'success',
  inactive: 'default',
  on_leave: 'warning',
};

const statusLabels = {
  active: 'Đang làm việc',
  inactive: 'Ngừng làm việc',
  on_leave: 'Đang nghỉ phép',
};

export default function StaffPage() {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Nhân viên',
      key: 'staff',
      render: (record: Staff) => (
        <div className="flex items-center gap-3">
          <Avatar 
            src={record.avatar}
            icon={<UserOutlined />}
            size={40}
          />
          <div>
            <div className="font-medium">{record.name}</div>
            <Tag color="blue">{roleLabels[record.role]}</Tag>
          </div>
        </div>
      ),
    },
    {
      title: 'Liên hệ',
      key: 'contact',
      render: (record: Staff) => (
        <div className="space-y-1">
          <div>
            <PhoneOutlined className="mr-2" />
            {record.phone}
          </div>
          <div className="text-gray-500 text-sm">{record.email}</div>
        </div>
      ),
    },
    {
      title: 'Đánh giá & Kinh nghiệm',
      key: 'rating',
      render: (record: Staff) => (
        <div className="space-y-2">
          <div>
            <Rate disabled defaultValue={record.rating} allowHalf />
            <span className="ml-2">{record.rating}/5</span>
          </div>
          <div className="text-gray-500">
            {record.experience} năm kinh nghiệm
          </div>
        </div>
      ),
    },
    {
      title: 'Chuyên môn',
      key: 'specialties',
      render: (record: Staff) => (
        <Space wrap>
          {record.specialties.map(specialty => (
            <Tag key={specialty}>{specialty}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (record: Staff) => (
        <div className="space-y-2">
          <Tag color={statusColors[record.status]}>
            {statusLabels[record.status]}
          </Tag>
          {record.schedule?.available ? (
            <div className="text-green-500 text-sm">Có lịch trống</div>
          ) : (
            <div className="text-gray-500 text-sm">
              Lịch trống tiếp theo: {record.schedule?.nextAvailable}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (record: Staff) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedStaff(record);
              form.setFieldsValue(record);
              setIsEditModalOpen(true);
            }}
          >
            Sửa
          </Button>
          <Button
            icon={<CalendarOutlined />}
          >
            Xem lịch
          </Button>
          <Button
            icon={<StarOutlined />}
            onClick={() => {
              setSelectedStaff(record);
              setIsViewModalOpen(true);
            }}
          >
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  // Mock data cho hiệu suất làm việc
  const mockPerformance: Performance[] = [
    {
      month: '2024-03',
      bookings: 25,
      completionRate: 96,
      rating: 4.9,
      revenue: 25000000,
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
              placeholder="Vai trò"
              style={{ width: 200 }}
              allowClear
              options={[
                { value: 'makeup', label: 'Chuyên viên trang điểm' },
                { value: 'stylist', label: 'Chuyên viên tạo mẫu tóc' },
                { value: 'photographer', label: 'Nhiếp ảnh' },
              ]}
            />
            <Select
              placeholder="Trạng thái"
              style={{ width: 200 }}
              allowClear
              options={[
                { value: 'active', label: 'Đang làm việc' },
                { value: 'inactive', label: 'Ngừng làm việc' },
                { value: 'on_leave', label: 'Đang nghỉ phép' },
              ]}
            />
          </div>
          <Button type="primary" icon={<UserOutlined />}>
            Thêm nhân viên
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={mockStaff}
          rowKey="id"
        />
      </Card>

      {/* Modal xem chi tiết nhân viên */}
      <Modal
        title="Chi tiết nhân viên"
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
        width={800}
      >
        {selectedStaff && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Avatar 
                src={selectedStaff.avatar}
                icon={<UserOutlined />}
                size={64}
              />
              <div>
                <h2 className="text-xl font-semibold">{selectedStaff.name}</h2>
                <Tag color="blue">{roleLabels[selectedStaff.role]}</Tag>
              </div>
            </div>

            <Tabs defaultActiveKey="info">
              <Tabs.TabPane tab="Thông tin" key="info">
                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <div className="text-center">
                      <div className="text-2xl font-semibold">
                        {selectedStaff.totalBookings}
                      </div>
                      <div className="text-gray-500">Tổng số đặt lịch</div>
                    </div>
                  </Card>
                  <Card>
                    <div className="text-center">
                      <Rate disabled defaultValue={selectedStaff.rating} allowHalf />
                      <div className="text-gray-500">Đánh giá trung bình</div>
                    </div>
                  </Card>
                </div>

                <div className="mt-6">
                  <Progress
                    percent={Math.round((selectedStaff.completedBookings / selectedStaff.totalBookings) * 100)}
                    format={percent => `${percent}% hoàn thành`}
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <div className="font-medium">Chuyên môn</div>
                    <div className="mt-2">
                      {selectedStaff.specialties.map(specialty => (
                        <Tag key={specialty}>{specialty}</Tag>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Kinh nghiệm</div>
                    <div>{selectedStaff.experience} năm</div>
                  </div>
                  <div>
                    <div className="font-medium">Ngày vào làm</div>
                    <div>{selectedStaff.joinDate}</div>
                  </div>
                </div>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Hiệu suất" key="performance">
                <div className="space-y-6">
                  {mockPerformance.map(perf => (
                    <Card key={perf.month} size="small">
                      <div className="text-lg font-medium mb-4">
                        Tháng {new Date(perf.month).getMonth() + 1}/
                        {new Date(perf.month).getFullYear()}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-gray-500">Số đặt lịch</div>
                          <div className="text-lg font-medium">{perf.bookings}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Tỷ lệ hoàn thành</div>
                          <Progress percent={perf.completionRate} size="small" />
                        </div>
                        <div>
                          <div className="text-gray-500">Đánh giá</div>
                          <Rate disabled defaultValue={perf.rating} allowHalf />
                        </div>
                        <div>
                          <div className="text-gray-500">Doanh thu</div>
                          <div className="text-lg font-medium text-primary">
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND'
                            }).format(perf.revenue)}
                          </div>
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

      {/* Modal chỉnh sửa thông tin nhân viên */}
      <Modal
        title="Chỉnh sửa thông tin nhân viên"
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
        width={600}
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
            name="role"
            label="Vai trò"
            rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
          >
            <Select
              options={[
                { value: 'makeup', label: 'Chuyên viên trang điểm' },
                { value: 'stylist', label: 'Chuyên viên tạo mẫu tóc' },
                { value: 'photographer', label: 'Nhiếp ảnh' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="specialties"
            label="Chuyên môn"
            rules={[{ required: true, message: 'Vui lòng chọn ít nhất một chuyên môn' }]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn chuyên môn"
              options={[
                { value: 'bridal', label: 'Trang điểm cô dâu' },
                { value: 'party', label: 'Trang điểm dự tiệc' },
                { value: 'wedding_photo', label: 'Chụp ảnh cưới' },
                { value: 'bridal_hair', label: 'Làm tóc cô dâu' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="experience"
            label="Số năm kinh nghiệm"
            rules={[{ required: true, message: 'Vui lòng nhập số năm kinh nghiệm' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
          >
            <Select
              options={[
                { value: 'active', label: 'Đang làm việc' },
                { value: 'inactive', label: 'Ngừng làm việc' },
                { value: 'on_leave', label: 'Đang nghỉ phép' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}