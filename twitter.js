class twitter {

  constructor(){ this.twitter = TwitterWebService.getInstance(
    '8EhswQz0a2YkLFrgBLANmTv5C',//API Key
    'y90g1zsBgScKOFQBEcPf3w5cJYKlHQiKwrmHCzdXmjCI6biQxB'//API secret key
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
  postTweet() {

    let service  = this.twitter.getService();
    let endPointUrl = 'https://api.twitter.com/1.1/statuses/update.json';
    
    let response = service.fetch(endPointUrl, {
      method: 'post',
      payload: {
        status: message
      }
    });
  }
}
