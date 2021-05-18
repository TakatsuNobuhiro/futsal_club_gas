class calendar {
  constructor(idProperty){
    this.calendarId = PropertiesService.getScriptProperties().getProperty(idProperty)
  }

  static changeDate(str){
    return Utilities.formatDate(str,'JST','HH:mm')
  };

  fetchEventsForDay(day) {
    const myCalendar = CalendarApp.getCalendarById(this.calendarId); 
    const events = myCalendar.getEventsForDay(day);　
    return events
  };

  fetchEvents(start,end,options){
    const myCalendar = CalendarApp.getCalendarById(this.calendarId);
    const events = myCalendar.getEvents(start,end,options)
    return events
  };

  fetchNextEvents(){
    let today = new Date();
    let nextMonth = new Date()
    nextMonth = nextMonth.setDate(today.getMonth()+1)
    this.fetchEvents(today,nextMonth)
  }

};

