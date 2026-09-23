(function(){'use strict';
var EVENT_SIDE=location.pathname.replace(/\/+$/,'')==='/gai'?'bride':'groom';
var EVENT_CONFIG={
 groom:{path:'/trai',dateISO:'2026-11-07T09:00:00+07:00',dateText:'07 · 11 · 2026',day:'07',month:'11',weekday:'THỨ BẢY',lunar:'Tức ngày 29 tháng 09 năm Bính Ngọ',venue:'HOA VIÊN VƯỜN DỪA',address:'811/42/58 đường 711A, khu dân cư Bách Khoa, Long Trường, Hồ Chí Minh',map:'https://maps.app.goo.gl/GRdkYV1fZnuMcK788?g_st=ic',time:'11:00',timeLabel:'ĐÓN KHÁCH',secondTime:'12:00',secondLabel:'KHAI TIỆC'},
 bride:{path:'/gai',dateISO:'2026-10-25T10:30:00+07:00',dateText:'25 · 10 · 2026',day:'25',month:'10',weekday:'CHỦ NHẬT',lunar:'Tức ngày 16 tháng 09 năm Bính Ngọ',venue:'TƯ GIA NHÀ GÁI',address:'Xóm Xuân Thành, Xã Cát Ngạn, Nghệ An',map:'https://maps.app.goo.gl/m9Dty3agavvajB9k6?g_st=ic',time:'10:30',timeLabel:'ĐÓN KHÁCH',secondTime:'11:00',secondLabel:'ĐÃI TIỆC'}
},EVENT=EVENT_CONFIG[EVENT_SIDE];
window.WEDDING_SIDE=EVENT_SIDE;window.WEDDING_EVENT=EVENT;
function applyEventConfig(){
 document.title='Trường & Tuyết · '+EVENT.dateText.replace(/ · /g,'.');
 var hero=document.querySelector('.hero-copy p');if(hero)hero.textContent=EVENT.dateText;
 var wd=document.querySelector('.date-weekday');if(wd)wd.textContent=EVENT.weekday;
 var dm=document.querySelector('.date-main');if(dm)dm.innerHTML='<strong>'+EVENT.day+'</strong><span>THÁNG '+EVENT.month+'<br>NĂM 2026</span>';
 var lunar=document.querySelector('.lunar');if(lunar){lunar.textContent=EVENT.lunar;lunar.hidden=!EVENT.lunar}
 var vc=document.querySelector('.venue-card');if(vc){var vh=vc.querySelector('h3'),vp=vc.querySelector('p'),va=vc.querySelector('a.venue-route');if(vh)vh.textContent=EVENT.venue;if(vp)vp.textContent=EVENT.address;if(va)va.href=EVENT.map}
 var items=document.querySelectorAll('.time-item');if(items[0]){var b=items[0].querySelector('b'),sm=items[0].querySelector('small');if(b)b.textContent=EVENT.time;if(sm)sm.textContent=EVENT.timeLabel}
 if(items[1]){if(EVENT.secondTime){var b2=items[1].querySelector('b'),sm2=items[1].querySelector('small');if(b2)b2.textContent=EVENT.secondTime;if(sm2)sm2.textContent=EVENT.secondLabel}else{items[1].style.display='none';var rule=document.querySelector('.timeline-rule');if(rule)rule.style.display='none'}}
 document.querySelectorAll('.countdown-date,.success-date,.ending .end-copy span').forEach(function(x){x.textContent=EVENT.dateText});
}
applyEventConfig();
if(EVENT_SIDE==='bride'){
 document.querySelectorAll('h1,h2,h3,h4,.caps,.venue-label').forEach(function(x){
   if(/^LỄ TÂN HÔN$/i.test((x.textContent||'').trim()))x.textContent='LỄ VU QUY';
 });
}var $=function(s){return document.querySelector(s)},$$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};var envelope=$('#envelope'),dock=$('#dock'),music=$('#musicBtn'),stream=$('#wishStream'),backdrop=$('#backdrop'),wishModal=$('#wishModal'),giftModal=$('#giftModal');var player=null,playerReady=false,musicOn=false;
function postJson(path,payload){
  return new Promise(function(resolve,reject){
    var x=new XMLHttpRequest();
    x.open('POST',location.origin+path,true);
    x.setRequestHeader('Content-Type','application/json;charset=UTF-8');
    x.setRequestHeader('Accept','application/json');
    x.onreadystatechange=function(){
      if(x.readyState!==4)return;
      var d=null;try{d=x.responseText?JSON.parse(x.responseText):{}}catch(e){return reject(Error('Phản hồi từ máy chủ không hợp lệ.'))}
      if(x.status>=200&&x.status<300)return resolve(d);
      reject(Error(d&&d.error?d.error:'Chưa thể kết nối máy chủ.'));
    };
    x.onerror=function(){reject(Error('Không thể kết nối máy chủ. Vui lòng thử lại.'))};
    try{x.send(JSON.stringify(payload))}catch(e){reject(e)}
  });
}
window.onYouTubeIframeAPIReady=function(){player=new YT.Player('yt',{height:'1',width:'1',videoId:'Y5VoCfbB6As',playerVars:{playsinline:1,controls:0,rel:0,loop:1,playlist:'Y5VoCfbB6As'},events:{onReady:function(){playerReady=true;window.player=player},onStateChange:function(e){musicOn=e.data===YT.PlayerState.PLAYING;music.classList.toggle('playing',musicOn)}}});window.player=player};
function play(){if(playerReady){try{player.playVideo()}catch(e){}}}
function safariPlay(){try{if(playerReady&&player){player.playVideo();musicOn=true;music.classList.add('playing')}}catch(e){}}
$('#openBtn').addEventListener('pointerdown',safariPlay,{capture:true,passive:true});
$('#openBtn').addEventListener('touchend',safariPlay,{capture:true,passive:true});
var opening=false;
function forceTop(){
  try{window.scrollTo(0,0)}catch(e){}
  document.documentElement.scrollTop=0;
  document.body.scrollTop=0;
}
if('scrollRestoration' in history){history.scrollRestoration='manual'}
forceTop();
window.addEventListener('pageshow',function(){forceTop()});
$('#openBtn').addEventListener('click',function(e){
  e.preventDefault();
  if(opening)return;
  opening=true;
  forceTop();
  document.body.classList.add('opening-lock');
  envelope.classList.add('seal-press');

  setTimeout(function(){
    envelope.classList.remove('seal-press');
    envelope.classList.add('seal-release');
  },180);

  setTimeout(function(){
    envelope.classList.add('seam-glow');
  },350);

  setTimeout(function(){
    envelope.classList.remove('seal-release');
    envelope.classList.add('seal-break','opening','open');
    document.body.classList.add('invite-opening');
    forceTop();
  },550);

  setTimeout(function(){
    music.classList.add('show');
    play();
  },2050);

  setTimeout(function(){
    document.body.classList.add('hero-copy-in');
    forceTop();
  },2250);

  setTimeout(function(){
    envelope.style.display='none';
    document.body.classList.remove('locked','opening-lock');
    dock.classList.add('show');
    stream.classList.add('show');
    opening=false;
    forceTop();
    requestAnimationFrame(forceTop);
    setTimeout(forceTop,120);
  },2800);
});
music.addEventListener('click',function(e){e.preventDefault();if(!playerReady)return;if(musicOn)player.pauseVideo();else player.playVideo()});
var guest='';try{guest=new URLSearchParams(location.search).get('guest')||''}catch(e){}if(guest){$('#guest').textContent=guest.toUpperCase();$('#wishName').value=guest}else $('#guest').textContent='QUÝ KHÁCH';
function tick(){var raw=new Date(EVENT.dateISO).getTime()-Date.now(),d=Math.max(0,raw),vals=[Math.floor(d/86400000),Math.floor(d%86400000/3600000),Math.floor(d%3600000/60000),Math.floor(d%60000/1000)];$$('#count b').forEach(function(x,i){x.textContent=String(vals[i]).padStart(2,'0')});var today=$('#countdownToday');if(today)today.hidden=raw>0}tick();setInterval(tick,1000);
var io=('IntersectionObserver'in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:.13}):null;$$('.reveal').forEach(function(x){if(io)io.observe(x);else x.classList.add('visible')});
var album=['BAO05438.jpeg','BAO04669.jpeg','BAO04721.jpeg','BAO04751.jpeg','BAO04850.jpeg','BAO04994.jpeg','BAO05015.jpeg','BAO05121.jpeg','BAO05133.jpeg','BAO05157.jpeg','BAO05264.jpeg','BAO05296.jpeg','BAO05301.jpeg','BAO05340.jpeg','BAO05452.jpeg','BAO05473.jpeg','BAO05506.jpeg','BAO05527.jpeg','BAO05575.jpeg','BAO05598.jpeg'];
var albumQuotes=['Một câu chuyện đẹp bắt đầu từ đây.','Hai người, một hành trình.','Có nhau, những ngày bình thường cũng trở nên đặc biệt.','Những khoảnh khắc nhỏ, những kỷ niệm thật dài.','Cùng nhau, và mãi về sau…'];
var gal=$('#gallery'),albumIndex=0;
var viewer=document.createElement('div');viewer.className='film-viewer reveal';
viewer.innerHTML='<div class="film-main-wrap"><img id="filmMain" class="film-main" alt="Ảnh cưới Trường và Tuyết"><span id="filmCounter" class="film-counter"></span></div><div id="filmQuote" class="film-quote"></div><div id="filmStrip" class="film-strip" aria-label="Cuộn phim ảnh cưới"></div><div class="film-hint">Vuốt cuộn phim · chạm ảnh lớn để xem toàn màn hình</div>';
gal.appendChild(viewer);if(io)io.observe(viewer);else viewer.classList.add('visible');
var filmMain=$('#filmMain'),filmCounter=$('#filmCounter'),filmQuote=$('#filmQuote'),filmStrip=$('#filmStrip');
album.forEach(function(n,i){var b=document.createElement('button');b.type='button';b.className='film-thumb'+(i===0?' active':'');b.dataset.i=i;b.setAttribute('aria-label','Xem ảnh '+(i+1));b.innerHTML='<img src="assets/'+n+'" alt="">';filmStrip.appendChild(b)});
function selectAlbum(i,instant,userInitiated){albumIndex=(i+album.length)%album.length;var done=function(){filmMain.src='assets/'+album[albumIndex];filmMain.dataset.i=albumIndex;filmCounter.textContent=String(albumIndex+1).padStart(2,'0')+' / '+album.length;filmQuote.textContent=albumQuotes[Math.min(albumQuotes.length-1,Math.floor(albumIndex/(album.length/albumQuotes.length)))];$$('.film-thumb').forEach(function(x,j){x.classList.toggle('active',j===albumIndex)});var active=$$('.film-thumb')[albumIndex];if(userInitiated&&active&&active.scrollIntoView)active.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});filmMain.classList.remove('switching')};if(instant){done()}else{filmMain.classList.add('switching');setTimeout(done,190)}}
selectAlbum(0,true,false);
// Swipe directly on the large album photo. Horizontal gestures change photo; vertical gestures keep normal page scrolling.
var filmStartX=0,filmStartY=0,filmTracking=false;
filmMain.addEventListener('touchstart',function(e){if(!e.touches||!e.touches.length)return;filmStartX=e.touches[0].clientX;filmStartY=e.touches[0].clientY;filmTracking=true},{passive:true});
filmMain.addEventListener('touchend',function(e){if(!filmTracking||!e.changedTouches||!e.changedTouches.length)return;filmTracking=false;var dx=e.changedTouches[0].clientX-filmStartX,dy=e.changedTouches[0].clientY-filmStartY;if(Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy)*1.15){filmSwiped=true;selectAlbum(albumIndex+(dx<0?1:-1),false,true);setTimeout(function(){filmSwiped=false},450)}},{passive:true});
filmStrip.addEventListener('click',function(e){var b=e.target.closest('.film-thumb');if(b)selectAlbum(Number(b.dataset.i),false,true)});
function openSheet(s){backdrop.classList.add('open');s.classList.add('open');stream.style.display='none'}function closeSheets(){backdrop.classList.remove('open');wishModal.classList.remove('open');giftModal.classList.remove('open');stream.style.display='flex'}$('#wishOpen').onclick=function(){openSheet(wishModal)};var giftDock=$('#gift'),giftBody=$('#giftBody');if(giftDock)giftDock.onclick=function(){openSheet(giftModal)};if(giftBody)giftBody.onclick=function(){openSheet(giftModal)};backdrop.onclick=closeSheets;$$('.close').forEach(function(x){x.onclick=closeSheets});
var wishHidden=false,wishQueue=[],wi=0;function bubble(n,m){if(wishHidden)return;var b=document.createElement('div');b.className='bubble';var x=document.createElement('b');x.textContent=n+':';b.appendChild(x);b.appendChild(document.createTextNode(' '+m));stream.appendChild(b);while($$('.bubble').length>3)$$('.bubble')[0].remove();setTimeout(function(){b.remove()},5200)}fetch('/api/wishes?limit=20').then(function(r){return r.ok?r.json():{wishes:[]}}).then(function(d){wishQueue=(d.wishes||[]).map(function(w){return[w.displayName,w.message]})});setInterval(function(){if(wishQueue.length&&!wishHidden){var w=wishQueue[wi++%wishQueue.length];bubble(w[0],w[1])}},4300);$('#sendWish').onclick=async function(){var n=$('#wishName').value.trim(),m=$('#wishText').value.trim(),btn=this;if(!n||!m)return;btn.disabled=true;var old=btn.textContent;btn.textContent='ĐANG GỬI...';var er=document.getElementById('wishApiError');if(!er){er=document.createElement('div');er.id='wishApiError';er.className='submit-error';btn.before(er)}er.hidden=true;try{var c='';try{c=new URLSearchParams(location.search).get('i')||''}catch(e){}var d=await postJson('/api/wishes',{invitationCode:c,displayName:n,message:m});wishQueue.unshift([n,m]);bubble(n,m);$('#wishText').value='';closeSheets()}catch(e){er.textContent=e.message||'Chưa thể gửi lời chúc.';er.hidden=false}finally{btn.disabled=false;btn.textContent=old}};$('#hideWishes').onclick=function(){wishHidden=!wishHidden;$$('.bubble').forEach(function(x){x.remove()});$('#hideWishes').textContent=wishHidden?'♡':'×'};
var heart=$('#heart');function fire(e){e.preventDefault();var r=heart.getBoundingClientRect(),h=document.createElement('span');h.className='heart-fly';h.textContent='♥';h.style.left=(r.left+r.width/2-8)+'px';h.style.top=(r.top+5)+'px';h.style.color=Math.random()>.45?'#a71923':'#d99a9f';h.style.setProperty('--dx',(Math.random()*160-80)+'px');h.style.setProperty('--rot',(Math.random()*80-40)+'deg');document.body.appendChild(h);setTimeout(function(){h.remove()},1900)}heart.addEventListener('pointerdown',fire,{passive:false});heart.addEventListener('dblclick',function(e){e.preventDefault()});

