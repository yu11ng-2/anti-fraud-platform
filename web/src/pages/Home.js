import React from 'react';
import { Card, Button, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined, FileTextOutlined, BarChartOutlined } from '@ant-design/icons';

const Home = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <Card
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          marginBottom: '30px',
          borderRadius: '8px'
        }}
      >
        <Typography.Title level={1} style={{ color: 'white', marginBottom: '10px' }}>
          🛡️ 防詐平台
        </Typography.Title>
        <Typography.Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
          利用公開數據源和社群智慧，幫助台灣民眾防範詐騙。
        </Typography.Paragraph>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <Card hoverable>
          <SearchOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '10px' }} />
          <Typography.Title level={3}>風險查詢</Typography.Title>
          <Typography.Paragraph>
            查詢電話號碼或網域是否存在詐騙風險。
          </Typography.Paragraph>
          <Link to="/check">
            <Button type="primary">立即查詢</Button>
          </Link>
        </Card>

        <Card hoverable>
          <FileTextOutlined style={{ fontSize: '32px', color: '#52c41a', marginBottom: '10px' }} />
          <Typography.Title level={3}>舉報記錄</Typography.Title>
          <Typography.Paragraph>
            查看社群舉報的詐騙案件和詐騙手法。
          </Typography.Paragraph>
          <Link to="/reports">
            <Button type="primary">查看舉報</Button>
          </Link>
        </Card>

        <Card hoverable>
          <BarChartOutlined style={{ fontSize: '32px', color: '#faad14', marginBottom: '10px' }} />
          <Typography.Title level={3}>數據分析</Typography.Title>
          <Typography.Paragraph>
            查看詐騙趨勢分析和數據統計。
          </Typography.Paragraph>
          <Link to="/dashboard">
            <Button type="primary">查看數據</Button>
          </Link>
        </Card>
      </div>

      <Card style={{ marginTop: '30px' }}>
        <Typography.Title level={2}>📊 數據來源</Typography.Title>
        <ul>
          <li>🏛️ 台灣警政署詐騙案件數據</li>
          <li>💰 金融監督管理委員會警示清單</li>
          <li>🛍️ 消費者保護委員會投訴統計</li>
          <li>👥 社群用戶舉報</li>
        </ul>
      </Card>
    </div>
  );
};

export default Home;
