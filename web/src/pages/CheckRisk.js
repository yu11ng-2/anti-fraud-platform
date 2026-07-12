import React, { useState } from 'react';
import { Card, Input, Button, Form, Result, Spinner, Space } from 'antd';
import { SearchOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
import axios from 'axios';

const CheckRisk = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCheck = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/fraud/check-risk`,
        values
      );
      setResult(response.data);
    } catch (error) {
      setResult({
        error: error.message || '查詢失敗',
        input: values.phoneNumber || values.domain
      });
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Card title="🔍 風險查詢" style={{ marginBottom: '20px' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCheck}
        >
          <Form.Item
            label="電話號碼"
            name="phoneNumber"
          >
            <Input
              placeholder="輸入電話號碼"
              prefix={<PhoneOutlined />}
            />
          </Form.Item>

          <Form.Item
            label="或網域"
            name="domain"
          >
            <Input
              placeholder="輸入可疑網域"
              prefix={<GlobalOutlined />}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<SearchOutlined />}
            block
          >
            查詢風險
          </Button>
        </Form>
      </Card>

      {result && (
        <Card title="查詢結果">
          {result.error ? (
            <Result
              status="error"
              title="查詢失敗"
              subTitle={result.error}
            />
          ) : (
            <div>
              <p><strong>輸入:</strong> {result.input}</p>
              <p><strong>風險分數:</strong> {result.riskScore}/100</p>
              <p>
                <strong>風險等級:</strong>
                <span style={{
                  color: result.riskLevel === 'high' ? '#ff4d4f' : result.riskLevel === 'medium' ? '#faad14' : '#52c41a',
                  marginLeft: '8px'
                }}>
                  {result.riskLevel === 'high' ? '⚠️ 高風險' : result.riskLevel === 'medium' ? '⚡ 中風險' : '✅ 低風險'}
                </span>
              </p>
              <p><strong>查詢時間:</strong> {new Date(result.timestamp).toLocaleString()}</p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default CheckRisk;
