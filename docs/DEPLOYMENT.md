# 部署指南

## 環境要求

- Node.js >= 14.0
- PostgreSQL >= 12.0
- Docker >= 20.10
- Docker Compose >= 2.0

## 本地開發部署

### 1. 使用 Docker Compose (推薦)

```bash
# 啟動所有服務
docker-compose up -d

# 查看日誌
docker-compose logs -f

# 停止服務
docker-compose down
```

### 2. 手動部署

#### 啟動數據庫

```bash
# 使用 PostgreSQL
psql -U postgres

# 創建數據庫
CREATE DATABASE anti_fraud;

# 導入架構
\c anti_fraud
\i database/init.sql
\i database/seed.sql
```

#### 啟動後端服務

```bash
cd backend
npm install
npm start
# 服務運行在 http://localhost:3001
```

#### 啟動 Web 前端

```bash
cd web
npm install
npm start
# 應用運行在 http://localhost:3000
```

#### 啟動移動應用

```bash
cd mobile
npm install
npm start
# 使用 Expo 掃描 QR 碼
```

## 生產環境部署

### 使用 Docker

#### 1. 構建鏡像

```bash
# 構建後端鏡像
docker build -t anti-fraud-backend:1.0.0 ./backend

# 構建 Web 鏡像
docker build -t anti-fraud-web:1.0.0 ./web
```

#### 2. 配置 docker-compose.yml (生產版本)

```yaml
version: '3.8'
services:
  db:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: anti_fraud
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - anti-fraud

  backend:
    image: anti-fraud-backend:1.0.0
    environment:
      DATABASE_URL: postgresql://postgres:${DB_PASSWORD}@db:5432/anti_fraud
      NODE_ENV: production
      JWT_SECRET: ${JWT_SECRET}
    ports:
      - "3001:3001"
    depends_on:
      - db
    networks:
      - anti-fraud
    restart: unless-stopped

  web:
    image: anti-fraud-web:1.0.0
    environment:
      REACT_APP_API_URL: https://api.example.com
    ports:
      - "3000:3000"
    networks:
      - anti-fraud
    restart: unless-stopped

volumes:
  postgres_data:

networks:
  anti-fraud:
    driver: bridge
```

#### 3. 啟動生產容器

```bash
# 加載環境變數
export DB_PASSWORD=your-secure-password
export JWT_SECRET=your-jwt-secret

# 啟動服務
docker-compose -f docker-compose.yml up -d
```

### 使用 Kubernetes

#### 1. 創建命名空間

```bash
kubectl create namespace anti-fraud
```

#### 2. 部署 PostgreSQL

```bash
kubectl apply -f k8s/postgres.yml -n anti-fraud
```

#### 3. 部署後端

```bash
kubectl apply -f k8s/backend.yml -n anti-fraud
```

#### 4. 部署 Web 前端

```bash
kubectl apply -f k8s/web.yml -n anti-fraud
```

#### 5. 驗證部署

```bash
kubectl get pods -n anti-fraud
kubectl get services -n anti-fraud
```

## 配置 Nginx 反向代理

```nginx
upstream backend {
    server backend:3001;
}

upstream web {
    server web:3000;
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://web;
        proxy_set_header Host $host;
    }
}
```

## SSL/TLS 配置

### 使用 Let's Encrypt

```bash
# 安裝 Certbot
sudo apt-get install certbot python3-certbot-nginx

# 獲取証書
sudo certbot certonly --nginx -d example.com -d api.example.com

# 自動續期
sudo systemctl enable certbot.timer
```

### Nginx SSL 配置

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # SSL 安全配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://web;
    }
}
```

## 監控和日誌

### 使用 ELK Stack

```bash
# 啟動 Elasticsearch
docker run -d --name elasticsearch \
  -e discovery.type=single-node \
  docker.elastic.co/elasticsearch/elasticsearch:8.0.0

# 啟動 Kibana
docker run -d --name kibana \
  -p 5601:5601 \
  docker.elastic.co/kibana/kibana:8.0.0
```

### 配置日誌收集

在後端 `src/logger.js`:

```javascript
const winston = require('winston');
const ElasticsearchTransport = require('winston-elasticsearch');

const logger = winston.createLogger({
  transports: [
    new ElasticsearchTransport({
      level: 'info',
      clientOpts: { node: 'http://localhost:9200' },
      index: 'logs'
    })
  ]
});

module.exports = logger;
```

## 數據備份

### 自動備份腳本

```bash
#!/bin/bash
# backup.sh

DB_NAME=anti_fraud
DB_USER=postgres
BACKUP_DIR=/backups
DATE=$(date +%Y%m%d_%H%M%S)

pg_dump -U $DB_USER $DB_NAME | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# 刪除 30 天前的備份
find $BACKUP_DIR -type f -mtime +30 -delete
```

### 設置 Cron 任務

```bash
crontab -e

# 每天凌晨 2 點執行備份
0 2 * * * /scripts/backup.sh
```

## 故障排除

### 常見問題

#### 數據庫連接錯誤

```bash
# 檢查數據庫狀態
docker logs anti-fraud-db

# 檢查連接字符串
echo $DATABASE_URL
```

#### 高 CPU 使用率

```bash
# 查看進程
top

# 查看容器資源
docker stats
```

#### 磁盤空間不足

```bash
# 查看磁盤使用
df -h

# 清理 Docker
docker system prune -a
```

## 性能優化

### 數據庫優化

```sql
-- 創建索引
CREATE INDEX idx_fraud_cases_phone ON fraud_cases(phone_number);
CREATE INDEX idx_fraud_cases_domain ON fraud_cases(domain);
CREATE INDEX idx_risk_checks_timestamp ON risk_checks(created_at DESC);

-- 分析查詢計劃
EXPLAIN ANALYZE SELECT * FROM fraud_cases WHERE phone_number = '09xxxxxxxx';
```

### 緩存配置

```javascript
// 使用 Redis 緩存
const redis = require('redis');
const client = redis.createClient();

const checkRisk = async (input) => {
  // 檢查緩存
  const cached = await client.get(`risk:${input}`);
  if (cached) return JSON.parse(cached);

  // 執行查詢
  const result = await performCheck(input);

  // 緩存結果（24 小時）
  await client.setex(`risk:${input}`, 86400, JSON.stringify(result));

  return result;
};
```

## 安全加固

### 環境變數

```bash
# .env (絕不要提交到版本控制)
DATABASE_PASSWORD=complex-password-here
JWT_SECRET=secret-key-here
API_KEY=api-key-here
```

### SQL 注入防護

```javascript
// 使用參數化查詢
const query = 'SELECT * FROM users WHERE email = $1';
db.query(query, [userEmail]);
```

### CORS 配置

```javascript
const cors = require('cors');

app.use(cors({
  origin: ['https://example.com', 'https://api.example.com'],
  credentials: true
}));
```

## 監控清單

- [ ] 數據庫備份正常進行
- [ ] SSL 証書有效期檢查
- [ ] API 響應時間監控
- [ ] 錯誤率監控
- [ ] 磁盤空間監控
- [ ] 內存使用監控
- [ ] 日誌聚合配置
- [ ] 告警規則設置

更多信息，請參閱 [監控指南](./MONITORING.md)
