// Generated by CoffeeScript 1.5.0
var oauth;

chrome.browserAction.onClicked.addListener(function(tab) {
  return chrome.tabs.create({
    url: chrome.extension.getURL("index.html")
  });
});

oauth = ChromeExOAuth.initBackgroundPage({
  request_url: 'https://www.google.com/accounts/OAuthGetRequestToken',
  authorize_url: 'https://www.google.com/accounts/OAuthAuthorizeToken',
  access_url: 'https://www.google.com/accounts/OAuthGetAccessToken',
  consumer_key: 'anonymous',
  consumer_secret: 'anonymous',
  scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.google.com/reader/api',
  app_name: 'gReader'
});
