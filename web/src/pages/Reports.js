import React, { useState, useEffect } from 'react';
import { Card, List, Empty, Tag, Button, Space } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/reports`
      );
      setReports(response.data.reports || []);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    }
    setLoading(false);
  };

  const categoryMap = {
    'impersonation': '冒充詐騙',
    'phishing': '釣魚詐騙',
    'investment': '投資詐騙',
    'romance': '感情詐騙',
    'other': '其他'
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <Card title="📋 舉報記錄" loading={loading}>
        {reports.length === 0 ? (
          <Empty description="暫無舉報記錄" />
        ) : (
          <List
            dataSource={reports}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="text" danger icon={<DeleteOutlined />}>
                    刪除
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<ExclamationCircleOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />}
                  title={item.title}
                  description={
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <span>{item.description}</span>
                      <div>
                        <Tag color="red">{categoryMap[item.category] || item.category}</Tag>
                        <span style={{ marginLeft: '10px', color: '#999' }}>
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default Reports;
