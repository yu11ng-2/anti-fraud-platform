import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { RiseOutlined, FallOutlined, UsersOutlined, AlertOutlined } from '@ant-design/icons';

const Dashboard = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <Card title="📊 數據分析儀表板">
        <Row gutter={16}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="本月舉報數"
                value={1234}
                prefix={<AlertOutlined />}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="高風險號碼"
                value={856}
                prefix={<RiseOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="活躍用戶"
                value={5432}
                prefix={<UsersOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="月同比"
                value={12.5}
                suffix="%"
                prefix={<FallOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>
      </Card>

      <Card style={{ marginTop: '20px' }} title="詐騙類型分布">
        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
          圖表數據加載中...
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