var lb=$('#lightbox'),lbImg=$('#lbImg'),lbCount=$('#lbCount'),idx=0;function show(i){idx=i;lbImg.src='assets/'+album[i];lbCount.textContent=(i+1)+' / '+album.length;lb.classList.add('open')}var filmSwiped=false;filmMain.addEventListener('click',function(e){if(filmSwiped){filmSwiped=false;e.preventDefault();return}show(albumIndex)});$('#lbClose').onclick=function(){lb.classList.remove('open')};var sx=0;lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>45)show((idx+(dx<0?1:-1)+album.length)%album.length)},{passive:true});
})();
/* V1.4 RSVP replaced by V7 overlay below */
/* ===== V1.5 Modern Luxury Motion Choreography ===== */
(function(){
  function apply(selector,motion,stagger){
    document.querySelectorAll(selector).forEach(function(node,i){
      node.classList.add('motion'); node.setAttribute('data-motion',motion);
      if(stagger) node.setAttribute('data-delay',String((i%5)+1));
    });
  }
  /* text rises; photos glide/scale. No excessive rotation. */
  apply('.quote-section p,.quote-section strong','rise',true);
  apply('.family:nth-of-type(1) img','left',false);
  apply('.family:nth-of-type(2) img','right',false);
  apply('.family h3,.family p,.family em,.family strong','rise',true);
  apply('.invitation .mini-monogram,.invitation h2,.invitation h4,.guest-name,.invite-line,.date-lockup,.lunar,.schedule,.venue,.invitation>div>p','rise',true);
  apply('.invite-portraits img','photo',true);
  apply('.countdown .mini-monogram,.countdown h2,.countdown .caps,.count-grid,.countdown p,.gift-callout','rise',true);
  apply('.rsvp-card .tt,.rsvp-card h2,.rsvp-card>p,.rsvp-card label,.attendance,.party-row,.rsvp-send','rise',true);
  apply('.album .section-head>*','rise',true);
  apply('.film-main-wrap','scale',false);
  apply('.film-strip','right',false);
  apply('.film-quote','rise',false);
  apply('.ending-copy>*','rise',true);

  var nodes=document.querySelectorAll('.motion');
  if(!('IntersectionObserver' in window)){
    nodes.forEach(function(n){n.classList.add('is-visible')}); return;
  }
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        if(entry.target.tagName==='IMG') setTimeout(function(){entry.target.classList.add('is-settled')},900);
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.18,rootMargin:'0px 0px -7% 0px'});
  nodes.forEach(function(n){observer.observe(n)});

  var ending=document.querySelector('.ending');
  if(ending){
    var endObs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){ending.classList.add('in-view');endObs.disconnect()}})},{threshold:.25});
    endObs.observe(ending);
  }
})();

