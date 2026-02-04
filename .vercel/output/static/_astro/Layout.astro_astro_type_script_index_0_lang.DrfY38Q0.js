const m="propiedadenrd_favorites";function p(){try{const e=localStorage.getItem(m);return e?JSON.parse(e):[]}catch{return[]}}function g(e){localStorage.setItem(m,JSON.stringify(e));const t=e.map(a=>a.slug);document.cookie=`favorites=${JSON.stringify(t)};path=/;max-age=31536000`,v(),y(),window.dispatchEvent(new CustomEvent("favorites-updated"))}function k(e){const t=p(),a=t.findIndex(r=>r.slug===e.slug);return a>=0?(t.splice(a,1),g(t),l("Eliminado de favoritos"),!1):(t.push({...e,addedAt:new Date().toISOString()}),g(t),l("Agregado a favoritos"),o("favorite_added",{slug:e.slug}),!0)}function S(e){return p().some(t=>t.slug===e)}function v(){document.querySelectorAll("[data-favorite-btn]").forEach(e=>{const t=e.getAttribute("data-property-slug");if(t){const a=S(t);e.classList.toggle("is-favorite",a);const r=e.querySelector("svg");r&&r.setAttribute("fill",a?"currentColor":"none")}})}function y(){const e=p().length;document.querySelectorAll("[data-favorites-count]").forEach(t=>{t.textContent=e.toString(),t.classList.toggle("hidden",e===0)})}async function E(e){if(o("share_initiated",{url:e.url}),navigator.share)try{await navigator.share(e),o("share_completed",{method:"native",url:e.url});return}catch(t){t.name!=="AbortError"&&console.error("Share failed:",t)}A(e)}function A(e){const t=document.getElementById("share-modal");if(!t){L(e);return}const a=t.querySelector("[data-share-url]");a&&(a.value=e.url),w(t,e),t.classList.remove("hidden")}function L(e){const t=document.createElement("div");t.id="share-modal",t.className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50",t.innerHTML=`
    <div class="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Compartir propiedad</h3>
        <button data-close-modal class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="grid grid-cols-4 gap-4 mb-6">
        <a href="#" data-share-whatsapp class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100">
          <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <span class="text-xs text-gray-600">WhatsApp</span>
        </a>

        <a href="#" data-share-facebook class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100">
          <div class="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mb-2">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
          <span class="text-xs text-gray-600">Facebook</span>
        </a>

        <a href="#" data-share-twitter class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100">
          <div class="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-2">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </div>
          <span class="text-xs text-gray-600">X</span>
        </a>

        <a href="#" data-share-email class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100">
          <div class="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mb-2">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <span class="text-xs text-gray-600">Email</span>
        </a>
      </div>

      <div class="flex items-center gap-2">
        <input type="text" data-share-url readonly value="${e.url}"
          class="flex-1 px-3 py-2 border rounded-lg text-sm bg-gray-50 text-gray-600">
        <button data-copy-url class="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">
          Copiar
        </button>
      </div>
    </div>
  `,document.body.appendChild(t),w(t,e),t.querySelector("[data-close-modal]")?.addEventListener("click",()=>{t.classList.add("hidden")}),t.addEventListener("click",a=>{a.target===t&&t.classList.add("hidden")}),t.querySelector("[data-copy-url]")?.addEventListener("click",()=>{const a=t.querySelector("[data-share-url]");a&&(navigator.clipboard.writeText(a.value),l("Enlace copiado"),o("share_completed",{method:"copy",url:e.url}))})}function w(e,t){const a=encodeURIComponent(t.url),r=encodeURIComponent(t.text),s=encodeURIComponent(t.title),n=e.querySelector("[data-share-whatsapp]");n&&(n.href=`https://wa.me/?text=${r}%20${a}`,n.target="_blank",n.addEventListener("click",()=>{o("share_completed",{method:"whatsapp",url:t.url})}));const i=e.querySelector("[data-share-facebook]");i&&(i.href=`https://www.facebook.com/sharer/sharer.php?u=${a}`,i.target="_blank",i.addEventListener("click",()=>{o("share_completed",{method:"facebook",url:t.url})}));const c=e.querySelector("[data-share-twitter]");c&&(c.href=`https://twitter.com/intent/tweet?text=${r}&url=${a}`,c.target="_blank",c.addEventListener("click",()=>{o("share_completed",{method:"twitter",url:t.url})}));const d=e.querySelector("[data-share-email]");d&&(d.href=`mailto:?subject=${s}&body=${r}%0A%0A${a}`,d.addEventListener("click",()=>{o("share_completed",{method:"email",url:t.url})}))}const h="propiedadenrd_analytics_queue";function C(){let e=sessionStorage.getItem("session_id");return e||(e=`${Date.now()}-${Math.random().toString(36).substr(2,9)}`,sessionStorage.setItem("session_id",e)),e}function o(e,t={}){const a={event:e,properties:t,timestamp:new Date().toISOString(),sessionId:C(),url:window.location.href},r=x();r.push(a),localStorage.setItem(h,JSON.stringify(r)),u()}function x(){try{const e=localStorage.getItem(h);return e?JSON.parse(e):[]}catch{return[]}}async function u(){const e="http://5.161.98.140:3002",t=x();if(t.length!==0)try{const a=t.map(s=>({event_type:s.event,properties:s.properties,session_id:s.sessionId,url:s.url}));(await fetch(`${e}/api/analytics/batch`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({events:a})})).ok&&localStorage.removeItem(h)}catch{}}function _(){o("page_view",{path:window.location.pathname,referrer:document.referrer,title:document.title})}function I(e,t){o("property_view",{slug:e,title:t})}function b(e,t){o("whatsapp_click",{slug:e,agentName:t})}function q(e,t){o("phone_call",{slug:e,agentName:t})}function $(e){o("search",e)}function l(e,t=3e3){const a=document.getElementById("toast");a&&a.remove();const r=document.createElement("div");r.id="toast",r.className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in",r.textContent=e,document.body.appendChild(r),setTimeout(()=>{r.classList.add("animate-fade-out"),setTimeout(()=>r.remove(),300)},t)}function f(){v(),y(),_(),document.querySelectorAll("[data-favorite-btn]").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation();const a=e.getAttribute("data-property-slug"),r=e.getAttribute("data-property-title")||"",s=e.getAttribute("data-property-image")||"",n=parseFloat(e.getAttribute("data-property-price")||"0"),i=e.getAttribute("data-property-currency")||"USD",c=e.getAttribute("data-property-location")||"";a&&k({slug:a,title:r,image:s,price:n,currency:i,location:c})})}),document.querySelectorAll("[data-share-btn]").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const a=e.getAttribute("data-share-title")||document.title,r=e.getAttribute("data-share-text")||"",s=e.getAttribute("data-share-url")||window.location.href;E({title:a,text:r,url:s})})}),document.querySelectorAll("[data-whatsapp-btn]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-property-slug")||"",a=e.getAttribute("data-agent-name")||"";b(t,a)})}),document.querySelectorAll("[data-phone-btn]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-property-slug")||"",a=e.getAttribute("data-agent-name")||"";q(t,a)})}),setInterval(u,3e4),window.addEventListener("beforeunload",u)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",f):f();window.trackEvent=o;window.trackPropertyView=I;window.trackWhatsAppClick=b;window.trackSearch=$;window.showToast=l;
