const taiwanPolice = require('./taiwan-police');
const fsc = require('./fsc');
const ccc = require('./ccc');

/**
 * 數據源管理器
 * 定期更新所有公開數據源
 */
class DataSourceManager {
  constructor() {
    this.sources = [
      taiwanPolice,
      fsc,
      ccc
    ];
  }

  async updateAllSources() {
    console.log('\n🔄 開始更新所有數據源...');
    
    for (const source of this.sources) {
      try {
        console.log(`\n📡 正在更新: ${source.name}`);
        const data = await source.fetchData();
        await source.updateDatabase(data);
      } catch (error) {
        console.error(`❌ 更新 ${source.name} 失敗:`, error.message);
      }
    }
    
    console.log('\n✅ 所有數據源更新完成\n');
  }

  async startScheduledUpdates(intervalHours = 24) {
    // 初始更新
    await this.updateAllSources();

    // 定期更新
    setInterval(
      () => this.updateAllSources(),
      intervalHours * 60 * 60 * 1000
    );

    console.log(`📅 已設置每 ${intervalHours} 小時自動更新一次數據源`);
  }
}

module.exports = new DataSourceManager();
