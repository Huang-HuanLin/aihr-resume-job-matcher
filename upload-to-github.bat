@echo off
chcp 65001 >nul
echo ================================================
echo       上传项目到 GitHub
echo ================================================
echo.

:: 检查Git是否安装
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] Git 未安装！
    echo 请先下载安装: https://git-scm.com/download/win
    pause
    exit /b 1
)

cd /d "%~dp0"

echo [1/6] 初始化 Git 仓库...
git init

echo.
echo [2/6] 添加源文件（自动排除 node_modules 和 dist）...
git add .

echo.
echo [3/6] 提交代码...
git commit -m "feat: AI求职智能匹配智能体 - 初始版本"

echo.
echo [4/6] 设置主分支为 main...
git branch -M main

echo.
echo ================================================
echo  请输入你的 GitHub 用户名和仓库名
echo ================================================
set /p GITHUB_USER=GitHub用户名:
set /p REPO_NAME=仓库名:

echo.
echo [5/6] 关联远程仓库...
git remote add origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git

echo.
echo [6/6] 推送到 GitHub...
echo 注意: 推送时可能会弹出登录窗口，请输入GitHub账号
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ================================================
    echo  [成功] 项目已上传到 GitHub！
    echo  仓库地址: https://github.com/%GITHUB_USER%/%REPO_NAME%
    echo ================================================
) else (
    echo.
    echo [失败] 上传失败，请检查网络和账号信息
)

pause