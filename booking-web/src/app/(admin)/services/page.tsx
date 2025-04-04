import { useState } from 'react';
import { Table, Card, Button, Input, Select, Space, Tag, Image, Modal, Form, Upload, InputNumber } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  images: string[];
  status: 'active' | 'inactive';
  isPopular: boolean;
}

const mockServices: Service[] = [
  {
    id: 'SV001',
    name: 'Trang điểm cô dâu',
    category: 'makeup',
    description: 'Dịch vụ trang điểm chuyên nghiệp cho cô dâu',
    price: 2500000,
    duration: 120,
    images: ['/images/services/bridal-makeup-1.jpg'],
    status: 'active',
    isPopular: true,
  },
  // Thêm dữ liệu mẫu khác
];

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Dịch vụ',
      key: 'service',
      render: (record: Service) => (
        <div className="flex items-center gap-4">
          <Image
            src={record.images[0]}
            alt={record.name}
            className="rounded"
            width={80}
            height={80}
            fallback="data:image/png;base64,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"
          />
          <div>
            <div className="font-medium">{record.name}</div>
            <Tag color="blue">{record.category}</Tag>
            {record.isPopular && <Tag color="red">Phổ biến</Tag>}
          </div>
        </div>
      )
    },
    {
      title: 'Thời gian',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => `${duration} phút`,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => 
        new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(price),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? 'Đang hoạt động' : 'Tạm ngưng'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (record: Service) => (
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
            danger 
            icon={<DeleteOutlined />}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const uploadProps: UploadProps = {
    name: 'image',
    action: '/api/upload',
    listType: 'picture-card',
    maxCount: 5,
    multiple: true,
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between mb-4">
          <div className="flex gap-4">
            <Input
              placeholder="Tìm kiếm dịch vụ"
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
            />
            <Select
              placeholder="Danh mục"
              style={{ width: 200 }}
              allowClear
              options={[
                { value: 'makeup', label: 'Trang điểm' },
                { value: 'dress', label: 'Váy cưới' },
                { value: 'photo', label: 'Chụp ảnh' },
              ]}
            />
            <Select
              placeholder="Trạng thái"
              style={{ width: 200 }}
              allowClear
              options={[
                { value: 'active', label: 'Đang hoạt động' },
                { value: 'inactive', label: 'Tạm ngưng' },
              ]}
            />
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingService(null);
              form.resetFields();
              setIsModalOpen(true);
            }}
          >
            Thêm dịch vụ
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={mockServices}
          rowKey="id"
        />
      </Card>

      <Modal
        title={editingService ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}
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
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: 'active' }}
        >
          <Form.Item
            name="name"
            label="Tên dịch vụ"
            rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="Danh mục"
            rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
          >
            <Select
              options={[
                { value: 'makeup', label: 'Trang điểm' },
                { value: 'dress', label: 'Váy cưới' },
                { value: 'photo', label: 'Chụp ảnh' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="price"
              label="Giá (VNĐ)"
              rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
            >
              <InputNumber
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              name="duration"
              label="Thời gian thực hiện (phút)"
              rules={[{ required: true, message: 'Vui lòng nhập thời gian' }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <Form.Item
            name="images"
            label="Hình ảnh"
            valuePropName="fileList"
          >
            <Upload {...uploadProps}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
          >
            <Select
              options={[
                { value: 'active', label: 'Đang hoạt động' },
                { value: 'inactive', label: 'Tạm ngưng' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="isPopular"
            valuePropName="checked"
          >
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Đánh dấu là dịch vụ phổ biến</span>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}