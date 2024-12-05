function animateProgressBar(e,t,n){const a=document.querySelector(e);a.style.setProperty("--progress-width",`${t}%`);const i=a.querySelector("::after");i&&(i.style.animationDuration=`${n}s`);const o=a.querySelector(".Mini-square");o&&(o.style.animationDuration=`${n}s`)}function animateToPercentage(e,t,n=2e3){const a=document.querySelector(e);let i=0;const o=t/n*10;!function e(){i=Math.min(i+o,t),a.style.setProperty("--dynamic-gradient",`conic-gradient(#26a69a 0% ${i}%, #e0e0e0 ${i}% 100%)`),i<t&&setTimeout(e,10)}()}function calculateDotPosition(e,t){const n=(t-90)*(Math.PI/180);return{x:e*Math.cos(n),y:e*Math.sin(n)}}function animateDiagram(e,t,n=2e3){const a=document.querySelector(e),i=a.querySelector(".end-dot");let o=0;const s=t/n*10,c=a.offsetWidth/2.1;!function e(){o=Math.min(o+s,t);const n=o/100*360;a.style.setProperty("--dynamic-gradient",`conic-gradient(#26a69a 0% ${o}%, #e0e0e0 ${o}% 100%)`);const{x:d,y:r}=calculateDotPosition(c,n);i.style.transform=`translate(${d}px, ${r}px)`,o<t&&setTimeout(e,10)}()}document.addEventListener("DOMContentLoaded",(()=>{animateProgressBar(".Adobe-Photoshop",15,3),animateProgressBar(".Adobe-Illustrator",16,3),animateProgressBar(".Microsoft-Word",13,3),animateProgressBar(".Microsoft-Powerpoint",20,3)})),document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelectorAll(".Job-Experience, .Education, .References, .Skills, .Hobbies, .About-Me, .Languages");e.forEach((e=>{e.classList.add("hidden")}));const t=()=>{e.forEach((e=>{const t=e.getBoundingClientRect(),n=window.innerHeight;t.top<n-100&&(e.classList.add("visible"),e.classList.remove("hidden"))}))};window.addEventListener("scroll",t),t()})),document.addEventListener("DOMContentLoaded",(()=>{animateToPercentage(".English-Diagram",93),animateToPercentage(".German-Diagram",60),animateToPercentage(".Spanish-Diagram",50)})),document.addEventListener("DOMContentLoaded",(()=>{animateDiagram(".English-Diagram",93),animateDiagram(".German-Diagram",60),animateDiagram(".Spanish-Diagram",50)})),document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelector(".Job-Experience"),t=document.querySelector(".Education");!function(){const n=new XMLHttpRequest;n.open("GET","./data.json",!0),n.onload=function(){if(200===n.status)try{const a=JSON.parse(n.responseText);a.jobExperience.forEach((t=>{const n=document.createElement("div");n.classList.add("Job-Block"),n.innerHTML=`\n        <div class="Job-Title"><h2>${t.title}</h2></div>\n        <div class="Job-Subtitle1">${t.company} <span class="city">${t.location}</span></div>\n        <div class="Job-Subtitle2">\n          <p>${t.description}</p>\n        </div>\n        <div class="Years-1"><div class="First-Date">${t.years}</div></div>\n      `,e.appendChild(n)})),a.education.forEach((e=>{const n=document.createElement("div");n.classList.add("Education-Block"),n.innerHTML=`\n        <div class="Education-Title"><h2>${e.title}</h2></div>\n        <div class="Education-Subtitle1">${e.institution}</div>\n        <div class="Education-Subtitle2">\n          <p>${e.description}</p>\n        </div>\n        <div class="Years-2"><div class="First-Date">${e.years}</div></div>\n      `,t.appendChild(n)}))}catch(e){console.error("Помилка обробки даних:",e)}else console.error("Помилка завантаження даних:",n.status)},n.send()}()})),document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelector(".Job-Experience"),t=document.querySelector(".Education");!async function(){try{const n=await fetch(`./data/data.json?t=${(new Date).getTime()}`);if(!n.ok)throw new Error(`HTTP помилка! Статус: ${n.status}`);const a=await n.json();a.jobExperience.forEach((t=>{const n=document.createElement("div");n.classList.add("Job-Block"),n.innerHTML=`\n        <div class="Job-Title"><h2>${t.title}</h2></div>\n        <div class="Job-Subtitle1">${t.company} <span class="city">${t.location}</span></div>\n        <div class="Job-Subtitle2">\n          <p>${t.description}</p>\n        </div>\n        <div class="Years-1"><div class="First-Date">${t.years}</div></div>\n      `,e.appendChild(n)})),a.education.forEach((e=>{const n=document.createElement("div");n.classList.add("Education-Block"),n.innerHTML=`\n        <div class="Education-Title"><h2>${e.title}</h2></div>\n        <div class="Education-Subtitle1">${e.institution}</div>\n        <div class="Education-Subtitle2">\n          <p>${e.description}</p>\n        </div>\n        <div class="Years-2"><div class="First-Date">${e.years}</div></div>\n      `,t.appendChild(n)}))}catch(e){console.error("Помилка отримання або обробки даних:",e)}}()}));