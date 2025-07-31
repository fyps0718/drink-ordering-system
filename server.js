const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// 資料檔案路徑
const DATA_FILE = path.join(__dirname, 'orders.json');
const ADMIN_PASSWORD = '0718';

// 中間件設定
app.use(express.json());
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

// 初始化資料檔案
function initializeDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = {
      orders: [],
      lastUpdated: new Date().toISOString(),
      totalAmount: 0,
      totalCount: 0
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    console.log('📄 初始化資料檔案：orders.json');
  }
}

// 讀取訂單資料
function readOrders() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
    return { orders: [], lastUpdated: new Date().toISOString(), totalAmount: 0, totalCount: 0 };
  } catch (error) {
    console.error('讀取訂單資料錯誤:', error);
    return { orders: [], lastUpdated: new Date().toISOString(), totalAmount: 0, totalCount: 0 };
  }
}

// 儲存訂單資料
function saveOrders(data) {
  try {
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('儲存訂單資料錯誤:', error);
    return false;
  }
}

// API 路由

// 獲取所有訂單
app.get('/api/orders', (req, res) => {
  const data = readOrders();
  res.json(data);
});

// 新增訂單
app.post('/api/orders', (req, res) => {
  try {
    const newOrder = req.body;
    const data = readOrders();

    // 加入時間戳記和 ID
    newOrder.id = Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9);
    newOrder.timestamp = new Date().toLocaleString('zh-TW');

    // 確保必要欄位存在
    if (!newOrder.teacher || !newOrder.drink || !newOrder.store) {
      return res.status(400).json({
        success: false,
        message: '缺少必要欄位：老師姓名、飲料名稱或店家名稱'
      });
    }

    data.orders.push(newOrder);
    data.totalAmount = data.orders.reduce((sum, order) => sum + (order.price || 0), 0);
    data.totalCount = data.orders.length;

    console.log(`📝 新增訂單: ${newOrder.teacher} - ${newOrder.drink} (${newOrder.store})`);

    if (saveOrders(data)) {
      res.json({ success: true, order: newOrder, data: data });
    } else {
      res.status(500).json({ success: false, message: '儲存訂單失敗' });
    }
  } catch (error) {
    console.error('新增訂單錯誤:', error);
    res.status(500).json({ success: false, message: '新增訂單失敗' });
  }
});

// 更新訂單
app.put('/api/orders/:id', (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = req.body;
    const data = readOrders();

    const orderIndex = data.orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
      return res.status(404).json({ success: false, message: '找不到訂單' });
    }

    // 保留原始 ID 和時間戳記
    updatedOrder.id = orderId;
    updatedOrder.timestamp = data.orders[orderIndex].timestamp;
    updatedOrder.updatedAt = new Date().toISOString();

    data.orders[orderIndex] = updatedOrder;
    data.totalAmount = data.orders.reduce((sum, order) => sum + (order.price || 0), 0);
    data.totalCount = data.orders.length;

    if (saveOrders(data)) {
      res.json({ success: true, order: updatedOrder, data: data });
    } else {
      res.status(500).json({ success: false, message: '更新訂單失敗' });
    }
  } catch (error) {
    console.error('更新訂單錯誤:', error);
    res.status(500).json({ success: false, message: '更新訂單失敗' });
  }
});

// 刪除訂單
app.delete('/api/orders/:id', (req, res) => {
  try {
    const orderId = req.params.id;
    const data = readOrders();

    const orderIndex = data.orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
      return res.status(404).json({ success: false, message: '找不到訂單' });
    }

    const deletedOrder = data.orders.splice(orderIndex, 1)[0];
    data.totalAmount = data.orders.reduce((sum, order) => sum + (order.price || 0), 0);
    data.totalCount = data.orders.length;

    if (saveOrders(data)) {
      res.json({ success: true, deletedOrder: deletedOrder, data: data });
    } else {
      res.status(500).json({ success: false, message: '刪除訂單失敗' });
    }
  } catch (error) {
    console.error('刪除訂單錯誤:', error);
    res.status(500).json({ success: false, message: '刪除訂單失敗' });
  }
});

// 管理員重置所有訂單
app.post('/api/admin/reset', (req, res) => {
  try {
    const { password } = req.body;

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: '密碼錯誤' });
    }

    const resetData = {
      orders: [],
      lastUpdated: new Date().toISOString(),
      totalAmount: 0,
      totalCount: 0,
      resetAt: new Date().toISOString()
    };

    if (saveOrders(resetData)) {
      res.json({ success: true, message: '所有訂單已重置', data: resetData });
    } else {
      res.status(500).json({ success: false, message: '重置失敗' });
    }
  } catch (error) {
    console.error('重置訂單錯誤:', error);
    res.status(500).json({ success: false, message: '重置失敗' });
  }
});

// 主頁路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 健康檢查路由
app.get('/health', (req, res) => {
  const data = readOrders();
  res.json({
    status: 'OK',
    message: '飲料點餐系統運行正常',
    timestamp: new Date().toISOString(),
    version: '1.2.0',
    ordersCount: data.totalCount,
    totalAmount: data.totalAmount,
    lastUpdated: data.lastUpdated
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

// 初始化資料檔案
initializeDataFile();

app.listen(PORT, () => {
  console.log(`🧋 飲料點餐系統已啟動！`);
  console.log(`🌐 伺服器運行在 http://localhost:${PORT}`);
  console.log(`📱 支援的功能：`);
  console.log(`   - 9家飲料店菜單`);
  console.log(`   - 菜單編輯功能`);
  console.log(`   - 自訂菜單上傳`);
  console.log(`   - 訂單管理系統`);
  console.log(`   - CSV 匯出功能`);
  console.log(`   - 🆕 資料持久化存儲`);
  console.log(`   - 🆕 多用戶協作功能`);
  console.log(`   - 🆕 管理員重置功能`);
  console.log(`📊 API 端點：`);
  console.log(`   - GET  /api/orders - 獲取所有訂單`);
  console.log(`   - POST /api/orders - 新增訂單`);
  console.log(`   - PUT  /api/orders/:id - 更新訂單`);
  console.log(`   - DELETE /api/orders/:id - 刪除訂單`);
  console.log(`   - POST /api/admin/reset - 管理員重置（密碼：0718）`);
});
