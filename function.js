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
  tomorrowEvents = myCalendar.fetchEventsForDay(tomorrow)
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
  tomorrowEvents = myCalendar.fetchEventsForDay(tomorrow)
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
      if (tomorrowEvents.length){
        
        let line_message = message

        line_message += "運動できる服装と飲み物の持参をお願いします。\nシューズが無い方にはシューズをお貸しします。\n参加希望者はGoogleフォームの回答をお願いします https://docs.google.com/forms/d/e/1FAIpQLSe8CNZudM8a6mcX11mRVEgiw-aD7lHw4xc2mhb7G30V2HPeeQ/viewform?usp=sf_link"
        line.push(line_message)
  
        let twitter_message = line_message 
        twitter_message += "\n参加希望者はDMお願いします。新歓グループラインに招待します！\n#春から東工大"
      }

    }

    
  };
  let setTime = new Date();
  setTime.setDate(setTime.getDate()+1)
  setTime.setHours(08);
  setTime.setMinutes(00);  
  setTrigger("recruitNextEvent",setTime)
}




function recruitNextEvent(){
  line = new line("TEST_GROUP_ID")
  const myCalendar = new calendar("CALENDAR_ID");
  const nextEvent = myCalendar.fetchNextEvents();

  if (nextEvent){
    const title = nextEvent.getTitle();
    let message = `【次回の予定】\n内容：${title}`
  
    let start = calendar.getDate(nextEvent.getStartTime()); 
    let end = calendar.changeDate(nextEvent.getEndTime()); 
    if (!nextEvent.isAllDayEvent()){
      message += `日時:${start}~${end}\n`
    };
  
    let location = nextEvent.getLocation()
    if (!!location && location.includes("東京工業大学")){
      
      message += "場所：東工大体育館\n"
      
    }
    let line_message = message 
    line.push(line_message)

    let twitter_message = message 
    twitter_message += "参加希望者はDMお願いします！\n#春から東工大"
    Logger.log(twitter_message)
  }
}