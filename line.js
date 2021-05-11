class line {
  constructor(id){
    this.id = PropertiesService.getScriptProperties().getProperty(id)
    this.headers = {
      "Content-Type": "application/json; charset=UTF-8",
      'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty("LINE_TOKEN"), 
    };
  }

  post_message(url,postData){
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
    this.post_message(url,postData)
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

function a_test(){
  const test_line = new line()
  test_line.broadCast("oppai")
}
