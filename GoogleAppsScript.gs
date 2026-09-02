// 花間醉月｜Google Apps Script 報名後台
// 1. 建立一個 Google 試算表。
// 2. 擴充功能 → Apps Script，把本檔貼上。
// 3. 執行 setup() 一次授權。
// 4. 部署 → 新增部署 → 網頁應用程式。
//    執行身分：我；誰可以存取：所有人。
// 5. 複製 Web App URL，貼到 index.html 的 API_URL。

const SHEET_NAME = "報名名單";

function setup(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if(!sh) sh = ss.insertSheet(SHEET_NAME);
  if(sh.getLastRow()===0){
    sh.appendRow(["時間","遊戲名稱","遊戲ID","Discord","伺服器","遊玩時間","玩家類型","遊戲經驗","加入原因"]);
    sh.setFrozenRows(1);
  }
}

function doPost(e){
  try{
    const d = JSON.parse(e.postData.contents);
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    sh.appendRow([
      new Date(d.time || new Date()),
      d.game_name||"", d.game_id||"", d.discord||"", d.server||"",
      d.hours||"", d.type||"", d.experience||"", d.intro||""
    ]);
    return ContentService.createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);
  }catch(err){
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
