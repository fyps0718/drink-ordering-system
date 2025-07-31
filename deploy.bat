@echo off
echo 🚀 飲料點餐系統部署腳本
echo ========================

echo.
echo 📋 檢查必要檔案...
if not exist "index.html" (
    echo ❌ 缺少 index.html 檔案
    pause
    exit /b 1
)
if not exist "package.json" (
    echo ❌ 缺少 package.json 檔案
    pause
    exit /b 1
)
if not exist "server.js" (
    echo ❌ 缺少 server.js 檔案
    pause
    exit /b 1
)
echo ✅ 所有必要檔案都存在

echo.
echo 📦 安裝依賴套件...
npm install
if %errorlevel% neq 0 (
    echo ❌ npm install 失敗
    pause
    exit /b 1
)
echo ✅ 依賴套件安裝完成

echo.
echo 🧪 測試本地伺服器...
echo 啟動伺服器測試（按 Ctrl+C 停止）...
echo 測試網址：http://localhost:3000
echo 健康檢查：http://localhost:3000/health
echo.
echo 如果測試正常，請按照以下步驟部署到 Render.com：
echo.
echo 1. 將專案上傳到 GitHub
echo 2. 登入 https://dashboard.render.com/
echo 3. 創建新的 Web Service
echo 4. 連接您的 GitHub 倉庫
echo 5. 設定部署參數：
echo    - Build Command: npm install
echo    - Start Command: npm start
echo    - Environment: Node
echo.
echo 詳細步驟請參考 DEPLOYMENT.md 檔案
echo.
pause
npm start
