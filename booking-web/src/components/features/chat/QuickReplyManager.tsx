import { useState } from 'react';
import { Modal, Form, Input, Select, Button, Table, Space, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface QuickReply {
  id: string;
  content: string;
  category: string;
}

interface QuickReplyManagerProps {
  open: boolean;
  onClose: () => void;
}

const categories = [
  { value: 'greeting', label: 'Chào hỏi' },
  { value: 'inquiry', label: 'Tư vấn' },
  { value: 'booking', label: 'Đặt lịch' },
  { value: 'price', label: 'Báo giá' },
  { value: 'promotion', label: 'Khuyến mãi' },
  { value: 'other', label: 'Khác' },
];

// Mock data for quick reply templates
const mockTemplates: QuickReply[] = [
  {
    id: '1',
    content: 'Xin chào! Cảm ơn bạn đã quan tâm đến dịch vụ của chúng tôi.',
    category: 'greeting',
  },
  // More templates...
];

export default function QuickReplyManager({ open, onClose }: QuickReplyManagerProps) {
  const [form] = Form.useForm();
  const [editingTemplate, setEditingTemplate] = useState<QuickReply | null>(null);
  const [templates, setTemplates] = useState<QuickReply[]>(mockTemplates);

  const handleSubmit = (values: any) => {
    if (editingTemplate) {
      // Update existing template
      setTemplates(prev => 
        prev.map(t => t.id === editingTemplate.id ? { ...t, ...values } : t)
      );
    } else {
      // Add new template
      setTemplates(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          ...values,
        },
      ]);
    }
    form.resetFields();
    setEditingTemplate(null);
  };

  const handleDelete = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  const columns: ColumnsType<QuickReply> = [
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      render: (text) => (
        <div className="max-w-lg truncate">{text}</div>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        const cat = categories.find(c => c.value === category);
        return <Tag>{cat?.label || category}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingTemplate(record);
              form.setFieldsValue(record);
            }}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Modal
      title="Quản lý mẫu câu trả lời nhanh"
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="space-y-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <div className="flex gap-4">
            <Form.Item
              name="category"
              label="Danh mục"
              rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
              className="w-48"
            >
              <Select options={categories} />
            </Form.Item>

            <Form.Item
              name="content"
              label="Nội dung"
              rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
              className="flex-1"
            >
              <Input.TextArea rows={2} />
            </Form.Item>

            <Form.Item className="flex items-end">
              <Button
                type="primary"
                htmlType="submit"
                icon={editingTemplate ? <EditOutlined /> : <PlusOutlined />}
              >
                {editingTemplate ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </Form.Item>
          </div>
        </Form>

        <Table
          columns={columns}
          dataSource={templates}
          rowKey="id"
          pagination={false}
          scroll={{ y: 400 }}
        />
      </div>
    </Modal>
  );
}