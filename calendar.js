class calendar {
  constructor(idProperty){
    this.calendarId = PropertiesService.getScriptProperties().getProperty(idProperty)
  }

  changeDate(str){
    return Utilities.formatDate(str,'JST','HH:mm')
  };
  fetchEvents() {
    let tomorrow = new Date();
    tomorrow.setDate( tomorrow.getDate() + 1 );
    const myCalendar = CalendarApp.getCalendarById(this.calendarId); //特定のIDのカレンダーを取得
    const tomorrow_events = myCalendar.getEventsForDay(tomorrow);　//カレンダーの本日のイベントを取得
    let events_list = []
    /* イベントの数だけ繰り返し */
    for(const event of tomorrow_events){
      let title = event.getTitle(); //イベントのタイトル
      let start = this.changeDate(event.getStartTime()); //イベントの開始時刻
      let end = this.changeDate(event.getEndTime()); //イベントの終了時刻
      let location = event.getLocation()
      Logger.log(start)


    };

    return events_list


  };

};

function test (){
  const sample = new calendar("MY_CALENDAR_ID");
  sample.fetchEvents()
}