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
