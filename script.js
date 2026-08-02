/* ============================================================
   Noor Computer Shop — Static Website
   Shared script: navbar, reveal, products filters, forms
   ============================================================ */

/* ---------- Mobile nav toggle ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => menu.classList.toggle("open"));
    menu.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => menu.classList.remove("open"))
    );
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Products page ---------- */
  if (document.body.dataset.page === "products") initProducts();
  /* ---------- Contact page ---------- */
  if (document.body.dataset.page === "contact") initContact();
  /* ---------- Home featured grid ---------- */
  if (document.body.dataset.page === "home") initFeatured();
  /* ---------- Newsletter ---------- */
  initNewsletter();
});

/* ---------- Data ---------- */
const categories = [
  { id: "laptops", name: "Laptops", emoji: "💻", g: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(6,182,212,0.1))" },
  { id: "desktops", name: "Desktop PCs", emoji: "🖥️", g: "linear-gradient(135deg, rgba(79,70,229,0.2), rgba(59,130,246,0.1))" },
  { id: "gaming", name: "Gaming PCs", emoji: "🎮", g: "linear-gradient(135deg, rgba(217,70,239,0.2), rgba(168,85,247,0.1))" },
  { id: "parts", name: "Computer Parts", emoji: "🔧", g: "linear-gradient(135deg, rgba(8,145,178,0.2), rgba(20,184,166,0.1))" },
  { id: "monitors", name: "Monitors", emoji: "🖥️", g: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(59,130,246,0.1))" },
  { id: "keyboards", name: "Keyboards", emoji: "⌨️", g: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(99,102,241,0.1))" },
  { id: "mouse", name: "Mouse", emoji: "🖱️", g: "linear-gradient(135deg, rgba(225,29,72,0.2), rgba(236,72,153,0.1))" },
  { id: "printers", name: "Printers", emoji: "🖨️", g: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(34,197,94,0.1))" },
  { id: "networking", name: "Networking", emoji: "📡", g: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(249,115,22,0.1))" },
  { id: "accessories", name: "Accessories", emoji: "🎧", g: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(99,102,241,0.1))" },
];

const brands = ["Apple","Dell","HP","Lenovo","ASUS","Acer","MSI","Samsung","Logitech","Intel","AMD","NVIDIA"];

const gradients = [
  "linear-gradient(135deg, rgba(37,99,235,0.3), rgba(6,182,212,0.1))",
  "linear-gradient(135deg, rgba(79,70,229,0.3), rgba(59,130,246,0.1))",
  "linear-gradient(135deg, rgba(217,70,239,0.3), rgba(168,85,247,0.1))",
  "linear-gradient(135deg, rgba(8,145,178,0.3), rgba(20,184,166,0.1))",
  "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(99,102,241,0.1))",
  "linear-gradient(135deg, rgba(225,29,72,0.3), rgba(236,72,153,0.1))",
  "linear-gradient(135deg, rgba(14,165,233,0.3), rgba(59,130,246,0.1))",
  "linear-gradient(135deg, rgba(16,185,129,0.3), rgba(34,197,94,0.1))",
  "linear-gradient(135deg, rgba(245,158,11,0.3), rgba(249,115,22,0.1))",
];

