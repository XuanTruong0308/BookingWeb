import { useState } from 'react';
import { Calendar, Card, Badge, Modal, Form, TimePicker, Button, Radio, Tag, Alert, Select, Space, Spin } from 'antd';
import type { Dayjs } from 'dayjs';
import type { BadgeProps } from 'antd';

interface ScheduleData {
  date: string;
  shifts: {
    morning?: boolean;
    afternoon?: boolean;
    evening?: boolean;
  };
  bookings: Booking[];
}

interface Booking {
  id: string;
  time: string;
  customer: {
    name: string;
    phone: string;
  };
  services: string[];
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

interface ScheduleFormValues {
  shifts: string[];
  note?: string;
}

// Định nghĩa các ca làm việc
const shifts = {
  morning: { label: 'Ca sáng', time: '08:00 - 12:00' },
  afternoon: { label: 'Ca chiều', time: '13:00 - 17:00' },
  evening: { label: 'Ca tối', time: '18:00 - 21:00' },
};

// Mock data
const mockSchedule: ScheduleData = {
  date: '2024-03-20',
  shifts: {
    morning: true,
    afternoon: true,
    evening: false,
  },
  bookings: [
    {
      id: 'BK001',
      time: '09:00',
      customer: {
        name: 'Nguyễn Thị A',
        phone: '0987654321',
      },
      services: ['Trang điểm cô dâu', 'Làm tóc'],
      status: 'confirmed',
    },
    // More bookings...
  ],
};

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm<ScheduleFormValues>();

  // Status configurations
  const statusConfig = {
    pending: { color: 'processing', text: 'Chờ xác nhận' },
    confirmed: { color: 'warning', text: 'Đã xác nhận' },
    completed: { color: 'success', text: 'Hoàn thành' },
    cancelled: { color: 'error', text: 'Đã hủy' },
  };

  // Calendar cell render
  const dateCellRender = (date: Dayjs) => {
    if (date.format('YYYY-MM-DD') === mockSchedule.date) {
      const items: BadgeProps[] = [];

      // Add shift badges
      Object.entries(mockSchedule.shifts).forEach(([shift, available]) => {
        if (available) {
          items.push({
            color: 'blue',
            text: shifts[shift as keyof typeof shifts].label,
          });
        }
      });

      // Add booking badges
      mockSchedule.bookings.forEach(booking => {
        items.push({
          color: statusConfig[booking.status].color,
          text: `${booking.time} - ${booking.customer.name}`,
        });
      });

      return (
        <ul className="events">
          {items.map((item, index) => (
            <li key={index}>
              <Badge status={item.color as BadgeProps['status']} text={item.text} />
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    setIsModalOpen(true);
    form.setFieldsValue({
      shifts: Object.keys(mockSchedule.shifts).filter(key => 
        mockSchedule.shifts[key as keyof typeof mockSchedule.shifts]
      ),
    });
  };

  const handleSubmit = async (values: ScheduleFormValues) => {
    try {
      setIsLoading(true);
      // TODO: API call to save schedule
      console.log('Form values:', values);
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error('Failed to save schedule:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = (bookingId: string, newStatus: string) => {
    console.log('Update booking status:', { bookingId, newStatus });
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <Space size="middle">
          <Select
            defaultValue="all"
            style={{ width: 200 }}
            options={[
              { value: 'all', label: 'Tất cả lịch hẹn' },
              { value: 'pending', label: 'Chờ xác nhận' },
              { value: 'today', label: 'Hôm nay' },
              { value: 'upcoming', label: 'Sắp tới' },
            ]}
          />
          <Button type="primary">
            Thiết lập lịch làm việc
          </Button>
        </Space>
      </Card>

      {/* Calendar */}
      <Spin spinning={isLoading}>
        <Card>
          <Calendar 
            onSelect={handleDateSelect}
            dateCellRender={dateCellRender}
          />
        </Card>
      </Spin>

      {/* Schedule Modal */}
      <Modal
        title={`Quản lý lịch - ${selectedDate?.format('DD/MM/YYYY')}`}
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        width={800}
        confirmLoading={isLoading}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          {/* Shift Selection */}
          <Form.Item
            name="shifts"
            label="Ca làm việc"
            rules={[{ required: true, message: 'Vui lòng chọn ít nhất một ca làm việc' }]}
          >
            <Radio.Group>
              <Space direction="vertical">
                {Object.entries(shifts).map(([key, { label, time }]) => (
                  <div key={key} className="flex items-center">
                    <Radio value={key}>
                      <span className="font-medium">{label}</span>
                      <span className="text-gray-500 ml-2">{time}</span>
                    </Radio>
                  </div>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>

          {/* Bookings List */}
          {mockSchedule.bookings.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium mb-4">Lịch hẹn trong ngày:</h4>
              <div className="space-y-4">
                {mockSchedule.bookings.map(booking => (
                  <Card key={booking.id} size="small">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">
                          {booking.time} - {booking.customer.name}
                        </div>
                        <div className="text-gray-500 text-sm">
                          SĐT: {booking.customer.phone}
                        </div>
                        <div className="mt-2">
                          {booking.services.map(service => (
                            <Tag key={service}>{service}</Tag>
                          ))}
                        </div>
                      </div>
                      <Space direction="vertical" align="end">
                        <Tag color={statusConfig[booking.status].color}>
                          {statusConfig[booking.status].text}
                        </Tag>
                        {booking.status === 'pending' && (
                          <Space size="small">
                            <Button
                              size="small"
                              type="primary"
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            >
                              Xác nhận
                            </Button>
                            <Button
                              size="small"
                              danger
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            >
                              Từ chối
                            </Button>
                          </Space>
                        )}
                      </Space>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {mockSchedule.bookings.length === 0 && (
            <Alert
              message="Không có lịch hẹn"
              description="Chưa có lịch hẹn nào trong ngày này."
              type="info"
              showIcon
            />
          )}
        </Form>
      </Modal>
    </div>
  );
}