/* ===== V1.7 music + opening reliability ===== */
(function(){
  var music=document.getElementById('musicBtn')||document.getElementById('music')||document.getElementById('musicControl')||document.getElementById('topMusic');
  var env=document.getElementById('envelope')||document.getElementById('cover');
  var open=document.getElementById('openBtn')||document.getElementById('openInvite')||document.getElementById('finalSeal');

  function setMusicVisual(on){
    if(!music)return;
    music.classList.toggle('playing',!!on);
    music.setAttribute('aria-pressed',on?'true':'false');
  }
  function requestPlay(){
    try{
      if(window.player && typeof window.player.playVideo==='function'){
        window.player.playVideo();
        /* Safari may report state a moment later; don't fake spinning until playback is observed. */
        setTimeout(function(){
          try{
            var st=window.player.getPlayerState();
            setMusicVisual(st===1);
          }catch(e){}
        },220);
      }
    }catch(e){}
  }

  /* User's seal tap is the browser-approved gesture. Ask for playback immediately,
     before the long opening animation begins. */
  if(open){
    open.addEventListener('pointerdown',function(){ requestPlay(); },{passive:true});
    open.addEventListener('touchend',function(){ requestPlay(); },{passive:true});
    open.addEventListener('click',function(){
      requestPlay();
      /* Make sure no opaque envelope background can flash after panels separate. */
      if(env)env.style.background='transparent';
    });
  }

  if(music){
    music.addEventListener('click',function(){
      setTimeout(function(){
        try{
          var st=window.player && window.player.getPlayerState ? window.player.getPlayerState() : -1;
          setMusicVisual(st===1);
        }catch(e){}
      },180);
    });
  }

  /* Hook YouTube's state callback while preserving any existing callback. */
  var previous=window.onPlayerStateChange;
  window.onPlayerStateChange=function(e){
    if(typeof previous==='function'){try{previous(e)}catch(x){}}
    setMusicVisual(e && e.data===1);
  };

  /* Some existing builds pass an inline onStateChange callback instead of global callback.
     Poll cheaply so icon always mirrors actual audio state. */
  setInterval(function(){
    try{
      if(window.player && typeof window.player.getPlayerState==='function'){
        setMusicVisual(window.player.getPlayerState()===1);
      }
    }catch(e){}
  },700);
})();

