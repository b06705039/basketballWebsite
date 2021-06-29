# 109 Web Programming

###### tags: `Girl Basketball`

## 小組資訊

- 主題: 台大盃女籃服務平台
- 組別: 4

|      | 姓名   | 學號      | 信箱                 |
| ---- | ------ | --------- | -------------------- |
| 組長 | 鍾詔東 | R09522624 | r09522624@ntu.edu.tw |
| 組員 | 廖郁華 | B06705039 | b06705039@ntu.edu.tw |
| 組員 | 吳柏儒 | R09921046 | r09921046@ntu.edu.tw |

### 工作內容

#### 鍾詔東

- 設計可拖拉式時程表 ([Schedule])
- MySQL 免費雲端伺服器 ([RemoteMysql])
- Express 架構設計 ([Express])
- Json Web Token 憑證與失效設計 ([JWT])
- 前後端雲端部署 ([HeroKu])
- 信箱系統寄信設計 ([NodeMailer])

#### 廖郁華

- [Proposal]
- Context 處理資料流
- Router 設計頁面架構
- Style-Component 處理 css
- 前端頁面功能（包括預賽、複賽..）

#### 吳柏儒

- 後端：實作球員資料庫
- 前端：新增球員介面/確認隊伍介面
- 前後端 API 串接以上功能

## 部署

### Local Deploy

- 安裝網站 modules

```=shell script
cd Backend
npm install
cd ../Frontend
npm install
```

- 開啟網站

```=shell script
npm run server     // 開啟後端服務 (localhost:4000)
npm start          // 開啟前端服務 (localhost:3000)
```

### Cloud Deploy

- 前端網址
  https://ntugirlbasketballweb.herokuapp.com/
- 後端網址
  https://girlbasketball.herokuapp.com/

## 測試帳號

本網站有三種身份別型帳號

1. 主辦單位
   - 為台大盃的協辦單位人員
   ```
   Account: thomson861106
   Password: QQqq1234
   ```
2. 系隊代表
   - 為台大盃的參與隊伍代表
   ```
   Account: evaeva
   Password: evaeva
   ```
3. 紀錄員
   - 為台大盃的協辦單位指派之紀錄工作人員
   ```
   Account: chungcttest
   Password: qqqq1234
   ```

## 測試功能

1. 大眾可使用的功能
   - 可在首頁
     - 可看到主辦方上傳的大圖示
     - 可在下方連結連到消息頁面
       ![](https://imgur.com/qML9Yb9.png)
   - 查看賽程資訊
     - 顯示已安排的賽程
       ![](https://i.imgur.com/ivw2VSE.png)
     - 單擊賽程會顯示賽程目前安排的詳細資訊
       ![](https://i.imgur.com/eGEYX6O.png)
   - 比賽結果
     - 可用下拉式選單看到不同消息
       ![](https://imgur.com/NyX122q.png=378*420)
   - 聯絡資訊
     - 可看到主辦方聯絡資料
2. 註冊功能
   - 可以註測不同的身份別
3. 登入功能
   - 可以以已有的帳號登入
     - 登入不成功會跳出警告
       ![](https://imgur.com/1TsQbnp.png)
   - 按下忘記密碼後，可輸入申請時的郵件
     - 會寄密碼到你的信箱
     - 沒有此信箱會跳出警告
       ![](https://imgur.com/B80EBvk.png)
4. 主辦可使用的功能
   - 確認隊伍資訊(檢視/更改繳費狀態)
   - 賽程時間、場地以及紀錄員調整
     - 可以將下方未安排的賽程用拖拉的方式移動，且拖拉的同時會顯示這些隊伍無法的場次
       ![](https://i.imgur.com/TkS0AqL.png)
     - 同樣可以拖拉已編輯的賽程，調整賽程的時間和場次
       ![](https://i.imgur.com/Q0NS9ED.jpg)
     - 單擊賽程會顯示賽程目前安排的詳細資訊
       ![](https://i.imgur.com/eGEYX6O.png)
     - 雙擊則可編輯此賽程的紀錄員
       ![](https://i.imgur.com/GtCGlvc.png)
   - 安排預賽（安排複賽為一樣的流程）
     - 初始畫面
       ![](https://imgur.com/cdKWUrL.png)
     - 主辦方會當場抽簽，且把球隊抽到的號碼填入
     - 如果填入不完整，按下右上方輸出結果，會把目前輸入的球隊對應到的場次儲存後，留在相同頁面
       ![](https://imgur.com/YeOPCxV.png)
     - 資料填入完整後，輸出結果會在資料庫新增賽事(預賽 stage=preGame, 複賽 stage=interGame)
       ![](https://imgur.com/oPVkNHm.png)
     - 因為會影響到資料庫及後面的測試，可以用預賽或是複賽其中一個測試輸出結果就好。
     - 輸入完後還是可以進行編輯，會把以配對好的賽事刪掉重新配對
     - 預賽編輯頁面，右上方可以更改循環數目，預設會算好目前隊伍數量，渲染出相對應的循環數
     - 複賽編輯頁面，右上方可更改複賽隊伍數，預設會算好有進入複賽的隊伍數，渲染出相對應的淘汰賽程
   - 發布消息
     - 可以選擇要加首頁的大圖或是首頁下方的消息連結
       ![](https://imgur.com/5wiV9Pz.png)
     - 增加後即會在首頁看到增加的消息
   - 確認隊伍資訊
     - 主辦方可以在各個隊伍報名後，看到每個隊伍的資訊
       ![](https://imgur.com/nNnT5u2.png)
     - 點擊進檢視後，可以看到隊伍的球員資訊
     - 確認球員及繳費資訊後，可以更改隊伍的繳費狀態
     - 更改完資料後，會立即對資料庫進行更新
5. 系隊可使用的功能

   - 確認隊伍資訊(修改登錄球員資料)
   - 回報無法出賽時間
     - 單擊即可新增/取消指定時間
       ![](https://i.imgur.com/SSyj3mV.png)

6. 紀錄員可使用的功能
   - 回報無法出賽時間
     - 單擊即可新增/取消指定時間
       ![](https://i.imgur.com/HFb34p8.png)
   - 可查看自己要付則紀錄的賽事
     ![](https://imgur.com/fzxte9X.png)

[remotemysql]: https://remotemysql.com/
[heroku]: https://dashboard.heroku.com/apps
[schedule]: https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxScheduler/
[jwt]: https://jwt.io/
[nodemailer]: https://nodemailer.com/about/
[express]: https://expressjs.com/zh-tw/
[proposal]: https://drive.google.com/file/d/1GcWiXg7XitCXo5-lali5cZw2rIcbWDG2/view?usp=sharing
