// compare sliders
document.querySelectorAll('.compare input').forEach(function(r){
  var c=r.closest('.compare');
  function set(){c.style.setProperty('--pos',r.value+'%')}
  r.addEventListener('input',set);set();
});
// material switcher
document.querySelectorAll('[data-switch]').forEach(function(box){
  var img=box.querySelector('.variant img');
  box.querySelectorAll('.swatches button').forEach(function(b){
    b.addEventListener('click',function(){
      box.querySelectorAll('.swatches button').forEach(function(x){x.setAttribute('aria-pressed','false')});
      b.setAttribute('aria-pressed','true');
      img.src=b.dataset.src;img.srcset=b.dataset.srcset;img.alt=b.dataset.alt;
    });
  });
});
// videos: play only when visible, respect reduced motion
var still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var vids=document.querySelectorAll('video[data-auto]');
if(still){vids.forEach(function(v){v.controls=true})}
else if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    var v=e.target; if(e.isIntersecting){v.play().catch(function(){})}else{v.pause()}
  })},{rootMargin:'200px'});
  vids.forEach(function(v){io.observe(v)});
}
// lightbox
var lb=document.querySelector('dialog.lb');
if(lb){
  var big=lb.querySelector('img');
  document.querySelectorAll('button.zoom').forEach(function(b){
    b.addEventListener('click',function(){big.src=b.dataset.full;big.alt=b.querySelector('img').alt;lb.showModal()});
  });
  lb.addEventListener('click',function(e){if(e.target!==big)lb.close()});
}
// copy email
document.querySelectorAll('button.copy').forEach(function(b){
  var label=b.textContent;
  b.addEventListener('click',function(){
    var t=b.dataset.copy;
    function done(){b.textContent=b.dataset.done;setTimeout(function(){b.textContent=label},1600)}
    if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(t).then(done,fallback)}else{fallback()}
    function fallback(){var a=document.createElement('textarea');a.value=t;a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();try{document.execCommand('copy');done()}catch(e){}document.body.removeChild(a)}
  });
});
// keep the visitor inside the role page they came from
(function(){
  var KEY='riznyk-role', lang=({uk:'ua',pl:'pl'})[document.documentElement.lang]||'en', st=null;
  try{st=window.sessionStorage}catch(e){}
  if(!st)return;
  var role=document.querySelector('main.role[data-role]');
  if(role){try{st.setItem(KEY,JSON.stringify({file:role.dataset.role,en:role.dataset.roleEn,ua:role.dataset.roleUa,pl:role.dataset.rolePl,cases:JSON.parse(role.dataset.cases||'[]')}))}catch(e){}return}
  if(document.querySelector('.hero')){try{st.removeItem(KEY)}catch(e){}return}
  var back=document.querySelector('a.back'); if(!back)return;
  var r=null; try{r=JSON.parse(st.getItem(KEY))}catch(e){}
  if(!r||!r.file)return;
  var href=r.file+'.html', title=r[lang]||r.en;
  back.href=href; back.textContent=({ua:'← Назад до портфоліо',pl:'← Powrót do portfolio'})[lang]||'← Back to portfolio';
  var brand=document.querySelector('a.brand'); if(brand)brand.href=href;
  var first=document.querySelector('nav.next a'); if(first){first.href=href; var s=first.querySelector('strong'); if(s)s.textContent=({ua:'Портфоліо',pl:'Portfolio'})[lang]||'Portfolio'; var sm=first.querySelector('small'); if(sm)sm.textContent=({ua:'Назад до',pl:'Powrót do'})[lang]||'Back to';}
  var cs=r.cases||[], here=location.pathname.split('/').pop().replace('.html','');
  var i=-1; for(var k=0;k<cs.length;k++){if(cs[k].id===here)i=k}
  var nx=document.querySelector('nav.next a[style]');
  if(nx&&i>=0&&cs.length>1){var n=cs[(i+1)%cs.length]; nx.href=n.id+'.html'; var ns=nx.querySelector('strong'); if(ns)ns.textContent=n[lang]||n.en;}
})();
