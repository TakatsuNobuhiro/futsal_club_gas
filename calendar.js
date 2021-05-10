
function fetchEvents() {
  let tomorrow = new Date();
  tomorrow.setDate( tomorrow.getDate() + 1 );
  const myCalendar = CalendarApp.getCalendarById(PropertiesService.getScriptProperties().getProperty("CALENDAR_ID")); //特定のIDのカレンダーを取得
  const myEvents = myCalendar.getEventsForDay(tomorrow);　//カレンダーの本日のイベントを取得
  let messages_list = []
  /* イベントの数だけ繰り返し */
  for(let i=0;i<myEvents.length;i++){
    let strTitle=myEvents[i].getTitle(); //イベントのタイトル
    let strStart=_HHmm(myEvents[i].getStartTime()); //イベントの開始時刻
    let strEnd=_HHmm(myEvents[i].getEndTime()); //イベントの終了時刻
    let strBody = '明日は' + strStart + 'から' + strEnd +'まで'+ strTitle + 'があります。'; //チャットワークに送る文字列にイベント内容を追加
    messages_list.unshift(strBody)
  }

  return messages_list


}
function _HHmm(str){
  return Utilities.formatDate(str,'JST','HH:mm')
}
