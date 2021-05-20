// class twitterClass {

//   constructor(){ this.twitter = TwitterWebService.getInstance(
//     '8EhswQz0a2YkLFrgBLANmTv5C',//API Key
//     'y90g1zsBgScKOFQBEcPf3w5cJYKlHQiKwrmHCzdXmjCI6biQxB'//API secret key
//   );
//   }
   
//   //アプリを連携認証する
//   authorize() {
//     this.twitter.authorize();
//   }
   
//   //認証を解除する
//   reset() {
//     this.twitter.reset();
//   }
   
//   //認証後のコールバック
//   authCallback(request) {
//     return this.twitter.authCallback(request);
//   }
  
  
  
//   // ツイートを投稿
//   postTweet() {

//     let service  = this.twitter.getService();
//     let endPointUrl = 'https://api.twitter.com/1.1/statuses/update.json';
    
//     let response = service.fetch(endPointUrl, {
//       method: 'post',
//       payload: {
//         status: message
//       }
//     });
//   }
// }


// OAuth1認証用インスタンス
var twitter = TwitterWebService.getInstance(
  '8EhswQz0a2YkLFrgBLANmTv5C',
  'y90g1zsBgScKOFQBEcPf3w5cJYKlHQiKwrmHCzdXmjCI6biQxB'
);

//OAuth1ライブラリを導入したうえで、getServiceを上書き
twitter.getService = function() {
  return OAuth1.createService('Twitter2')
    .setAccessTokenUrl('https://api.twitter.com/oauth/access_token')
    .setRequestTokenUrl('https://api.twitter.com/oauth/request_token')
    .setAuthorizationUrl('https://api.twitter.com/oauth/authorize')
    .setConsumerKey(twitter.consumer_key)
    .setConsumerSecret(twitter.consumer_secret)
    .setCallbackFunction('authCallback')
    .setPropertyStore(PropertiesService.getUserProperties())
}



// 認証を行う（必須）
function authorize() {
  twitter.authorize();
}

// 認証をリセット
function reset() {
  twitter.reset();
}

// 認証後のコールバック（必須）
function authCallback(request) {
  return twitter.authCallback(request);
}

function tweetTest(){
 postUpdateStatus('test'); 
}