# 貢獻指南

感謝您對防詐平台的興趣！我們很高興能與您合作。

## 📋 行為準則

本項目採用貢獻者盟約。參與本項目即表示您同意遵守其條款。

## 🚀 開始貢獻

### 1. 設置開發環境

```bash
# Fork 和克隆倉庫
git clone https://github.com/YOUR_USERNAME/anti-fraud-platform.git
cd anti-fraud-platform

# 添加上游倉庫
git remote add upstream https://github.com/yu11ng-2/anti-fraud-platform.git

# 安裝依賴
npm install
cd backend && npm install
cd ../web && npm install
cd ../mobile && npm install
```

### 2. 創建功能分支

```bash
# 更新主分支
git checkout main
git pull upstream main

# 創建功能分支
git checkout -b feature/your-feature-name
```

### 3. 進行更改

- 編寫代碼
- 添加測試
- 更新文檔
- 運行格式化工具

```bash
# 格式化代碼
npm run format

# 運行 linter
npm run lint

# 運行測試
npm test
```

### 4. 提交更改

```bash
# 提交更改
git add .
git commit -m "feat: 添加新功能的簡短描述"

# 推送到您的 fork
git push origin feature/your-feature-name
```

### 5. 創建 Pull Request

在 GitHub 上創建 PR，提供：
- 清晰的描述
- 相關的問題鏈接
- 測試結果截圖（如果適用）

## 📝 代碼規範

### JavaScript/TypeScript

```javascript
// ✅ 好的做法
const checkFraud = async (input) => {
  try {
    const result = await api.check(input);
    return result;
  } catch (error) {
    console.error('Error checking fraud:', error);
    throw error;
  }
};

// ❌ 避免
function checkFraud(input) {
  let result = api.check(input);
  return result;
}
```

### 提交信息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: 新功能
- `fix`: 錯誤修復
- `docs`: 文檔更改
- `style`: 代碼風格（無邏輯變化）
- `refactor`: 重構
- `perf`: 性能優化
- `test`: 測試
- `chore`: 構建過程、依賴管理

**Examples**:
```
feat(api): 添加風險查詢端點
fix(mobile): 修復風險評分顯示問題
docs(readme): 更新安裝說明
```

## 🧪 測試要求

所有新功能必須包含測試：

```javascript
describe('checkFraud', () => {
  it('should return high risk for known fraud numbers', async () => {
    const result = await checkFraud('09xxxxxxxx');
    expect(result.riskLevel).toBe('high');
  });

  it('should return low risk for safe numbers', async () => {
    const result = await checkFraud('02xxxxxxxx');
    expect(result.riskLevel).toBe('low');
  });
});
```

## 📚 文檔

更新相關文檔：

- API 更改 → 更新 `docs/API_DOCS.md`
- 新功能 → 更新 `README.md`
- 配置更改 → 更新 `.env.example`

## 🐛 報告錯誤

使用 GitHub Issues 報告錯誤，提供：

1. **描述**: 清晰的問題描述
2. **重現步驟**: 如何重現錯誤
3. **預期行為**: 應該發生什麼
4. **實際行為**: 實際發生了什麼
5. **環境**: OS, 瀏覽器, Node 版本等

```markdown
## 錯誤描述
風險查詢返回 500 錯誤

## 重現步驟
1. 打開應用
2. 輸入電話號碼
3. 點擊查詢

## 預期行為
應顯示風險評分

## 實際行為
顯示 500 Server Error

## 環境
- OS: macOS 12.0
- Node: 16.0
- 瀏覽器: Chrome 100
```

## 🎯 特性請求

提交特性請求時，請提供：

1. **用例**: 為什麼需要此功能
2. **建議實現**: 您的想法
3. **替代方案**: 其他可能的解決方案

## 📞 需要幫助？

- 查看 [FAQ](./FAQ.md)
- 查看 [討論](https://github.com/yu11ng-2/anti-fraud-platform/discussions)
- 聯系維護者

感謝您的貢獻！🎉
