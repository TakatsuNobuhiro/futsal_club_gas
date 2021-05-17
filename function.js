function setTrigger(functionName,setTime){
  //最初に過去のトリガーを削除
  this.delTrigger(functionName);
  ScriptApp.newTrigger(functionName).timeBased().at(setTime).create();
}

function delTrigger(functionName) {
  const triggers = ScriptApp.getProjectTriggers();
  for(const trigger of triggers) {
    if (trigger.getHandlerFunction() === functionName) {
      ScriptApp.deleteTrigger(trigger);
    }
  }
}

function tomorrowEventsPush (){
  line = new line("TECH_GROUP_ID")
  const myCalendar = new calendar("CALENDAR_ID");
  let tomorrow = new Date();
  tomorrow.setDate( tomorrow.getDate() + 1 );
  tomorrowEvents = myCalendar.fetchEvents(tomorrow)
  let message = "明日は"
  for(const event of tomorrowEvents){
    
    if (event.isAllDayEvent()){
      message += "終日\n"
    } else{
      let start = calendar.changeDate(event.getStartTime()); 
      let end = calendar.changeDate(event.getEndTime()); 
      message += `${start}~${end}に\n`
    }
    let location = event.getLocation()
    if (!!location){
      message += `${location}で`
    }
    let title = event.getTitle(); 
    message += `${title}があります。\n`

    // カレンダーのURL取得
    // let event_id = event.getId().split('@')[0];
    // let event_url = `https://www.google.com/calendar/event?eid=${Utilities.base64Encode(event_id+' '+PropertiesService.getScriptProperties().getProperty("MY_CALENDAR_ID"))}`
    // message += event_url

    
  };
  if (tomorrowEvents.length){
    // 文末の改行を取り除く
    message = message.substr(0,message.length-1)
    line.push(message)
  }
}

function tomorrow_set(){
  let setTime = new Date();
  setTime.setHours(21);
  setTime.setMinutes(00); 
  setTrigger("tomorrowEventsPush",setTime)
}


function RecruitPush (){
  line = new line("TEST_GROUP_ID")
  const myCalendar = new calendar("CALENDAR_ID");
  let tomorrow = new Date();
  tomorrow.setDate( tomorrow.getDate() + 1 );
  tomorrowEvents = myCalendar.fetchEvents(tomorrow)
  let message = "【明日の予定（活動）】\n"
  for(const event of tomorrowEvents){
    let color = event.getColor();

    
    // カレンダーの色が紫（ぶどう色）なら新歓イベント
    if (color === "3"){
      let title = event.getTitle(); 
      message += `内容:${title}\n`

      let start = calendar.changeDate(event.getStartTime()); 
      let end = calendar.changeDate(event.getEndTime()); 
      if (!event.isAllDayEvent()){
        message += `日時:${start}~${end}\n`
      };

      let location = event.getLocation()
      if (!!location && location.includes("東京工業大学")){
        
        message += "場所：東工大体育館\n"
        
      }
      let line_message = message
      line_message += "運動できる服装と飲み物の持参をお願いします。\nシューズが無い方にはシューズをお貸しします。"
      // 文末に参加希望者に出席の連絡を促したい
      line.push(line_message)

    }

    
  };
}

function recruit_set(){
  let setTime = new Date();
  setTime.setHours(08);
  setTime.setMinutes(00); 
  setTrigger("tomorrowEventsPush",setTime)
}



