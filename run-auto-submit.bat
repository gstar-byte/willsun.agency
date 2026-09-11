@echo off
chcp 65001 > nul
cls
echo ================================================================
echo    WillSun Agency 全网外链与自动化推广机器人 (Mode 3: RPA)
echo ================================================================
echo.
echo  请选择要进行全自动填报的目标平台:
echo.
echo    [1] BetaList (DA 70 - 早期科技首发目录)
echo    [2] Uneed.best (DA 68 - 顶流独立创客工具库)
echo    [3] Launching Next (DA 52 - 全球初创产品榜)
echo    [4] Crunchbase (DA 91 - 顶级商业机构百科)
echo    [5] SaaSHub (DA 78 - SaaS 与 Agency 收录站)
echo    [6] MicroLaunch (DA 60+ - 独立出海首发站)
echo    [7] Toolify.ai (DA 65+ - AI 与出海工具导航)
echo    [8] ⚡ IndexNow 全量搜索引擎秒级推流 (Bing/Yandex)
echo    [9] 输入自定义网址 (通用智能填报)
echo    [0] 退出
echo.
echo ================================================================
set /p choice="请输入数字选项 [0-9]: "

if "%choice%"=="1" (
    node scripts/auto-submitter.mjs betalist
) else if "%choice%"=="2" (
    node scripts/auto-submitter.mjs uneed
) else if "%choice%"=="3" (
    node scripts/auto-submitter.mjs launchingnext
) else if "%choice%"=="4" (
    node scripts/auto-submitter.mjs crunchbase
) else if "%choice%"=="5" (
    node scripts/auto-submitter.mjs saashub
) else if "%choice%"=="6" (
    node scripts/auto-submitter.mjs microlaunch
) else if "%choice%"=="7" (
    node scripts/auto-submitter.mjs toolify
) else if "%choice%"=="8" (
    node scripts/indexnow-submit.mjs
    pause
) else if "%choice%"=="9" (
    set /p custom_url="请输入目标提交页完整 URL: "
    node scripts/auto-submitter.mjs %custom_url%
) else (
    exit
)
