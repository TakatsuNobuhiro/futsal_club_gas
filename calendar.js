class calendar {
  constructor(idProperty){
    this.calendarId = PropertiesService.getScriptProperties().getProperty(idProperty)
  }

  static changeDate(date){
    return Utilities.formatDate(date,'JST','HH:mm')
  };

  fetchEvents(day) {
    const myCalendar = CalendarApp.getCalendarById(this.calendarId); 
    const events = myCalendar.getEventsForDay(day);　
    return events
  };

};

