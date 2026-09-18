# 開發紀錄與交接狀態

更新日期：2026-09-18。這份文件記錄目前工作資料夾的實際狀態，供移轉後繼續開發。完整的最初需求見 [ORIGINAL_REQUIREMENTS.md](ORIGINAL_REQUIREMENTS.md)。

## 開發過程

1. **建立離線專案**：確認工作資料夾原本沒有專案檔案後，建立 `index.html`、`css/style.css`、`js/game.js`、`js/questions.js`、`js/audio.js`、`assets/` 和 `README.md`。採純 HTML、CSS、Vanilla JavaScript，使用一般 `<script>` 載入，讓 `file://` 直接開啟時不受 ES module 跨來源限制。
2. **完成主要流程**：首頁 → 教師設定／玩法說明 → 雙人選角 → VS → 3、2、1、GO → 作答對戰 → 結果頁 → 再玩一次。加入限時、KO、合作魔王三種模式。
3. **實作核心機制**：兩位玩家的題目、鎖定、Combo、血量、分數、錯題次數各自存在 `players[0]`／`players[1]`。每次作答只鎖定該玩家約 430 毫秒。循序題目也各自計數。答題、攻擊、HP、倒數與結果判定集中在 `js/game.js`。
4. **加入視覺與音訊**：六隻原創 SVG 怪獸由 `monsterSvg()` 產生，外觀與能量色不同但能力一致。CSS 提供待機、攻擊、受傷、勝利、失敗等動態；Web Audio API 合成音效與低音量節奏，不用外部檔案。
5. **處理離線與資料**：設定、音效、BGM、上次模式、角色選擇寫入瀏覽器 `localStorage`；錯題記錄只在當場遊戲記憶體中。沒有登入、伺服器、CDN、網路圖像、網路音效或 API。
6. **依使用者截圖修正版面**：對戰畫面原本繼承 `.screen.active{display:flex}`，使頂部計時列與三欄場地橫向排列，畫面被推到右側。已在 `css/style.css` 加入 `#game.active{display:block}`，讓計時列位於場地上方。
7. **加入設計者署名**：依使用者要求，在首頁底部與 README 加入「Qingxi Elementary School · Gavin Huang」。

## 目前實作位置

| 項目 | 位置 |
| --- | --- |
| 各畫面 HTML | `index.html` |
| 響應式佈局、怪獸與攻擊動畫 | `css/style.css` |
| 設定預設值、快速設定 | `js/game.js` 的 `DEFAULT`、`PRESETS` |
| 六隻怪獸外觀 | `js/game.js` 的 `MONSTERS`、`monsterSvg()` |
| 狀態切換與遊戲流程 | `js/game.js` 的 `show()`、`startBattle()`、`startCountdown()`、`finish()` |
| 雙人作答與戰鬥 | `js/game.js` 的 `answer()`、`attack()`、`updatePlayer()` |
| 出題與干擾答案 | `js/questions.js` 的 `QuestionGenerator` |
| 音效與 BGM | `js/audio.js` 的 `AudioManager` |

## 遊戲規則現值

- 初始 HP：教師可選 50／100／150，預設 100。
- 一般答對：得 10 分，傷害 10。Combo 開啟時連對 3～4 題為 15，5 題以上為 20。
- 答錯：Combo 歸零，不扣分；自扣 0／5／10 HP，預設 5。
- 合作魔王：魔王 500 HP，限時內擊倒即成功。
- 限時結果：先比 HP，再比分數，仍相同則平手。
- 錯題加強：有錯題紀錄時，以 60% 機率從該玩家的錯題加權池抽題。

## 已執行的檢查

- `node --check js/game.js`、`js/questions.js`、`js/audio.js`：通過。
- 出題器三種模式各產生 10,000 題，檢查乘積正確、三個答案不重複、包含正解、沒有超範圍數字、題目符合選定乘法表：通過。
- 靜態搜尋 `http://`、`https://`、CDN、`@import`、`fetch(`、`XMLHttpRequest`：專案程式中沒有找到。
- 使用者提供了對戰畫面截圖，證實修正前的橫向排列問題。CSS 修正後尚未取得新的畫面截圖。

## 尚待驗證與已知限制

- 此執行環境的瀏覽器自動化工具禁止開啟本機 `file://` 頁面，因此**沒有完成瀏覽器端的完整點擊測試或視覺測試**。不要將上述靜態檢查視為實機驗收。
- `#game.active{display:block}` 的截圖回歸尚待在 1920×1080、1366×768、1024×768、iPad 橫向檢查，尤其確認頂部計時列、兩側答題卡與三欄場地同時可見。
- 原需求提到最小 64px 按鈕；主要答案與大按鈕達到這個級別，但頂部工具列和部分教師設定按鈕較小，若嚴格驗收需再調整。
- 動畫設計是 CSS 與計時器組合；舊 Chromebook 的 60 FPS 目標尚未做效能量測。

## 建議下一步

1. 在目標主機以瀏覽器直接開 `index.html`，先檢查修正後的對戰畫面是否仍偏移。
2. 各跑一次限時、KO、合作魔王完整流程，測試雙人快速連按、鍵盤、暫停／恢復與結果判定。
3. 依四種目標解析度檢查設定頁、選角頁、遊戲頁、結果頁；必要時調整 `css/style.css` 的 media queries。
4. 有修正時更新本文件，並保留對應截圖與測試結果，方便下一位開發者接手。
