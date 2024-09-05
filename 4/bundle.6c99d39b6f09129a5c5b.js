(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",u="month",l="quarter",c="year",h="date",f="Invalid Date",d=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},p=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},$={s:p,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+p(i,2,"0")+":"+p(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,u),r=n-s<0,a=e.clone().add(i+(r?-1:1),u);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:u,y:c,w:o,d:a,D:h,h:r,m:s,s:i,ms:n,Q:l}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},_="en",g={};g[_]=v;var y=function(t){return t instanceof S},M=function t(e,n,i){var s;if(!e)return _;if("string"==typeof e){var r=e.toLowerCase();g[r]&&(s=r),n&&(g[r]=n,s=r);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var o=e.name;g[o]=e,s=o}return!i&&s&&(_=s),s||!i&&_},b=function(t,e){if(y(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},D=$;D.l=M,D.i=y,D.w=function(t,e){return b(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function v(t){this.$L=M(t.locale,null,!0),this.parse(t)}var p=v.prototype;return p.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(d);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},p.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},p.$utils=function(){return D},p.isValid=function(){return!(this.$d.toString()===f)},p.isSame=function(t,e){var n=b(t);return this.startOf(e)<=n&&n<=this.endOf(e)},p.isAfter=function(t,e){return b(t)<this.startOf(e)},p.isBefore=function(t,e){return this.endOf(e)<b(t)},p.$g=function(t,e,n){return D.u(t)?this[e]:this.set(n,t)},p.unix=function(){return Math.floor(this.valueOf()/1e3)},p.valueOf=function(){return this.$d.getTime()},p.startOf=function(t,e){var n=this,l=!!D.u(e)||e,f=D.p(t),d=function(t,e){var i=D.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return l?i:i.endOf(a)},m=function(t,e){return D.w(n.toDate()[t].apply(n.toDate("s"),(l?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,p=this.$M,$=this.$D,_="set"+(this.$u?"UTC":"");switch(f){case c:return l?d(1,0):d(31,11);case u:return l?d(1,p):d(0,p+1);case o:var g=this.$locale().weekStart||0,y=(v<g?v+7:v)-g;return d(l?$-y:$+(6-y),p);case a:case h:return m(_+"Hours",0);case r:return m(_+"Minutes",1);case s:return m(_+"Seconds",2);case i:return m(_+"Milliseconds",3);default:return this.clone()}},p.endOf=function(t){return this.startOf(t,!1)},p.$set=function(t,e){var o,l=D.p(t),f="set"+(this.$u?"UTC":""),d=(o={},o[a]=f+"Date",o[h]=f+"Date",o[u]=f+"Month",o[c]=f+"FullYear",o[r]=f+"Hours",o[s]=f+"Minutes",o[i]=f+"Seconds",o[n]=f+"Milliseconds",o)[l],m=l===a?this.$D+(e-this.$W):e;if(l===u||l===c){var v=this.clone().set(h,1);v.$d[d](m),v.init(),this.$d=v.set(h,Math.min(this.$D,v.daysInMonth())).$d}else d&&this.$d[d](m);return this.init(),this},p.set=function(t,e){return this.clone().$set(t,e)},p.get=function(t){return this[D.p(t)]()},p.add=function(n,l){var h,f=this;n=Number(n);var d=D.p(l),m=function(t){var e=b(f);return D.w(e.date(e.date()+Math.round(t*n)),f)};if(d===u)return this.set(u,this.$M+n);if(d===c)return this.set(c,this.$y+n);if(d===a)return m(1);if(d===o)return m(7);var v=(h={},h[s]=t,h[r]=e,h[i]=1e3,h)[d]||1,p=this.$d.getTime()+n*v;return D.w(p,this)},p.subtract=function(t,e){return this.add(-1*t,e)},p.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=D.z(this),r=this.$H,a=this.$m,o=this.$M,u=n.weekdays,l=n.months,c=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},h=function(t){return D.s(r%12||12,t,"0")},d=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:D.s(o+1,2,"0"),MMM:c(n.monthsShort,o,l,3),MMMM:c(l,o),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(n.weekdaysMin,this.$W,u,2),ddd:c(n.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(r),HH:D.s(r,2,"0"),h:h(1),hh:h(2),a:d(r,a,!0),A:d(r,a,!1),m:String(a),mm:D.s(a,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:s};return i.replace(m,(function(t,e){return e||v[t]||s.replace(":","")}))},p.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},p.diff=function(n,h,f){var d,m=D.p(h),v=b(n),p=(v.utcOffset()-this.utcOffset())*t,$=this-v,_=D.m(this,v);return _=(d={},d[c]=_/12,d[u]=_,d[l]=_/3,d[o]=($-p)/6048e5,d[a]=($-p)/864e5,d[r]=$/e,d[s]=$/t,d[i]=$/1e3,d)[m]||$,f?_:D.a(_)},p.daysInMonth=function(){return this.endOf(u).$D},p.$locale=function(){return g[this.$L]},p.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=M(t,e,!0);return i&&(n.$L=i),n},p.clone=function(){return D.w(this.$d,this)},p.toDate=function(){return new Date(this.valueOf())},p.toJSON=function(){return this.isValid()?this.toISOString():null},p.toISOString=function(){return this.$d.toISOString()},p.toString=function(){return this.$d.toUTCString()},v}(),w=S.prototype;return b.prototype=w,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",u],["$y",c],["$D",h]].forEach((function(t){w[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),b.extend=function(t,e){return t.$i||(t(e,S,b),t.$i=!0),b},b.locale=M,b.isDayjs=y,b.unix=function(t){return b(1e3*t)},b.en=g[_],b.Ls=g,b.p={},b}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,i=6e4,s=36e5,r=864e5,a=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,o=31536e6,u=2592e6,l=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,c={years:o,months:u,days:r,hours:s,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},h=function(t){return t instanceof _},f=function(t,e,n){return new _(t,n,e.$l)},d=function(t){return e.p(t)+"s"},m=function(t){return t<0},v=function(t){return m(t)?Math.ceil(t):Math.floor(t)},p=function(t){return Math.abs(t)},$=function(t,e){return t?m(t)?{negative:!0,format:""+p(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},_=function(){function m(t,e,n){var i=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return f(t*c[d(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){i.$d[d(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var s=t.match(l);if(s){var r=s.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var p=m.prototype;return p.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*c[n]}),0)},p.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=v(t/o),t%=o,this.$d.months=v(t/u),t%=u,this.$d.days=v(t/r),t%=r,this.$d.hours=v(t/s),t%=s,this.$d.minutes=v(t/i),t%=i,this.$d.seconds=v(t/n),t%=n,this.$d.milliseconds=t},p.toISOString=function(){var t=$(this.$d.years,"Y"),e=$(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=$(n,"D"),s=$(this.$d.hours,"H"),r=$(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3);var o=$(a,"S"),u=t.negative||e.negative||i.negative||s.negative||r.negative||o.negative,l=s.format||r.format||o.format?"T":"",c=(u?"-":"")+"P"+t.format+e.format+i.format+l+s.format+r.format+o.format;return"P"===c||"-P"===c?"P0D":c},p.toJSON=function(){return this.toISOString()},p.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(a,(function(t,e){return e||String(i[t])}))},p.as=function(t){return this.$ms/c[d(t)]},p.get=function(t){var e=this.$ms,n=d(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?v(e/c[n]):this.$d[n],0===e?0:e},p.add=function(t,e,n){var i;return i=e?t*c[d(e)]:h(t)?t.$ms:f(t,this).$ms,f(this.$ms+i*(n?-1:1),this)},p.subtract=function(t,e){return this.add(t,e,!0)},p.locale=function(t){var e=this.clone();return e.$l=t,e},p.clone=function(){return f(this.$ms,this)},p.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},p.milliseconds=function(){return this.get("milliseconds")},p.asMilliseconds=function(){return this.as("milliseconds")},p.seconds=function(){return this.get("seconds")},p.asSeconds=function(){return this.as("seconds")},p.minutes=function(){return this.get("minutes")},p.asMinutes=function(){return this.as("minutes")},p.hours=function(){return this.get("hours")},p.asHours=function(){return this.as("hours")},p.days=function(){return this.get("days")},p.asDays=function(){return this.as("days")},p.weeks=function(){return this.get("weeks")},p.asWeeks=function(){return this.as("weeks")},p.months=function(){return this.get("months")},p.asMonths=function(){return this.as("months")},p.years=function(){return this.get("years")},p.asYears=function(){return this.as("years")},m}();return function(n,i,s){t=s,e=s().$utils(),s.duration=function(t,e){var n=s.locale();return f(t,{$l:n},e)},s.isDuration=h;var r=i.prototype.add,a=i.prototype.subtract;i.prototype.add=function(t,e){return h(t)&&(t=t.asMilliseconds()),r.bind(this)(t,e)},i.prototype.subtract=function(t,e){return h(t)&&(t=t.asMilliseconds()),a.bind(this)(t,e)}}}()},387:function(t){t.exports=function(){"use strict";var t={year:0,month:1,day:2,hour:3,minute:4,second:5},e={};return function(n,i,s){var r,a=function(t,n,i){void 0===i&&(i={});var s=new Date(t),r=function(t,n){void 0===n&&(n={});var i=n.timeZoneName||"short",s=t+"|"+i,r=e[s];return r||(r=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:i}),e[s]=r),r}(n,i);return r.formatToParts(s)},o=function(e,n){for(var i=a(e,n),r=[],o=0;o<i.length;o+=1){var u=i[o],l=u.type,c=u.value,h=t[l];h>=0&&(r[h]=parseInt(c,10))}var f=r[3],d=24===f?0:f,m=r[0]+"-"+r[1]+"-"+r[2]+" "+d+":"+r[4]+":"+r[5]+":000",v=+e;return(s.utc(m).valueOf()-(v-=v%1e3))/6e4},u=i.prototype;u.tz=function(t,e){void 0===t&&(t=r);var n=this.utcOffset(),i=this.toDate(),a=i.toLocaleString("en-US",{timeZone:t}),o=Math.round((i-new Date(a))/1e3/60),u=s(a).$set("millisecond",this.$ms).utcOffset(15*-Math.round(i.getTimezoneOffset()/15)-o,!0);if(e){var l=u.utcOffset();u=u.add(n-l,"minute")}return u.$x.$timezone=t,u},u.offsetName=function(t){var e=this.$x.$timezone||s.tz.guess(),n=a(this.valueOf(),e,{timeZoneName:t}).find((function(t){return"timezonename"===t.type.toLowerCase()}));return n&&n.value};var l=u.startOf;u.startOf=function(t,e){if(!this.$x||!this.$x.$timezone)return l.call(this,t,e);var n=s(this.format("YYYY-MM-DD HH:mm:ss:SSS"));return l.call(n,t,e).tz(this.$x.$timezone,!0)},s.tz=function(t,e,n){var i=n&&e,a=n||e||r,u=o(+s(),a);if("string"!=typeof t)return s(t).tz(a);var l=function(t,e,n){var i=t-60*e*1e3,s=o(i,n);if(e===s)return[i,e];var r=o(i-=60*(s-e)*1e3,n);return s===r?[i,s]:[t-60*Math.min(s,r)*1e3,Math.max(s,r)]}(s.utc(t,i).valueOf(),u,a),c=l[0],h=l[1],f=s(c).utcOffset(h);return f.$x.$timezone=a,f},s.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},s.tz.setDefault=function(t){r=t}}}()},178:function(t){t.exports=function(){"use strict";var t="minute",e=/[+-]\d\d(?::?\d\d)?/g,n=/([+-]|\d\d)/g;return function(i,s,r){var a=s.prototype;r.utc=function(t){return new s({date:t,utc:!0,args:arguments})},a.utc=function(e){var n=r(this.toDate(),{locale:this.$L,utc:!0});return e?n.add(this.utcOffset(),t):n},a.local=function(){return r(this.toDate(),{locale:this.$L,utc:!1})};var o=a.parse;a.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t)};var u=a.init;a.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else u.call(this)};var l=a.utcOffset;a.utcOffset=function(i,s){var r=this.$utils().u;if(r(i))return this.$u?0:r(this.$offset)?l.call(this):this.$offset;if("string"==typeof i&&(i=function(t){void 0===t&&(t="");var i=t.match(e);if(!i)return null;var s=(""+i[0]).match(n)||["-",0,0],r=s[0],a=60*+s[1]+ +s[2];return 0===a?0:"+"===r?a:-a}(i),null===i))return this;var a=Math.abs(i)<=16?60*i:i,o=this;if(s)return o.$offset=a,o.$u=0===i,o;if(0!==i){var u=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(a+u,t)).$offset=a,o.$x.$localOffset=u}else o=this.utc();return o};var c=a.format;a.format=function(t){var e=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return c.call(this,e)},a.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t},a.isUTC=function(){return!!this.$u},a.toISOString=function(){return this.toDate().toISOString()},a.toString=function(){return this.toDate().toUTCString()};var h=a.toDate;a.toDate=function(t){return"s"===t&&this.$offset?r(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():h.call(this)};var f=a.diff;a.diff=function(t,e,n){if(t&&this.$u===t.$u)return f.call(this,t,e,n);var i=this.local(),s=r(t).local();return f.call(i,s,e,n)}}}()}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";const t="beforeend";function e(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function i(e,n,i=t){n.insertAdjacentElement(i,e.getElement())}const s=["Taxi","Bus","Train","Ship","Drive","Flight","Check-in","Sightseeing","Restaurant"],r=["Moscow","Tokio","London","Paris","Roma"],a=["Everything","Future","Present","Past"],o=["Day","Event","Time","Price","Offers"],u=["Add luggage","Switch to comfort class","Add meal","Choose seats","Travel by train"],l=["Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Cras aliquet varius magna, non porta ligula feugiat eget. ","Fusce tristique felis at fermentum pharetra.","Aliquam id orci ut lectus varius viverra.","Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante."],c={type:"Flight",dateFrom:new Date,dateTo:null,destination:null,price:0,offers:[],isFavorite:!1},h="YY/MM/DD HH:mm";class f{getTemplate(){return`\n  <form class="trip-filters" action="#" method="get">\n    ${a.map((t=>(t=>{const e=t.toLowerCase();return`\n    <div class="trip-filters__filter">\n      <input id="filter-${e}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${e}" checked>\n      <label class="trip-filters__filter-label" for="filter-${e}">${t}</label>\n    </div>`})(t))).join("")}\n    <button class="visually-hidden" type="submit">Accept filter</button>\n  </form>\n`}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class d{getTemplate(){return'\n  <section class="trip-main__trip-info  trip-info">\n    <div class="trip-info__main">\n      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n      <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n    </div>\n    <p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span></p>\n  </section>\n'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class m{constructor({filterContainer:t,infoContainer:e}){this.filterContainer=t,this.infoContainer=e}init(){i(new f,this.filterContainer,t),i(new d,this.infoContainer,"afterbegin")}}var v=n(484),p=n.n(v),$=n(646),_=n.n($),g=n(178),y=n.n(g),M=n(387),b=n.n(M);p().extend(_()),p().extend(y()),p().extend(b());const D=t=>t?p()(t).format("HH:mm"):"",S=(t,e="YYYY-MM-DDTHH:mm")=>t?p()(t).format(e):"",w=t=>t[Math.floor(Math.random()*t.length)],O=()=>Math.random()<.5,T=t=>Math.round(Math.random()*t),Y=()=>{let t=1;return()=>(t++,t)},H=t=>p()(t).add(T(500),"minute");class x{constructor(t=c){this.tripPoint=t}getTemplate(){return(t=>{const{type:e,dateFrom:n,dateTo:i,destination:a,price:o,offers:u}=t;return`\n  <li class="trip-events__item">\n    <form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n        <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-1">\n            <span class="visually-hidden">Choose event type</span>\n            <img class="event__type-icon" width="17" height="17" src="img/icons/${e.toLowerCase()}.png" alt="Event type icon">\n          </label>\n          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n          <div class="event__type-list">\n            <fieldset class="event__type-group">\n              <legend class="visually-hidden">Event type</legend>\n              ${s.map((t=>(t=>{const e=t.toLowerCase();return`\n  <div class="event__type-item">\n    <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}">\n    <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${t}</label>\n  </div>`})(t))).join("")}\n            </fieldset>\n          </div>\n        </div>\n\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-1">\n            ${e}\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${a.name}" list="destination-list-1">\n          <datalist id="destination-list-1">\n            ${r.map((t=>(t=>`\n  <option value="${t}"></option>\n`)(t))).join("")}\n          </datalist>\n        </div>\n\n        ${((t,e)=>`\n  <div class="event__field-group  event__field-group--time">\n    <label class="visually-hidden" for="event-start-time-1">From</label>\n    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${S(t,h)}">\n    &mdash;\n    <label class="visually-hidden" for="event-end-time-1">From</label>\n    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${S(e,h)}">\n  </div>\n`)(n,i)}\n\n        <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-1">\n            <span class="visually-hidden">Price</span>\n            &euro;\n          </label>\n          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${o}">\n        </div>\n\n        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n        <button class="event__reset-btn" type="reset">Delete</button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </header>\n      <section class="event__details">\n        ${(t=>t.length?`\n    <section class="event__section  event__section--offers">\n      <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n      <div class="event__available-offers">\n        ${t.map((t=>(({type:t,title:e,price:n,selected:i})=>{const s=t.toLowerCase();return`\n  <div class="event__offer-selector">\n    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${s}-1" type="checkbox" name="event-offer-${s}" ${i?"checked":""}>\n    <label class="event__offer-label" for="event-offer-${s}-1">\n      <span class="event__offer-title">${e}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">${n}</span>\n    </label>\n  </div>`})(t))).join("")}\n      </div>\n    </section>`:"")(u)}\n        ${(({description:t,pictures:e})=>`\n  <section class="event__section  event__section--destination">\n    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n    <p class="event__destination-description">${t}</p>\n\n    ${(t=>t.length?`\n    <div class="event__photos-container">\n      <div class="event__photos-tape">\n        ${t.map((({src:t,description:e})=>`<img class="event__photo" src="${t}" alt="${e}">`)).join("")}\n      </div>\n    </div>`:"")(e)}\n  </section>\n`)(a)}\n      </section>\n    </form>\n  </li>`})(this.tripPoint)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const C=t=>{const{type:e,dateFrom:n,dateTo:i,destination:s,price:r,offers:a,isFavorite:o}=t,u=o?"event__favorite-btn--active":"";return`\n  <li class="trip-events__item">\n    <div class="event">\n      <time class="event__date" datetime="${l=n,l?p()(l).format("YYYY-MM-DD"):""}">${(t=>t?p()(t).format("MMM D"):"")(n)}</time>\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/${e.toLowerCase()}.png" alt="Event type icon">\n      </div>\n      <h3 class="event__title">${e} ${s.name}</h3>\n        ${((t,e)=>`\n  <div class="event__schedule">\n  <p class="event__time">\n    <time class="event__start-time" datetime="${S(t)}">${D(t)}</time>\n    &mdash;\n    <time class="event__end-time" datetime="${S(e)}">${D(e)}</time>\n  </p>\n  <p class="event__duration">${((t,e)=>{const n=p().duration(p()(e).diff(t));return n.days()?n.format("DD[d] HH[h] mm[m]"):n.hours()?n.format("HH[h] mm[m]"):n.format("mm[m]")})(t,e)}</p>\n</div>\n`)(n,i)}\n      <p class="event__price">\n        &euro;&nbsp;<span class="event__price-value">${r}</span>\n      </p>\n      <h4 class="visually-hidden">Offers:</h4>\n      <ul class="event__selected-offers">\n        ${(t=>0===t.length?"":t.map((({title:t,price:e})=>`\n  <li class="event__offer">\n    <span class="event__offer-title">${t}</span>\n    &plus;&euro;&nbsp;\n    <span class="event__offer-price">${e}</span>\n  </li>\n  `)).join(""))(a)}\n      </ul>\n      <button class="event__favorite-btn  ${u}" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n        </svg>\n      </button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div>\n  </li>`;var l};class k{constructor(t){this.tripPoint=t}getTemplate(){return C(this.tripPoint)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class E{getTemplate(){return'\n  <ul class="trip-events__list">\n  </ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class P{getTemplate(){return`\n  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    ${o.map((t=>(t=>{const e=t.toLowerCase();return`\n    <div class="trip-sort__item  trip-sort__item--${e}">\n      <input id="sort-${e}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n      <label class="trip-sort__btn" for="sort-${e}">${t}</label>\n    </div>`})(t))).join("")}\n  </form>\n`}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class L{constructor({container:t,model:e}){this.container=t,this.model=e}init(){this.tripPoints=[...this.model.getTripPoints()],i(new P,this.container);const t=new E;i(t,this.container),i(new x(this.tripPoints[0]),t.getElement()),this.tripPoints.forEach((e=>i(new k(e),t.getElement())))}}const F=Y(),z=()=>({src:`https://loremflickr.com/248/152?random=${T(5)}`,description:w(l)}),A=r.map((t=>({id:F(),description:w(l),name:`${t}`,pictures:Array.from({length:T(3)},z)}))),U=Y(),j=()=>{const{id:t}=w(A),e=H(),n=H(e);return{id:U(),type:w(s),dateFrom:e,dateTo:n,destination:t,price:T(2e3),isFavorite:O()}},I=Y(),N=()=>({id:I(),title:w(u),price:T(1e3)}),W=s.map((t=>({type:t,offers:Array.from({length:T(5)},N)})));class Z{constructor(){this.destinations=A,this.offers=W,this.tripPoints=Array.from({length:4},j).map((t=>{const{offers:e}=this.offers.find((e=>e.type===t.type));return{...t,destination:this.destinations.find((e=>e.id===t.destination)),offers:e.map((e=>({type:t.type,...e,selected:O()})))}}))}getTripPoints(){return this.tripPoints}getOffers(){return this.offers}getDestinations(){return this.destinations}}(()=>{const t=document.querySelector(".trip-events"),e=document.querySelector(".trip-controls__filters"),n=document.querySelector(".trip-main"),i=new Z,s=new m({filterContainer:e,infoContainer:n}),r=new L({container:t,model:i});s.init(),r.init()})()})()})();
//# sourceMappingURL=bundle.6c99d39b6f09129a5c5b.js.map