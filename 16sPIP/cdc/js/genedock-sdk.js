(function(){
  /*
   *   Author:caihanyong, Xin Chen
   *   Copyright @GeneDock
   *   https://www.genedock.com
   */

  "use strict";

  var CryptoJS=CryptoJS||function(c,b){var i={},l=i.lib={},d=function(){},y=l.Base={extend:function(a){d.prototype=this;var g=new d;a&&g.mixIn(a);g.hasOwnProperty("init")||(g.init=function(){g.$super.init.apply(this,arguments)});g.init.prototype=g;g.$super=this;return g},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var g in a){a.hasOwnProperty(g)&&(this[g]=a[g])}a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},e=l.WordArray=y.extend({init:function(a,g){a=this.words=a||[];this.sigBytes=g!=b?g:4*a.length},toString:function(a){return(a||x).stringify(this)},concat:function(g){var n=this.words,m=g.words,k=this.sigBytes;g=g.sigBytes;this.clamp();if(k%4){for(var p=0;p<g;p++){n[k+p>>>2]|=(m[p>>>2]>>>24-8*(p%4)&255)<<24-8*((k+p)%4)}}else{if(65535<m.length){for(p=0;p<g;p+=4){n[k+p>>>2]=m[p>>>2]}}else{n.push.apply(n,m)}}this.sigBytes+=g;return this},clamp:function(){var a=this.words,g=this.sigBytes;a[g>>>2]&=4294967295<<32-8*(g%4);a.length=c.ceil(g/4)},clone:function(){var a=y.clone.call(this);a.words=this.words.slice(0);return a},random:function(g){for(var k=[],h=0;h<g;h+=4){k.push(4294967296*c.random()|0)}return new e.init(k,g)}}),w=i.enc={},x=w.Hex={stringify:function(k){var p=k.words;k=k.sigBytes;for(var q=[],n=0;n<k;n++){var g=p[n>>>2]>>>24-8*(n%4)&255;q.push((g>>>4).toString(16));q.push((g&15).toString(16))}return q.join("")},parse:function(g){for(var m=g.length,n=[],k=0;k<m;k+=2){n[k>>>3]|=parseInt(g.substr(k,2),16)<<24-4*(k%8)}return new e.init(n,m/2)}},o=w.Latin1={stringify:function(g){var m=g.words;g=g.sigBytes;for(var n=[],k=0;k<g;k++){n.push(String.fromCharCode(m[k>>>2]>>>24-8*(k%4)&255))}return n.join("")},parse:function(g){for(var m=g.length,n=[],k=0;k<m;k++){n[k>>>2]|=(g.charCodeAt(k)&255)<<24-8*(k%4)}return new e.init(n,m)}},z=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(o.stringify(a)))}catch(g){throw Error("Malformed UTF-8 data")}},parse:function(a){return o.parse(unescape(encodeURIComponent(a)))}},j=l.BufferedBlockAlgorithm=y.extend({reset:function(){this._data=new e.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=z.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(p){var r=this._data,t=r.words,q=r.sigBytes,n=this.blockSize,s=q/(4*n),s=p?c.ceil(s):c.max((s|0)-this._minBufferSize,0);p=s*n;q=c.min(4*p,q);if(p){for(var u=0;u<p;u+=n){this._doProcessBlock(t,u)}u=t.splice(0,p);r.sigBytes-=q}return new e.init(u,q)},clone:function(){var a=y.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=j.extend({cfg:y.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){j.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(g,k){return(new a.init(k)).finalize(g)}},_createHmacHelper:function(a){return function(g,k){return(new f.HMAC.init(a,k)).finalize(g)}}});var f=i.algo={};return i}(Math);(function(c){function b(r,p,n,t,u,q,s){r=r+(p&n|~p&t)+u+s;return(r<<q|r>>>32-q)+p}function f(r,p,n,t,u,q,s){r=r+(p&t|n&~t)+u+s;return(r<<q|r>>>32-q)+p}function h(r,p,n,t,u,q,s){r=r+(p^n^t)+u+s;return(r<<q|r>>>32-q)+p}function d(r,u,n,t,s,q,v){r=r+(n^(u|~t))+s+v;return(r<<q|r>>>32-q)+u}for(var m=CryptoJS,e=m.lib,j=e.WordArray,l=e.Hasher,e=m.algo,i=[],o=0;64>o;o++){i[o]=4294967296*c.abs(c.sin(o+1))|0}e=e.MD5=l.extend({_doReset:function(){this._hash=new j.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(Q,N){for(var V=0;16>V;V++){var P=N+V,M=Q[P];Q[P]=(M<<8|M>>>24)&16711935|(M<<24|M>>>8)&4278255360}var V=this._hash.words,P=Q[N+0],M=Q[N+1],O=Q[N+2],J=Q[N+3],F=Q[N+4],H=Q[N+5],E=Q[N+6],r=Q[N+7],p=Q[N+8],k=Q[N+9],g=Q[N+10],a=Q[N+11],L=Q[N+12],K=Q[N+13],I=Q[N+14],G=Q[N+15],U=V[0],T=V[1],S=V[2],R=V[3],U=b(U,T,S,R,P,7,i[0]),R=b(R,U,T,S,M,12,i[1]),S=b(S,R,U,T,O,17,i[2]),T=b(T,S,R,U,J,22,i[3]),U=b(U,T,S,R,F,7,i[4]),R=b(R,U,T,S,H,12,i[5]),S=b(S,R,U,T,E,17,i[6]),T=b(T,S,R,U,r,22,i[7]),U=b(U,T,S,R,p,7,i[8]),R=b(R,U,T,S,k,12,i[9]),S=b(S,R,U,T,g,17,i[10]),T=b(T,S,R,U,a,22,i[11]),U=b(U,T,S,R,L,7,i[12]),R=b(R,U,T,S,K,12,i[13]),S=b(S,R,U,T,I,17,i[14]),T=b(T,S,R,U,G,22,i[15]),U=f(U,T,S,R,M,5,i[16]),R=f(R,U,T,S,E,9,i[17]),S=f(S,R,U,T,a,14,i[18]),T=f(T,S,R,U,P,20,i[19]),U=f(U,T,S,R,H,5,i[20]),R=f(R,U,T,S,g,9,i[21]),S=f(S,R,U,T,G,14,i[22]),T=f(T,S,R,U,F,20,i[23]),U=f(U,T,S,R,k,5,i[24]),R=f(R,U,T,S,I,9,i[25]),S=f(S,R,U,T,J,14,i[26]),T=f(T,S,R,U,p,20,i[27]),U=f(U,T,S,R,K,5,i[28]),R=f(R,U,T,S,O,9,i[29]),S=f(S,R,U,T,r,14,i[30]),T=f(T,S,R,U,L,20,i[31]),U=h(U,T,S,R,H,4,i[32]),R=h(R,U,T,S,p,11,i[33]),S=h(S,R,U,T,a,16,i[34]),T=h(T,S,R,U,I,23,i[35]),U=h(U,T,S,R,M,4,i[36]),R=h(R,U,T,S,F,11,i[37]),S=h(S,R,U,T,r,16,i[38]),T=h(T,S,R,U,g,23,i[39]),U=h(U,T,S,R,K,4,i[40]),R=h(R,U,T,S,P,11,i[41]),S=h(S,R,U,T,J,16,i[42]),T=h(T,S,R,U,E,23,i[43]),U=h(U,T,S,R,k,4,i[44]),R=h(R,U,T,S,L,11,i[45]),S=h(S,R,U,T,G,16,i[46]),T=h(T,S,R,U,O,23,i[47]),U=d(U,T,S,R,P,6,i[48]),R=d(R,U,T,S,r,10,i[49]),S=d(S,R,U,T,I,15,i[50]),T=d(T,S,R,U,H,21,i[51]),U=d(U,T,S,R,L,6,i[52]),R=d(R,U,T,S,J,10,i[53]),S=d(S,R,U,T,g,15,i[54]),T=d(T,S,R,U,M,21,i[55]),U=d(U,T,S,R,p,6,i[56]),R=d(R,U,T,S,G,10,i[57]),S=d(S,R,U,T,E,15,i[58]),T=d(T,S,R,U,K,21,i[59]),U=d(U,T,S,R,F,6,i[60]),R=d(R,U,T,S,a,10,i[61]),S=d(S,R,U,T,O,15,i[62]),T=d(T,S,R,U,k,21,i[63]);V[0]=V[0]+U|0;V[1]=V[1]+T|0;V[2]=V[2]+S|0;V[3]=V[3]+R|0},_doFinalize:function(){var p=this._data,s=p.words,n=8*this._nDataBytes,r=8*p.sigBytes;s[r>>>5]|=128<<24-r%32;var q=c.floor(n/4294967296);s[(r+64>>>9<<4)+15]=(q<<8|q>>>24)&16711935|(q<<24|q>>>8)&4278255360;s[(r+64>>>9<<4)+14]=(n<<8|n>>>24)&16711935|(n<<24|n>>>8)&4278255360;p.sigBytes=4*(s.length+1);this._process();p=this._hash;s=p.words;for(n=0;4>n;n++){r=s[n],s[n]=(r<<8|r>>>24)&16711935|(r<<24|r>>>8)&4278255360}return p},clone:function(){var g=l.clone.call(this);g._hash=this._hash.clone();return g}});m.MD5=l._createHelper(e);m.HmacMD5=l._createHmacHelper(e)})(Math);(function(){var b=CryptoJS,a=b.enc.Utf8;b.algo.HMAC=b.lib.Base.extend({init:function(f,h){f=this._hasher=new f.init;"string"==typeof h&&(h=a.parse(h));var d=f.blockSize,c=4*d;h.sigBytes>c&&(h=f.finalize(h));h.clamp();for(var e=this._oKey=h.clone(),j=this._iKey=h.clone(),l=e.words,i=j.words,m=0;m<d;m++){l[m]^=1549556828,i[m]^=909522486}e.sigBytes=j.sigBytes=c;this.reset()},reset:function(){var c=this._hasher;c.reset();c.update(this._iKey)},update:function(c){this._hasher.update(c);return this},finalize:function(c){var d=this._hasher;c=d.finalize(c);d.reset();return d.finalize(this._oKey.clone().concat(c))}})})();var CryptoJS=CryptoJS||function(v,o){var w={},x=w.lib={},i=function(){},q=x.Base={extend:function(b){i.prototype=this;var d=new i;b&&d.mixIn(b);d.hasOwnProperty("init")||(d.init=function(){d.$super.init.apply(this,arguments)});d.init.prototype=d;d.$super=this;return d},create:function(){var b=this.extend();b.init.apply(b,arguments);return b},init:function(){},mixIn:function(b){for(var d in b){b.hasOwnProperty(d)&&(this[d]=b[d])}b.hasOwnProperty("toString")&&(this.toString=b.toString)},clone:function(){return this.init.prototype.extend(this)}},c=x.WordArray=q.extend({init:function(b,d){b=this.words=b||[];this.sigBytes=d!=o?d:4*b.length},toString:function(b){return(b||f).stringify(this)},concat:function(e){var j=this.words,h=e.words,g=this.sigBytes;e=e.sigBytes;this.clamp();if(g%4){for(var d=0;d<e;d++){j[g+d>>>2]|=(h[d>>>2]>>>24-8*(d%4)&255)<<24-8*((g+d)%4)}}else{if(65535<h.length){for(d=0;d<e;d+=4){j[g+d>>>2]=h[d>>>2]}}else{j.push.apply(j,h)}}this.sigBytes+=e;return this},clamp:function(){var b=this.words,d=this.sigBytes;b[d>>>2]&=4294967295<<32-8*(d%4);b.length=v.ceil(d/4)},clone:function(){var b=q.clone.call(this);b.words=this.words.slice(0);return b},random:function(e){for(var g=[],d=0;d<e;d+=4){g.push(4294967296*v.random()|0)}return new c.init(g,e)}}),y=w.enc={},f=y.Hex={stringify:function(g){var k=g.words;g=g.sigBytes;for(var e=[],h=0;h<g;h++){var j=k[h>>>2]>>>24-8*(h%4)&255;e.push((j>>>4).toString(16));e.push((j&15).toString(16))}return e.join("")},parse:function(e){for(var h=e.length,d=[],g=0;g<h;g+=2){d[g>>>3]|=parseInt(e.substr(g,2),16)<<24-4*(g%8)}return new c.init(d,h/2)}},t=y.Latin1={stringify:function(e){var h=e.words;e=e.sigBytes;for(var d=[],g=0;g<e;g++){d.push(String.fromCharCode(h[g>>>2]>>>24-8*(g%4)&255))}return d.join("")},parse:function(e){for(var h=e.length,d=[],g=0;g<h;g++){d[g>>>2]|=(e.charCodeAt(g)&255)<<24-8*(g%4)}return new c.init(d,h)}},u=y.Utf8={stringify:function(b){try{return decodeURIComponent(escape(t.stringify(b)))}catch(d){throw Error("Malformed UTF-8 data")}},parse:function(b){return t.parse(unescape(encodeURIComponent(b)))}},a=x.BufferedBlockAlgorithm=q.extend({reset:function(){this._data=new c.init;this._nDataBytes=0},_append:function(b){"string"==typeof b&&(b=u.parse(b));this._data.concat(b);this._nDataBytes+=b.sigBytes},_process:function(h){var p=this._data,g=p.words,l=p.sigBytes,n=this.blockSize,m=l/(4*n),m=h?v.ceil(m):v.max((m|0)-this._minBufferSize,0);h=m*n;l=v.min(4*h,l);if(h){for(var j=0;j<h;j+=n){this._doProcessBlock(g,j)}j=g.splice(0,h);p.sigBytes-=l}return new c.init(j,l)},clone:function(){var b=q.clone.call(this);b._data=this._data.clone();return b},_minBufferSize:0});x.Hasher=a.extend({cfg:q.extend(),init:function(b){this.cfg=this.cfg.extend(b);this.reset()},reset:function(){a.reset.call(this);this._doReset()},update:function(b){this._append(b);this._process();return this},finalize:function(b){b&&this._append(b);return this._doFinalize()},blockSize:16,_createHelper:function(b){return function(e,g){return(new b.init(g)).finalize(e)}},_createHmacHelper:function(b){return function(e,g){return(new z.HMAC.init(b,g)).finalize(e)}}});var z=w.algo={};return w}(Math);(function(){var c=CryptoJS,b=c.lib,f=b.WordArray,h=b.Hasher,a=[],b=c.algo.SHA1=h.extend({_doReset:function(){this._hash=new f.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(r,q){for(var t=this._hash.words,i=t[0],m=t[1],o=t[2],p=t[3],k=t[4],u=0;80>u;u++){if(16>u){a[u]=r[q+u]|0}else{var s=a[u-3]^a[u-8]^a[u-14]^a[u-16];a[u]=s<<1|s>>>31}s=(i<<5|i>>>27)+k+a[u];s=20>u?s+((m&o|~m&p)+1518500249):40>u?s+((m^o^p)+1859775393):60>u?s+((m&o|m&p|o&p)-1894007588):s+((m^o^p)-899497514);k=p;p=o;o=m<<30|m>>>2;m=i;i=s}t[0]=t[0]+i|0;t[1]=t[1]+m|0;t[2]=t[2]+o|0;t[3]=t[3]+p|0;t[4]=t[4]+k|0},_doFinalize:function(){var l=this._data,k=l.words,i=8*this._nDataBytes,j=8*l.sigBytes;k[j>>>5]|=128<<24-j%32;k[(j+64>>>9<<4)+14]=Math.floor(i/4294967296);k[(j+64>>>9<<4)+15]=i;l.sigBytes=4*k.length;this._process();return this._hash},clone:function(){var d=h.clone.call(this);d._hash=this._hash.clone();return d}});c.SHA1=h._createHelper(b);c.HmacSHA1=h._createHmacHelper(b)})();(function(){var b=CryptoJS,a=b.enc.Utf8;b.algo.HMAC=b.lib.Base.extend({init:function(q,r){q=this._hasher=new q.init;"string"==typeof r&&(r=a.parse(r));var o=q.blockSize,i=4*o;r.sigBytes>i&&(r=q.finalize(r));r.clamp();for(var c=this._oKey=r.clone(),s=this._iKey=r.clone(),f=c.words,l=s.words,m=0;m<o;m++){f[m]^=1549556828,l[m]^=909522486}c.sigBytes=s.sigBytes=i;this.reset()},reset:function(){var c=this._hasher;c.reset();c.update(this._iKey)},update:function(c){this._hasher.update(c);return this},finalize:function(c){var f=this._hasher;c=f.finalize(c);f.reset();return f.finalize(this._oKey.clone().concat(c))}})})();(function(r){var h=r.Base64;var d="2.1.7";var q;if(typeof module!=="undefined"&&module.exports){q=require("buffer").Buffer}var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var j=function(B){var A={};for(var z=0,y=B.length;z<y;z++){A[B.charAt(z)]=z}return A}(n);var m=String.fromCharCode;var w=function(z){if(z.length<2){var y=z.charCodeAt(0);return y<128?z:y<2048?m(192|y>>>6)+m(128|y&63):m(224|y>>>12&15)+m(128|y>>>6&63)+m(128|y&63)}else{var y=65536+(z.charCodeAt(0)-55296)*1024+(z.charCodeAt(1)-56320);return m(240|y>>>18&7)+m(128|y>>>12&63)+m(128|y>>>6&63)+m(128|y&63)}};var i=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;var f=function(y){return y.replace(i,w)};var o=function(B){var y=[0,2,1][B.length%3],z=B.charCodeAt(0)<<16|(B.length>1?B.charCodeAt(1):0)<<8|(B.length>2?B.charCodeAt(2):0),A=[n.charAt(z>>>18),n.charAt(z>>>12&63),y>=2?"=":n.charAt(z>>>6&63),y>=1?"=":n.charAt(z&63)];return A.join("")};var k=r.btoa?function(y){return r.btoa(y)}:function(y){return y.replace(/[\s\S]{1,3}/g,o)};var l=q?function(y){return(y.constructor===q.constructor?y:new q(y)).toString("base64")}:function(y){return k(f(y))};var e=function(y,z){return !z?l(String(y)):l(String(y)).replace(/[+\/]/g,function(A){return A=="+"?"-":"_"}).replace(/=/g,"")};var s=function(y){return e(y,true)};var c=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g");var p=function(A){switch(A.length){case 4:var y=(7&A.charCodeAt(0))<<18|(63&A.charCodeAt(1))<<12|(63&A.charCodeAt(2))<<6|63&A.charCodeAt(3),z=y-65536;return m((z>>>10)+55296)+m((z&1023)+56320);case 3:return m((15&A.charCodeAt(0))<<12|(63&A.charCodeAt(1))<<6|63&A.charCodeAt(2));default:return m((31&A.charCodeAt(0))<<6|63&A.charCodeAt(1))}};var b=function(y){return y.replace(c,p)};var a=function(C){var z=C.length,y=z%4,B=(z>0?j[C.charAt(0)]<<18:0)|(z>1?j[C.charAt(1)]<<12:0)|(z>2?j[C.charAt(2)]<<6:0)|(z>3?j[C.charAt(3)]:0),A=[m(B>>>16),m(B>>>8&255),m(B&255)];A.length-=[0,0,2,1][y];return A.join("")};var g=r.atob?function(y){return r.atob(y)}:function(y){return y.replace(/[\s\S]{1,4}/g,a)};var u=q?function(y){return(y.constructor===q.constructor?y:new q(y,"base64")).toString()}:function(y){return b(g(y))};var v=function(y){return u(String(y).replace(/[-_]/g,function(z){return z=="-"?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))};var x=function(){var y=r.Base64;r.Base64=h;return y};r.Base64={VERSION:d,atob:g,btoa:k,fromBase64:v,toBase64:e,utob:f,encode:e,encodeURI:s,btou:b,decode:v,noConflict:x};if(typeof Object.defineProperty==="function"){var t=function(y){return{value:y,enumerable:false,writable:true,configurable:true}};r.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",t(function(){return v(this)}));Object.defineProperty(String.prototype,"toBase64",t(function(y){return e(this,y)}));Object.defineProperty(String.prototype,"toBase64URI",t(function(){return e(this,true)}))}}})(this);if(this["Meteor"]){Base64=global.Base64}(function(c,o){var m="undefined"!=typeof module;m&&(c=global,c.JS_MD5_TEST&&(c.navigator={userAgent:"Firefox"}));var d=(c.JS_MD5_TEST||!m)&&-1!=navigator.userAgent.indexOf("Firefox"),k=!c.JS_MD5_TEST&&"undefined"!=typeof ArrayBuffer,i="0123456789abcdef".split(""),b=[128,32768,8388608,-2147483648],n=[0,8,16,24],j=[],a;if(k){var h=new ArrayBuffer(68);a=new Uint8Array(h);j=new Uint32Array(h)}var l=function(B){var e="string"!=typeof B;e&&B.constructor==ArrayBuffer&&(B=new Uint8Array(B));var y,t,s,r,F,H,C,E,A,K=!0,G=!1,f=0,J=0,D=0,I=B.length;j[16]=0;do{j[0]=j[16];j[16]=j[1]=j[2]=j[3]=j[4]=j[5]=j[6]=j[7]=j[8]=j[9]=j[10]=j[11]=j[12]=j[13]=j[14]=j[15]=0;if(e){if(k){for(H=J;f<I&&64>H;++f){a[H++]=B[f]}}else{for(H=J;f<I&&64>H;++f){j[H>>2]|=B[f]<<n[H++&3]}}}else{if(k){for(H=J;f<I&&64>H;++f){F=B.charCodeAt(f),128>F?a[H++]=F:(2048>F?a[H++]=192|F>>6:(55296>F||57344<=F?a[H++]=224|F>>12:(F=65536+((F&1023)<<10|B.charCodeAt(++f)&1023),a[H++]=240|F>>18,a[H++]=128|F>>12&63),a[H++]=128|F>>6&63),a[H++]=128|F&63)}}else{for(H=J;f<I&&64>H;++f){F=B.charCodeAt(f),128>F?j[H>>2]|=F<<n[H++&3]:(2048>F?j[H>>2]|=(192|F>>6)<<n[H++&3]:(55296>F||57344<=F?j[H>>2]|=(224|F>>12)<<n[H++&3]:(F=65536+((F&1023)<<10|B.charCodeAt(++f)&1023),j[H>>2]|=(240|F>>18)<<n[H++&3],j[H>>2]|=(128|F>>12&63)<<n[H++&3]),j[H>>2]|=(128|F>>6&63)<<n[H++&3]),j[H>>2]|=(128|F&63)<<n[H++&3])}}}D+=H-J;J=H-64;f==I&&(j[H>>2]|=b[H&3],++f);f>I&&56>H&&(j[14]=D<<3,G=!0);K?(F=j[0]-680876937,F=(F<<7|F>>>25)-271733879<<0,E=(-1732584194^F&2004318071)+j[1]-117830708,E=(E<<12|E>>>20)+F<<0,C=(-271733879^E&(F^-271733879))+j[2]-1126478375,C=(C<<17|C>>>15)+E<<0,H=(F^C&(E^F))+j[3]-1316259209):(F=y,H=t,C=s,E=r,F+=(E^H&(C^E))+j[0]-680876936,F=(F<<7|F>>>25)+H<<0,E+=(C^F&(H^C))+j[1]-389564586,E=(E<<12|E>>>20)+F<<0,C+=(H^E&(F^H))+j[2]+606105819,C=(C<<17|C>>>15)+E<<0,H+=(F^C&(E^F))+j[3]-1044525330);H=(H<<22|H>>>10)+C<<0;F+=(E^H&(C^E))+j[4]-176418897;F=(F<<7|F>>>25)+H<<0;E+=(C^F&(H^C))+j[5]+1200080426;E=(E<<12|E>>>20)+F<<0;C+=(H^E&(F^H))+j[6]-1473231341;C=(C<<17|C>>>15)+E<<0;H+=(F^C&(E^F))+j[7]-45705983;H=(H<<22|H>>>10)+C<<0;F+=(E^H&(C^E))+j[8]+1770035416;F=(F<<7|F>>>25)+H<<0;E+=(C^F&(H^C))+j[9]-1958414417;E=(E<<12|E>>>20)+F<<0;C+=(H^E&(F^H))+j[10]-42063;C=(C<<17|C>>>15)+E<<0;H+=(F^C&(E^F))+j[11]-1990404162;H=(H<<22|H>>>10)+C<<0;F+=(E^H&(C^E))+j[12]+1804603682;F=(F<<7|F>>>25)+H<<0;E+=(C^F&(H^C))+j[13]-40341101;E=(E<<12|E>>>20)+F<<0;C+=(H^E&(F^H))+j[14]-1502002290;C=(C<<17|C>>>15)+E<<0;H+=(F^C&(E^F))+j[15]+1236535329;H=(H<<22|H>>>10)+C<<0;F+=(C^E&(H^C))+j[1]-165796510;F=(F<<5|F>>>27)+H<<0;E+=(H^C&(F^H))+j[6]-1069501632;E=(E<<9|E>>>23)+F<<0;C+=(F^H&(E^F))+j[11]+643717713;C=(C<<14|C>>>18)+E<<0;H+=(E^F&(C^E))+j[0]-373897302;H=(H<<20|H>>>12)+C<<0;F+=(C^E&(H^C))+j[5]-701558691;F=(F<<5|F>>>27)+H<<0;E+=(H^C&(F^H))+j[10]+38016083;E=(E<<9|E>>>23)+F<<0;C+=(F^H&(E^F))+j[15]-660478335;C=(C<<14|C>>>18)+E<<0;H+=(E^F&(C^E))+j[4]-405537848;H=(H<<20|H>>>12)+C<<0;F+=(C^E&(H^C))+j[9]+568446438;F=(F<<5|F>>>27)+H<<0;E+=(H^C&(F^H))+j[14]-1019803690;E=(E<<9|E>>>23)+F<<0;C+=(F^H&(E^F))+j[3]-187363961;C=(C<<14|C>>>18)+E<<0;H+=(E^F&(C^E))+j[8]+1163531501;H=(H<<20|H>>>12)+C<<0;F+=(C^E&(H^C))+j[13]-1444681467;F=(F<<5|F>>>27)+H<<0;E+=(H^C&(F^H))+j[2]-51403784;E=(E<<9|E>>>23)+F<<0;C+=(F^H&(E^F))+j[7]+1735328473;C=(C<<14|C>>>18)+E<<0;H+=(E^F&(C^E))+j[12]-1926607734;H=(H<<20|H>>>12)+C<<0;A=H^C;F+=(A^E)+j[5]-378558;F=(F<<4|F>>>28)+H<<0;E+=(A^F)+j[8]-2022574463;E=(E<<11|E>>>21)+F<<0;A=E^F;C+=(A^H)+j[11]+1839030562;C=(C<<16|C>>>16)+E<<0;H+=(A^C)+j[14]-35309556;H=(H<<23|H>>>9)+C<<0;A=H^C;F+=(A^E)+j[1]-1530992060;F=(F<<4|F>>>28)+H<<0;E+=(A^F)+j[4]+1272893353;E=(E<<11|E>>>21)+F<<0;A=E^F;C+=(A^H)+j[7]-155497632;C=(C<<16|C>>>16)+E<<0;H+=(A^C)+j[10]-1094730640;H=(H<<23|H>>>9)+C<<0;A=H^C;F+=(A^E)+j[13]+681279174;F=(F<<4|F>>>28)+H<<0;E+=(A^F)+j[0]-358537222;E=(E<<11|E>>>21)+F<<0;A=E^F;C+=(A^H)+j[3]-722521979;C=(C<<16|C>>>16)+E<<0;H+=(A^C)+j[6]+76029189;H=(H<<23|H>>>9)+C<<0;A=H^C;F+=(A^E)+j[9]-640364487;F=(F<<4|F>>>28)+H<<0;E+=(A^F)+j[12]-421815835;E=(E<<11|E>>>21)+F<<0;A=E^F;C+=(A^H)+j[15]+530742520;C=(C<<16|C>>>16)+E<<0;H+=(A^C)+j[2]-995338651;H=(H<<23|H>>>9)+C<<0;F+=(C^(H|~E))+j[0]-198630844;F=(F<<6|F>>>26)+H<<0;E+=(H^(F|~C))+j[7]+1126891415;E=(E<<10|E>>>22)+F<<0;C+=(F^(E|~H))+j[14]-1416354905;C=(C<<15|C>>>17)+E<<0;H+=(E^(C|~F))+j[5]-57434055;H=(H<<21|H>>>11)+C<<0;F+=(C^(H|~E))+j[12]+1700485571;F=(F<<6|F>>>26)+H<<0;E+=(H^(F|~C))+j[3]-1894986606;E=(E<<10|E>>>22)+F<<0;C+=(F^(E|~H))+j[10]-1051523;C=(C<<15|C>>>17)+E<<0;H+=(E^(C|~F))+j[1]-2054922799;H=(H<<21|H>>>11)+C<<0;F+=(C^(H|~E))+j[8]+1873313359;F=(F<<6|F>>>26)+H<<0;E+=(H^(F|~C))+j[15]-30611744;E=(E<<10|E>>>22)+F<<0;C+=(F^(E|~H))+j[6]-1560198380;C=(C<<15|C>>>17)+E<<0;H+=(E^(C|~F))+j[13]+1309151649;H=(H<<21|H>>>11)+C<<0;F+=(C^(H|~E))+j[4]-145523070;F=(F<<6|F>>>26)+H<<0;E+=(H^(F|~C))+j[11]-1120210379;E=(E<<10|E>>>22)+F<<0;C+=(F^(E|~H))+j[2]+718787259;C=(C<<15|C>>>17)+E<<0;H+=(E^(C|~F))+j[9]-343485551;H=(H<<21|H>>>11)+C<<0;K?(y=F+1732584193<<0,t=H-271733879<<0,s=C-1732584194<<0,r=E+271733878<<0,K=!1):(y=y+F<<0,t=t+H<<0,s=s+C<<0,r=r+E<<0)}while(!G);return d?(B=i[y>>4&15]+i[y&15],B+=i[y>>12&15]+i[y>>8&15],B+=i[y>>20&15]+i[y>>16&15],B+=i[y>>28&15]+i[y>>24&15],B+=i[t>>4&15]+i[t&15],B+=i[t>>12&15]+i[t>>8&15],B+=i[t>>20&15]+i[t>>16&15],B+=i[t>>28&15]+i[t>>24&15],B+=i[s>>4&15]+i[s&15],B+=i[s>>12&15]+i[s>>8&15],B+=i[s>>20&15]+i[s>>16&15],B+=i[s>>28&15]+i[s>>24&15],B+=i[r>>4&15]+i[r&15],B+=i[r>>12&15]+i[r>>8&15],B+=i[r>>20&15]+i[r>>16&15],B+=i[r>>28&15]+i[r>>24&15]):i[y>>4&15]+i[y&15]+i[y>>12&15]+i[y>>8&15]+i[y>>20&15]+i[y>>16&15]+i[y>>28&15]+i[y>>24&15]+i[t>>4&15]+i[t&15]+i[t>>12&15]+i[t>>8&15]+i[t>>20&15]+i[t>>16&15]+i[t>>28&15]+i[t>>24&15]+i[s>>4&15]+i[s&15]+i[s>>12&15]+i[s>>8&15]+i[s>>20&15]+i[s>>16&15]+i[s>>28&15]+i[s>>24&15]+i[r>>4&15]+i[r&15]+i[r>>12&15]+i[r>>8&15]+i[r>>20&15]+i[r>>16&15]+i[r>>28&15]+i[r>>24&15]};if(!c.JS_MD5_TEST&&m){var g=require("crypto"),p=require("buffer").Buffer;module.exports=function(f){if("string"==typeof f){return 80>=f.length||183>=f.length&&!/[^\x00-\x7F]/.test(f)?l(f):g.createHash("md5").update(f,"utf8").digest("hex")}f.constructor==ArrayBuffer&&(f=new Uint8Array(f));return 370>=f.length?l(f):g.createHash("md5").update(new p(f)).digest("hex")}}else{c&&(c.md5=l)}})(this);(function(){var b=CryptoJS,a=b.lib.WordArray;b.enc.Base64={stringify:function(h){var l=h.words,k=h.sigBytes,n=this._map;h.clamp();h=[];for(var i=0;i<k;i+=3){for(var m=(l[i>>>2]>>>24-8*(i%4)&255)<<16|(l[i+1>>>2]>>>24-8*((i+1)%4)&255)<<8|l[i+2>>>2]>>>24-8*((i+2)%4)&255,j=0;4>j&&i+0.75*j<k;j++){h.push(n.charAt(m>>>6*(3-j)&63))}}if(l=n.charAt(64)){for(;h.length%4;){h.push(l)}}return h.join("")},parse:function(i){var n=i.length,m=this._map,p=m.charAt(64);p&&(p=i.indexOf(p),-1!=p&&(n=p));for(var p=[],j=0,o=0;o<n;o++){if(o%4){var l=m.indexOf(i.charAt(o-1))<<2*(o%4),k=m.indexOf(i.charAt(o))>>>6-2*(o%4);p[j>>>2]|=(l|k)<<24-8*(j%4);j++}}return a.create(p,j)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();

  /*
   * 如下是基本的配置
   */

  /*
   * 下面的代码是认证相关的逻辑
   */

  var _calcSignature = function(access_key_secret, string_to_sign) {

    var hash = CryptoJS.HmacSHA1(string_to_sign, access_key_secret);
    return hash.toString(CryptoJS.enc.Base64);
  };

  var _calcMD5 = function(req) {

    var data = req.data||'';
    data.toString();

    var hash = CryptoJS.MD5(data.toString());
    return hash.toString(CryptoJS.enc.Base64);
  };

  var _buildCanonicalizedResource = function(req){

    var parts = req.url.split('?');
    var path = parts[0];
    var query_string = parts[1];

    var resource = '';

    // 构造标准化资源

    resource += path.split('://')[1];
    var idx = resource.indexOf('/')
    if (idx >= 0)
      resource = resource.substring(idx);

    if(query_string) {
      var resources =[];

      var query_strings = query_string.split('&');
      for (var i in query_strings) {
        var param = query_strings[i];
        var name = param.split('=')[0];
        var value = param.split('=')[1];

        var sub_resource ={name:name};
        if (value!== undefined){
          sub_resource.value = value;
        }
        resources.push(sub_resource);
      }

      resources.sort(function (a , b){return a.name < b.name ? -1:1;});

      if(resources.length) {
        query_string =[];
        for(var i in resources) {
          var res = resources[i];
          if (res.value === undefined)
            query_string.push(res.name);
          else
            query_string.push(res.name+'='+res.value);
        }
        resource += '?' + query_string.join('&');
      }
    }

    return resource;
  };

  var _addAuthorization = function(credentials, xhr, req) {

    var date = new Date();
    var date_string = date.toUTCString();

    var content_md5 = _calcMD5(req);
    var content_type = req.contentType;
    var verb = req.type;
    var headers = "x-gd-date:" + date_string + "\n";
    var resource =  _buildCanonicalizedResource(req);

    var string_to_sign = verb + '\n' + content_md5 + '\n' + content_type + '\n' + date_string + '\n'
      + headers + resource;

    var signature = _calcSignature(credentials.access_key_secret, string_to_sign);

    var auth = 'GeneDock ' + credentials.access_key_id + ':' + signature;

    xhr.setRequestHeader('Authorization', auth);
    xhr.setRequestHeader('X-GD-Date', date_string);
    xhr.setRequestHeader('Content-MD5', content_md5);
    xhr.setRequestHeader('Content-Type', content_type);
  };


  /*
   * 底层jQuery Ajax的封装
   */

  var _dataRequest = function (config, url, method, data, credentials, dataType){
    return $.ajax({
      url: config.urlbase_address + url,
      type: method,
      data: data,
      async: config.async,
      cache: false,
      dataType: dataType || "json",
      contentType: "application/json; charset=UTF-8",
      beforeSend: function (xhr) {
        _addAuthorization(credentials, xhr, this);
      }
    });
  };

  /*
   *调用方法
   */

  var HttpRequest = {
    GET:function (config, url, data, access_key_id, access_key_secret, dataType) {
      return _dataRequest.call(this, config, url, 'GET', data, access_key_id, access_key_secret, dataType);
    },
    POST:function (config, url, data, access_key_id, access_key_secret, dataType) {
      return _dataRequest.call(this, config, url, 'POST', data, access_key_id, access_key_secret, dataType);
    },
    DELETE:function (config, url, data, access_key_id, access_key_secret, dataType) {
      return _dataRequest.call(this, config, url, 'DELETE', data, access_key_id, access_key_secret, dataType);
    },
    PUT:function (config, url, data, access_key_id, access_key_secret, dataType) {
      return _dataRequest.call(this, config, url, 'PUT', data, access_key_id, access_key_secret, dataType);
    }
  };

  /*
   *首先构造一个API对象，对于基于API而言，new出来的任何对象函数来说，API的token是不共享的。
   */

  function GeneDockAPI(access_key_id, access_key_secret, urlbase_address, async) {

    this.config = {
      urlbase_address:urlbase_address,
      async:async
    }

    this.credentials = {
      access_key_id: access_key_id,
      access_key_secret: access_key_secret
    }
  };


  /*
   *将所有接口放在prototype对象里用作对API共享this.credentials
   */


  GeneDockAPI.prototype = {
    // 用户接口 User
    // userRegister POST /api/v1/user/register/ [account, passwd, phone, email, realname, address, company, register_code]
    // userActiveEmail POST /api/v1/user/activeEmail/ [account, email]
    // userActive GET /api/v1/user/active/ [active_info]
    // userFeedback POST /api/v1/user/feedback/ [token, title, content]
    // userInfo        GET     /api/v1/user/info/         [token]
    // userInfoUpdate  PUT     /api/v1/user/info/         [token, passwd_old, passwd_new, phone, email, realname, address, company]

    userRegister : function(succeed, error){
      return HttpRequest.POST.call(this, this.config, '/api/v1/user/register/', null, this.credentials)
        .done(function(data){succeed && succeed(data)})
        .fail(function(data){error && error(data)})
    },
    userActiveEmail : function(succeed,error){
      return HttpRequest.POST.call(this, this.config, '/api/v1/user/activeEmail/', null, this.credentials)
        .done(function(data){succeed && succeed(data)})
        .fail(function(data){error && error(data)})
    },
    userActive : function(succeed,error){
      return HttpRequest.POST.call(this, this.config, '/api/v1/user/active/', null, this.credentials)
        .done(function(data){succeed && succeed(data)})
        .fail(function(data){error && error(data)})
    },
    userInfo : function(succeed,error){
      return HttpRequest.GET.call(this, this.config, '/api/v1/user/info/', null, this.credentials)
        .done(function(data){succeed && succeed(data)})
        .fail(function(data){error && error(data)})
    },
    userInfoUpdate : function(data,succeed,error){
      return HttpRequest.PUT.call(this, this.config, '/api/v1/user/info/', JSON.stringify(data) , this.credentials)
        .done(function(data){succeed && succeed(data)})
        .fail(function(data){error && error(data)})
    },

    //统计接口
    //userStatistic   GET   /api/v1/statistic/    token
    userStatistic : function(data,succeed,error){
      return HttpRequest.GET.call(this, this.config, '/api/v1/statistic/', data, this.credentials)
        .done(function(data){succeed && succeed(data)})
        .fail(function(data){error && error(data)})
    },

    //客户端下载接口
    clientDownload : function(succeed,error){
      return HttpRequest.GET.call(this, this.config, '/api/v1/dcenter/client/', null, this.credentials)
        .done(function(data){succeed && succeed(data)})
        .fail(function(data){error && error(data)})
    },
    // SDK 下载接口
    sdkDownload : function(succeed,error){
      return HttpRequest.GET.call(this, this.config, '/api/v1/dcenter/SDK/', null, this.credentials)
        .done(function(data){succeed && succeed(data)})
        .fail(function(data){error && error(data)})
    },

    //市场接口
    // product
    // listProduct     GET    /api/v1/products/                 [token, attribute, status, tag]
    // getProduct      GET    /api/v1/products/<product_id>/    [token]
    // installProduct  POST   /api/v1/products/<product_id>/install/    [token]
    // uninstallProduct  POST   /api/v1/products/<product_id>/uninstall/    [token]
    listProduct : function(data,succeed,error){
      return HttpRequest.GET.call(this, this.config, '/api/v1/products/', data, this.credentials)
        .done(function(data){succeed && succeed(data)})
        .fail(function(data){error && error(data)})
    },
    getProduct : function(product_id,succeed,error){
      return HttpRequest.GET.call(this, this.config, '/api/v1/products/'+product_id+'/', null, this.credentials)
        .done(function(data){succeed && succeed(data)})
        .fail(function(data){error && error(data)})
    },
    installProduct : function(product_id,succeed,error){
      return HttpRequest.POST.call(this, this.config, '/api/v1/products/'+product_id+'/install/', null, this.credentials)
        .done(function(data){succeed && succeed(data)})
        .fail(function(data){error && error(data)})
    },
    uninstallProduct : function(product_id,succeed,error){
      return HttpRequest.POST.call(this, this.config, '/api/v1/products/'+product_id+'/uninstall/', null, this.credentials)
        .done(function(data){succeed && succeed(data)})
        .fail(function(data){error && error(data)})
    },

    // 市场接口 Formal GET
    listProductFormal: function(succeed,error){
      return HttpRequest.GET.call(this, this.config, '/market/products/', null, this.credentials)
        .done(function(data){succeed && succeed(data)})
        .fail(function(data){error && error(data)})
    },
    getProductFormal : function(productName,succeed,error){
      return HttpRequest.GET.call(this, this.config, '/market/products/'+productName+'/', null, this.credentials)
        .done(function(data){succeed && succeed(data)})
        .fail(function(data){error && error(data)})
    },
    installProductFormal : function(productName,succeed,error){
      return HttpRequest.POST.call(this, this.config, '/market/products/'+productName+'/install/', null, this.credentials)
        .done(function(data){succeed && succeed(data)})
        .fail(function(data){error && error(data)})
    },
    uninstallProductFormal : function(productName,succeed,error){
      return HttpRequest.POST.call(this, this.config, '/market/products/'+productName+'/uninstall/', null, this.credentials)
        .done(function(data){succeed && succeed(data)})
        .fail(function(data){error && error(data)})
    },

    //数据接口 Data
    // listData   GET    /api/v1/data/              [token, type = 'all' | 'public' | 'private', status, format]
    // getData    GET    /api/v1/data/<entity_id>/  [token, status]
    // deleteData DELETE /api/v1/data/<entity_id>/  [token]
    // updateData PUT    /api/v1/data/<entity_id>   [token, param:?, name=name, type:?, description:string]
    // getDataAuthList GET   /api/v1/data/<entity_id>/auth/  [token]
    // addDataAuthCheck POST /api/v1/data/<entity_id>/auth/ [token ,account]
    // updateDataAuthList PUT /api/v1/data/<entity_id>/auth/ [token,postdata:{"owner":" ", "enid":" ", "authlist": [{"account":"u1", "auth":{"read":True, "write":True, "copy":True, "owner":True},{"account":"u2","auth":{"read":True, "write":True, "copy":False, "owner":False}]}]
    // releaseData POST  /api/v1/data/<entity_id>/auth/  [token, account, authtype = 'read,write,copy']
    // upload     POST   /api/v1/upload/            [token, file_name:string, file_size:int, overwrite={0 | 1}, pk=public_key]
    // download   POST   /api/v1/download/          [token, file_name:string, pk=public_key]
    // getDataDownloadUrl    GET    /api/v1/data/<entity_id>/downloadUrl/  [token]
    listData : function(data,succeed,error) {
      return HttpRequest.GET.call(this, this.config, '/api/v1/data/', data, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    getData : function(entity_id,succeed,error) {
      return HttpRequest.GET.call(this, this.config, '/api/v1/data/'+entity_id+'/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    deleteData : function(entity_id,succeed,error) {
      return HttpRequest.DELETE.call(this, this.config, '/api/v1/data/'+entity_id+'/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    updateData : function(entity_id,data,succeed,error) {
      return HttpRequest.PUT.call(this, this.config, '/api/v1/data/'+entity_id+'/',  JSON.stringify(data), this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    getDataAuthList : function(entity_id,succeed,error) {
      return HttpRequest.GET.call(this, this.config, '/api/v1/data/'+entity_id+'/auth/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    addDataAuthCheck : function(entity_id,data,succeed,error) {
      return HttpRequest.POST.call(this, this.config, '/api/v1/data/'+entity_id+'/auth/', JSON.stringify(data), this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    updateDataAuthList : function(entity_id,data,succeed,error) {
      return HttpRequest.PUT.call(this, this.config, '/api/v1/data/'+entity_id+'/auth/', JSON.stringify(data), this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    releaseData : function(data,succeed,error) {
      return HttpRequest.GET.call(this, this.config, '/api/v1/data/', data, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    upload : function(data,succeed,error) {
      return HttpRequest.POST.call(this, this.config, '/api/v1/upload/', data, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    download : function(data,succeed,error) {
      return HttpRequest.POST.call(this, this.config, '/api/v1/download/', data, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    getDataDownloadUrl : function(entity_id,succeed,error) {
      return HttpRequest.GET.call(this, this.config, '/api/v1/data/'+ entity_id +'/downloadUrl/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },


    //Data_v2API接口
    //根据当前账户，拿到enid接口
    getAccountEntityId : function(data,succeed,error) {
      return HttpRequest.GET.call(this,this.config, '/api/v2/data/entity_id/search/', data, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },

    //api/v2/data/<entity_id>/meta/
    //根据enid拿到目录信息
    getAccountMeta : function(entity_id,data,succeed,error) {
      return HttpRequest.GET.call(this, this.config, '/api/v2/data/' + entity_id + '/meta/', data, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    createFolders : function(data,succeed,error){
      return HttpRequest.POST.call(this, this.config, '/api/v2/data/', JSON.stringify(data), this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    deleteFiles : function(entity_id,succeed,error){
      return HttpRequest.DELETE.call(this, this.config, '/api/v2/data/'+entity_id+'/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    renameData : function(entity_id,data,succeed,error){
      return HttpRequest.PUT.call(this, this.config, '/api/v2/data/'+entity_id+'/meta/', JSON.stringify(data), this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    addAuth : function(entity_id,data,succeed,error){
      return HttpRequest.POST.call(this, this.config, '/api/v2/data/'+entity_id+'/auth/', JSON.stringify(data), this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    getAuthlist : function(entity_id,succeed,error){
      return HttpRequest.GET.call(this, this.config, '/api/v2/data/'+entity_id+'/auth/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    downloadFile : function(entity_id,succeed,error){
      return HttpRequest.GET.call(this, this.config, '/api/v2/data/'+entity_id+'/signurl/', null , this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    uploadFile: function(formData, succeed, error) {
      var config = this.config;
      return $.ajax({
        method: 'POST',
        dataType: 'JSON',
        processData: false,
        contentType: false,
        url: config.urlbase_address + '/api/v2/uploadTinyFile/',
        data: formData
      }).done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    // Data Formal API
    //
    listDataFormal: function(accountName, projectName, path, succeed, error) {
      return HttpRequest.GET.call(this, this.config, '/accounts/' + accountName + '/projects/' + projectName + '/data' + path, null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    deleteDataFormal: function(accountName, projectName, path, succeed, error) {
      return HttpRequest.DELETE.call(this, this.config, '/accounts/' + accountName + '/projects/' + projectName + '/data' + path, null, this.credentials, 'text')
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    renameDataFormal: function(accountName, projectName, path, payload, succeed, error) {
      return HttpRequest.POST.call(this, this.config, '/accounts/' + accountName + '/projects/' + projectName + '/data' + path, JSON.stringify(payload), this.credentials, 'text')
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    putDataFormal: function(accountName, projectName, path, succeed, error) {
      return HttpRequest.PUT.call(this, this.config, '/accounts/' + accountName + '/projects/' +
        projectName + '/data' + path, null, this.credentials, 'text')
      .done(function(data) {succeed && succeed(data)})
      .fail(function(data) {error && error(data)});
    },

    createDataUploadProcessFormal: function(accountName, projectName, entityId, payload, succeed,  error) {
      return HttpRequest.PUT.call(this, this.config, ['/accounts/', accountName, '/projects/', projectName, '/upload-data/', entityId, '/'].join(''), JSON.stringify(payload), this.credentials)
      .done(function(data) {succeed && succeed(data)})
      .fail(function(data) {error && error(data)});
    },

    putDataUploadBlockFormal: function(accountName, projectName, entityId, blockId, payload, succeed, error) {
      return HttpRequest.PUT.call(this, this.config, ['/accounts/', accountName, '/projects/', projectName, '/upload-data/', entityId, '/blocks/', blockId, '/'].join(''), JSON.stringify(payload), this.credentials)
      .done(function(data) {succeed && succeed(data)})
      .fail(function(data) {error && error(data)});
    },

    callbackDataUploadBlock: function(accountName, projectName, entityId, blockId, payload, succeed, error) {
      return HttpRequest.POST.call(this, this.config, ['/accounts/', accountName, '/projects/', projectName, '/upload-data/', entityId, '/blocks/', blockId, '/callback/'].join(''), JSON.stringify(payload), this.credentials, 'text')
      .done(function(data) {succeed && succeed(data)})
      .fail(function(data) {error && error(data)});
    },

    getDataDownloadProcessFormal: function(accountName, projectName, entityId, succeed, error) {
      return HttpRequest.GET.call(this, this.config, ['/accounts/', accountName, '/projects/', projectName, '/download-data/', entityId, '/'].join(''), null, this.credentials)
      .done(function(data) {succeed && succeed(data)})
      .fail(function(data) {error && error(data)});
    },

    getDataDownloadBlockFormal: function(accountName, projectName, entityId, blockId, succeed, error) {
      return HttpRequest.GET.call(this, this.config, ['/accounts/', accountName, '/projects/', projectName, '/download-data/', entityId, '/blocks/', blockId, '/'].join(''), null, this.credentials)
      .done(function(data) {succeed && succeed(data)})
      .fail(function(data) {error && error(data)});
    },

    //工作流接口 workflow
    // listWorkflow    GET    /api/v1/workflows/             [token,  type ="all", "public" or "private"]
    // getWorkflow     GET    /api/v1/workflows/<wfid>/     [token]
    // deleteWorkflow  DELETE /api/v1/workflows/<wfid>/       [account]
    // copyWorkflow    POST   /api/v1/workflows/<wfid>/copy/  [account]
    // compileWorkflow POST   /api/v1/workflows/              [account, passwd,template]
    // listConfig      GET    /api/v1/configs/                [account]
    // getConfig       GET    /api/v1/configs/<workflowName>  [account]
    // releaseWorkflow POST   /api/v1/workflows/release/      [token, workflow_id, name, price, description]
    // new_plan  POST   /api/v2/plans/           [token, workflow_id, parameters]

    // Workflows-v2
    // new_workflow  POST   /api/v2/workflows/           [token, workflow]
    // list_workflow    GET    /api/v2/workflows/       [token, type='private' | 'public' | 'all']
    // get_workflow     GET    /api/v2/workflows/<workflow_id>/    [token]
    // update_workflow  PUT    /api/v2/workflows/<workflow_id>    [token, workflow]
    // delete_workflow  DELETE /api/v2/workflows/<workflow_id>/    [token]
    // get_workflow_parameters GET /api/v2/workflows/<workflow_id>/parameters/ [token]
    // set_workflow_parameters PUT /api/v2/workflows/<workflow_id>/parameters/ [token, parameters]
    new_plan : function(data,succeed,error){
      return HttpRequest.POST.call(this, this.config, '/api/v2/plans/', JSON.stringify(data), this.credentials) /* {"workflow_id": workflow_id, "parameters":parameters} */
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    listWorkflows_v1 : function(succeed,error) {
      return HttpRequest.GET.call(this, this.config, '/api/v1/workflows/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    new_workflow : function(data,succeed,error){
      return HttpRequest.POST.call(this, this.config, '/api/v2/workflows/', JSON.stringify(data), this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    list_workflow : function(data,succeed,error){
      return HttpRequest.GET.call(this, this.config, '/api/v2/workflows/', data, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    get_workflow : function(workflow_id,succeed,error){
      return HttpRequest.GET.call(this, this.config, '/api/v2/workflows/'+workflow_id+'/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    update_workflow : function(data,workflow_id,succeed,error){
      return HttpRequest.PUT.call(this, this.config, '/api/v2/workflows/'+workflow_id+'/', data, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    delete_workflow : function(workflow_id,succeed,error){
      return HttpRequest.DELETE.call(this, this.config, '/api/v2/workflows/'+workflow_id+'/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    get_workflow_parameters : function(workflow_id,succeed,error){
      return HttpRequest.GET.call(this, this.config, '/api/v2/workflows/'+workflow_id+'/parameters/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    set_workflow_parameters : function(data,workflow_id,succeed,error){
      return HttpRequest.PUT.call(this, this.config, '/api/v2/workflows/'+workflow_id+'/parameters/', data, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },

    // 工作流接口(对外)
    // getWorkflowFormal GET /accounts/<account_name>/projects/<project_name>/workflows/<workflow_name>/ [token]
    // listWorkflowFormal GET /accounts/<account_name>/projects/<project_name>/workflows/ [token]
    // createWorkflowFormal POST /accounts/<account_name>/projects/<project_name>/wokflows/ [workflow_name, description, workflow_version]
    // putWorkflowDefinitionFormal PUT /accounts/<account_name>/projects/<project_name>/wokflows/<workflow_name>/configs/ [workflow_version, configs]
    // deleteWorkflowFormal DELETE /accounts/<account_name>/projects/<project_name>/workflows/<workflow_name>/ [workflow_version]
    // activateWorkflowFormal POST /accounts/<account_name>/projects/<project_name>/tasks/ [workflow_name, workflow_version, parameters, task_name]
    // createTemporaryWorkflow POST /accounts/<account_name>/projects/<project_name>/create_temporary_workflow/ [app_id]

    getWorkflowFormal: function(accountName, projectName, workflowName, payload, succeed, error){
      return HttpRequest.GET.call(this, this.config, '/accounts/'+accountName+'/projects/'+projectName+'/workflows/'+workflowName+'/', payload, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    getParameterFormal: function(accountName, projectName, workflowName, payload, succeed, error) {
      return HttpRequest.GET.call(this, this.config, '/accounts/'+accountName+'/projects/'+projectName+'/executable-workflows/'+workflowName+'/', payload, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    listWorkflowFormal: function(accountName, projectName, succeed, error) {
      return HttpRequest.GET.call(this, this.config, '/accounts/'+accountName+'/projects/'+projectName+'/workflows/' , null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    listExecutableWorkflowFormal: function(accountName, projectName, succeed, error) {
      return HttpRequest.GET.call(this, this.config, '/accounts/'+accountName+'/projects/'+projectName+'/executable-workflows/' , null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    createWorkflowFormal: function(accountName, projectName, payload, succeed, error) {
      return HttpRequest.POST.call(this, this.config, '/accounts/'+accountName+'/projects/'+projectName+'/workflows/', JSON.stringify(payload), this.credentials, 'text')
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    putWorkflowDefinitionFormal: function(accountName, projectName, workflowName, payload, succeed, error) {
      return HttpRequest.PUT.call(this, this.config, '/accounts/'+accountName+'/projects/'+projectName+'/workflows/'+workflowName+'/', JSON.stringify(payload), this.credentials, 'text')
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    deleteWorkflowFormal: function(accountName, projectName, workflowName, version, succeed, error) {
      return HttpRequest.DELETE.call(this, this.config, '/accounts/'+accountName+'/projects/'+projectName+'/workflows/'+workflowName+'/?workflow_version=' + version, null, this.credentials, 'text')
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    activateWorkflowFormal: function(accountName, projectName, payload, succeed, error) {
      return HttpRequest.POST.call(this, this.config, '/accounts/'+accountName+'/projects/'+projectName+'/tasks/', JSON.stringify(payload), this.credentials, 'text')
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    //任务接口 Task
    // listTask   GET  /api/v1/tasks/            [account, passwd]
    // getTask    GET  /api/v1/tasks/<task_id>/  [account, passwd]
    // runTask    POST /api/v1/tasks/            [account, passwd, workflowname, taskname, description]
    // stopTask   POST /api/v1/tasks/<taskid>/stop/  [token]
    // getTaskLogList    GET  /api/v1/tasks/<taskid>/logs/          [token]
    // getTaskLogDetail  GET  /api/v1/tasks/<taskid>/logs/<jobid>/   [token]

    // Task-v2
    // new_task  POST   /api/v2/tasks/           [token, workflow_id, parameters]              [token, plan_id]
    // listTasks    GET    /api/v2/tasks/       [token, type='private' | 'public' | 'all']
    // get_task     GET    /api/v2/tasks/<task_id>/    [token]                                  X
    // update_task  PUT    /api/v2/tasks/<task_id>    [token, workflow]
    // delete_task  DELETE /api/v2/tasks/<task_id>/    [token]
    // get_jobs_info GET /api/v2/tasks/<task_id>/jobs/ [token]
    // get_job_log GET /api/v2/tasks/<task_id>/jobs/logs/ [token]
    // get_log_signature GET /api/v2/tasks/<task_id>/jobs/logs/signature/ [token]

    listTask_v1 : function(succeed,error) {
      return HttpRequest.GET.call(this, this.config, '/api/v1/tasks/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    new_task : function(data,succeed,error) {
      return HttpRequest.POST.call(this, this.config, '/api/v2/tasks/', JSON.stringify(data), this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    listTasks : function(data,succeed,error) {
      return HttpRequest.GET.call(this,this.config, '/api/v2/tasks/', data, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    get_task : function(task_id,succeed,error) {
      return HttpRequest.GET.call(this, this.config, '/api/v2/tasks/'+task_id+'/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    update_task : function(task_id,data,succeed,error) {
      return HttpRequest.PUT.call(this, this.config, '/api/v2/tasks/'+task_id+'/', data, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    delete_task : function(task_id,succeed,error) {
      return HttpRequest.DELETE.call(this, this.config, '/api/v2/tasks/'+task_id+'/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    stop_task : function(task_id,succeed,error) {
      return HttpRequest.POST.call(this, this.config, '/api/v2/tasks/'+task_id+'/stop/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    get_jobs_info : function(task_id,succeed,error) {
      return HttpRequest.GET.call(this, this.config, '/api/v2/tasks/'+task_id+'/jobs/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    get_job_log : function(task_id,job_id,succeed,error) {
      return HttpRequest.GET.call(this, this.config, '/api/v2/tasks/'+task_id+'/jobs/logs/?job_id='+job_id, null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    get_log_signature : function(task_id,job_id,succeed,error) {
      return HttpRequest.GET.call(this, this.config, '/api/v2/tasks/'+task_id+'/jobs/logs/signature/?job_id='+job_id, null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },

    listTaskFormal: function(accountName, option, succeed, error) {
      var args = [], urlStr = '';
      for (var key in option) {
        if (option[key]) {
          args.push(key + '=' + option[key]);
        }
      }
      urlStr = args.length ? '?' + args.join('&') : '';

      return HttpRequest.GET.call(this, this.config,
        '/accounts/'+accountName+'/projects/default/tasks/'+urlStr, null, this.credentials)
      .done(function(data) {succeed && succeed(data)})
      .fail(function(data) {error && error(data)})
    },

    //报告接口
    // listReports   GET  /api/v1/reports/            [token, start, max]
    // getReports    GET  /api/v1/reports/<task_id>/  [token]
    listReports : function(succeed,error) {
      return HttpRequest.GET.call(this, this.config, '/api/v1/reports/',null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    getReports : function(TaskId,succeed,error) {
      return HttpRequest.GET.call(this, this.config, '/api/v1/reports/'+TaskId+'/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    uploadTplReports : function(param,succeed,error){
      return HttpRequest.POST.call(this,this.config,'/api/v1/reports/' + param.tplId + '/templates/', JSON.stringify(param.data),this.credentials)
        .done(function(data) { succeed(data) })
        .fail(function(data) { error(data) })
    },
    getTplReports : function(param,succeed,error){
      var config = this.config;
      config.async = false;
      return HttpRequest.GET.call(this,config,'/api/v1/reports/' + param.tplId + '/templates/', null,this.credentials)
        .done(function(data) { succeed(data) })
        .fail(function(data) { error(data) })
    },

    // auth接口
    //
    // policy相关
    // # getPolicy          GET   /account/<account>/policies/     [token]
    // # listPolicies       GET   /account/<accountName>/policies/<policyName>/     [token]
    // # upsertPolicy       PUT   /accounts/<account_name>/policies/<policy_name>/    [description, policy_schema, token]data
    // # deletePolicy       DELETE  /accounts/<account_name>/policies/<policy_name>/ [token]

    getPolicy: function(accountName, policyName, succeed, error) {
      return HttpRequest.GET.call(this, this.config, '/accounts/' + accountName + '/policies/' + policyName + '/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    listPolicies: function(accountName, succeed, error) {
      return HttpRequest.GET.call(this, this.config, '/accounts/' + accountName + '/policies/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    upsertPolicy: function(accountName, policyName, payload, succeed, error) {
      return HttpRequest.PUT.call(this, this.config, '/accounts/' + accountName + '/policies/' + policyName + '/', JSON.stringify(payload), this.credentials, 'text')
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    deletePolicy: function(accountName, policyName, succeed, error) {
      return HttpRequest.DELETE.call(this, this.config, '/accounts/' + accountName + '/policies/' + policyName + '/', null, this.credentials, 'text')
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {succeed && error(data)});
    },

    // user authorized policy相关
    // # getUserAuthorizedPolicies        GET     /accounts/<account_name>/users/<user_name>/policies/<policy_name>/  [current_account]
    // # listUserAuthorizedPolicies       GET     /accounts/<account_name>/users/<user_name>/policies/  [current_account]
    // # listUserAuthorizedPoliciesWithUserGroup  GET /accounts/<account_name>/users/<user_name>/authorized_policies/ [current_account]
    // # putUserAuthorizedPolicy          PUT     /accounts/<account_name>/users/<user_name>/policies/<policy_name>/  [current_account]
    // # deleteUserAuthorizedPolicy       DELETE  /accounts/<account_name>/users/<user_name>/policies/<policy_name>/  [current_account]

    getUserAuthorizedPolicies: function(accountName, userName, policyName, succeed, error) {
      return HttpRequest.GET.call(this, this.config, '/accounts/' + accountName + '/users/' + userName + '/policies/' + policyName + '/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    listUserAuthorizedPolicies: function(accountName, userName, succeed, error) {
      return HttpRequest.GET.call(this, this.config, '/accounts/' + accountName + '/users/' + userName + '/policies/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    listUserAuthorizedPoliciesWithUserGroup: function(accountName, userName, succeed, error) {
      return HttpRequest.GET.call(this, this.config, '/accounts/' + accountName + '/users/' + userName + '/authorized_policies/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    putUserAuthorizedPolicy: function(accountName, userName, policyName, payload, succeed, error) {
      return HttpRequest.PUT.call(this, this.config, '/accounts/' + accountName + '/users/' + userName + '/policies/' + policyName + '/', JSON.stringify(payload), this.credentials, 'text')
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    deleteUserAuthorizedPolicy: function(accountName, userName, policyName, succeed, error) {
      return HttpRequest.DELETE.call(this, this.config, '/accounts/' + accountName + '/users/' + userName + '/policies/' + policyName + '/', null, this.credentials, 'text')
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },


    // user group authorized policy相关
    // # put_user_group_authorized_policy    PUT  /accounts/<account_name>/user_groups/<user_group_name>/policies/<policy_name>/      [current_account]
    // # get_user_group_authorized_policy    GET  /accounts/<account_name>/user_groups/<user_group_name>/policies/<policy_name>/      [current_account]
    // # list_user_group_authorized_policies GET  /accounts/<account_name>/user_groups/<user_group_name>/policies/                    [current_account]
    // # delete_user_group_authorized_policy DELETE /accounts/<account_name>/user_groups/<user_group_name>/policies/<policy_name>/      [current_account]

    getUserGroupAuthorizedPolicies: function(accountName, userGroupName, policyName, succeed, error) {
      return HttpRequest.GET.call(this, this.config, '/accounts/' + accountName + '/user_groups/' + userGroupName + '/policies/' + policyName + '/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    listUserGroupAuthorizedPolicies: function(accountName, userGroupName, succeed, error) {
      return HttpRequest.GET.call(this, this.config, '/accounts/' + accountName + '/user_groups/' + userGroupName + '/policies/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    putUserGroupAuthorizedPolicy: function(accountName, userGroupName, policyName, payload, succeed, error) {
      return HttpRequest.PUT.call(this, this.config, '/accounts/' + accountName + '/user_groups/' + userGroupName + '/policies/' + policyName + '/', JSON.stringify(payload), this.credentials, 'text')
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    deleteUserGroupAuthorizedPolicy: function(accountName, userGroupName, policyName, succeed, error) {
      return HttpRequest.DELETE.call(this, this.config, '/accounts/' + accountName + '/user_groups/' + userGroupName + '/policies/' + policyName + '/', null, this.credentials, 'text')
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },

    // account authorized policy相关
    // # list_account_authorizing_policies   GET     /accounts/<account_name>/authorizing_policies/

    listAccountAuthorizingPolicies: function(accountName, succeed, error) {
      return HttpRequest.GET.call(this, this.config, '/accounts/' + accountName + '/authorizing_policies/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },


    //customer接口
    // # customer
    // # createCustomer        POST  /api/v1/customers/     [token, name, email, passwd]
    // # listCustomer          GET   /api/v1/customers/     [token]
    // # authCustomerData      POST  /api/v1/customers/<name>/data/<entity_id>/  [token]
    // # customerTokenApply    POST  /api/v1/customers/tokenApply/   [name, passwd]
    // # customerTokenVerify   POST  /api/v1/customers/tokenVerify/  [custermer_token]
    // # listCustomerData      GET   /api/v1/customers/data/     [customer_token]
    // # customerNotify        POST  /api/v1/customers/info/  [custermer_token, info_index]
    // # deleteCustomer        DELETE /api/v1/customers/ [id_list[name,],token]
    // # freezeCustomer       PUT     /api/v1/customers/  [id_list[name,],token]
    // # createCustomer       PUT   /api/v1/customers/     [token, name, email, passwd]

    createCustomer : function(data,succeed,error) {
      return HttpRequest.POST.call(this, this.config, '/api/v1/customers/', data, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    listCustomer : function(succeed,error){
      return HttpRequest.GET.call(this, this.config, '/api/v1/customers/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    authCustomerData : function(name,entity_id,succeed,error){
      return HttpRequest.POST.call(this, this.config, '/api/v1/customers/'+name+'/data/'+entity_id+'/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    customerTokenApply : function(data,succeed,error){
      return HttpRequest.POST.call(this, this.config, '/api/v1/customers/tokenApply/', data, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    deleteCustomer : function(data,succeed,error){
      return HttpRequest.DELETE.call(this, this.config, '/api/v1/customers/', data, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    freezeCustomer : function(data,succeed,error){
      return HttpRequest.PUT.call(this, this.config, '/api/v1/customers/', data, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },


    // App
    // new_app  POST   /api/v2/apps/           [token, app]
    // list_apps    GET    /api/v2/apps/       [token, type='private' | 'public' | 'all']
    // get_app     GET    /api/v2/apps/<app_id>/    [token]
    // update_app  PUT    /api/v2/apps/<app_id>    [token, app]
    // delete_app  DELETE /api/v2/apps/<app_id>/    [token]
    getApplist : function(data,succeed,error){
      return HttpRequest.GET.call(this, this.config, '/api/v2/apps/', data, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    getAppdetail : function(app_id,data,succeed,error){
      return HttpRequest.GET.call(this, this.config, '/api/v2/apps/'+app_id+'/', data, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    deleteApp : function(app_id,succeed,error){
      return HttpRequest.DELETE.call(this, this.config, '/api/v2/apps/'+app_id+'/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    addApp : function(data,succeed,error){
      return HttpRequest.POST.call(this, this.config, '/api/v2/apps/', JSON.stringify(data), this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    updateApp : function(app_id,data,succeed,error){
      return HttpRequest.PUT.call(this, this.config, '/api/v2/apps/'+app_id+'/', JSON.stringify(data), this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    jinja_template_check : function(data,succeed,error){
      return HttpRequest.POST.call(this, this.config, '/api/v2/apps/jinja/', JSON.stringify(data), this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },


    // tool formal
    // listToolFormal Get /accounts/<account_name>/projects/<project_name>/Tools/
    listToolFormal: function(accountName, projectName, succeed, error) {
      return HttpRequest.GET.call(this, this.config, '/accounts/'+ accountName +'/projects/'+ projectName +'/tools/', null, this.credentials)
      .done(function(data) {succeed && succeed(data)})
      .fail(function(data) {error && error(data)});
    },
    getToolFormal: function(accountName, projectName, toolName, data, succeed, error) {
      return HttpRequest.GET.call(this, this.config, '/accounts/'+ accountName +'/projects/'+ projectName +'/tools/'+ toolName +'/', data, this.credentials)
      .done(function(data) {succeed && succeed(data)})
      .fail(function(data) {error && error(data)});
    },
    getToolDetailFormal: function(accountName, projectName, toolName, data, succeed, error) {
      return HttpRequest.GET.call(this, this.config, '/accounts/'+ accountName +'/projects/'+ projectName +'/tooldetails/'+ toolName +'/', data, this.credentials)
      .done(function(data) {succeed && succeed(data)})
      .fail(function(data) {error && error(data)});
    },
    getToolParameterTemplateFormal: function(accountName, projectName, toolName, data, succeed, error) {
      return HttpRequest.GET.call(this, this.config, '/accounts/'+ accountName +'/projects/'+ projectName +'/toolparameters/'+ toolName +'/', data, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    },
    deleteToolFormal: function(accountName, projectName, toolName, toolVersion, succeed, error) {
      return HttpRequest.DELETE.call(this, this.config, '/accounts/'+ accountName +'/projects/'+ projectName +'/tools/'+ toolName +'/?tool_version=' + toolVersion, null, this.credentials, 'text')
      .done(function(data) {succeed && succeed(data)})
      .fail(function(data) {error && error(data)});
    },
    createToolFormal: function(accountName, projectName, payload, succeed, error) {
      return HttpRequest.POST.call(this, this.config, '/accounts/'+accountName+'/projects/'+projectName+'/tools/', JSON.stringify(payload), this.credentials, 'text')
      .done(function(data) {succeed && succeed(data)})
      .fail(function(data) {error && error(data)});
    },
    putToolFormal: function(accountName, projectName, toolName, data, succeed, error) {
      return HttpRequest.PUT.call(this, this.config, '/accounts/'+accountName+'/projects/'+projectName+'/tools/'+toolName+'/', JSON.stringify(data), this.credentials, 'text')
      .done(function(data) {succeed && succeed(data)})
      .fail(function(data) {error && error(data)});
    },
    listImagesFormal: function(accountName, projectName, succeed, error){
      return HttpRequest.GET.call(this, this.config, '/accounts/'+account+'/projects/'+projectName+'/images/', null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    renderJinjaFormal: function(accountName, projectName, data, succeed, error) {
      return HttpRequest.POST.call(this, this.config, '/accounts/'+account+'/projects/'+projectName+'/jinjarender/', JSON.stringify(data), this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)})
    },
    activeToolFormal: function(accountName, projectName, toolName, toolVersion, succeed, error) {
      return HttpRequest.POST.call(this, this.config, '/accounts/'+accountName+'/projects/'+projectName+'/activetool/'+toolName+'/?tool_version='+toolVersion, null, this.credentials)
        .done(function(data) {succeed && succeed(data)})
        .fail(function(data) {error && error(data)});
    }
  };

  /*
   *用作下边的call调用
   */

  this.GeneDockAPI=GeneDockAPI;

}).call(this);
