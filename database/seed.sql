-- 插入示例詐騙案件數據
INSERT INTO fraud_cases (title, description, category, status, source, phone_number, reported_at)
VALUES
  ('假冒銀行客服詐騙', '詐騙者假冒銀行客服進行詐騙', 'impersonation', 'confirmed', 'police', '09xxxxxxxx', NOW()),
  ('投資詐騙', '虛假的投資機會詐騙', 'investment', 'confirmed', 'fsc', NULL, NOW()),
  ('釣魚郵件詐騙', '釣魚郵件試圖竊取個人信息', 'phishing', 'investigating', 'consumer', NULL, NOW()),
  ('感情詐騙', '利用感情進行詐騙', 'romance', 'confirmed', 'consumer', '08xxxxxxxx', NOW()),
  ('線上購物詐騙', '線上購物平台詐騙', 'other', 'investigating', 'consumer', NULL, NOW());

-- 插入示例數據源
INSERT INTO data_sources (name, type, description, last_updated, status)
VALUES
  ('台灣警政署詐騙案件', 'government', '台灣警政署公開的詐騙案件數據', NOW(), 'active'),
  ('金管會警示清單', 'financial', '金融監督管理委員會發布的非法業者清單', NOW(), 'active'),
  ('消保會投訴統計', 'consumer', '消費者保護委員會的投訴統計數據', NOW(), 'active'),
  ('社群舉報', 'community', '來自社群用戶的詐騙舉報', NOW(), 'active');
