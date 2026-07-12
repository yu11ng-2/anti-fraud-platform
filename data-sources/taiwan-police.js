const axios = require('axios');
const db = require('../database');

/**
 * 台灣警政署詐騙案件數據源
 * 從官方 API 或網站爬取詐騙案件信息
 */
class TaiwanPoliceDataSource {
  constructor() {
    this.name = '台灣警政署詐騙案件';
    this.baseUrl = 'https://api.police.npa.gov.tw';
  }

  async fetchData() {
    try {
      console.log('正在從台灣警政署獲取詐騙案件數據...');
      // TODO: 實現實際的 API 調用
      const mockData = [
        {
          title: '假冒銀行詐騙集團',
          description: '詐騙集團假冒銀行客服',
          category: 'impersonation',
          phoneNumbers: ['0900123456', '0900123457']
        }
      ];
      return mockData;
    } catch (error) {
      console.error('獲取台灣警政署數據失敗:', error.message);
      return [];
    }
  }

  async updateDatabase(data) {
    try {
      for (const item of data) {
        for (const phone of item.phoneNumbers || []) {
          await db.query(
            `INSERT INTO fraud_cases (title, description, category, source, phone_number, status, reported_at)
             VALUES ($1, $2, $3, $4, $5, $6, NOW())
             ON CONFLICT DO NOTHING`,
            [item.title, item.description, item.category, 'police', phone, 'confirmed']
          );
        }
      }
      console.log(`✅ 已更新 ${data.length} 筆警政署數據`);
    } catch (error) {
      console.error('更新數據失敗:', error.message);
    }
  }
}

module.exports = new TaiwanPoliceDataSource();