/* ===== V1.8 lifecycle and Safari music ===== */
(function(){
  var env=document.getElementById('envelope')||document.getElementById('cover');
  var open=document.getElementById('openBtn')||document.getElementById('openInvite')||document.getElementById('finalSeal');
  var music=document.getElementById('musicBtn')||document.getElementById('music')||document.getElementById('musicControl')||document.getElementById('topMusic');
  var dock=document.getElementById('socialDock')||document.getElementById('dock');

  function topNow(){
    try{window.scrollTo({top:0,left:0,behavior:'instant'})}catch(e){window.scrollTo(0,0)}
    document.documentElement.scrollTop=0; document.body.scrollTop=0;
  }

  /* Every navigation/reload starts closed, regardless of Safari bfcache/scroll restoration. */
  try{history.scrollRestoration='manual'}catch(e){}
  function resetClosed(){
    document.body.classList.remove('invite-opened','hero-copy-in','invite-opening');
    document.body.classList.add('locked');
    if(env){
      env.style.display='';
      env.style.visibility='visible';
      env.style.opacity='1';
      env.classList.remove('open','opening','seal-press','seal-release','seal-break','seam-glow');
    }
    if(music){music.classList.remove('show','playing')}
    if(dock){dock.classList.remove('show')}
    topNow();
  }
  resetClosed();
  window.addEventListener('pageshow',function(e){if(e&&e.persisted&&!document.body.classList.contains('invite-opened')){resetClosed();setTimeout(topNow,20)}});
  window.addEventListener('pagehide',function(){try{sessionStorage.removeItem('inviteOpened')}catch(e){}});

  function visualPlaying(on){
    if(!music)return;
    music.classList.toggle('playing',!!on);
    music.setAttribute('aria-pressed',on?'true':'false');
  }
  function attemptMusic(){
    try{
      if(window.player && typeof window.player.playVideo==='function'){
        /* playVideo is called synchronously inside the seal gesture */
        window.player.playVideo();
        setTimeout(function(){
          try{visualPlaying(window.player.getPlayerState()===1)}catch(e){}
        },180);
        setTimeout(function(){
          try{
            if(window.player.getPlayerState()!==1) window.player.playVideo();
            visualPlaying(window.player.getPlayerState()===1);
          }catch(e){}
        },600);
      }
    }catch(e){}
  }

  if(open){
    /* Capture phase runs before the old opening handler. */
    open.addEventListener('pointerdown',function(){attemptMusic()},{capture:true,passive:true});
    open.addEventListener('click',function(){
      document.body.classList.add('invite-opened');
      if(music)music.classList.add('show');
      attemptMusic();
      setTimeout(function(){if(music)music.classList.add('show');attemptMusic()},250);
    },true);
  }

  if(music){
    music.addEventListener('click',function(){
      setTimeout(function(){
        try{visualPlaying(window.player && window.player.getPlayerState()===1)}catch(e){}
      },120);
    });
  }

  setInterval(function(){
    try{
      if(window.player && typeof window.player.getPlayerState==='function'){
        visualPlaying(window.player.getPlayerState()===1);
      }
    }catch(e){}
  },500);
})();

