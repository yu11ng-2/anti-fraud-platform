const axios = require('axios');
const db = require('../database');

/**
 * 金融監督管理委員會數據源
 * 獲取非法業者警示清單和詐騙警告
 */
class FSCDataSource {
  constructor() {
    this.name = '金融監督管理委員會警示清單';
    this.baseUrl = 'https://www.fsc.gov.tw/api';
  }

  async fetchData() {
    try {
      console.log('正在從金管會獲取非法業者清單...');
      // TODO: 實現實際的 API 調用
      const mockData = [
        {
          company: '假冒投資公司',
          domain: 'fake-investment.com',
          category: 'investment',
          warning: '非法投資詐騙'
        },
        {
          company: '假冒銀行',
          domain: 'fake-bank.com',
          category: 'impersonation',
          warning: '假冒銀行'
        }
      ];
      return mockData;
    } catch (error) {
      console.error('獲取金管會數據失敗:', error.message);
      return [];
    }
  }

  async updateDatabase(data) {
    try {
      for (const item of data) {
        await db.query(
          `INSERT INTO fraud_cases (title, description, category, source, domain, status, reported_at)
           VALUES ($1, $2, $3, $4, $5, $6, NOW())
           ON CONFLICT DO NOTHING`,
          [
            `[金管會警示] ${item.company}`,
            item.warning,
            item.category,
            'fsc',
            item.domain,
            'confirmed'
          ]
        );
      }
      console.log(`✅ 已更新 ${data.length} 筆金管會數據`);
    } catch (error) {
      console.error('更新數據失敗:', error.message);
    }
  }
}

module.exports = new FSCDataSource();