const products = [
  { id:"p1", name:'MacBook Pro 16" M3 Max', brand:"Apple", category:"laptops", price:2499, oldPrice:2799, rating:4.9, reviews:412, badge:"Best Seller", g:0, emoji:"💻" },
  { id:"p2", name:"Dell XPS 15 OLED", brand:"Dell", category:"laptops", price:1899, oldPrice:2099, rating:4.7, reviews:233, badge:"", g:1, emoji:"💻" },
  { id:"p3", name:"HP Spectre x360 14", brand:"HP", category:"laptops", price:1499, oldPrice:null, rating:4.6, reviews:188, badge:"New", g:2, emoji:"💻" },
  { id:"p4", name:"Lenovo ThinkPad X1 Carbon", brand:"Lenovo", category:"laptops", price:1659, oldPrice:1799, rating:4.8, reviews:301, badge:"", g:3, emoji:"💻" },
  { id:"p5", name:"HP Pavilion Desktop", brand:"HP", category:"desktops", price:749, oldPrice:829, rating:4.4, reviews:156, badge:"", g:4, emoji:"🖥️" },
  { id:"p6", name:"Dell Inspiron Desktop", brand:"Dell", category:"desktops", price:699, oldPrice:null, rating:4.3, reviews:142, badge:"", g:5, emoji:"🖥️" },
  { id:"p7", name:"Lenovo IdeaCentre 5", brand:"Lenovo", category:"desktops", price:629, oldPrice:699, rating:4.2, reviews:98, badge:"", g:6, emoji:"🖥️" },
  { id:"p8", name:"MSI Infinite RS 13th", brand:"MSI", category:"gaming", price:2399, oldPrice:2699, rating:4.8, reviews:274, badge:"Hot", g:2, emoji:"🎮" },
  { id:"p9", name:"ASUS ROG Strix G16", brand:"ASUS", category:"gaming", price:1799, oldPrice:1999, rating:4.7, reviews:190, badge:"", g:7, emoji:"🎮" },
  { id:"p10", name:"Acer Predator Orion 7000", brand:"Acer", category:"gaming", price:2199, oldPrice:null, rating:4.5, reviews:121, badge:"", g:8, emoji:"🎮" },
  { id:"p11", name:"NVIDIA GeForce RTX 4080 Super", brand:"NVIDIA", category:"parts", price:999, oldPrice:1099, rating:4.9, reviews:520, badge:"Top Rated", g:0, emoji:"🔧" },
  { id:"p12", name:"AMD Ryzen 9 7950X", brand:"AMD", category:"parts", price:599, oldPrice:649, rating:4.8, reviews:410, badge:"", g:3, emoji:"🔧" },
  { id:"p13", name:"Intel Core i9-14900K", brand:"Intel", category:"parts", price:579, oldPrice:null, rating:4.7, reviews:305, badge:"", g:1, emoji:"🔧" },
  { id:"p14", name:"Samsung 990 Pro 2TB NVMe", brand:"Samsung", category:"parts", price:169, oldPrice:199, rating:4.9, reviews:678, badge:"Deal", g:6, emoji:"🔧" },
  { id:"p15", name:'Samsung Odyssey G9 49"', brand:"Samsung", category:"monitors", price:1299, oldPrice:1499, rating:4.7, reviews:213, badge:"Best Seller", g:2, emoji:"🖥️" },
  { id:"p16", name:"ASUS ROG Swift PG279QM", brand:"ASUS", category:"monitors", price:749, oldPrice:null, rating:4.6, reviews:167, badge:"", g:7, emoji:"🖥️" },
  { id:"p17", name:"Dell UltraSharp U2723QE 4K", brand:"Dell", category:"monitors", price:599, oldPrice:679, rating:4.8, reviews:289, badge:"", g:4, emoji:"🖥️" },
  { id:"p18", name:"Logitech G Pro X Mechanical", brand:"Logitech", category:"keyboards", price:149, oldPrice:169, rating:4.7, reviews:445, badge:"", g:0, emoji:"⌨️" },
  { id:"p19", name:"ASUS ROG Strix Scope II", brand:"ASUS", category:"keyboards", price:179, oldPrice:null, rating:4.6, reviews:132, badge:"New", g:5, emoji:"⌨️" },
  { id:"p20", name:"Logitech G502 X Plus", brand:"Logitech", category:"mouse", price:159, oldPrice:null, rating:4.8, reviews:612, badge:"Best Seller", g:6, emoji:"🖱️" },
  { id:"p21", name:"Razer DeathAdder V3 Pro", brand:"MSI", category:"mouse", price:149, oldPrice:169, rating:4.7, reviews:388, badge:"", g:2, emoji:"🖱️" },
  { id:"p22", name:"HP LaserJet Pro M404", brand:"HP", category:"printers", price:229, oldPrice:279, rating:4.5, reviews:174, badge:"", g:7, emoji:"🖨️" },
  { id:"p23", name:"Canon PIXMA TR8620", brand:"HP", category:"printers", price:179, oldPrice:null, rating:4.3, reviews:96, badge:"", g:8, emoji:"🖨️" },
  { id:"p24", name:"ASUS RT-AX86U Router", brand:"ASUS", category:"networking", price:249, oldPrice:299, rating:4.7, reviews:521, badge:"Deal", g:1, emoji:"📡" },
  { id:"p25", name:"Netgear Nighthawk RAXE500", brand:"MSI", category:"networking", price:399, oldPrice:null, rating:4.5, reviews:143, badge:"", g:3, emoji:"📡" },
  { id:"p26", name:"Logitech G Pro X Headset", brand:"Logitech", category:"accessories", price:129, oldPrice:149, rating:4.6, reviews:388, badge:"", g:0, emoji:"🎧" },
  { id:"p27", name:"Samsung T7 1TB Portable SSD", brand:"Samsung", category:"accessories", price:99, oldPrice:119, rating:4.8, reviews:740, badge:"Deal", g:6, emoji:"💾" },
  { id:"p28", name:"Anker 100W USB-C Charger", brand:"Samsung", category:"accessories", price:59, oldPrice:null, rating:4.7, reviews:510, badge:"", g:4, emoji:"🔌" },
];

