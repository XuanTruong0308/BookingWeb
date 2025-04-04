import { useState } from 'react';
import { Table, Card, Button, Input, Space, Tag, Modal, Form, Upload, InputNumber, Select, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;

interface Service {
  id: string;
  name: string;
  price: number;
}

interface Combo {
  id: string;
  name: string;
  description: string;
  services: Service[];
  originalPrice: number;
  discountedPrice: number;
  image?: string;
  validFrom?: string;
  validTo?: string;
  status: 'active' | 'inactive' | 'upcoming' | 'expired';
  featured: boolean;
}

const mockServices: Service[] = [
  { id: 'SV001', name: 'Trang điểm cô dâu', price: 2500000 },
  { id: 'SV002', name: 'Làm tóc cô dâu', price: 1500000 },
  { id: 'SV003', name: 'Chụp ảnh cưới', price: 5000000 },
  { id: 'SV004', name: 'Thuê váy cưới', price: 3000000 },
];

const mockCombos: Combo[] = [
  {
    id: 'CB001',
    name: 'Combo cô dâu trọn gói',
    description: 'Trọn gói dịch vụ cho cô dâu bao gồm trang điểm, làm tóc và váy cưới',
    services: [
      { id: 'SV001', name: 'Trang điểm cô dâu', price: 2500000 },
      { id: 'SV002', name: 'Làm tóc cô dâu', price: 1500000 },
      { id: 'SV004', name: 'Thuê váy cưới', price: 3000000 },
    ],
    originalPrice: 7000000,
    discountedPrice: 6000000,
    image: '/images/combos/bridal-package.jpg',
    validFrom: '2024-03-01',
    validTo: '2024-12-31',
    status: 'active',
    featured: true,
  },
  // Thêm dữ liệu mẫu khác
];

export default function ServiceCombosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCombo, setEditingCombo] = useState<Combo | null>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Combo',
      key: 'combo',
      render: (record: Combo) => (
        <div className="flex items-center gap-4">
          {record.image && (
            <img
              src={record.image}
              alt={record.name}
              className="w-20 h-20 object-cover rounded"
            />
          )}
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-gray-500 text-sm line-clamp-2">{record.description}</div>
            {record.featured && <Tag color="red">Nổi bật</Tag>}
          </div>
        </div>
      ),
    },
    {
      title: 'Dịch vụ bao gồm',
      key: 'services',
      render: (record: Combo) => (
        <Space direction="vertical">
          {record.services.map(service => (
            <Tag key={service.id}>{service.name}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Giá',
      key: 'price',
      render: (record: Combo) => (
        <div>
          <div className="text-gray-500 line-through">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(record.originalPrice)}
          </div>
          <div className="font-semibold text-primary">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(record.discountedPrice)}
          </div>
          <div className="text-green-500 text-sm">
            Tiết kiệm {Math.round((1 - record.discountedPrice / record.originalPrice) * 100)}%
          </div>
        </div>
      ),
    },
    {
      title: 'Thời hạn',
      key: 'validity',
      render: (record: Combo) => (
        <div className="text-sm">
          <div>Từ: {record.validFrom}</div>
          <div>Đến: {record.validTo}</div>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = {
          active: { color: 'success', text: 'Đang áp dụng' },
          inactive: { color: 'default', text: 'Tạm ngưng' },
          upcoming: { color: 'processing', text: 'Sắp áp dụng' },
          expired: { color: 'error', text: 'Hết hạn' },
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
      render: (record: Combo) => (
        <Space>
          <Button 
            icon={<EditOutlined />}
            onClick={() => {
              setEditingCombo(record);
              form.setFieldsValue({
                ...record,
                validity: [record.validFrom, record.validTo],
              });
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
    maxCount: 1,
    showUploadList: false,
  };

  // Disable dates before today
  const disabledDate: RangePickerProps['disabledDate'] = current => {
    return current && current.valueOf() < Date.now();
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between mb-4">
          <div className="flex gap-4">
            <Input.Search
              placeholder="Tìm kiếm combo"
              style={{ width: 300 }}
            />
            <Select
              placeholder="Trạng thái"
              style={{ width: 200 }}
              allowClear
              options={[
                { value: 'active', label: 'Đang áp dụng' },
                { value: 'inactive', label: 'Tạm ngưng' },
                { value: 'upcoming', label: 'Sắp áp dụng' },
                { value: 'expired', label: 'Hết hạn' },
              ]}
            />
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingCombo(null);
              form.resetFields();
              setIsModalOpen(true);
            }}
          >
            Thêm combo
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={mockCombos}
          rowKey="id"
        />
      </Card>

      <Modal
        title={editingCombo ? 'Chỉnh sửa combo' : 'Thêm combo mới'}
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
          initialValues={{ status: 'active', featured: false }}
        >
          <Form.Item
            name="name"
            label="Tên combo"
            rules={[{ required: true, message: 'Vui lòng nhập tên combo' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="services"
            label="Dịch vụ bao gồm"
            rules={[{ required: true, message: 'Vui lòng chọn ít nhất một dịch vụ' }]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn các dịch vụ"
              options={mockServices.map(service => ({
                label: `${service.name} - ${new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(service.price)}`,
                value: service.id,
              }))}
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="originalPrice"
              label="Giá gốc (VNĐ)"
              rules={[{ required: true, message: 'Vui lòng nhập giá gốc' }]}
            >
              <InputNumber
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              name="discountedPrice"
              label="Giá khuyến mãi (VNĐ)"
              rules={[{ required: true, message: 'Vui lòng nhập giá khuyến mãi' }]}
            >
              <InputNumber
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="validity"
            label="Thời gian áp dụng"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian áp dụng' }]}
          >
            <RangePicker 
              style={{ width: '100%' }}
              disabledDate={disabledDate}
            />
          </Form.Item>

          <Form.Item
            name="image"
            label="Hình ảnh"
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
          >
            <Select
              options={[
                { value: 'active', label: 'Đang áp dụng' },
                { value: 'inactive', label: 'Tạm ngưng' },
                { value: 'upcoming', label: 'Sắp áp dụng' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="featured"
            valuePropName="checked"
          >
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Đánh dấu là combo nổi bật</span>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}