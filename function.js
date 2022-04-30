const useSheetName = "2022/2023"
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
  let ng_title_count = 0
  let message = "明日は"
  for(const event of tomorrowEvents){
    let is_ng_title = false
    let title = event.getTitle();

    // いらないイベントを取り除く
    let ng_title_list = ['F-net','FNET','都大','新歓','自主練']
    for (const ng_title of ng_title_list){
      if(title.indexOf(ng_title)!=-1){
        ng_title_count+=1
        is_ng_title = true
      }
    }
    if (is_ng_title){
      continue
    }
    
    
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
     
    message += `${title}があります。\n`

    // カレンダーのURL取得
    // let event_id = event.getId().split('@')[0];
    // let event_url = `https://www.google.com/calendar/event?eid=${Utilities.base64Encode(event_id+' '+PropertiesService.getScriptProperties().getProperty("MY_CALENDAR_ID"))}`
    // message += event_url

    
  };
  if (tomorrowEvents.length > ng_title_count){
    // 文末の改行を取り除く
    const ss =  SpreadsheetApp.openById("13WA_Q3VpsYsBuOpFqBjaACSoSnL4pqXLNe0evAPRjWs").getSheetByName(useSheetName);
    let tomorrow_cell = ss.getRange(1,ss.getLastColumn()+1)
    tomorrow_cell.setValue(tomorrow)
    
    const absent_form_url = "https://docs.google.com/forms/d/e/1FAIpQLSc732q816RJR7KN7m-mdnlFcUO6YO1zQ24b46zAEH9NWIfo6Q/viewform?usp=sf_link"
    const temperature_form_url = "https://forms.gle/AVFKhkyXb99RAaRaA"
    message += `欠席、遅刻早退者はフォームの回答をお願いします。\n${absent_form_url}\n`
    message += `出席者は体温報告をお願いします。\n${temperature_form_url}`
    line.push(message)
  }
}

function tomorrow_set(){
  let setTime = new Date();
  setTime.setHours(12);
  setTime.setMinutes(00); 
  setTrigger("tomorrowEventsPush",setTime)
}


function RecruitPush (){
  line = new line("RECRUIT_GROUP_ID")
  const myCalendar = new calendar("CALENDAR_ID");
  let tomorrow = new Date();
  tomorrow.setDate( tomorrow.getDate() + 1 );
  tomorrowEvents = myCalendar.fetchEventsForDay(tomorrow)
  let message = "【明日の新歓予定】\n"
  let has_event = false
  for(const event of tomorrowEvents){
    let title = event.getTitle();
    if(title.indexOf("新歓")!=-1){
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
      let has_event = true
      break
    }
  }

    if (has_event){
      
      let line_message = message

      line_message += "運動できる服装と飲み物の持参をお願いします。\nシューズが無い方にはシューズをお貸しします。\n参加希望者はGoogleフォームの回答をお願いします https://docs.google.com/forms/d/e/1FAIpQLSe8CNZudM8a6mcX11mRVEgiw-aD7lHw4xc2mhb7G30V2HPeeQ/viewform?usp=sf_link"
      line.push(line_message)

      let twitter_message = line_message
      twitter_message += "\n参加希望者はDMお願いします。新歓グループラインに招待します！\n#春から東工大"
    }
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
    let message = `【次回の予定】\n内容：${title}\n`
  
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
    line_message += "参加希望者は予定をあけておいてください。"
    line.push(line_message)

    let twitter_message = message 
    twitter_message += "参加希望者はDMお願いします！\n#春から東工大"
    Logger.log(twitter_message)
  }
}

// function doGet(){
//   let html = HtmlService.createTemplateFromFile("index").evaluate();
//   html.setTitle("出欠確認");
//   return html;
// }

function sendForm(e){
  line = new line("TEST_GROUP_ID")
  const responses = e.response.getItemReponses();
  const attendanceType = responses[0].getResponse();
  const uniformNumber = responses[1].getResponse();
  const reason = responses[2].getResponse();
  const remark = responses[3].getResponse();

  // スプレットシートを開く
  const ss =  SpreadsheetApp.openById("13WA_Q3VpsYsBuOpFqBjaACSoSnL4pqXLNe0evAPRjWs").getSheetByName(useSheetName);
  let number_cells = ss.getRange(3,2,ss.getLastRow()-2,1)
  let number_list = number_cells.getValues()
  let number_row = 0
  // 二分探索がベスト
  for (let i=0; i < number_list.length; i++){
    let n = number_list[i][0]
    if(n === uniformNumber){
      number_row = i + 3
      let number_column = ss.getLastColumn();
      let penaltyPoint
      if (attendanceType ==="欠席"){
        penaltyPoint=3
      }else{
        penaltyPoint=1
      };
      let name = ss.getRange(3+i,1).getValue()
      ss.getRange(number_row,number_column).setValue(penaltyPoint)

    }
  }
  // 背番号からname取得

  let message =`【${attendanceType}】\n名前：${name}\n理由：${reason}`
  if(remark){
    message += `\n備考：${remark}`
  }
  line.push(message)
}

function doPost(e){
  let html = HtmlService.createTemplateFromFile("result").evaluate();
  line = new line("USER_ID")
  const attendanceList = [
    "欠席",
    "遅刻",
    "早退",
  ]
  const attendanceType = attendanceList[e.parameter.type-1];
  const uniformNumber = e.parameter.number;
  const name = e.parameter.name;
  const reason = e.parameter.reason;
  const remark = e.parameter.remark;
  let message =`【${attendanceType}】\n名前：${name}\n理由：${reason}`
  if(remark){
    message += `\n備考：${remark}`
  }
  line.push(message)

  sheet(Number(uniformNumber),attendanceType)

  return html
}
function sheet(uniformNumber,attendanceType){
  // idを格納したい
  const ss =  SpreadsheetApp.openById("13WA_Q3VpsYsBuOpFqBjaACSoSnL4pqXLNe0evAPRjWs").getSheetByName(useSheetName);

  let number_cells = ss.getRange(3,2,ss.getLastRow()-2,1)
  let number_list = number_cells.getValues()
  let number_row = 0
  // 二分探索がベスト
  for (let i=0; i < number_list.length; i++){
    let n = number_list[i][0]
    if(n === uniformNumber){
      number_row = i + 3
      let number_column = ss.getLastColumn();
      let penaltyPoint
      if (attendanceType ==="欠席"){
        penaltyPoint=3
      }else{
        penaltyPoint=1
      };

      ss.getRange(number_row,number_column).setValue(penaltyPoint)
    }
  }

  
}



