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

