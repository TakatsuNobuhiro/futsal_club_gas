class calendar {
  constructor(idProperty){
    this.calendarId = PropertiesService.getScriptProperties().getProperty(idProperty)
  }

  static changeDate(str){
    return Utilities.formatDate(str,'JST','HH:mm')
  };

  fetchEvents(day) {
    const myCalendar = CalendarApp.getCalendarById(this.calendarId); 
    const events = myCalendar.getEventsForDay(day);　
    return events
  };

};

function test (){
  const sample = new calendar("MY_CALENDAR_ID");
  let tomorrow = new Date();
  tomorrow.setDate( tomorrow.getDate() + 1 );
  tomorrow_events = sample.fetchEvents(tomorrow)
  for(const event of tomorrow_events){
    let title = event.getTitle(); 
    let start = calendar.changeDate(event.getStartTime()); 
    let end = calendar.changeDate(event.getEndTime()); 
    let location = event.getLocation()
    Logger.log(start)
    Logger.log(title)
  };
}