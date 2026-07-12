# 🛡️ 防詐平台 (Anti-Fraud Platform)

**一個綜合性的防詐解決方案，利用公開數據源和社群智慧幫助台灣民眾防範詐騙。**

![Project Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Contributors](https://img.shields.io/badge/contributors-1-orange)

---

## 📋 目錄

- [功能特性](#功能特性)
- [技術架構](#技術架構)
- [快速開始](#快速開始)
- [數據來源](#數據來源)
- [項目結構](#項目結構)
- [API 文檔](#api-文檔)
- [貢獻指南](#貢獻指南)
- [許可證](#許可證)

---

## ✨ 功能特性

### 🔍 風險查詢
- 查詢電話號碼是否存在詐騙風險
- 查詢網域是否為釣魚網站
- 實時風險評分（0-100 分）
- 三級風險等級（低/中/高）

### 📊 數據分析
- 詐騙趨勢分析
- 按類別統計詐騙案件
- 地域分布分析
- 時間序列分析

### 📱 多平台支持
- **Web 應用**：完整的桌面體驗
- **移動應用**：React Native 跨平台應用
- **API 服務**：開放 REST API 供第三方使用

### 👥 社群參與
- 用戶舉報詐騙信息
- 社群驗證機制
- 舉報記錄查詢

---

## 🏗️ 技術架構

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
├────────────────────────────┬────────────────────────────────┤
│   Web Application (React)  │  Mobile App (React Native)    │
└────────────────────────────┴────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   REST API      │
                    │   (Express)     │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   ┌────▼─────┐      ┌──────▼──────┐     ┌──────▼──────┐
   │ Database  │      │ Data Sources│     │   Cache     │
   │(PostgreSQL)      │ Integration │     │  (Redis)    │
   └──────────┘      └─────────────┘     └─────────────┘
```

### 技術棧

| 層級 | 技術 |
|-----|------|
| **前端** | React, React Native, TypeScript |
| **後端** | Node.js, Express, PostgreSQL |
| **數據源** | 台灣警政署, 金管會, 消保會, 社群舉報 |
| **部署** | Docker, Docker Compose |
| **測試** | Jest, React Testing Library |

---

## 🚀 快速開始

### 前置要求

```bash
- Node.js >= 14.0
- PostgreSQL >= 12.0
- Docker 和 Docker Compose (可選)
- Expo CLI (用於移動開發)
```

### 安裝步驟

#### 1. 克隆倉庫

```bash
git clone https://github.com/yu11ng-2/anti-fraud-platform.git
cd anti-fraud-platform
```

#### 2. 安裝依賴

```bash
# 後端
cd backend
npm install

# Web 前端
cd ../web
npm install

# 移動應用
cd ../mobile
npm install
```

#### 3. 配置環境變數

```bash
# 複製環境變數文件
cp .env.example .env

# 編輯 .env 文件
vi .env
```

#### 4. 初始化數據庫

```bash
cd database
psql -U postgres -f init.sql
psql -U postgres -f seed.sql
```

#### 5. 啟動應用

**使用 Docker Compose (推薦)：**

```bash
docker-compose up -d
```

**手動啟動：**

```bash
# 終端 1 - 啟動後端
cd backend
npm start

# 終端 2 - 啟動 Web 前端
cd web
npm start

# 終端 3 - 啟動移動應用
cd mobile
npm start
```

### 訪問應用

- 🌐 Web 應用：http://localhost:3000
- 🔌 API 服務：http://localhost:3001
- 📱 移動應用：Expo 客戶端

---

## 📊 數據來源

### 1. 📛 台灣警政署詐騙案件

**來源**：https://www.police.npa.gov.tw/

**內容**：
- 官方確認的詐騙案件
- 詐騙集團電話號碼
- 詐騙手法詳情

**更新頻率**：每日

### 2. 💼 金融監督管理委員會警示清單

**來源**：https://www.fsc.gov.tw/

**內容**：
- 非法業者清單
- 釣魚網站警示
- 投資詐騙警告

**更新頻率**：實時

### 3. 👥 消費者保護委員會投訴統計

**來源**：https://www.consumer.gov.tw/

**內容**：
- 消費者投訴統計
- 詐騙案例分析
- 防詐建議

**更新頻率**：每周

### 4. 🌐 社群舉報

**來源**：本平台用戶舉報

**內容**：
- 用戶報告的可疑電話
- 釣魚網站舉報
- 社群驗證

**驗證機制**：多重舉報確認

---

## 📁 項目結構

```
anti-fraud-platform/
├── backend/                 # Express 後端
│   ├── src/
│   │   ├── controllers/    # 業務邏輯
│   │   ├── routes/         # API 路由
│   │   ├── middleware/     # 中間件
│   │   ├── services/       # 服務層
│   │   └── utils/          # 工具函數
│   ├── package.json
│   └── server.js
│
├── web/                     # React Web 應用
│   ├── src/
│   │   ├── components/     # 組件
│   │   ├── pages/          # 頁面
│   │   ├── services/       # API 服務
│   │   └── App.js
│   ├── package.json
│   └── public/
│
├── mobile/                  # React Native 應用
│   ├── src/
│   │   ├── screens/        # 屏幕
│   │   ├── components/     # 組件
│   │   ├── services/       # API 服務
│   │   └── App.js
│   ├── package.json
│   └── app.json
│
├── database/                # 數據庫
│   ├── init.sql            # 初始化腳本
│   └── seed.sql            # 種子數據
│
├── data-sources/            # 數據源集成
│   ├── taiwan-police.js    # 警政署數據源
│   ├── fsc.js              # 金管會數據源
│   ├── ccc.js              # 消保會數據源
│   └── index.js            # 數據源管理器
│
├── docker-compose.yml       # Docker 配置
├── .env.example             # 環境變數示例
├── .gitignore              # Git 忽略配置
├── README.md               # 本文檔
└── package.json            # 根級包管理
```

---

## 🔌 API 文檔

### 基本信息

**基礎 URL**：`http://localhost:3001/api`

**認證**：使用 JWT Token (可選)

### 核心端點

#### 1. 風險查詢

**POST** `/fraud/check-risk`

```bash
curl -X POST http://localhost:3001/api/fraud/check-risk \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "09xxxxxxxx"}'
```

**請求體**：

```json
{
  "phoneNumber": "09xxxxxxxx"  // 或 "domain": "example.com"
}
```

**響應**：

```json
{
  "input": "09xxxxxxxx",
  "riskLevel": "high",
  "riskScore": 85,
  "dataSources": ["police", "consumer"],
  "timestamp": "2026-07-12T07:30:00Z"
}
```

#### 2. 獲取舉報

**GET** `/reports`

```bash
curl http://localhost:3001/api/reports
```

**響應**：

```json
{
  "reports": [
    {
      "id": 1,
      "title": "假冒銀行客服詐騙",
      "description": "詐騙者假冒銀行客服進行詐騙",
      "category": "impersonation",
      "date": "2026-07-12"
    }
  ]
}
```

#### 3. 提交舉報

**POST** `/reports/submit`

```bash
curl -X POST http://localhost:3001/api/reports/submit \
  -H "Content-Type: application/json" \
  -d '{
    "title": "可疑電話",
    "description": "接到可疑詐騙電話",
    "category": "impersonation",
    "phoneNumber": "09xxxxxxxx"
  }'
```

#### 4. 統計數據

**GET** `/statistics`

```bash
curl http://localhost:3001/api/statistics
```

**響應**：

```json
{
  "totalCases": 1234,
  "byCategory": {
    "impersonation": 450,
    "phishing": 320,
    "investment": 280,
    "romance": 184
  },
  "thisMonth": 156,
  "thisWeek": 28
}
```

詳細 API 文檔見 [API_DOCS.md](./docs/API_DOCS.md)

---

## 🧪 測試

### 執行單元測試

```bash
# 後端測試
cd backend
npm test

# Web 前端測試
cd ../web
npm test

# 移動應用測試
cd ../mobile
npm test
```

### 測試覆蓋率

```bash
npm test -- --coverage
```

---

## 🤝 貢獻指南

我們歡迎任何形式的貢獻！無論是報告問題、提出建議還是提交代碼。

### 如何貢獻

1. **Fork** 這個倉庫
2. **創建** 功能分支 (`git checkout -b feature/amazing-feature`)
3. **提交** 更改 (`git commit -m 'Add amazing feature'`)
4. **推送** 到分支 (`git push origin feature/amazing-feature`)
5. **開啟** Pull Request

### 報告問題

如果發現問題，請通過 [GitHub Issues](https://github.com/yu11ng-2/anti-fraud-platform/issues) 報告。

### 代碼規範

- 遵循 ESLint 規則
- 使用 Prettier 格式化代碼
- 編寫清晰的提交信息
- 添加適當的測試

---

## 📈 路線圖

### v1.0（當前）✅
- [x] 基礎風險查詢功能
- [x] 多數據源集成
- [x] Web 應用
- [x] 移動應用
- [x] API 服務

### v1.1（計劃中）
- [ ] AI 智能檢測
- [ ] 短信/來電自動檢測
- [ ] 黑名單本地緩存
- [ ] 離線功能
- [ ] 多語言支持

### v2.0（未來）
- [ ] 機器學習模型
- [ ] 實時威脅情報
- [ ] 瀏覽器擴展
- [ ] 企業版本
- [ ] 高級分析儀表板

---

## 📞 聯系方式

- **GitHub Issues**: [提交問題](https://github.com/yu11ng-2/anti-fraud-platform/issues)
- **Email**: contact@anti-fraud-platform.io
- **社群**: [加入社群討論](https://github.com/yu11ng-2/anti-fraud-platform/discussions)

---

## 📜 許可證

MIT License © 2026 Anti-Fraud Platform

詳見 [LICENSE](./LICENSE) 文件

---

## 🙏 致謝

感謝以下數據源的支持：

- 🇹🇼 台灣警政署 (NPA)
- 💰 金融監督管理委員會 (FSC)
- 👥 消費者保護委員會 (CCC)
- 🌐 社群用戶舉報

---

## ⭐ 如果您喜歡這個項目，請給我們一個 Star！

```
   ⭐⭐⭐ 防詐平台 Anti-Fraud Platform ⭐⭐⭐
   
   幫助台灣民眾防範詐騙，保護財產安全！
```

---

**最後更新**: 2026-07-12

**維護者**: [@yu11ng-2](https://github.com/yu11ng-2)
