class calendar {
  constructor(idProperty){
    this.calendarId = PropertiesService.getScriptProperties().getProperty(idProperty)
  }

  static changeDate(str){
    return Utilities.formatDate(str,'JST','HH:mm')
  };
  static getDate(str){
    return Utilities.formatDate(str,'JST','MM/dd HH:mm')
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
    let nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate()+30)
    const events = this.fetchEvents(today,nextMonth)
    for (let event of events){
      if (event.getColor() === "3"){
        return event
      }
    }
    return false
  }

};

