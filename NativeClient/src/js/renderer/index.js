(function (console) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
Math.__name__ = true;
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_Log = function() { };
haxe_Log.__name__ = true;
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var speech_manager_DomManager = function() {
	this._idMap = new haxe_ds_StringMap();
	this.setElementList(window.document.body);
	this._sceneMap = new haxe_ds_StringMap();
	var v = this.getScene("setup");
	this._sceneMap.set("setup",v);
	v;
	var v1 = this.getScene("live");
	this._sceneMap.set("live",v1);
	v1;
	this.changeScene("setup");
};
speech_manager_DomManager.__name__ = true;
speech_manager_DomManager.prototype = {
	get: function(id,sceneId) {
		return this._get(id,sceneId);
	}
	,getButton: function(id,sceneId) {
		return this._get(id,sceneId,"button");
	}
	,getInput: function(id,sceneId) {
		return this._get(id,sceneId,"input");
	}
	,getSelect: function(id,sceneId) {
		return this._get(id,sceneId,"select");
	}
	,getDialog: function(id,sceneId) {
		return this._idMap.get("dialog-" + id);
	}
	,getScene: function(id) {
		return this._idMap.get("scene-" + id);
	}
	,changeScene: function(id,callback) {
		if(this._sceneMap.get(id) == null) return;
		this._nowScene = id;
		var $it0 = this._sceneMap.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			haxe_Log.trace(key,{ fileName : "DomManager.hx", lineNumber : 93, className : "speech.manager.DomManager", methodName : "changeScene"});
			if(key == id) this._sceneMap.get(key).classList.remove("hide"); else this._sceneMap.get(key).classList.add("hide");
		}
		if(callback != null) callback();
	}
	,setMediaSource: function(id,trackList) {
		var optionHtml = [];
		optionHtml.push("<option value=\"\">None</option>");
		var _g = 0;
		while(_g < trackList.length) {
			var track = trackList[_g];
			++_g;
			optionHtml.push("<option value=\"" + track.id + "\">" + track.label + "</option>");
		}
		this.setOptions(id,optionHtml);
	}
	,initPlayer: function(src) {
		this.get("player-main","live").innerHTML = "";
		this.addMedia("<webview class=\"player-webview\" id=\"live-slideview\" src=\"" + src + "\" autosize=\"on\" disablewebsecurity></webview>",true);
		var v = window.document.getElementById("live-slideview");
		this._idMap.set("live-slideview",v);
		v;
		return this._idMap.get("live-slideview");
	}
	,addVideo: function(name,src,posterSrc) {
		var id = this._getId(name,"live","video");
		this.addMedia("<video class=\"player-video\" id=\"" + id + "\" autoplay></video>");
		var video = window.document.getElementById(id);
		if(src != null) video.src = src;
		if(posterSrc != null) video.poster = posterSrc;
		{
			this._idMap.set(id,video);
			video;
		}
	}
	,_getId: function(id,sceneId,prefix) {
		var array = [];
		if(prefix != null) array.push(prefix);
		array.push(sceneId == null?this._nowScene:sceneId);
		array.push(id);
		return array.join("-");
	}
	,_get: function(id,sceneId,prefix) {
		var key = this._getId(id,sceneId,prefix);
		return this._idMap.get(key);
	}
	,addMedia: function(innerHTML,forceActive) {
		if(forceActive == null) forceActive = false;
		var player = this.get("player-main","live");
		var i;
		if(player.childElementCount == null) i = "null"; else i = "" + player.childElementCount;
		var list;
		var _this = window.document;
		list = _this.createElement("li");
		list.classList.add("player-main-item");
		list.innerHTML = "<input type=\"checkbox\" id=\"player-main-item-" + i + "\" /><div><button>×</button><label for=\"player-main-item-" + i + "\">-</label></div>";
		var div = list.getElementsByTagName("div")[0];
		div.insertAdjacentHTML("afterbegin",innerHTML);
		if(player.childElementCount == 0 || forceActive) {
			var others = window.document.getElementsByClassName("player-main-item");
			var _g = 0;
			while(_g < others.length) {
				var elem = others[_g];
				++_g;
				elem.classList.remove("active");
			}
			list.classList.add("active");
		}
		player.appendChild(list);
	}
	,setOptions: function(selectId,optionHtml) {
		var select = this.getSelect(selectId);
		select.innerHTML = optionHtml.join("");
	}
	,setElementList: function(elem) {
		if(elem.id != null && elem.id.length > 0) {
			{
				this._idMap.set(elem.id,elem);
				elem;
			}
			haxe_Log.trace(elem.id,{ fileName : "DomManager.hx", lineNumber : 211, className : "speech.manager.DomManager", methodName : "setElementList"});
		}
		var child = elem.firstElementChild;
		while(child != null) {
			this.setElementList(child);
			child = child.nextElementSibling;
		}
	}
};
var speech_manager_MediaManager = function() {
	this._trackList = [];
};
speech_manager_MediaManager.__name__ = true;
speech_manager_MediaManager.prototype = {
	getTrackList: function(callback) {
		var _g = this;
		MediaStreamTrack.getSources(function(data) {
			_g._trackList = data.slice();
			callback(data);
		});
	}
	,getUserMedia: function(videoId,audioId,success,error) {
		var reqVideo = videoId != null && videoId.length > 0;
		var reqAudio = audioId != null && audioId.length > 0;
		if(reqVideo && reqAudio) window.navigator.webkitGetUserMedia({ video : { optional : [{ sourceId : videoId}]}, audio : { optional : [{ sourceId : audioId}]}},success,error); else if(reqVideo) window.navigator.webkitGetUserMedia({ video : { optional : [{ sourceId : videoId}]}},success,error); else if(reqAudio) window.navigator.webkitGetUserMedia({ video : false, audio : { optional : [{ sourceId : audioId}]}},success,error);
	}
};
var speech_renderer_State = { __ename__ : true, __constructs__ : ["SETUP","LIVE_STARTING","LIVE"] };
speech_renderer_State.SETUP = ["SETUP",0];
speech_renderer_State.SETUP.toString = $estr;
speech_renderer_State.SETUP.__enum__ = speech_renderer_State;
speech_renderer_State.LIVE_STARTING = ["LIVE_STARTING",1];
speech_renderer_State.LIVE_STARTING.toString = $estr;
speech_renderer_State.LIVE_STARTING.__enum__ = speech_renderer_State;
speech_renderer_State.LIVE = ["LIVE",2];
speech_renderer_State.LIVE.toString = $estr;
speech_renderer_State.LIVE.__enum__ = speech_renderer_State;
var speech_renderer_Request = { __ename__ : true, __constructs__ : ["CREATE","BEGIN","PAUSE","END","OPEN","CHANGE"] };
speech_renderer_Request.CREATE = function(option) { var $x = ["CREATE",0,option]; $x.__enum__ = speech_renderer_Request; $x.toString = $estr; return $x; };
speech_renderer_Request.BEGIN = ["BEGIN",1];
speech_renderer_Request.BEGIN.toString = $estr;
speech_renderer_Request.BEGIN.__enum__ = speech_renderer_Request;
speech_renderer_Request.PAUSE = ["PAUSE",2];
speech_renderer_Request.PAUSE.toString = $estr;
speech_renderer_Request.PAUSE.__enum__ = speech_renderer_Request;
speech_renderer_Request.END = ["END",3];
speech_renderer_Request.END.toString = $estr;
speech_renderer_Request.END.__enum__ = speech_renderer_Request;
speech_renderer_Request.OPEN = function(slideUrl,option) { var $x = ["OPEN",4,slideUrl,option]; $x.__enum__ = speech_renderer_Request; $x.toString = $estr; return $x; };
speech_renderer_Request.CHANGE = function(slideUrl) { var $x = ["CHANGE",5,slideUrl]; $x.__enum__ = speech_renderer_Request; $x.toString = $estr; return $x; };
var speech_renderer_Index = function() {
	this.WS_URL = "ws://localhost:8081/ws/presenjs";
	var _g = this;
	window.onload = function() {
		_g._state = null;
		_g._prevUrl = "";
		_g._reqCount = 0;
		_g._slideview = null;
		_g._dom = new speech_manager_DomManager();
		_g._media = new speech_manager_MediaManager();
		_g.setState(speech_renderer_State.SETUP);
	};
	window.onunload = function() {
		if(_g._ws != null) _g._ws.close();
	};
};
speech_renderer_Index.__name__ = true;
speech_renderer_Index.main = function() {
	new speech_renderer_Index();
};
speech_renderer_Index.prototype = {
	setState: function(nextState) {
		var _g = this;
		if(this._state == nextState) return;
		var temp = new haxe_ds_StringMap();
		var _g1 = this._state;
		if(_g1 == null) {
		} else switch(_g1[1]) {
		case 0:
			var v = this._dom.getInput("title","setup").value;
			if(__map_reserved.title != null) temp.setReserved("title",v); else temp.h["title"] = v;
			v;
			var v1 = this._dom.getSelect("video","setup").value;
			if(__map_reserved.selectedVideo != null) temp.setReserved("selectedVideo",v1); else temp.h["selectedVideo"] = v1;
			v1;
			var v2 = this._dom.getSelect("audio","setup").value;
			if(__map_reserved.selectedAudio != null) temp.setReserved("selectedAudio",v2); else temp.h["selectedAudio"] = v2;
			v2;
			var v3 = this._dom.getInput("slide-url","setup").value;
			if(__map_reserved.slideUrl != null) temp.setReserved("slideUrl",v3); else temp.h["slideUrl"] = v3;
			v3;
			this._dom.getButton("submit").addEventListener("click",$bind(this,this.onClickButtonStart));
			break;
		case 1:
			this._dom.getDialog("loading").close();
			break;
		case 2:
			this._dom.get("player-main","live").innerHTML = "";
			this.send(speech_renderer_Request.END);
			this._ws.close();
			this._ws = null;
			window.removeEventListener("resize",$bind(this,this.onResize));
			this._slideview.removeEventListener("keydown",$bind(this,this.onChangeSlide));
			this._slideview.removeEventListener("wheel",$bind(this,this.onChangeSlide));
			this._slideview.removeEventListener("mouseup",$bind(this,this.onChangeSlide));
			break;
		}
		switch(nextState[1]) {
		case 0:
			this._dom.changeScene("setup");
			var videoList = [];
			var audioList = [];
			this._media.getTrackList(function(data) {
				var _g2 = 0;
				while(_g2 < data.length) {
					var track = data[_g2];
					++_g2;
					var _g11 = track.kind;
					switch(_g11) {
					case "video":
						videoList.push(track);
						break;
					case "audio":
						audioList.push(track);
						break;
					default:
						haxe_Log.trace(track,{ fileName : "Index.hx", lineNumber : 127, className : "speech.renderer.Index", methodName : "setState"});
					}
				}
				_g._dom.setMediaSource("video",videoList);
				_g._dom.setMediaSource("audio",audioList);
			});
			this._dom.getButton("submit").addEventListener("click",$bind(this,this.onClickButtonStart));
			break;
		case 1:
			this._dom.getDialog("loading").showModal();
			this._ws = new WebSocket(this.WS_URL);
			this._ws.addEventListener("open",$bind(this,this.onConnect));
			this._ws.addEventListener("close",$bind(this,this.onDisconnect));
			this._ws.addEventListener("message",$bind(this,this.onReceive));
			this._ws.addEventListener("error",$bind(this,this.onError));
			this._slideview = this._dom.initPlayer(__map_reserved.slideUrl != null?temp.getReserved("slideUrl"):temp.h["slideUrl"]);
			this._prevUrl = __map_reserved.slideUrl != null?temp.getReserved("slideUrl"):temp.h["slideUrl"];
			this._media.getUserMedia(__map_reserved.selectedVideo != null?temp.getReserved("selectedVideo"):temp.h["selectedVideo"],__map_reserved.selectedAudio != null?temp.getReserved("selectedAudio"):temp.h["selectedAudio"],function(lms) {
				var src = window.URL.createObjectURL(lms);
				_g._dom.addVideo("webcam",src);
			},function(err) {
				haxe_Log.trace("error getusermedia",{ fileName : "Index.hx", lineNumber : 157, className : "speech.renderer.Index", methodName : "setState"});
			});
			break;
		case 2:
			this._dom.changeScene("live");
			window.addEventListener("resize",$bind(this,this.onResize));
			this.onResize();
			this._slideview.addEventListener("keydown",$bind(this,this.onChangeSlide));
			this._slideview.addEventListener("wheel",$bind(this,this.onChangeSlide));
			this._slideview.addEventListener("mouseup",$bind(this,this.onChangeSlide));
			this._dom.getButton("finish").addEventListener("click",$bind(this,this.onClickButtonFinish));
			this.send(speech_renderer_Request.OPEN(this._slideview.getUrl(),{ }));
			break;
		}
		this._state = nextState;
	}
	,onChangeSlide: function() {
		var _g = this;
		if(this._state != speech_renderer_State.LIVE) return;
		haxe_Timer.delay(function() {
			var url = _g._slideview.getUrl();
			if(_g._prevUrl != url) {
				_g.send(speech_renderer_Request.CHANGE(url));
				_g._prevUrl = url;
			}
		},250);
	}
	,onResize: function() {
		var playerHeight = this._dom.get("player-main","live").offsetHeight;
		this._slideview.style.height = (playerHeight == null?"null":"" + playerHeight) + "px";
	}
	,onClickButtonStart: function() {
		var slideUrl = this._dom.getInput("slide-url").value;
		var title = this._dom.getInput("title").value;
		var urlChecker = new EReg("https?://.+","");
		if(slideUrl.length == 0 || title.length == 0 || !urlChecker.match(slideUrl)) this._dom.getInput("slide-url").focus(); else this.setState(speech_renderer_State.LIVE_STARTING);
	}
	,onClickButtonFinish: function() {
		this.setState(speech_renderer_State.SETUP);
	}
	,send: function(req) {
		var obj = { };
		switch(req[1]) {
		case 0:
			var option = req[2];
			obj.type = "create";
			obj.data = { 'option' : option};
			break;
		case 1:
			obj.type = "begin";
			break;
		case 2:
			obj.type = "pause";
			break;
		case 3:
			obj.type = "end";
			break;
		case 4:
			var option1 = req[3];
			var slideUrl = req[2];
			obj.type = "open";
			obj.data = { 'slideUrl' : slideUrl, 'option' : option1};
			break;
		case 5:
			var slideUrl1 = req[2];
			obj.type = "change";
			obj.data = { 'slideUrl' : slideUrl1};
			break;
		}
		obj.timestamp = new Date().getTime();
		obj.requestId = this._reqCount++;
		this._ws.send(JSON.stringify(obj));
		return this._reqCount;
	}
	,onConnect: function(e) {
		this.send(speech_renderer_Request.CREATE({ title : "test room", aspect : "4:3"}));
	}
	,onDisconnect: function(e) {
		this.setState(speech_renderer_State.SETUP);
	}
	,onReceive: function(e) {
		var resp = JSON.parse(e.data);
		var _g = resp.type;
		switch(_g) {
		case "onCreate":
			this._dom.getInput("url","live").value = resp.data;
			this.setState(speech_renderer_State.LIVE);
			break;
		case "onBegin":
			haxe_Log.trace("onBegin",{ fileName : "Index.hx", lineNumber : 282, className : "speech.renderer.Index", methodName : "onReceive"});
			break;
		case "onPause":
			haxe_Log.trace("onPause",{ fileName : "Index.hx", lineNumber : 285, className : "speech.renderer.Index", methodName : "onReceive"});
			break;
		case "onEnd":
			haxe_Log.trace("onEnd",{ fileName : "Index.hx", lineNumber : 288, className : "speech.renderer.Index", methodName : "onReceive"});
			break;
		case "onEnter":
			haxe_Log.trace("onEnter",{ fileName : "Index.hx", lineNumber : 291, className : "speech.renderer.Index", methodName : "onReceive"});
			break;
		case "onLeave":
			haxe_Log.trace("onLeave",{ fileName : "Index.hx", lineNumber : 294, className : "speech.renderer.Index", methodName : "onReceive"});
			break;
		case "onError":
			haxe_Log.trace("resp error",{ fileName : "Index.hx", lineNumber : 297, className : "speech.renderer.Index", methodName : "onReceive", customParams : [resp.data]});
			break;
		}
	}
	,onError: function(e) {
		haxe_Log.trace("error",{ fileName : "Index.hx", lineNumber : 303, className : "speech.renderer.Index", methodName : "onError", customParams : [e]});
		this.setState(speech_renderer_State.SETUP);
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.__name__ = true;
Array.__name__ = true;
Date.__name__ = ["Date"];
var __map_reserved = {}
speech_renderer_Index.main();
})(typeof console != "undefined" ? console : {log:function(){}});