/* V1.9: audio state never resets invitation */
(function(){var m=document.getElementById('musicBtn')||document.getElementById('music')||document.getElementById('musicControl')||document.getElementById('topMusic');if(!m)return;
function sync(){var p=false;try{p=!!(window.player&&player.getPlayerState&&player.getPlayerState()===1)}catch(e){}m.classList.toggle('playing',p);m.classList.toggle('needs-tap',document.body.classList.contains('invite-opened')&&!p)}
m.addEventListener('click',function(e){e.stopPropagation();try{if(window.player&&player.getPlayerState){if(player.getPlayerState()===1)player.pauseVideo();else player.playVideo()}}catch(x){}setTimeout(sync,120)},true);setInterval(sync,400)})();

/* ===== V1.10 section-as-slide animation controller ===== */
(function(){
  /* Neutralize previous one-shot animation implementation. */
  document.querySelectorAll('.motion,.anim-in').forEach(function(el){
    el.classList.remove('motion','anim-in','fly-left','fly-right','fly-up','rotate-in','zoom-in','text-reveal',
      'motion-delay-1','motion-delay-2','motion-delay-3','motion-delay-4','motion-delay-5');
  });

  var sections=[
    document.querySelector('.families'),
    document.querySelector('.invitation'),
    document.querySelector('.countdown'),
    document.querySelector('.rsvp'),
    document.querySelector('.album'),
    document.querySelector('.ending')
  ].filter(Boolean);

  function prepare(section){
    var nodes=[];
    if(section.matches('.families')){
      nodes=[...section.querySelectorAll('h2,p,.family img,.family h3,.family h4,.family b')];
      section.querySelectorAll('.family img').forEach(function(x,i){x.classList.add(i%2?'scene-right':'scene-left')});
    }else if(section.matches('.invitation')){
      nodes=[...section.querySelectorAll('h2,h3,h4,p,.guest-name,.date-lockup,.schedule,.venue,.invite-portraits img,.primary')];
      section.querySelectorAll('.invite-portraits img').forEach(function(x,i){x.classList.add(i?'scene-right':'scene-left')});
    }else if(section.matches('.countdown')){
      nodes=[...section.querySelectorAll('h2,p,.count-grid,.gift-callout,.primary')];
    }else if(section.matches('.rsvp')){
      nodes=[...section.querySelectorAll('h2,p,label,.attendance,.party-row,.rsvp-send')];
    }else if(section.matches('.album')){
      nodes=[...section.querySelectorAll('h2,.film-main-wrap,.film-strip,.film-quote,.albumLead')];
      var fm=section.querySelector('.film-main-wrap');if(fm)fm.classList.add('scene-scale');
      var fs=section.querySelector('.film-strip');if(fs)fs.classList.add('scene-right');
    }else if(section.matches('.ending')){
      nodes=[...section.querySelectorAll('.ending-copy>*')];
    }
    nodes.forEach(function(el,i){
      el.classList.add('scene-motion');
      el.style.setProperty('--scene-delay',(Math.min(i,6)*110)+'ms');
    });
  }
  sections.forEach(prepare);

  if(!('IntersectionObserver' in window)){
    sections.forEach(function(s){s.classList.add('scene-active')});return;
  }

  /* A section must occupy a meaningful part of viewport before playing.
     Leaving well outside the center zone resets it so reverse-scroll replays. */
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting && entry.intersectionRatio>=0.38){
        entry.target.classList.add('scene-active');
      }else if(!entry.isIntersecting || entry.intersectionRatio<0.12){
        entry.target.classList.remove('scene-active');
      }
    });
  },{threshold:[0,.12,.38,.55],rootMargin:'-8% 0px -8% 0px'});

  sections.forEach(function(s){observer.observe(s)});
})();

