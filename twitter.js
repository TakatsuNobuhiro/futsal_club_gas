class twitter {

  constructor(){ this.twitter = TwitterWebService.getInstance(
    PropertiesService.getScriptProperties().getProperty('TWITTER_API_KEY'),//API Key
    PropertiesService.getScriptProperties().getProperty('TWITTER_SECRET_KEY')//API secret key
  );
  }
   
  //アプリを連携認証する
  authorize() {
    this.twitter.authorize();
  }
   
  //認証を解除する
  reset() {
    this.twitter.reset();
  }
   
  //認証後のコールバック
  authCallback(request) {
    return this.twitter.authCallback(request);
  }
  
  
  
  // ツイートを投稿
  postTweet(message) {

    const service  = this.twitter.getService();
    const endPointUrl = 'https://api.twitter.com/1.1/statuses/update.json';
    const response = service.fetch(endPointUrl, {
      method: 'post',
      payload: {
        status: message
      }
    });
  }
}