const fmt = (n) => "$" + n.toLocaleString("en-US");

function cardHTML(p) {
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  return `
    <article class="card reveal">
      <a href="products.html" class="card-media">
        <div class="grad" style="background:${gradients[p.g]}"></div>
        <div class="grid-bg"></div>
        <div class="emoji">${p.emoji}</div>
        <div class="badges">
          ${p.badge ? `<span class="badge primary">${p.badge}</span>` : ""}
          ${discount > 0 ? `<span class="badge discount">-${discount}%</span>` : ""}
        </div>
        <button class="wish-btn" onclick="event.preventDefault();this.classList.toggle('active')">♥</button>
      </a>
      <div class="card-body">
        <p class="card-brand">${p.brand}</p>
        <a href="products.html" class="card-name">${p.name}</a>
        <div class="rating"><span class="star">★</span><span>${p.rating} (${p.reviews})</span></div>
        <div class="card-foot">
          <div><span class="price">${fmt(p.price)}</span>${p.oldPrice ? `<span class="old-price">${fmt(p.oldPrice)}</span>` : ""}</div>
          <button class="add-btn" onclick="added(this)" title="Add to cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </button>
        </div>
      </div>
    </article>`;
}

function added(btn) {
  const orig = btn.innerHTML;
  btn.innerHTML = "✓";
  setTimeout(() => (btn.innerHTML = orig), 900);
}

/* ---------- Home featured ---------- */
function initFeatured() {
  const el = document.getElementById("featuredGrid");
  if (el) {
    const ids = ["p1","p8","p11","p15","p20","p5"];
    el.innerHTML = ids.map(id => cardHTML(products.find(p => p.id === id))).join("");
    el.querySelectorAll(".reveal").forEach((c) => c.classList.add("in"));
  }
}

