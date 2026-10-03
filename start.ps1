<#
.SYNOPSIS
AI求职智能匹配智能体 - 启动脚本

.DESCRIPTION
一键启动开发服务器并自动打开浏览器
#>

# 设置执行策略
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force -ErrorAction SilentlyContinue

# 输出标题
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "          AI求职智能匹配智能体 - 启动脚本" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# 检查Node.js是否安装
try {
    $nodeVersion = node --version
    Write-Host "[信息] Node.js 版本: $nodeVersion" -ForegroundColor Green
}
catch {
    Write-Host "[错误] Node.js 未安装，请先安装 Node.js" -ForegroundColor Red
    Write-Host "下载地址: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "按任意键退出..."
    exit 1
}

# 检查npm是否可用
try {
    $npmVersion = npm --version
    Write-Host "[信息] npm 版本: $npmVersion" -ForegroundColor Green
}
catch {
    Write-Host "[错误] npm 不可用" -ForegroundColor Red
    Read-Host "按任意键退出..."
    exit 1
}

# 进入项目目录
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptPath
Write-Host "[信息] 当前目录: $scriptPath" -ForegroundColor Green

# 检查是否需要安装依赖
if (-not (Test-Path "node_modules")) {
    Write-Host "[信息] 正在安装项目依赖..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[错误] 依赖安装失败" -ForegroundColor Red
        Read-Host "按任意键退出..."
        exit 1
    }
    Write-Host "[成功] 依赖安装完成" -ForegroundColor Green
    Write-Host ""
}

# 启动开发服务器
Write-Host "[信息] 正在启动开发服务器..." -ForegroundColor Yellow
Write-Host "[信息] 服务器地址: http://localhost:5173/" -ForegroundColor Yellow
Write-Host ""

# 在新窗口启动开发服务器
Start-Process powershell -ArgumentList "-Command", "npm run dev" -WindowStyle Minimized

# 等待服务器启动
Write-Host "[信息] 等待服务器启动中..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# 自动打开浏览器
Write-Host "[信息] 正在打开浏览器..." -ForegroundColor Yellow
Start-Process "http://localhost:5173/"

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "          服务器已启动，浏览器正在打开..." -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Read-Host "按任意键关闭此窗口 (服务器将继续运行)"