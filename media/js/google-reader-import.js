// Generated by CoffeeScript 1.5.0
var script;

script = document.createElement('script');

script.type = 'text/javascript';

if (chrome.extension) {
  script.src = "js/google-reader-chrome.js";
} else {
  script.src = "js/google-reader-web.js";
}

$("body").append(script);