/* ===== V1.16 invitation viewport choreography ===== */
(function(){
  var nodes=Array.prototype.slice.call(document.querySelectorAll('#invitation .invite-animate'));
  if(!nodes.length)return;
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){nodes.forEach(function(n){n.classList.add('is-inview')});return}
  if(!('IntersectionObserver' in window)){nodes.forEach(function(n){n.classList.add('is-inview')});return}
  // Treat each invitation block like a slide: replay its entrance whenever the
  // guest leaves it and scrolls back. Do not unobserve after the first reveal.
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting && entry.intersectionRatio>=.30){
        if(!entry.target.classList.contains('is-inview')){
          // Force a fresh animation timeline on every re-entry.
          entry.target.classList.remove('is-inview');
          void entry.target.offsetWidth;
          entry.target.classList.add('is-inview');
        }
      }else if(!entry.isIntersecting || entry.intersectionRatio<.10){
        // Reset only after it has substantially left the viewport, preventing
        // flicker around the trigger boundary while still allowing replay.
        entry.target.classList.remove('is-inview');
      }
    });
  },{threshold:[0,.10,.30,.55],rootMargin:'-4% 0px -6% 0px'});
  nodes.forEach(function(n){observer.observe(n)});
})();
/* ===== V7 Countdown replay + full-screen RSVP ===== */
(function(){
  var cd=document.getElementById('countdownSection');
  if(cd){if('IntersectionObserver'in window){new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&e.intersectionRatio>=.35){cd.classList.remove('countdown-active');void cd.offsetWidth;cd.classList.add('countdown-active')}else if(!e.isIntersecting||e.intersectionRatio<.1)cd.classList.remove('countdown-active')})},{threshold:[0,.1,.35,.6]}).observe(cd)}else cd.classList.add('countdown-active')}
  var ov=document.getElementById('rsvpOverlay'),open=document.getElementById('rsvpOpen'),close=document.getElementById('rsvpClose'),back=document.getElementById('rsvpBack');if(!ov||!open)return;
  var form=document.getElementById('rsvpFormState'),loading=document.getElementById('rsvpLoading'),success=document.getElementById('rsvpSuccess'),name=document.getElementById('rsvpName'),yes=document.getElementById('rsvpYes'),no=document.getElementById('rsvpNo'),partyRow=document.getElementById('partyRow'),minus=document.getElementById('partyMinus'),plus=document.getElementById('partyPlus'),partyEl=document.getElementById('partyCount'),msg=document.getElementById('rsvpMessage'),send=document.getElementById('rsvpSend'),nameErr=document.getElementById('rsvpNameError'),submitErr=document.getElementById('rsvpError');
  var attending=true,party=1,scrollY=0,historyAdded=false;try{var g=new URLSearchParams(location.search).get('guest');if(g)name.value=g}catch(e){}
  function choose(v){attending=v;yes.classList.toggle('active',v);no.classList.toggle('active',!v);partyRow.hidden=!v}yes.onclick=function(){choose(true)};no.onclick=function(){choose(false)};minus.onclick=function(){party=Math.max(1,party-1);partyEl.textContent=party};plus.onclick=function(){party+=1;partyEl.textContent=party};
  function showState(which){form.hidden=which!=='form';loading.hidden=which!=='loading';success.hidden=which!=='success';ov.querySelector('.rsvp-panel').scrollTop=0}
  function openOverlay(){scrollY=window.scrollY;showState('form');submitErr.hidden=true;nameErr.hidden=true;document.documentElement.classList.add('rsvp-open');document.body.classList.add('rsvp-open');ov.classList.add('open');ov.setAttribute('aria-hidden','false')}
  function closeOverlay(){if(!ov.classList.contains('open'))return;ov.classList.remove('open');ov.setAttribute('aria-hidden','true');setTimeout(function(){document.documentElement.classList.remove('rsvp-open');document.body.classList.remove('rsvp-open');try{open.focus({preventScroll:true})}catch(e){}},740)}
  open.onclick=openOverlay;close.onclick=closeOverlay;back.onclick=closeOverlay;document.addEventListener('keydown',function(e){if(e.key==='Escape'&&ov.classList.contains('open'))closeOverlay()});
  /* D1 RSVP handler is attached below. */
})();

