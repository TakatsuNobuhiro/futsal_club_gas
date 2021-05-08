//Linebot
function line() {
  const url = "https://api.line.me/v2/bot/message/push"
  const message = "test"
  const postData = {
    "to": PropertiesService.getScriptProperties().getProperty("USER_ID"), 
    "messages": [
      {
        "type": "text",
        "text": message,
      }
    ]
  };

  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty("LINE_TOKEN"), 
  };

  const options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };

  UrlFetchApp.fetch(url, options);



}

function sendSchedule() {
  var tomorrow=new Date();
  tomorrow.setDate( tomorrow.getDate() + 1 );
  var myCals=CalendarApp.getCalendarById('4relcv3achthpmqe5lb88944bs@group.calendar.google.com'); //特定のIDのカレンダーを取得
  var myEvents=myCals.getEventsForDay(tomorrow);　//カレンダーの本日のイベントを取得


  /* イベントの数だけ繰り返し */
  for(var i=0;i<myEvents.length;i++){
    var strTitle=myEvents[i].getTitle(); //イベントのタイトル
    var strStart=_HHmm(myEvents[i].getStartTime()); //イベントの開始時刻
    var strEnd=_HHmm(myEvents[i].getEndTime()); //イベントの終了時刻
    var strBody='明日は' + strStart + 'から' + strEnd +'まで'+ strTitle + 'があります。'; //チャットワークに送る文字列にイベント内容を追加
  }

  Logger.log(strBody)


}
function _HHmm(str){
  return Utilities.formatDate(str,'JST','HH:mm')
}