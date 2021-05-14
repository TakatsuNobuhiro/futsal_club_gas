function tomorrowEventsPush (){
  line = new line("TEST_GROUP_ID")
  const myCalendar = new calendar("MY_CALENDAR_ID");
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
