import { useState } from 'react';
import { Form, Steps, Button, Select, DatePicker, TimePicker, Input, Card, Row, Col } from 'antd';
import { CalendarOutlined, UserOutlined, CreditCardOutlined, CheckCircleOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import locale from 'antd/lib/date-picker/locale/vi_VN';

const { Step } = Steps;

interface BookingFormData {
  services: string[];
  date: Dayjs;
  time: Dayjs;
  specialist?: string;
  location: string;
  notes?: string;
  paymentMethod: string;
}

export default function NewBookingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm<BookingFormData>();
  
  const next = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = (values: BookingFormData) => {
    console.log('Success:', values);
    // Xử lý đặt lịch
  };

  const steps = [
    {
      title: 'Chọn dịch vụ',
      icon: <CalendarOutlined />,
      content: (
        <div className="max-w-2xl mx-auto">
          <Form.Item
            name="services"
            label="Dịch vụ"
            rules={[{ required: true, message: 'Vui lòng chọn ít nhất một dịch vụ' }]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn dịch vụ bạn muốn đặt"
              options={[
                { label: 'Trang điểm cô dâu', value: 'bridal-makeup' },
                { label: 'Trang điểm dự tiệc', value: 'party-makeup' },
                { label: 'Chụp ảnh cưới', value: 'wedding-photo' },
                { label: 'Thuê váy cưới', value: 'wedding-dress' },
              ]}
            />
          </Form.Item>
        </div>
      ),
    },
    {
      title: 'Chọn thời gian',
      icon: <UserOutlined />,
      content: (
        <div className="max-w-2xl mx-auto">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="date"
                label="Ngày"
                rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
              >
                <DatePicker 
                  locale={locale}
                  className="w-full"
                  disabledDate={current => current.isBefore(new Date(), 'day')}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="time"
                label="Giờ"
                rules={[{ required: true, message: 'Vui lòng chọn giờ' }]}
              >
                <TimePicker 
                  locale={locale}
                  className="w-full"
                  format="HH:mm"
                  minuteStep={30}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="specialist"
            label="Chuyên viên"
          >
            <Select
              placeholder="Chọn chuyên viên (không bắt buộc)"
              allowClear
              options={[
                { label: 'Anna Nguyễn', value: 'anna' },
                { label: 'Linda Trần', value: 'linda' },
                { label: 'Mary Phạm', value: 'mary' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="location"
            label="Địa điểm"
            rules={[{ required: true, message: 'Vui lòng chọn địa điểm' }]}
          >
            <Select
              placeholder="Chọn địa điểm thực hiện dịch vụ"
              options={[
                { label: 'Tại cửa hàng', value: 'store' },
                { label: 'Tại nhà', value: 'home' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="notes"
            label="Ghi chú"
          >
            <Input.TextArea 
              placeholder="Ghi chú thêm về yêu cầu của bạn"
              rows={4}
            />
          </Form.Item>
        </div>
      ),
    },
    {
      title: 'Thanh toán',
      icon: <CreditCardOutlined />,
      content: (
        <div className="max-w-2xl mx-auto">
          <Card className="mb-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Tổng tiền dịch vụ:</span>
                <span className="font-semibold">2,500,000đ</span>
              </div>
              <div className="flex justify-between">
                <span>Phí đi lại:</span>
                <span className="font-semibold">100,000đ</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Tổng cộng:</span>
                <span className="text-primary">2,600,000đ</span>
              </div>
            </div>
          </Card>

          <Form.Item
            name="paymentMethod"
            label="Phương thức thanh toán"
            rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}
          >
            <Select
              placeholder="Chọn phương thức thanh toán"
              options={[
                { label: 'Thanh toán khi sử dụng dịch vụ', value: 'cod' },
                { label: 'Chuyển khoản ngân hàng', value: 'bank' },
                { label: 'Ví điện tử MoMo', value: 'momo' },
                { label: 'Ví điện tử ZaloPay', value: 'zalopay' },
              ]}
            />
          </Form.Item>
        </div>
      ),
    },
    {
      title: 'Hoàn tất',
      icon: <CheckCircleOutlined />,
      content: (
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircleOutlined className="text-6xl text-green-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Đặt lịch thành công!</h2>
          <p className="text-gray-600 mb-8">
            Chúng tôi đã nhận được yêu cầu đặt lịch của bạn và sẽ liên hệ xác nhận trong thời gian sớm nhất.
          </p>
          <Button type="primary" size="large">
            Xem lịch hẹn của tôi
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <Steps current={currentStep} className="mb-8">
          {steps.map(item => (
            <Step key={item.title} title={item.title} icon={item.icon} />
          ))}
        </Steps>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="mb-8"
        >
          {steps[currentStep].content}
        </Form>

        <div className="flex justify-end gap-4">
          {currentStep > 0 && (
            <Button onClick={prev}>
              Quay lại
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              Tiếp tục
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" onClick={() => form.submit()}>
              Xác nhận đặt lịch
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}