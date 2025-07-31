const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 設定靜態檔案目錄
app.use(express.static(path.join(__dirname)));

// 設定 MIME 類型
app.use((req, res, next) => {
  if (req.path.endsWith('.css')) {
    res.type('text/css');
  } else if (req.path.endsWith('.js')) {
    res.type('application/javascript');
  } else if (req.path.endsWith('.html')) {
    res.type('text/html');
  }
  next();
});

// 主頁路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 健康檢查路由
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: '飲料點餐系統運行正常',
    timestamp: new Date().toISOString(),
    version: '1.1.0'
  });
});

// 404 處理
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// 錯誤處理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: '伺服器內部錯誤',
    message: '請稍後再試'
  });
});

app.listen(PORT, () => {
  console.log(`🧋 飲料點餐系統已啟動！`);
  console.log(`🌐 伺服器運行在 http://localhost:${PORT}`);
  console.log(`📱 支援的功能：`);
  console.log(`   - 9家飲料店菜單`);
  console.log(`   - 菜單編輯功能`);
  console.log(`   - 自訂菜單上傳`);
  console.log(`   - 訂單管理系統`);
  console.log(`   - CSV 匯出功能`);
});
