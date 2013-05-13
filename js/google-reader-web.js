// Generated by CoffeeScript 1.5.0
var CLIENTID, LOGOUT, OAUTHURL, REDIRECT, SCOPE, TYPE, VALIDURL, acToken, debug_var, expiresIn, getSubscription, getUserInfo, gup, loggedIn, login, startLogoutPolling, tokenType, user, validateToken, _url;

debug_var = "";

OAUTHURL = 'https://accounts.google.com/o/oauth2/auth?';

VALIDURL = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';

SCOPE = 'https://www.googleapis.com/auth/userinfo.profile https://www.google.com/reader/api';

CLIENTID = '640115812452-mk9muia2ldjp601bumj3mtiaemoce0qc.apps.googleusercontent.com';

REDIRECT = 'http://reader.marboo.biz';

LOGOUT = 'http://accounts.google.com/Logout';

TYPE = 'token';

_url = OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;

acToken = "";

tokenType = "";

expiresIn = "";

user = "";

loggedIn = false;

login = function() {
  var pollTimer, win;
  win = window.open(_url, "windowname1", 'width=800, height=600');
  return pollTimer = window.setInterval(function() {
    var url;
    try {
      console.log(win.document.URL);
      if (win.document.URL.indexOf(REDIRECT) !== -1) {
        window.clearInterval(pollTimer);
        url = win.document.URL;
        acToken = gup(url, 'access_token');
        tokenType = gup(url, 'token_type');
        expiresIn = gup(url, 'expires_in');
        win.close();
        return validateToken(acToken);
      }
    } catch (e) {
      return console.log(e);
    }
  }, 500);
};

validateToken = function(token) {
  return $.ajax({
    url: VALIDURL + token,
    data: null,
    success: function(responseText) {
      getUserInfo();
      loggedIn = true;
      $('#loginText').hide();
      $('#logoutText').show();
      return getSubscription();
    },
    dataType: "jsonp"
  });
};

getSubscription = function() {
  return $.getJSON({
    url: 'https://www.google.com/reader/api/0/subscription/list?output=json',
    dataType: "jsonp"
  }).done(function(data) {
    return console.log(data);
  });
};

getUserInfo = function() {
  return $.ajax({
    url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + acToken,
    data: null,
    success: function(resp) {
      user = resp;
      console.log(user);
      $('#uName').text('Welcome ' + user.name);
      return $('#imgHolder').attr('src', user.picture);
    },
    dataType: "jsonp"
  });
};

gup = function(url, name) {
  var regex, regexS, results;
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  regexS = "[\\#&]" + name + "=([^&#]*)";
  regex = new RegExp(regexS);
  results = regex.exec(url);
  if (results === null) {
    return "";
  } else {
    return results[1];
  }
};

startLogoutPolling = function() {
  $('#loginText').show();
  $('#logoutText').hide();
  loggedIn = false;
  $('#uName').text('Welcome ');
  return $('#imgHolder').attr('src', 'none.jpg');
};
