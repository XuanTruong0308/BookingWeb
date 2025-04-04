// Import các thư viện và components cần thiết
import { useState } from 'react';
import { Calendar, Card, Select, Badge, Modal, Form, TimePicker, Button, Radio, Tag, Alert } from 'antd';
import type { Dayjs } from 'dayjs';
import type { BadgeProps } from 'antd';

// Định nghĩa kiểu dữ liệu cho nhân viên
interface Staff {
  id: string;        // ID của nhân viên
  name: string;      // Tên nhân viên
  role: string;      // Vai trò/chức vụ của nhân viên
}

// Định nghĩa kiểu dữ liệu cho lịch làm việc
interface Schedule {
  date: string;      // Ngày làm việc
  staffId: string;   // ID của nhân viên
  shifts: {          // Các ca làm việc trong ngày
    morning?: boolean;    // Ca sáng
    afternoon?: boolean;  // Ca chiều
    evening?: boolean;    // Ca tối
  };
  bookings: Booking[];   // Danh sách các lịch đặt trong ngày
}

// Định nghĩa kiểu dữ liệu cho lịch đặt
interface Booking {
  id: string;        // ID của lịch đặt
  time: string;      // Thời gian đặt lịch
  customer: {        // Thông tin khách hàng
    name: string;    // Tên khách hàng
    phone: string;   // Số điện thoại
  };
  services: string[];    // Danh sách dịch vụ
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';  // Trạng thái lịch đặt
}

// Dữ liệu mẫu cho danh sách nhân viên
const mockStaff: Staff[] = [
  { id: 'STF001', name: 'Anna Nguyễn', role: 'Chuyên viên trang điểm' },
  { id: 'STF002', name: 'Hương Trần', role: 'Chuyên viên tạo mẫu tóc' },
];

// Định nghĩa các ca làm việc trong ngày
const shifts = {
  morning: { label: 'Ca sáng', time: '08:00 - 12:00' },
  afternoon: { label: 'Ca chiều', time: '13:00 - 17:00' },
  evening: { label: 'Ca tối', time: '18:00 - 21:00' },
};

export default function StaffSchedulePage() {
  // Khai báo các state để quản lý trạng thái
  const [selectedStaff, setSelectedStaff] = useState<string>();     // Nhân viên được chọn
  const [selectedDate, setSelectedDate] = useState<Dayjs>();        // Ngày được chọn
  const [isModalOpen, setIsModalOpen] = useState(false);            // Trạng thái hiển thị modal
  const [form] = Form.useForm();                                    // Form của antd

  // Dữ liệu mẫu cho lịch làm việc
  const mockSchedule: Schedule = {
    date: '2024-03-20',
    staffId: 'STF001',
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
    ],
  };

  // Màu sắc cho các trạng thái lịch đặt
  const statusColors = {
    pending: 'processing',      // Đang chờ xử lý
    confirmed: 'success',       // Đã xác nhận
    completed: 'default',       // Đã hoàn thành
    cancelled: 'error',         // Đã hủy
  };

  // Nhãn hiển thị cho các trạng thái
  const statusLabels = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy',
  };

  // Hàm render nội dung cho mỗi ô ngày trong lịch
  const dateCellRender = (date: Dayjs) => {
    // Chỉ hiển thị thông tin cho ngày được chọn trong dữ liệu mẫu
    if (date.format('YYYY-MM-DD') === mockSchedule.date && selectedStaff === mockSchedule.staffId) {
      const items: BadgeProps[] = [];

      // Thêm các ca làm việc vào danh sách hiển thị
      Object.entries(mockSchedule.shifts).forEach(([shift, available]) => {
        if (available) {
          items.push({
            color: 'blue',
            text: shifts[shift].label,
          });
        }
      });

      // Thêm các lịch đặt vào danh sách hiển thị
      mockSchedule.bookings.forEach(booking => {
        items.push({
          color: statusColors[booking.status],
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

  // Xử lý khi chọn một ngày trong lịch
  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // Phần giao diện chính của trang
  return (
    <div className="space-y-6">
      <Card>
        {/* Dropdown chọn nhân viên */}
        <div className="mb-4">
          <Select
            placeholder="Chọn nhân viên"
            style={{ width: 300 }}
            options={mockStaff.map(staff => ({
              value: staff.id,
              label: `${staff.name} - ${staff.role}`,
            }))}
            onChange={value => setSelectedStaff(value)}
          />
        </div>

        {/* Hiển thị lịch làm việc hoặc thông báo chọn nhân viên */}
        {selectedStaff ? (
          <Calendar
            onSelect={handleDateSelect}
            cellRender={dateCellRender}
          />
        ) : (
          <Alert
            message="Vui lòng chọn nhân viên để xem lịch làm việc"
            type="info"
            showIcon
          />
        )}
      </Card>

      {/* Modal quản lý lịch làm việc */}
      <Modal
        title="Quản lý lịch làm việc"
        open={isModalOpen}
        onOk={() => {
          form.validateFields()
            .then(values => {
              console.log('Success:', values);
              setIsModalOpen(false);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
        onCancel={() => setIsModalOpen(false)}
        width={600}
      >
        {selectedDate && (
          <div>
            {/* Hiển thị ngày được chọn */}
            <div className="mb-4">
              <h3 className="text-lg font-medium">
                {selectedDate.format('DD/MM/YYYY')}
              </h3>
            </div>

            {/* Form chọn ca làm việc */}
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                shifts: Object.entries(mockSchedule.shifts)
                  .filter(([_, available]) => available)
                  .map(([shift]) => shift),
              }}
            >
              {/* Phần chọn ca làm việc */}
              <Form.Item
                name="shifts"
                label="Ca làm việc"
                rules={[{ required: true, message: 'Vui lòng chọn ít nhất một ca làm việc' }]}
              >
                <Radio.Group>
                  <div className="space-y-2">
                    {Object.entries(shifts).map(([key, { label, time }]) => (
                      <div key={key} className="flex items-center">
                        <Radio value={key}>
                          <span className="font-medium">{label}</span>
                          <span className="text-gray-500 ml-2">{time}</span>
                        </Radio>
                      </div>
                    ))}
                  </div>
                </Radio.Group>
              </Form.Item>

              {/* Hiển thị danh sách lịch đặt trong ngày */}
              {mockSchedule.bookings.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-4">Lịch đặt trong ngày:</h4>
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
                          <Tag color={statusColors[booking.status]}>
                            {statusLabels[booking.status]}
                          </Tag>
                        </div>
                        {/* Hiển thị nút xác nhận/từ chối cho lịch đặt đang chờ */}
                        {booking.status === 'pending' && (
                          <div className="mt-4">
                            <Space>
                              <Button type="primary" size="small">
                                Xác nhận
                              </Button>
                              <Button danger size="small">
                                Từ chối
                              </Button>
                            </Space>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
}