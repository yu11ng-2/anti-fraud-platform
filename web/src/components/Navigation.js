import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  SearchOutlined,
  FileTextOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const Navigation = () => {
  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: <Link to="/">首頁</Link>
    },
    {
      key: '2',
      icon: <SearchOutlined />,
      label: <Link to="/check">風險查詢</Link>
    },
    {
      key: '3',
      icon: <FileTextOutlined />,
      label: <Link to="/reports">舉報記錄</Link>
    },
    {
      key: '4',
      icon: <BarChartOutlined />,
      label: <Link to="/dashboard">數據分析</Link>
    }
  ];

  return (
    <Layout.Header style={{ backgroundColor: '#1890ff' }}>
      <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '0' }}>
        🛡️ 防詐平台
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        items={menuItems}
        style={{ backgroundColor: '#1890ff' }}
      />
    </Layout.Header>
  );
};

export default Navigation;
