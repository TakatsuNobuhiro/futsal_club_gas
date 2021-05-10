//Linebot
function line() {
  const url = "https://api.line.me/v2/bot/message/push"
  const message = "test"
  const postData = {
    "to": PropertiesService.getScriptProperties().getProperty("USER_ID"), 
    "messages": [
      {
        "type": "text",
        "text": message,
      }
    ]
  };

  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + PropertiesService.getScriptProperties().getProperty("LINE_TOKEN"), 
  };

  const options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };

  UrlFetchApp.fetch(url, options);



}

