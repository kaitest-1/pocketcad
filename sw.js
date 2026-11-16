/* 掌上製圖 1.3.0 離線快取（20261116133834） */
const CACHE='pocketcad-1.3.0-20261116133834';
const FILES=[
  './',
  './dwg-glue.js',
  './dwg.js',
  './dwg.wasm',
  './f1.woff2',
  './f10.woff2',
  './f11.woff2',
  './f12.woff2',
  './f13.woff2',
  './f14.woff2',
  './f15.woff2',
  './f16.woff2',
  './f17.woff2',
  './f18.woff2',
  './f19.woff2',
  './f2.woff2',
  './f20.woff2',
  './f21.woff2',
  './f3.woff2',
  './f4.woff2',
  './f5.woff2',
  './f6.woff2',
  './f7.woff2',
  './f8.woff2',
  './f9.woff2',
  './fonts.css',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './index.html',
  './LICENSE-libredwg.txt',
  './manifest.webmanifest'
];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('pocketcad-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const url=new URL(req.url); if(url.origin!==self.location.origin) return;
  e.respondWith(caches.open(CACHE).then(c=>c.match(req,{ignoreSearch:true}).then(hit=>hit||fetch(req).then(res=>{ if(res&&res.ok) c.put(req,res.clone()); return res; })
    .catch(()=>req.mode==='navigate'?c.match('./index.html'):Response.error()))));
});