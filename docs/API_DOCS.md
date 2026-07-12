# API 文檔

## 概述

防詐平台 API 提供了完整的防詐數據查詢和舉報功能。

## 基本信息

**基礎 URL**: `https://api.anti-fraud-platform.io/v1`

**認證**: JWT Token (可選)

## 認證

### 獲取 Token

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

**響應**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400
}
```

### 使用 Token

```bash
Authorization: Bearer {token}
```

## 端點

### 1. 風險查詢

#### 查詢電話風險

```http
POST /fraud/check-risk
Content-Type: application/json

{
  "phoneNumber": "09xxxxxxxx"
}
```

**響應**:

```json
{
  "success": true,
  "data": {
    "input": "09xxxxxxxx",
    "inputType": "phone",
    "riskLevel": "high",
    "riskScore": 85,
    "dataSources": [
      {
        "name": "台灣警政署",
        "confidence": 0.95
      },
      {
        "name": "消費者保護委員會",
        "confidence": 0.87
      }
    ],
    "details": {
      "category": "impersonation",
      "lastReported": "2026-07-10",
      "reportCount": 42
    },
    "timestamp": "2026-07-12T08:00:00Z"
  }
}
```

**狀態碼**:
- `200`: 成功
- `400`: 無效輸入
- `429`: 超過速率限制
- `500`: 服務器錯誤

#### 查詢網域風險

```http
POST /fraud/check-risk
Content-Type: application/json

{
  "domain": "example.com"
}
```

**響應**: 同上

### 2. 舉報管理

#### 獲取舉報列表

```http
GET /reports?page=1&limit=20&category=impersonation
```

**查詢參數**:
- `page` (number): 頁碼，默認 1
- `limit` (number): 每頁數量，默認 20，最大 100
- `category` (string): 過濾類別
- `status` (string): 過濾狀態 (pending, investigating, confirmed)
- `sortBy` (string): 排序字段 (date, popularity)

**響應**:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "假冒銀行客服詐騙",
      "description": "詐騙者假冒銀行客服進行詐騙",
      "category": "impersonation",
      "status": "confirmed",
      "phoneNumber": "09xxxxxxxx",
      "domain": null,
      "reportCount": 42,
      "createdAt": "2026-07-10T10:30:00Z",
      "updatedAt": "2026-07-12T08:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

#### 獲取單個舉報

```http
GET /reports/{id}
```

**響應**:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "假冒銀行客服詐騙",
    "description": "詐騙者假冒銀行客服進行詐騙",
    "category": "impersonation",
    "status": "confirmed",
    "phoneNumber": "09xxxxxxxx",
    "reportCount": 42,
    "comments": [
      {
        "id": 1,
        "author": "user123",
        "content": "我也收到過類似電話",
        "createdAt": "2026-07-11T15:20:00Z"
      }
    ],
    "createdAt": "2026-07-10T10:30:00Z"
  }
}
```

#### 提交新舉報

```http
POST /reports/submit
Content-Type: application/json
Authorization: Bearer {token}

{
  "title": "可疑電話",
  "description": "接到可疑詐騙電話，自稱是銀行",
  "category": "impersonation",
  "phoneNumber": "09xxxxxxxx",
  "timestamp": "2026-07-12T07:30:00Z"
}
```

**必需字段**:
- `title` (string): 舉報標題
- `description` (string): 舉報描述
- `category` (string): 分類
- 至少一個: `phoneNumber` 或 `domain`

**可選字段**:
- `timestamp`: 事件發生時間
- `evidence`: 證據文件

**響應**:

```json
{
  "success": true,
  "message": "舉報提交成功，感謝您的貢獻！",
  "data": {
    "id": 12345,
    "status": "pending"
  }
}
```

### 3. 統計數據

#### 獲取整體統計

```http
GET /statistics
```

**響應**:

```json
{
  "success": true,
  "data": {
    "summary": {
      "totalCases": 5234,
      "thisMonth": 342,
      "thisWeek": 78,
      "today": 12
    },
    "byCategory": {
      "impersonation": {
        "count": 1850,
        "percentage": 35.3
      },
      "phishing": {
        "count": 1420,
        "percentage": 27.1
      },
      "investment": {
        "count": 980,
        "percentage": 18.7
      },
      "romance": {
        "count": 650,
        "percentage": 12.4
      },
      "other": {
        "count": 334,
        "percentage": 6.4
      }
    },
    "trend": {
      "lastMonth": 298,
      "twoMonthsAgo": 245,
      "threeMonthsAgo": 312
    }
  }
}
```

#### 獲取月度趨勢

```http
GET /statistics/trend?months=6
```

**查詢參數**:
- `months` (number): 查詢月份數，默認 6

**響應**:

```json
{
  "success": true,
  "data": [
    {
      "month": "2026-02",
      "count": 245,
      "categories": {
        "impersonation": 85,
        "phishing": 72,
        "investment": 52,
        "romance": 28,
        "other": 8
      }
    },
    // ... 更多月份
  ]
}
```

## 錯誤處理

### 錯誤響應格式

```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "提供的電話號碼格式無效",
    "details": {
      "field": "phoneNumber",
      "value": "invalid-phone"
    }
  }
}
```

### 常見錯誤碼

| 代碼 | HTTP 狀態 | 說明 |
|-----|---------|------|
| INVALID_INPUT | 400 | 輸入驗證失敗 |
| UNAUTHORIZED | 401 | 未授權 |
| FORBIDDEN | 403 | 禁止訪問 |
| NOT_FOUND | 404 | 資源不存在 |
| RATE_LIMIT | 429 | 超過速率限制 |
| INTERNAL_ERROR | 500 | 服務器內部錯誤 |

## 速率限制

- **免費用戶**: 100 請求/小時
- **認證用戶**: 1000 請求/小時
- **高級用戶**: 10000 請求/小時

速率限制信息在響應頭中返回：

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1626088800
```

## SDK

### JavaScript

```bash
npm install @anti-fraud/sdk
```

```javascript
const AntiFraud = require('@anti-fraud/sdk');

const client = new AntiFraud({
  apiKey: 'your-api-key'
});

const result = await client.checkRisk('09xxxxxxxx');
console.log(result.riskLevel);
```

### Python

```bash
pip install anti-fraud-sdk
```

```python
from anti_fraud import Client

client = Client(api_key='your-api-key')
result = client.check_risk('09xxxxxxxx')
print(result['risk_level'])
```

## 最佳實踐

1. **緩存結果**: 相同查詢在短期內不會改變
2. **錯誤處理**: 實現適當的錯誤重試邏輯
3. **安全性**: 不要在客戶端暴露 API 密鑰
4. **性能**: 使用異步查詢避免阻塞

## 聯系支持

- 文檔: https://docs.anti-fraud-platform.io
- 郵件: support@anti-fraud-platform.io
- 社群: https://github.com/yu11ng-2/anti-fraud-platform/discussions
