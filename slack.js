class slack {
  constructor(url){
    this.url = PropertiesService.getScriptProperties().getProperty(url)

  }
  post_message(message){
    const postData = {
      'username' : 'slackbot',
      'text'     : message,
      'channel'  : '#general'
    }

    const options = {
      "method": "post",
      "content-Type": "application/json",
      "payload": JSON.stringify(postData)
    };

    UrlFetchApp.fetch(this.url, options);
  }
}
function test_slack(){
  const sample_slack = new slack("SLACK_URL")
  sample_slack.post_message("test")
}
