class line {
  constructor(id){
    this.id = PropertiesService.getScriptProperties().getProperty(id)
    this.headers = {
      "Content-Type": "application/json; charset=UTF-8",
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty("LINE_TOKEN"), 
    };
  }

  postMessage(url,postData){
    const options = {
      "method": "post",
      "headers": this.headers,
      "payload": JSON.stringify(postData)
    };

    UrlFetchApp.fetch(url, options);
  }

  push(message) {
    const url = "https://api.line.me/v2/bot/message/push"
    const postData = {
      "to": this.id, 
      "messages": [
        {
          "type": "text",
          "text": message,
        }
      ]
    };
    this.postMessage(url,postData)
  }

  broadCast(message){
    const url = "https://api.line.me/v2/bot/message/broadcast"
    const postData = {
      "messages": [
        {
          "type": "text",
          "text": message,
        }
      ]
    };
    this.post_message(url,postData)
  }
}


function tomorrowEventsPush (){
  line = new line("TEST_GROUP_ID")
  const myCalendar = new calendar("MY_CALENDAR_ID");
  let tomorrow = new Date();
  tomorrow.setDate( tomorrow.getDate() + 1 );
  tomorrowEvents = myCalendar.fetchEvents(tomorrow)
  for(const event of tomorrowEvents){
    let message = "明日は"
    if (event.isAllDayEvent()){
      message += "終日\n"
    } else{
      let start = calendar.changeDate(event.getStartTime()); 
      let end = calendar.changeDate(event.getEndTime()); 
      message += `${start}~${end}に\n`
    }
    let location = event.getLocation()
    if (!!location){
      message += `${location}で\n`
    }
    let title = event.getTitle(); 
    message += `${title}があります。`

    // カレンダーのURL取得
    // let event_id = event.getId().split('@')[0];
    // let event_url = `https://www.google.com/calendar/event?eid=${Utilities.base64Encode(event_id+' '+PropertiesService.getScriptProperties().getProperty("MY_CALENDAR_ID"))}`
    // message += event_url

    line.push(message)
  };
}

