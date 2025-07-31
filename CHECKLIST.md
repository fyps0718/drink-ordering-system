# ✅ Render.com 部署檢查清單

在部署到 Render.com 之前，請確認以下項目：

## 📁 必要檔案檢查

### 核心檔案
- [ ] `index.html` - 主要網頁檔案（包含完整的飲料點餐系統）
- [ ] `package.json` - Node.js 專案設定檔
- [ ] `server.js` - Express 伺服器檔案
- [ ] `README.md` - 專案說明文件

### 部署檔案
- [ ] `render.yaml` - Render 部署設定檔（可選）
- [ ] `.gitignore` - Git 忽略檔案清單
- [ ] `DEPLOYMENT.md` - 詳細部署指南
- [ ] `deploy.bat` / `deploy.sh` - 部署腳本

## 🧪 本地測試檢查

### 基本功能測試
- [ ] 執行 `npm install` 成功
- [ ] 執行 `npm start` 成功啟動伺服器
- [ ] 訪問 `http://localhost:3000` 正常顯示
- [ ] 訪問 `http://localhost:3000/health` 返回健康狀態

### 功能驗證
- [ ] 9 家飲料店菜單正常顯示
- [ ] 點餐功能正常運作
- [ ] 訂單管理功能正常
- [ ] 菜單編輯功能正常
- [ ] CSV 上傳/下載功能正常
- [ ] 搜尋功能正常
- [ ] 本地存儲功能正常

## 🌐 GitHub 準備

### 倉庫設定
- [ ] 創建 GitHub 倉庫
- [ ] 倉庫設定為 Public（免費方案需要）
- [ ] 上傳所有必要檔案
- [ ] 確認 `main` 分支存在

### 檔案確認
- [ ] 所有檔案都已推送到 GitHub
- [ ] `.gitignore` 正確排除 `node_modules`
- [ ] `package.json` 包含正確的 scripts
- [ ] `server.js` 使用 `process.env.PORT`

## 🚀 Render.com 部署

### 帳號準備
- [ ] 註冊 Render.com 帳號
- [ ] 連接 GitHub 帳號
- [ ] 確認可以訪問 Dashboard

### 服務設定
- [ ] 選擇正確的 GitHub 倉庫
- [ ] 設定 Environment: `Node`
- [ ] 設定 Build Command: `npm install`
- [ ] 設定 Start Command: `npm start`
- [ ] 選擇 Free 方案

### 環境變數（可選）
- [ ] `NODE_ENV`: `production`

## 🎯 部署後驗證

### 基本檢查
- [ ] 部署狀態顯示 "Live"
- [ ] 獲得正確的網址
- [ ] 網站可以正常訪問
- [ ] 健康檢查端點正常

### 功能測試
- [ ] 所有飲料店菜單正常顯示
- [ ] 點餐流程完整運作
- [ ] 訂單管理功能正常
- [ ] 菜單編輯功能正常
- [ ] 檔案上傳/下載功能正常
- [ ] 響應式設計在手機上正常

### 效能檢查
- [ ] 首次載入時間可接受（30-60秒）
- [ ] 後續訪問速度正常
- [ ] 所有功能響應正常

## 📞 問題排除

如果遇到問題，請檢查：

### 常見錯誤
- [ ] 檢查 Render Dashboard 的 Deploy Logs
- [ ] 確認 `package.json` 的 scripts 正確
- [ ] 確認 `server.js` 使用正確的 PORT
- [ ] 確認所有檔案都在 GitHub 倉庫中

### 聯絡資訊
- Render.com 官方文件：https://render.com/docs
- GitHub 倉庫問題回報：在您的倉庫中創建 Issue

## 🎉 部署成功！

完成所有檢查項目後，您的飲料點餐系統就可以成功部署到 Render.com 了！

**記住您的網址**：`https://your-app-name.onrender.com`

分享給同事、同學，開始享受便利的團體點餐體驗吧！