/* ---------- Products page ---------- */
function initProducts() {
  const state = { cats: [], brands: [], priceMax: 3000, sort: "featured", search: "" };
  const byId = (id) => document.getElementById(id);
  const toggleArr = (arr, v) => { const i = arr.indexOf(v); if (i === -1) arr.push(v); else arr.splice(i, 1); };

  // preselect category from ?category=
  const params = new URLSearchParams(location.search);
  if (params.get("category")) state.cats = [params.get("category")];
  if (params.get("search")) { state.search = params.get("search"); byId("search").value = state.search; }

  function filtersHTML(targetId) {
    return `
      <div class="filter-group">
        <h3>Categories</h3>
        <div class="filter-list">
          ${categories.map(c => `<label><input type="checkbox" value="${c.id}" data-kind="cat" ${state.cats.includes(c.id) ? "checked" : ""}/><span>${c.name}</span></label>`).join("")}
        </div>
      </div>
      <div class="filter-group">
        <h3>Brands</h3>
        <div class="filter-list">
          ${brands.map(b => `<label><input type="checkbox" value="${b}" data-kind="brand" ${state.brands.includes(b) ? "checked" : ""}/><span>${b}</span></label>`).join("")}
        </div>
      </div>
      <div class="filter-group">
        <h3>Max Price</h3>
        <input type="range" class="range-input" min="50" max="3000" step="50" value="${state.priceMax}" data-kind="price"/>
        <div class="range-labels"><span>$50</span><span class="max">$${state.priceMax.toLocaleString()}</span></div>
      </div>
      <button class="clear-btn" data-kind="clear">Clear Filters</button>`;
  }

  function bindFilters(targetId) {
    const el = byId(targetId);
    el.querySelectorAll('input[type=checkbox]').forEach(cb =>
      cb.addEventListener("change", (e) => {
        if (e.target.dataset.kind === "cat") toggleArr(state.cats, e.target.value);
        if (e.target.dataset.kind === "brand") toggleArr(state.brands, e.target.value);
        renderFilters(); render();
      })
    );
    el.querySelector('.range-input').addEventListener("input", (e) => { state.priceMax = Number(e.target.value); renderFilters(); render(); });
    el.querySelector('[data-kind=clear]').addEventListener("click", () => {
      state.cats = []; state.brands = []; state.priceMax = 3000; state.search = "";
      byId("search").value = ""; renderFilters(); render();
    });
  }
  function renderFilters() {
    ["filterPanel", "filterPanelMobile"].forEach((id) => { byId(id).innerHTML = filtersHTML(id); bindFilters(id); });
  }

  function getFiltered() {
    let list = products.filter(p => {
      const cOk = !state.cats.length || state.cats.includes(p.category);
      const bOk = !state.brands.length || state.brands.includes(p.brand);
      const pOk = p.price <= state.priceMax;
      const s = state.search.toLowerCase();
      const sOk = !s || p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s);
      return cOk && bOk && pOk && sOk;
    });
    if (state.sort === "price-asc") list = list.slice().sort((a,b) => a.price - b.price);
    else if (state.sort === "price-desc") list = list.slice().sort((a,b) => b.price - a.price);
    else if (state.sort === "rating") list = list.slice().sort((a,b) => b.rating - a.rating);
    return list;
  }

  function render() {
    const list = getFiltered();
    byId("count").textContent = `${list.length} product${list.length !== 1 ? "s" : ""} found`;
    byId("grid").innerHTML = list.length
      ? list.map(cardHTML).join("")
      : `<div class="empty"><p>No products match your filters.</p><a href="products.html" onclick="clearAll();return false;">Clear filters</a></div>`;
  }
  window.clearAll = () => {
    state.cats = []; state.brands = []; state.priceMax = 3000; state.search = "";
    byId("search").value = ""; renderFilters(); render();
  };

  byId("search").addEventListener("input", (e) => { state.search = e.target.value; render(); });
  byId("sort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });
  byId("filterToggle").addEventListener("click", () => byId("drawer").classList.add("open"));
  byId("drawerClose").addEventListener("click", () => byId("drawer").classList.remove("open"));
  byId("drawerCloseBtn").addEventListener("click", () => byId("drawer").classList.remove("open"));

  renderFilters();
  render();
}

/* ---------- Contact form ---------- */
function initContact() {
  const form = document.getElementById("contactForm");
  const ok = document.getElementById("formOk");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.reset();
    ok.style.display = "flex";
    setTimeout(() => (ok.style.display = "none"), 6000);
  });
}

/* ---------- Newsletter ---------- */
function initNewsletter() {
  document.querySelectorAll(".news-form").forEach((f) => {
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      f.reset();
      alert("Subscribed! Thanks for joining the Noor newsletter.");
    });
  });
}
