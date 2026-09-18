# 九九怪獸大對決

雙人同機九九乘法對戰遊戲。完全離線、無登入、無伺服器、無外部資源。

設計者：Qingxi Elementary School · Gavin Huang

## 啟動

直接以 Windows、Mac、Chromebook 或 iPad 的瀏覽器開啟 `index.html`。不需要安裝套件。建議橫向螢幕；可按右上角「全螢幕」。

## 檔案

- `index.html`：畫面結構和進入點
- `css/style.css`：響應式介面、怪獸和戰鬥動畫
- `js/game.js`：遊戲狀態、雙人作答、攻擊、計時、結算
- `js/questions.js`：題目與干擾答案
- `js/audio.js`：Web Audio 合成音效與低音量背景節奏
- `assets/`：保留給未來的本機圖片或音效

## 遊戲玩法

從首頁進入教師設定或直接開始。兩位玩家選好怪獸後，經過 VS 畫面和 3、2、1 倒數才開始答題。每人題目獨立；答對得到 10 分並造成 10 傷害。啟用 Combo 時，連對 3 題起為 15 分與傷害，連對 5 題起為 20 分與傷害。答錯中斷 Combo，不扣分，並依教師設定扣除自己的 HP。

- 限時對戰：時間到先比 HP，HP 相同再比分數。
- KO 對戰：先讓對方 HP 歸零獲勝。
- 合作魔王：時間內合力打倒 500 HP 魔王。

玩家 1 可按 **Q、W、E**；玩家 2 可按 **I、O、P**。兩人也可同時觸控各自的三個答案。遊戲中可暫停；重新開始與回首頁都需要再次確認。

## 教師設定

可選 2 到 9 的乘法表、隨機／循序／錯題加強、三種對戰模式、30 至 120 秒、50／100／150 HP、答錯扣血與 Combo。提供初學、標準、挑戰三種快速設定。選項存於此瀏覽器的 `localStorage`；錯題次數只在當場遊戲記憶體中保存，不記錄學生個資。

## 修改遊戲

- **題庫**：編輯 `js/questions.js` 的 `TABLES`、乘數範圍與 `QuestionGenerator.next()`。干擾答案候選也在此函式。
- **怪獸**：編輯 `js/game.js` 的 `MONSTERS` 與 `monsterSvg()`；顏色、外型與攻擊能量色由角色資料決定。
- **攻擊傷害**：編輯 `js/game.js` 的 `answer()` 中 `power` 的 10／15／20。
- **新增怪獸**：在 `MONSTERS` 加一筆資料，再於 `monsterSvg()` 的 `extra` 加上對應 `shape` 的 SVG 裝飾。角色卡會自動出現。
- **動畫**：位於 `css/style.css` 的 `@keyframes`。

所有資源都是本機檔案；請保持 `index.html`、`css/`、`js/` 的相對位置。

## 專案交接

移轉到另一台主機時，請連同 `docs/` 一起複製。詳見 [移轉指南](docs/TRANSFER_GUIDE.md)、[開發紀錄](docs/DEVELOPMENT_LOG.md) 與 [原始需求](docs/ORIGINAL_REQUIREMENTS.md)。