/* D1 data integration: preserves existing UI and replaces local-only persistence. */
(function(){
function sendRsvpJson(path,payload){return new Promise(function(resolve,reject){var x=new XMLHttpRequest();x.open('POST',location.origin+path,true);x.setRequestHeader('Content-Type','application/json;charset=UTF-8');x.setRequestHeader('Accept','application/json');x.onreadystatechange=function(){if(x.readyState!==4)return;var d=null;try{d=x.responseText?JSON.parse(x.responseText):{}}catch(e){return reject(Error('Phản hồi từ máy chủ không hợp lệ.'))}if(x.status>=200&&x.status<300)return resolve(d);reject(Error(d&&d.error?d.error:'Chưa thể kết nối máy chủ.'))};x.onerror=function(){reject(Error('Không thể kết nối máy chủ. Vui lòng thử lại.'))};try{x.send(JSON.stringify(payload))}catch(e){reject(e)}})};var invitation=null,code='';try{code=(new URLSearchParams(location.search).get('i')||'').trim()}catch(e){}var g=document.getElementById('guest'),wn=document.getElementById('wishName'),rn=document.getElementById('rsvpName');if(code)fetch('/api/invitation?code='+encodeURIComponent(code)).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(i){invitation=i;if(i.side&&i.side!=='shared'&&i.side!==EVENT_SIDE){location.replace((i.side==='bride'?'/gai':'/trai')+location.search);return}if(g)g.textContent=i.guestName.toUpperCase();if(wn&&!wn.value)wn.value=i.guestName;if(rn&&!rn.value)rn.value=i.guestName}).catch(function(){invitation=null});var send=document.getElementById('rsvpSend');if(!send)return;send.onclick=async function(){var n=document.getElementById('rsvpName'),ne=document.getElementById('rsvpNameError'),er=document.getElementById('rsvpError'),form=document.getElementById('rsvpFormState'),load=document.getElementById('rsvpLoading'),success=document.getElementById('rsvpSuccess'),panel=document.querySelector('#rsvpOverlay .rsvp-panel'),att=document.getElementById('rsvpYes').classList.contains('active'),party=Number(document.getElementById('partyCount').textContent)||1,name=n.value.trim();ne.hidden=!!name;if(!name){n.focus();return}if(att&&invitation&&invitation.maxGuests&&party>invitation.maxGuests){er.textContent='Thiệp này tối đa '+invitation.maxGuests+' người tham dự.';er.hidden=false;return}function state(x){form.hidden=x!='form';load.hidden=x!='loading';success.hidden=x!='success';panel.scrollTop=0}er.hidden=true;state('loading');var tokenKey='wedding_public_rsvp_token_'+EVENT_SIDE,t='';try{t=localStorage.getItem(tokenKey)||''}catch(e){}try{var d=await sendRsvpJson('/api/rsvp',{invitationCode:invitation?invitation.code:code,publicResponseToken:invitation?null:t,guestName:name,attending:att,guestCount:att?party:0,message:document.getElementById('rsvpMessage').value.trim(),side:EVENT_SIDE});if(d.publicResponseToken)try{localStorage.setItem(tokenKey,d.publicResponseToken)}catch(e){}document.getElementById('successIcon').textContent=att?'✓':'♡';document.getElementById('successTitle').textContent=att?'ĐÃ NHẬN XÁC NHẬN':'CẢM ƠN BẠN ĐÃ PHẢN HỒI';document.getElementById('successText').innerHTML=att?'Cảm ơn bạn!<br><br>Hẹn gặp bạn trong ngày chung đôi<br>của chúng mình.':'Chúng mình rất tiếc khi không thể gặp bạn<br>trong ngày vui, nhưng vô cùng trân trọng<br>lời hồi đáp của bạn.';state('success')}catch(e){state('form');er.textContent=e.message||'Chưa thể gửi xác nhận. Vui lòng thử lại.';er.hidden=false}}})();
