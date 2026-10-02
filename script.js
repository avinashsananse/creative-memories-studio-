const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");
if(menuToggle) menuToggle.addEventListener("click",()=>{mainNav.classList.toggle("active");menuToggle.textContent=mainNav.classList.contains("active")?"✕":"☰";});
$$(".main-nav a").forEach(a=>a.addEventListener("click",()=>{mainNav.classList.remove("active");menuToggle.textContent="☰";}));

function renderPortfolio(){
  const grid=$("#portfolioGrid"); if(!grid||!window.PORTFOLIO_DATA)return;
  grid.innerHTML=window.PORTFOLIO_DATA.map((x,i)=>`<article class="portfolio-card"><img src="${x.image}" alt="${x.title}" loading="lazy"><div class="info"><h3>${x.title}</h3><p>${x.description}</p></div></article>`).join("");
}
function renderServices(){
  const grid=$("#servicesGrid"); if(!grid||!window.SERVICES_DATA)return;
  grid.innerHTML=window.SERVICES_DATA.map((x,i)=>`<article class="service-card"><div class="service-number">${String(i+1).padStart(2,"0")}</div><h3>${x.title}</h3><p>${x.description}</p></article>`).join("");
}
function renderTypes(){
  const grid=$("#typesGrid"); if(!grid||!window.SHOOT_TYPES)return;
  const q=($("#typeSearch")?.value||"").toLowerCase().trim();
  const items=window.SHOOT_TYPES.filter(x=>x.toLowerCase().includes(q));
  grid.innerHTML=items.map(x=>`<div class="type-item">${x}</div>`).join("");
}
renderPortfolio();renderServices();renderTypes();
$("#typeSearch")?.addEventListener("input",renderTypes);

const modal=$("#modal");
function openModal(title,text){$("#modalTitle").textContent=title;$("#modalText").textContent=text;modal.classList.add("active");modal.setAttribute("aria-hidden","false")}
function closeModal(){modal.classList.remove("active");modal.setAttribute("aria-hidden","true")}
$("#modalClose")?.addEventListener("click",closeModal);
modal?.addEventListener("click",e=>{if(e.target===modal)closeModal()});
$$(".play-button").forEach(b=>b.addEventListener("click",()=>openModal(b.dataset.video,"Connect the actual video file or YouTube/Vimeo URL here in the media integration phase.")));
$$(".reel-play").forEach((b,i)=>b.addEventListener("click",()=>openModal(`Reel ${i+1}`,"Connect the actual reel video here in the media integration phase.")));

const testimonials=[
  ["Verified client feedback will be displayed here.","Client Testimonial"],
  ["Your real client review can be added from the CMS/backend.","Client Name"],
  ["Additional verified feedback can be managed through the admin panel.","Client Name"]
];
let ti=0;
function showTestimonial(){if($("#testimonialText"))$("#testimonialText").textContent=testimonials[ti][0];if($("#testimonialName"))$("#testimonialName").textContent=testimonials[ti][1]}
$("#prevTestimonial")?.addEventListener("click",()=>{ti=(ti-1+testimonials.length)%testimonials.length;showTestimonial()});
$("#nextTestimonial")?.addEventListener("click",()=>{ti=(ti+1)%testimonials.length;showTestimonial()});showTestimonial();

$("#bookingForm")?.addEventListener("submit",e=>{
  e.preventDefault();
  const fd=new FormData(e.currentTarget);
  const msg=`Booking enquiry\nName: ${fd.get("name")}\nPhone: ${fd.get("phone")}\nService: ${fd.get("service")}\nDate: ${fd.get("date")}\nMessage: ${fd.get("message")}`;
  openModal("Booking Enquiry Ready",msg+"\n\nBackend/API connection will submit this securely in the production phase.");
  e.currentTarget.reset();
});
$("#loginDemo")?.addEventListener("click",()=>openModal("Client Login","Secure authentication, sessions and password recovery will be connected through the backend/auth provider in the production phase."));
