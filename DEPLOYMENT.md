# 🚀 部署指南：將飲料點餐系統部署到 Render.com

本指南將詳細說明如何將飲料點餐系統部署到 Render.com 免費託管平台。

## 📋 部署前準備

### 1. 檢查必要檔案
確保您的專案目錄包含以下檔案：
- ✅ `index.html` - 主要網頁檔案
- ✅ `package.json` - Node.js 專案設定
- ✅ `server.js` - Express 伺服器
- ✅ `render.yaml` - Render 部署設定（可選）
- ✅ `.gitignore` - Git 忽略檔案
- ✅ `README.md` - 專案說明

### 2. 建立 GitHub 倉庫
1. 登入 GitHub (https://github.com)
2. 點擊右上角「+」→「New repository」
3. 輸入倉庫名稱：`drink-ordering-system`
4. 設定為 Public（免費方案需要）
5. 點擊「Create repository」

### 3. 上傳專案檔案
```bash
# 在專案目錄中執行
git init
git add .
git commit -m "Initial commit: 飲料點餐系統 v1.1"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/drink-ordering-system.git
git push -u origin main
```

## 🌐 Render.com 部署步驟

### 步驟 1：註冊 Render 帳號
1. 前往 https://render.com
2. 點擊「Get Started」
3. 使用 GitHub 帳號登入（推薦）

### 步驟 2：創建 Web Service
1. 登入 Render Dashboard: https://dashboard.render.com/
2. 點擊「New +」按鈕
3. 選擇「Web Service」
4. 選擇「Build and deploy from a Git repository」
5. 點擊「Next」

### 步驟 3：連接 GitHub 倉庫
1. 在「Connect a repository」頁面
2. 找到您的 `drink-ordering-system` 倉庫
3. 點擊「Connect」

### 步驟 4：設定部署參數
填入以下設定：

**基本設定**
- **Name**: `drink-ordering-system`（或您喜歡的名稱）
- **Region**: Singapore（亞洲用戶推薦）
- **Branch**: `main`
- **Root Directory**: 留空

**Build & Deploy 設定**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**計費方案**
- **Instance Type**: `Free`（每月免費 750 小時）

### 步驟 5：環境變數（可選）
點擊「Advanced」→「Environment Variables」
- **NODE_ENV**: `production`

### 步驟 6：完成部署
1. 檢查所有設定無誤
2. 點擊「Create Web Service」
3. 等待部署完成（約 2-5 分鐘）

## ✅ 部署完成後

### 1. 獲取網址
部署完成後，您會獲得一個網址，格式如：
```
https://drink-ordering-system-xxxx.onrender.com
```

### 2. 測試功能
訪問以下網址確認部署成功：
- **主頁**: https://your-app-name.onrender.com
- **健康檢查**: https://your-app-name.onrender.com/health

### 3. 功能驗證清單
- ✅ 網頁正常載入
- ✅ 9 家飲料店菜單顯示正常
- ✅ 點餐功能運作
- ✅ 訂單管理功能
- ✅ 菜單編輯功能
- ✅ CSV 上傳/下載功能
- ✅ 本地存儲功能

## 🔧 常見問題

### Q1: 部署失敗怎麼辦？
**A**: 檢查 Render 的 Deploy Logs：
1. 在 Dashboard 點擊您的服務
2. 查看「Events」或「Logs」頁籤
3. 查找錯誤訊息並修正

### Q2: 網站載入很慢？
**A**: 免費方案的限制：
- 閒置 15 分鐘後會休眠
- 首次訪問需要 30-60 秒喚醒
- 這是正常現象

### Q3: 如何更新網站？
**A**: 推送新程式碼到 GitHub：
```bash
git add .
git commit -m "更新功能"
git push
```
Render 會自動重新部署

### Q4: 資料會遺失嗎？
**A**: 本系統使用瀏覽器本地存儲：
- 資料存在用戶的瀏覽器中
- 不會因為重新部署而遺失
- 建議定期下載 CSV 備份

## 🎉 恭喜！

您的飲料點餐系統現在已經成功部署到網路上了！
可以分享網址給同事、同學使用，享受便利的團體點餐體驗。

## 📞 技術支援

如果遇到問題，可以：
1. 檢查 Render Dashboard 的錯誤日誌
2. 確認 GitHub 倉庫的檔案完整性
3. 參考 Render.com 官方文件
