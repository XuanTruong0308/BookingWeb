import { Typography, Form, Input, Button, Row, Col, Card, Space } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [form] = Form.useForm<ContactFormData>();

  const handleSubmit = (values: ContactFormData) => {
    console.log('Form submitted:', values);
    // Handle form submission
    form.resetFields();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Title>Liên hệ với chúng tôi</Title>
        <Paragraph className="text-gray-500">
          Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn sớm nhất có thể
        </Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={16}>
          <Card title="Gửi tin nhắn cho chúng tôi" className="mb-8">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="name"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                  >
                    <Input placeholder="Nhập họ và tên" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập email' },
                      { type: 'email', message: 'Email không hợp lệ' }
                    ]}
                  >
                    <Input placeholder="Nhập email" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                  >
                    <Input placeholder="Nhập số điện thoại" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="subject"
                    label="Chủ đề"
                    rules={[{ required: true, message: 'Vui lòng nhập chủ đề' }]}
                  >
                    <Input placeholder="Nhập chủ đề" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="message"
                label="Nội dung"
                rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
              >
                <TextArea 
                  rows={6}
                  placeholder="Nhập nội dung tin nhắn"
                />
              </Form.Item>

              <Button type="primary" htmlType="submit" size="large">
                Gửi tin nhắn
              </Button>
            </Form>
          </Card>

          {/* Map */}
          <Card title="Vị trí của chúng tôi">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1254674787323!2d106.71244071533454!3d10.801617261697442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ4JzA1LjgiTiAxMDbCsDQyJzUyLjAiRQ!5e0!3m2!1svi!2s!4v1635825546800!5m2!1svi!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          {/* Contact Info */}
          <Card title="Thông tin liên hệ">
            <Space direction="vertical" size="large" className="w-full">
              <div>
                <h3 className="font-medium flex items-center mb-2">
                  <EnvironmentOutlined className="mr-2" /> Địa chỉ
                </h3>
                <p className="text-gray-600">
                  123 Đường ABC, Quận 1<br />
                  TP. Hồ Chí Minh
                </p>
              </div>

              <div>
                <h3 className="font-medium flex items-center mb-2">
                  <PhoneOutlined className="mr-2" /> Điện thoại
                </h3>
                <p className="text-gray-600">
                  Hotline: (84) 123-456-789<br />
                  Support: (84) 987-654-321
                </p>
              </div>

              <div>
                <h3 className="font-medium flex items-center mb-2">
                  <MailOutlined className="mr-2" /> Email
                </h3>
                <p className="text-gray-600">
                  info@example.com<br />
                  support@example.com
                </p>
              </div>

              <div>
                <h3 className="font-medium flex items-center mb-2">
                  <ClockCircleOutlined className="mr-2" /> Giờ làm việc
                </h3>
                <p className="text-gray-600">
                  Thứ 2 - Thứ 7: 9:00 - 20:00<br />
                  Chủ nhật: 10:00 - 18:00
                </p>
              </div>
            </Space>
          </Card>

          {/* FAQ Preview */}
          <Card title="Câu hỏi thường gặp" className="mt-8">
            <Space direction="vertical" className="w-full">
              <Button type="link" className="text-left px-0 hover:text-primary">
                Làm thế nào để đặt lịch dịch vụ?
              </Button>
              <Button type="link" className="text-left px-0 hover:text-primary">
                Chính sách hoàn tiền như thế nào?
              </Button>
              <Button type="link" className="text-left px-0 hover:text-primary">
                Có thể thanh toán bằng những hình thức nào?
              </Button>
              <Button type="link" className="text-left px-0 hover:text-primary">
                Thời gian xử lý đơn đặt lịch là bao lâu?
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}