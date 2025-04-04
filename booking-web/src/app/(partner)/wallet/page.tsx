import { useState } from 'react';
import { Card, Row, Col, Statistic, Table, Button, Modal, Form, InputNumber, Input, Tag, Space, Tabs, Alert } from 'antd';
import { WalletOutlined, ArrowUpOutlined, BankOutlined, TransactionOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface WalletStats {
  balance: number;
  totalEarned: number;
  pendingAmount: number;
  totalWithdrawn: number;
}

interface Transaction {
  id: string;
  type: 'earning' | 'withdrawal';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  description: string;
  reference?: string;
}

interface WithdrawalRequest {
  id: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  bankAccount: string;
  note?: string;
}

const mockWalletStats: WalletStats = {
  balance: 15000000,
  totalEarned: 45000000,
  pendingAmount: 5000000,
  totalWithdrawn: 25000000,
};

const mockTransactions: Transaction[] = [
  {
    id: 'TRX001',
    type: 'earning',
    amount: 2500000,
    status: 'completed',
    date: '2024-03-20 09:00',
    description: 'Thanh toán cho dịch vụ #BK001',
    reference: 'BK001'
  },
  // More transactions...
];

const mockWithdrawals: WithdrawalRequest[] = [
  {
    id: 'WD001',
    amount: 5000000,
    status: 'approved',
    date: '2024-03-15',
    bankAccount: '******************1234',
    note: 'Rút tiền về tài khoản ngân hàng'
  },
  // More withdrawals...
];

const transactionColumns: ColumnsType<Transaction> = [
  {
    title: 'Ngày',
    dataIndex: 'date',
    key: 'date',
    render: (date) => new Date(date).toLocaleString('vi-VN'),
  },
  {
    title: 'Loại giao dịch',
    key: 'type',
    render: (_, record) => (
      <Tag color={record.type === 'earning' ? 'success' : 'processing'}>
        {record.type === 'earning' ? 'Thu nhập' : 'Rút tiền'}
      </Tag>
    ),
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Số tiền',
    key: 'amount',
    align: 'right',
    render: (_, record) => (
      <span className={record.type === 'withdrawal' ? 'text-red-500' : 'text-green-500'}>
        {record.type === 'withdrawal' ? '-' : '+'}
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(record.amount)}
      </span>
    ),
  },
  {
    title: 'Trạng thái',
    key: 'status',
    render: (_, record) => {
      const statusConfig = {
        pending: { color: 'processing', text: 'Đang xử lý' },
        completed: { color: 'success', text: 'Hoàn thành' },
        failed: { color: 'error', text: 'Thất bại' },
      };
      const config = statusConfig[record.status];
      return <Tag color={config.color}>{config.text}</Tag>;
    },
  },
];

const withdrawalColumns: ColumnsType<WithdrawalRequest> = [
  {
    title: 'Ngày yêu cầu',
    dataIndex: 'date',
    key: 'date',
    render: (date) => new Date(date).toLocaleString('vi-VN'),
  },
  {
    title: 'Số tiền',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right',
    render: (amount) => new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount),
  },
  {
    title: 'Tài khoản',
    dataIndex: 'bankAccount',
    key: 'bankAccount',
  },
  {
    title: 'Trạng thái',
    key: 'status',
    render: (_, record) => {
      const statusConfig = {
        pending: { color: 'processing', text: 'Đang xử lý' },
        approved: { color: 'success', text: 'Đã duyệt' },
        rejected: { color: 'error', text: 'Từ chối' },
      };
      const config = statusConfig[record.status];
      return <Tag color={config.color}>{config.text}</Tag>;
    },
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    key: 'note',
  },
];

export default function WalletPage() {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawForm] = Form.useForm();

  const handleWithdraw = (values: any) => {
    console.log('Withdrawal request:', values);
    setIsWithdrawModalOpen(false);
    withdrawForm.resetFields();
  };

  return (
    <div className="space-y-6">
      {/* Wallet Overview */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Số dư khả dụng"
              value={mockWalletStats.balance}
              precision={0}
              prefix={<WalletOutlined />}
              suffix="đ"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
            <Button 
              type="primary" 
              className="mt-4" 
              block
              onClick={() => setIsWithdrawModalOpen(true)}
            >
              Rút tiền
            </Button>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng thu nhập"
              value={mockWalletStats.totalEarned}
              precision={0}
              prefix={<ArrowUpOutlined />}
              suffix="đ"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đang chờ xử lý"
              value={mockWalletStats.pendingAmount}
              precision={0}
              prefix={<TransactionOutlined />}
              suffix="đ"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đã rút"
              value={mockWalletStats.totalWithdrawn}
              precision={0}
              prefix={<BankOutlined />}
              suffix="đ"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Card>
        </Col>
      </Row>

      {/* Bank Account Alert */}
      <Alert
        message="Thông tin tài khoản ngân hàng"
        description={
          <Space direction="vertical">
            <div>
              <strong>Ngân hàng:</strong> Vietcombank
            </div>
            <div>
              <strong>Số tài khoản:</strong> ******************1234
            </div>
            <div>
              <strong>Chủ tài khoản:</strong> NGUYEN VAN A
            </div>
            <Button type="link" className="p-0">Thay đổi tài khoản</Button>
          </Space>
        }
        type="info"
        showIcon
      />

      {/* Transactions & Withdrawals */}
      <Card>
        <Tabs defaultActiveKey="transactions">
          <Tabs.TabPane tab="Lịch sử giao dịch" key="transactions">
            <Table
              columns={transactionColumns}
              dataSource={mockTransactions}
              rowKey="id"
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Lịch sử rút tiền" key="withdrawals">
            <Table
              columns={withdrawalColumns}
              dataSource={mockWithdrawals}
              rowKey="id"
            />
          </Tabs.TabPane>
        </Tabs>
      </Card>

      {/* Withdrawal Modal */}
      <Modal
        title="Yêu cầu rút tiền"
        open={isWithdrawModalOpen}
        onOk={() => withdrawForm.submit()}
        onCancel={() => {
          setIsWithdrawModalOpen(false);
          withdrawForm.resetFields();
        }}
      >
        <Form
          form={withdrawForm}
          layout="vertical"
          onFinish={handleWithdraw}
        >
          <Alert
            message={`Số dư khả dụng: ${new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(mockWalletStats.balance)}`}
            className="mb-4"
          />

          <Form.Item
            name="amount"
            label="Số tiền rút"
            rules={[
              { required: true, message: 'Vui lòng nhập số tiền' },
              { 
                validator: (_, value) => 
                  value > 0 && value <= mockWalletStats.balance 
                    ? Promise.resolve()
                    : Promise.reject(new Error('Số tiền không hợp lệ'))
              }
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => parseFloat(value!.replace(/\$\s?|(,*)/g, '')) || 0}
              min={100000}
              max={mockWalletStats.balance}
            />
          </Form.Item>

          <Form.Item
            name="note"
            label="Ghi chú (không bắt buộc)"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}