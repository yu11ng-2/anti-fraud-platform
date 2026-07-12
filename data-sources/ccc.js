const db = require('../database');

/**
 * 消費者保護委員會數據源
 * 獲取消費者投訴和詐騙統計數據
 */
class CCCDataSource {
  constructor() {
    this.name = '消費者保護委員會投訴統計';
  }

  async fetchData() {
    try {
      console.log('正在從消保會獲取投訴統計...');
      // TODO: 實現實際的數據爬取
      const mockData = [
        {
          type: '線上購物詐騙',
          count: 1234,
          category: 'ecommerce',
          description: '線上購物平台詐騙'
        },
        {
          type: '假冒官方機構',
          count: 856,
          category: 'impersonation',
          description: '假冒政府機構或企業'
        }
      ];
      return mockData;
    } catch (error) {
      console.error('獲取消保會數據失敗:', error.message);
      return [];
    }
  }

  async updateDatabase(data) {
    try {
      for (const item of data) {
        await db.query(
          `INSERT INTO fraud_cases (title, description, category, source, status, reported_at)
           VALUES ($1, $2, $3, $4, $5, NOW())
           ON CONFLICT DO NOTHING`,
          [
            `[消保會統計] ${item.type}`,
            `${item.description} (投訴數: ${item.count})`,
            item.category,
            'consumer',
            'confirmed'
          ]
        );
      }
      console.log(`✅ 已更新 ${data.length} 筆消保會數據`);
    } catch (error) {
      console.error('更新數據失敗:', error.message);
    }
  }
}

module.exports = new CCCDataSource();
