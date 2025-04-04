import { Card, Form, Input, Button, Upload, message, Tabs, Row, Col, Avatar } from 'antd';
import { UserOutlined, CameraOutlined, LockOutlined, BellOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';

const { TabPane } = Tabs;

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {
  const [profileForm] = Form.useForm<ProfileFormData>();
  const [passwordForm] = Form.useForm<PasswordFormData>();
  interface User {
    name: string;
    email: string;
    avatar?: string; // Add the 'avatar' property to the User type
  }
  
  const user = useSelector((state: RootState) => state.auth.user as User);

  const uploadProps: UploadProps = {
    name: 'avatar',
    action: '/api/upload',
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'done') {
        message.success('Avatar uploaded successfully');
      } else if (info.file.status === 'error') {
        message.error('Avatar upload failed');
      }
    },
  };

  const handleProfileSubmit = (values: ProfileFormData) => {
    console.log('Profile update:', values);
    message.success('Thông tin cá nhân đã được cập nhật');
  };

  const handlePasswordSubmit = (values: PasswordFormData) => {
    console.log('Password update:', values);
    message.success('Mật khẩu đã được thay đổi');
    passwordForm.resetFields();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card className="text-center">
            <div className="mb-4 relative inline-block">
              <Avatar size={120} src={user?.avatar} icon={<UserOutlined />} />
              <Upload {...uploadProps}>
                <Button 
                  type="primary" 
                  shape="circle" 
                  icon={<CameraOutlined />}
                  size="small"
                  className="absolute bottom-0 right-0"
                />
              </Upload>
            </div>
            <h2 className="text-xl font-semibold mb-2">{user?.name}</h2>
            <p className="text-gray-500 mb-4">{user?.email}</p>
            <div className="text-left space-y-4">
              <div>
                <h3 className="font-medium mb-2">Tổng số lần đặt lịch</h3>
                <p>15 lần</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Thành viên từ</h3>
                <p>Tháng 3, 2024</p>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card>
            <Tabs defaultActiveKey="profile">
              <TabPane 
                tab={<span><UserOutlined />Thông tin cá nhân</span>}
                key="profile"
              >
                <Form
                  form={profileForm}
                  layout="vertical"
                  onFinish={handleProfileSubmit}
                  initialValues={{
                    name: user?.name,
                    email: user?.email,
                    phone: '0123456789',
                    address: '123 Đường ABC, Quận XYZ, TP.HCM',
                  }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="name"
                        label="Họ và tên"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: 'Vui lòng nhập email' },
                          { type: 'email', message: 'Email không hợp lệ' }
                        ]}
                      >
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="address"
                        label="Địa chỉ"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Button type="primary" htmlType="submit">
                    Cập nhật thông tin
                  </Button>
                </Form>
              </TabPane>

              <TabPane 
                tab={<span><LockOutlined />Đổi mật khẩu</span>}
                key="password"
              >
                <Form
                  form={passwordForm}
                  layout="vertical"
                  onFinish={handlePasswordSubmit}
                >
                  <Form.Item
                    name="currentPassword"
                    label="Mật khẩu hiện tại"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="newPassword"
                    label="Mật khẩu mới"
                    rules={[
                      { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                      { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label="Xác nhận mật khẩu mới"
                    dependencies={['newPassword']}
                    rules={[
                      { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Button type="primary" htmlType="submit">
                    Đổi mật khẩu
                  </Button>
                </Form>
              </TabPane>

              <TabPane 
                tab={<span><BellOutlined />Thông báo</span>}
                key="notifications"
              >
                <Form layout="vertical">
                  <Form.Item
                    name="emailNotifications"
                    valuePropName="checked"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <input type="checkbox" className="mt-1" id="booking" />
                        <label htmlFor="booking" className="ml-2">
                          <div className="font-medium">Thông báo đặt lịch</div>
                          <div className="text-gray-500">Nhận email khi có xác nhận hoặc thay đổi lịch hẹn</div>
                        </label>
                      </div>

                      <div className="flex items-start">
                        <input type="checkbox" className="mt-1" id="promotion" />
                        <label htmlFor="promotion" className="ml-2">
                          <div className="font-medium">Khuyến mãi</div>
                          <div className="text-gray-500">Nhận thông tin về các chương trình khuyến mãi</div>
                        </label>
                      </div>

                      <div className="flex items-start">
                        <input type="checkbox" className="mt-1" id="news" />
                        <label htmlFor="news" className="ml-2">
                          <div className="font-medium">Tin tức & Cập nhật</div>
                          <div className="text-gray-500">Nhận thông tin về các dịch vụ mới và tin tức</div>
                        </label>
                      </div>
                    </div>
                  </Form.Item>

                  <Button type="primary">
                    Lưu cài đặt
                  </Button>
                </Form>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
}