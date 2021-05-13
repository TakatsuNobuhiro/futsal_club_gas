class calendar {
  constructor(idProperty){
    this.calendarId = PropertiesService.getScriptProperties().getProperty(idProperty)
  }

  changeDate(str){
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
    let start = this.changeDate(event.getStartTime()); 
    let end = this.changeDate(event.getEndTime()); 
    let location = event.getLocation()

  };
}