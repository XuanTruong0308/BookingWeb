import { useState } from 'react';
import { Table, Card, Button, Input, Space, Tag, Modal, Form, Upload, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  servicesCount: number;
  status: 'active' | 'inactive';
  featured: boolean;
}

const mockCategories: Category[] = [
  {
    id: 'CAT001',
    name: 'Trang điểm',
    slug: 'trang-diem',
    description: 'Các dịch vụ trang điểm chuyên nghiệp',
    image: '/images/categories/makeup.jpg',
    servicesCount: 12,
    status: 'active',
    featured: true,
  },
  // Thêm dữ liệu mẫu khác
];

export default function ServiceCategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Danh mục',
      key: 'category',
      render: (record: Category) => (
        <div className="flex items-center gap-4">
          {record.image && (
            <img
              src={record.image}
              alt={record.name}
              className="w-16 h-16 object-cover rounded"
            />
          )}
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-gray-500 text-sm">{record.slug}</div>
            {record.featured && <Tag color="red">Nổi bật</Tag>}
          </div>
        </div>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Số dịch vụ',
      dataIndex: 'servicesCount',
      key: 'servicesCount',
      render: (count: number) => (
        <Tag color="blue">{count} dịch vụ</Tag>
      ),
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
      render: (record: Category) => (
        <Space>
          <Button 
            icon={<EditOutlined />}
            onClick={() => {
              setEditingCategory(record);
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
    maxCount: 1,
    showUploadList: false,
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between mb-4">
          <Input.Search
            placeholder="Tìm kiếm danh mục"
            style={{ width: 300 }}
          />
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingCategory(null);
              form.resetFields();
              setIsModalOpen(true);
            }}
          >
            Thêm danh mục
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={mockCategories}
          rowKey="id"
        />
      </Card>

      <Modal
        title={editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
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
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: 'active', featured: false }}
        >
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
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
            <Switch
              checkedChildren="Hoạt động"
              unCheckedChildren="Tạm ngưng"
              defaultChecked
            />
          </Form.Item>

          <Form.Item
            name="featured"
            label="Đánh dấu nổi bật"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}