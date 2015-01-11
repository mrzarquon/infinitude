"use strict";function wsu(a){var b=window.location;return("https:"===b.protocol?"wss://":"ws://")+b.hostname+(80!==b.port&&443!==b.port?":"+b.port:"")+a}angular.module("publicApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/profiles",{templateUrl:"views/profiles.html",controller:"MainCtrl"}).when("/schedules",{templateUrl:"views/schedules.html",controller:"MainCtrl"}).when("/serial",{templateUrl:"views/serial.html",controller:"SerialCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("publicApp").controller("MainCtrl",["$scope","$http","$interval","$location",function(a,b,c,d){a.debounce=0;var e=function(){return a.debounce>0?void(a.debounce=a.debounce-1):(b.get("/systems.json").success(function(b){a.systems=b}),b.get("/status.json").success(function(b){a.status=b.status[0]}),void b.get("/notifications.json").success(function(b){a.notifications=b.notifications[0]}))};a.$watch("systems",function(b,c){b!==c&&(a.debounce=a.debounce+1)},!0),e(),c(e,2e5),a.isActive=function(a){return a===d.path()},a.save=function(){console.log("saving systems structure"),b.post("/systems/infinitude",a.systems).success(function(){a.debounce=0}).error(function(){console.log("oh noes! save fail.")})}}]);var serial;angular.module("publicApp").controller("SerialCtrl",["$scope",function(a){a.rawSerial="Loading",serial=serial||new WebSocket(wsu("/serial")),serial.onopen=function(){console.log("Socket open")},serial.onclose=function(){console.log("Socket closed")},serial.onmessage=function(b){a.rawSerial+=b.data;var c=a.rawSerial.length,d=2048;c>d&&(a.rawSerial=a.rawSerial.substr(c-d,d)),a.$apply()}}]);