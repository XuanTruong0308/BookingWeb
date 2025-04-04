import { useState } from 'react';
import { Table, Card, Button, Input, Select, Space, Tag, Modal, Form, DatePicker, Badge, Tabs, Steps } from 'antd';
import { SearchOutlined, CalendarOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

interface Booking {
  id: string;
  date: string;
  time: string;
  customer: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
  staff: {
    id: string;
    name: string;
    role: string;
  };
  services: {
    id: string;
    name: string;
    duration: number;
    price: number;
  }[];
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  payment?: {
    amount: number;
    method: string;
    status: 'unpaid' | 'paid' | 'refunded';
  };
  notes?: string;
}

// Mock data
const mockBookings: Booking[] = [
  {
    id: 'BK001',
    date: '2024-03-20',
    time: '09:00',
    customer: {
      id: 'CUS001',
      name: 'Nguyễn Thị A',
      phone: '0987654321',
      email: 'nguyena@example.com',
    },
    staff: {
      id: 'STF001',
      name: 'Anna Nguyễn',
      role: 'Chuyên viên trang điểm',
    },
    services: [
      {
        id: 'SRV001',
        name: 'Trang điểm cô dâu',
        duration: 120,
        price: 2500000,
      },
      {
        id: 'SRV002',
        name: 'Làm tóc cô dâu',
        duration: 60,
        price: 1500000,
      },
    ],
    status: 'confirmed',
    payment: {
      amount: 4000000,
      method: 'transfer',
      status: 'paid',
    },
    notes: 'Chuẩn bị thêm phụ kiện tóc',
  },
];

const statusConfig = {
  pending: { color: 'processing', text: 'Chờ xác nhận' },
  confirmed: { color: 'warning', text: 'Đã xác nhận' },
  in_progress: { color: 'processing', text: 'Đang thực hiện' },
  completed: { color: 'success', text: 'Hoàn thành' },
  cancelled: { color: 'error', text: 'Đã hủy' },
};

const paymentStatusConfig = {
  unpaid: { color: 'error', text: 'Chưa thanh toán' },
  paid: { color: 'success', text: 'Đã thanh toán' },
  refunded: { color: 'warning', text: 'Đã hoàn tiền' },
};

export default function BookingsPage() {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>();

  const columns = [
    {
      title: 'Mã đặt lịch',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => (
        <span className="font-medium">{id}</span>
      ),
    },
    {
      title: 'Thời gian',
      key: 'datetime',
      render: (record: Booking) => (
        <div>
          <div className="font-medium">{dayjs(record.date).format('DD/MM/YYYY')}</div>
          <div className="text-gray-500">{record.time}</div>
        </div>
      ),
    },
    {
      title: 'Khách hàng',
      key: 'customer',
      render: (record: Booking) => (
        <div>
          <div className="font-medium">{record.customer.name}</div>
          <div className="text-gray-500">{record.customer.phone}</div>
        </div>
      ),
    },
    {
      title: 'Nhân viên',
      key: 'staff',
      render: (record: Booking) => (
        <div>
          <div className="font-medium">{record.staff.name}</div>
          <div className="text-gray-500">{record.staff.role}</div>
        </div>
      ),
    },
    {
      title: 'Dịch vụ',
      key: 'services',
      render: (record: Booking) => (
        <div>
          {record.services.map(service => (
            <div key={service.id}>
              {service.name}
              <span className="text-gray-500 ml-2">
                ({service.duration} phút)
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (record: Booking) => (
        <div className="space-y-2">
          <Tag color={statusConfig[record.status].color}>
            {statusConfig[record.status].text}
          </Tag>
          {record.payment && (
            <Tag color={paymentStatusConfig[record.payment.status].color}>
              {paymentStatusConfig[record.payment.status].text}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (record: Booking) => (
        <Space>
          <Button
            onClick={() => {
              setSelectedBooking(record);
              setIsViewModalOpen(true);
            }}
          >
            Chi tiết
          </Button>
          {record.status === 'pending' && (
            <>
              <Button type="primary">Xác nhận</Button>
              <Button danger>Từ chối</Button>
            </>
          )}
          {record.status === 'confirmed' && (
            <Button type="primary">
              Bắt đầu dịch vụ
            </Button>
          )}
          {record.status === 'in_progress' && (
            <Button type="primary">
              Hoàn thành
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // Disallow date ranges > 31 days
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    if (!dateRange || dateRange.length !== 2) {
      return false;
    }
    const tooLate = dateRange[0] && current.diff(dateRange[0], 'days') > 31;
    const tooEarly = dateRange[1] && dateRange[1].diff(current, 'days') > 31;
    return !!tooEarly || !!tooLate;
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex gap-4 mb-6">
          <Input.Search
            placeholder="Tìm theo mã đặt lịch, tên khách hàng"
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
          <DatePicker.RangePicker
            style={{ width: 300 }}
            disabledDate={disabledDate}
            onChange={(dates) => setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])}
          />
          <Select
            placeholder="Trạng thái"
            style={{ width: 200 }}
            allowClear
            options={Object.entries(statusConfig).map(([key, { text }]) => ({
              value: key,
              label: text,
            }))}
          />
          <Select
            placeholder="Thanh toán"
            style={{ width: 200 }}
            allowClear
            options={Object.entries(paymentStatusConfig).map(([key, { text }]) => ({
              value: key,
              label: text,
            }))}
          />
        </div>

        <Table
          columns={columns}
          dataSource={mockBookings}
          rowKey="id"
        />
      </Card>

      {/* Modal chi tiết đặt lịch */}
      <Modal
        title="Chi tiết đặt lịch"
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
        width={800}
      >
        {selectedBooking && (
          <div>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <Card>
                <Space direction="vertical" className="w-full">
                  <div>
                    <div className="text-gray-500">Mã đặt lịch</div>
                    <div className="font-medium text-lg">{selectedBooking.id}</div>
                  </div>
                  <Tag color={statusConfig[selectedBooking.status].color}>
                    {statusConfig[selectedBooking.status].text}
                  </Tag>
                </Space>
              </Card>
              
              <Card>
                <Space direction="vertical" className="w-full">
                  <div className="text-gray-500">Thời gian</div>
                  <div className="font-medium">
                    <CalendarOutlined className="mr-2" />
                    {dayjs(selectedBooking.date).format('DD/MM/YYYY')}
                  </div>
                  <div className="font-medium">
                    <ClockCircleOutlined className="mr-2" />
                    {selectedBooking.time}
                  </div>
                </Space>
              </Card>
            </div>

            <Tabs>
              <Tabs.TabPane tab="Thông tin" key="info">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Khách hàng</h4>
                    <Card size="small">
                      <Space direction="vertical">
                        <div>
                          <UserOutlined className="mr-2" />
                          {selectedBooking.customer.name}
                        </div>
                        <div>
                          <span className="text-gray-500">SĐT:</span>
                          {' '}{selectedBooking.customer.phone}
                        </div>
                        <div>
                          <span className="text-gray-500">Email:</span>
                          {' '}{selectedBooking.customer.email}
                        </div>
                      </Space>
                    </Card>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Nhân viên thực hiện</h4>
                    <Card size="small">
                      <Space direction="vertical">
                        <div>
                          <UserOutlined className="mr-2" />
                          {selectedBooking.staff.name}
                        </div>
                        <div className="text-gray-500">
                          {selectedBooking.staff.role}
                        </div>
                      </Space>
                    </Card>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Dịch vụ</h4>
                    <Card size="small">
                      <div className="space-y-3">
                        {selectedBooking.services.map(service => (
                          <div key={service.id} className="flex justify-between">
                            <div>
                              <div>{service.name}</div>
                              <div className="text-gray-500">
                                {service.duration} phút
                              </div>
                            </div>
                            <div className="font-medium">
                              {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                              }).format(service.price)}
                            </div>
                          </div>
                        ))}
                        {selectedBooking.payment && (
                          <div className="pt-3 border-t">
                            <div className="flex justify-between font-medium">
                              <div>Tổng cộng</div>
                              <div>
                                {new Intl.NumberFormat('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND'
                                }).format(selectedBooking.payment.amount)}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>

                  {selectedBooking.notes && (
                    <div>
                      <h4 className="font-medium mb-2">Ghi chú</h4>
                      <Card size="small">
                        {selectedBooking.notes}
                      </Card>
                    </div>
                  )}
                </div>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Trạng thái" key="status">
                <Steps
                  direction="vertical"
                  current={Object.keys(statusConfig).indexOf(selectedBooking.status)}
                  items={[
                    {
                      title: 'Đặt lịch',
                      description: 'Khách hàng đã đặt lịch thành công',
                    },
                    {
                      title: 'Xác nhận',
                      description: 'Chúng tôi đã xác nhận lịch hẹn',
                    },
                    {
                      title: 'Thực hiện dịch vụ',
                      description: 'Đang thực hiện dịch vụ',
                    },
                    {
                      title: 'Hoàn thành',
                      description: 'Dịch vụ đã hoàn thành',
                    },
                  ]}
                />
              </Tabs.TabPane>
            </Tabs>

            <div className="mt-6 flex gap-2 justify-end">
              {selectedBooking.status === 'pending' && (
                <>
                  <Button type="primary">Xác nhận đặt lịch</Button>
                  <Button danger>Từ chối</Button>
                </>
              )}
              {selectedBooking.status === 'confirmed' && (
                <Button type="primary">Bắt đầu dịch vụ</Button>
              )}
              {selectedBooking.status === 'in_progress' && (
                <Button type="primary">Hoàn thành dịch vụ</Button>
              )}
              {selectedBooking.payment?.status === 'unpaid' && (
                <Button>Cập nhật thanh toán</Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}