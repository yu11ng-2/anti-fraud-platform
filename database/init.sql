-- 創建用戶表
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 創建舉報表
CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  phone_number VARCHAR(20),
  domain VARCHAR(255),
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 創建風險記錄表
CREATE TABLE risk_checks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  input VARCHAR(255) NOT NULL,
  input_type VARCHAR(20),
  risk_score INTEGER,
  risk_level VARCHAR(20),
  data_sources TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 創建數據源表
CREATE TABLE data_sources (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50),
  description TEXT,
  last_updated TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 創建詐騙案件表
CREATE TABLE fraud_cases (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  status VARCHAR(20),
  source VARCHAR(50),
  phone_number VARCHAR(20),
  domain VARCHAR(255),
  reported_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 創建索引以提高查詢性能
CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_created_at ON reports(created_at);
CREATE INDEX idx_risk_checks_user_id ON risk_checks(user_id);
CREATE INDEX idx_fraud_cases_phone ON fraud_cases(phone_number);
CREATE INDEX idx_fraud_cases_domain ON fraud_cases(domain);
