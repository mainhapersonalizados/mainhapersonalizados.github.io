// ===== CONFIGURAÇÃO DA EMPRESA =====
const CONFIG = {
  // WhatsApp com DDI + DDD + número, só dígitos.
  whatsapp: "5583998459265",
  // Perfil do Instagram, sem @. Vazio = botão fica oculto.
  instagram: "mainha_personalizados",
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const money = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const waUrl = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

const PH_ICON = `<svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true"><rect x="6" y="9" width="36" height="30" rx="5" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="17" cy="20" r="3.5" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M8 35l10-9 8 7 6-5 10 8" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>`;
const placeholder = (label = "Foto em breve") => `<div class="ph">${PH_ICON}<span>${esc(label)}</span></div>`;

// ---------- Links de contato ----------
$$("[data-wa]").forEach((el) => {
  el.href = waUrl(el.dataset.wa);
  el.target = "_blank";
  el.rel = "noopener";
});
$$("[data-instagram]").forEach((el) => {
  if (!CONFIG.instagram) { el.hidden = true; return; }
  el.href = `https://instagram.com/${CONFIG.instagram}`;
  el.target = "_blank";
  el.rel = "noopener";
});

// ---------- Menu mobile ----------
const toggle = $("#menuToggle");
const nav = $("#nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});
nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// ---------- Vitrine de categorias ----------
function categoryCard(cat) {
  const from = categoryFromPrice(cat);
  const img = cat.img ? `<img src="${cat.img}" alt="" loading="lazy">` : placeholder(cat.title);
  const tag = cat.kind === "grafico" ? `<span class="tag tag-graf">Serviço gráfico</span>` : "";
  const price = from != null
    ? `<span class="from">a partir de <strong>${money(from)}</strong></span>`
    : `<span class="badge-quote">Sob orçamento</span>`;
  return `
    <button class="card" type="button" data-cat="${cat.id}" aria-label="Ver produtos de ${esc(cat.title)}">
      <div class="card-img">${img}${tag}</div>
      <div class="card-body">
        <h3>${esc(cat.title)}</h3>
        <p>${esc(cat.blurb)}</p>
        <div class="card-foot">${price}<span class="link-cta">Ver produtos →</span></div>
      </div>
    </button>`;
}

$("#gridPriced").innerHTML = CATEGORIES.filter(categoryPriced).map(categoryCard).join("");
$("#gridQuote").innerHTML = CATEGORIES.filter((c) => !categoryPriced(c)).map(categoryCard).join("");

$("#graficoChips").innerHTML = CATEGORIES.filter((c) => c.kind === "grafico").map((c) => `
  <button type="button" class="chip" data-cat="${c.id}">${esc(c.title)}</button>`).join("");

// ---------- Janela da categoria ----------
const catDialog = $("#catDialog");
const catBody = $("#catBody");

function productCard(p) {
  const hasVariants = !!p.variants;
  const min = p.min || 1;
  const priced = productPrices(p).length > 0;
  const img = p.img ? `<img src="${p.img}" alt="${esc(p.name)}" loading="lazy">` : placeholder();
  const variantSelect = hasVariants
    ? `<label class="sr-only" for="v-${p.id}">Opção</label>
       <select class="variant" id="v-${p.id}">${p.variants.map((v, i) => `<option value="${i}">${esc(v.label)}${v.price != null ? " — " + money(v.price) : ""}</option>`).join("")}</select>`
    : "";
  const first = hasVariants ? p.variants[0].price : p.price;
  const priceLine = priced
    ? `<div class="price"><strong data-price>${money(first)}</strong> <small>${p.unit ? "por " + esc(p.unit) : "cada"}</small></div>`
    : `<div class="price"><span class="badge-quote">Sob orçamento</span></div>`;
  const quoteNote = priced ? "" : `<p class="quote-note">Pode adicionar ao carrinho. O valor será informado após o orçamento.</p>`;
  const minNote = min > 1 ? `<p class="min-note">Pedido mínimo: ${min} ${p.unit && /pacote/.test(p.unit) ? "pacotes" : "unidades"}</p>` : "";
  return `
    <article class="prod" data-pid="${p.id}">
      <div class="prod-img">${img}</div>
      <div class="prod-info">
        <h4>${esc(p.name)}</h4>
        <p class="desc">${esc(p.desc)}</p>
        ${minNote}
        ${priceLine}
        ${quoteNote}
        <div class="prod-actions">
          ${variantSelect}
          <div class="qty" role="group" aria-label="Quantidade">
            <button type="button" data-qty="-1" aria-label="Diminuir">−</button>
            <input type="number" class="qty-input" value="${min}" min="${min}" inputmode="numeric" aria-label="Quantidade">
            <button type="button" data-qty="1" aria-label="Aumentar">+</button>
          </div>
          <button type="button" class="btn btn-primary btn-small" data-add>Adicionar ao carrinho</button>
        </div>
      </div>
    </article>`;
}

function openCategory(id) {
  const cat = CATEGORIES.find((c) => c.id === id);
  if (!cat) return;
  $("#catTitle").textContent = cat.title;
  $("#catBlurb").textContent = cat.blurb;
  let html = "";
  let lastGroup = null;
  cat.products.forEach((p) => {
    if (p.group && p.group !== lastGroup) html += `<h3 class="group-title">${esc(p.group)}</h3>`;
    lastGroup = p.group || null;
    html += productCard(p);
  });
  if (!categoryPriced(cat)) {
    html = `<div class="notice">Estes itens são feitos sob medida. Você pode adicioná-los ao carrinho; o valor será informado depois do orçamento e o total do carrinho será atualizado.</div>` + html;
  }
  catBody.innerHTML = html;
  catBody.scrollTop = 0;
  if (!catDialog.open) catDialog.showModal();
}

function findProduct(pid) {
  for (const c of CATEGORIES) {
    const p = c.products.find((x) => x.id === pid);
    if (p) return { cat: c, product: p };
  }
  return null;
}

document.addEventListener("click", (e) => {
  const trigger = e.target.closest("[data-cat]");
  if (trigger) openCategory(trigger.dataset.cat);
});

catBody.addEventListener("change", (e) => {
  if (!e.target.classList.contains("variant")) return;
  const card = e.target.closest(".prod");
  const { product } = findProduct(card.dataset.pid);
  const v = product.variants[Number(e.target.value)];
  const el = $("[data-price]", card);
  if (el && v.price != null) el.textContent = money(v.price);
});

catBody.addEventListener("click", (e) => {
  const card = e.target.closest(".prod");
  if (!card) return;
  const input = $(".qty-input", card);
  const { product } = findProduct(card.dataset.pid);
  const min = product.min || 1;

  const step = e.target.closest("[data-qty]");
  if (step) {
    input.value = Math.max(min, (parseInt(input.value, 10) || min) + Number(step.dataset.qty));
    return;
  }
  if (e.target.closest("[data-add]")) {
    const qty = Math.max(min, parseInt(input.value, 10) || min);
    const select = $(".variant", card);
    addToCart(product.id, select ? Number(select.value) : 0, qty);
    input.value = min; // volta para a quantidade inicial (1, ou o mínimo do produto)
  }
});

$("#catClose").addEventListener("click", () => catDialog.close());
[catDialog].forEach((d) => d.addEventListener("click", (e) => { if (e.target === d) d.close(); }));

// ---------- Carrinho ----------
const STORAGE_KEY = "mainha-carrinho-v1";
let cart = [];
try { cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (_) { cart = []; }

function saveCart() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (_) { /* sem armazenamento */ }
}

// Reconstrói os dados do item a partir do catálogo, assim preços sempre estão atualizados
function hydrate(item) {
  const found = findProduct(item.pid);
  if (!found) return null;
  const p = found.product;
  const v = p.variants ? p.variants[item.variant] || p.variants[0] : null;
  return {
    ...item,
    name: p.name,
    variantLabel: v ? v.label : "",
    price: v ? v.price : p.price,
    min: p.min || 1,
    unit: p.unit || "",
    img: p.img || (found.cat.img || null),
  };
}

function addToCart(pid, variant, qty) {
  const key = `${pid}|${variant}`;
  const existing = cart.find((i) => i.key === key);
  if (existing) existing.qty += qty;
  else cart.push({ key, pid, variant, qty });
  saveCart();
  renderCart();
  const item = hydrate({ pid, variant });
  const opt = item.variantLabel && item.variantLabel.startsWith("Premium") ? " (Premium)" : "";
  showToast(`Adicionado ao carrinho: ${qty}x ${item.name}${opt}`);
}

function cartItems() {
  return cart.map((i) => ({ ...hydrate(i), key: i.key, qty: i.qty })).filter((i) => i.name);
}

const cartDialog = $("#cartDialog");
const cartCount = $("#cartCount");
const cartList = $("#cartList");

function itemRow(i) {
  const line = i.price != null ? money(i.price * i.qty) : "A orçar";
  const unit = i.unit ? ` (${esc(i.unit)})` : "";
  return `
    <li class="cart-item" data-key="${esc(i.key)}">
      <div class="ci-thumb">${i.img ? `<img src="${i.img}" alt="">` : placeholder("")}</div>
      <div class="ci-main">
        <strong>${esc(i.name)}</strong>
        ${i.variantLabel ? `<small>${esc(i.variantLabel)}</small>` : ""}
        <small>${i.price != null ? money(i.price) + unit + " cada" : "Valor sob orçamento"}</small>
        <div class="ci-controls">
          <div class="qty" role="group" aria-label="Quantidade">
            <button type="button" data-ci="-1" aria-label="Diminuir">−</button>
            <input type="number" class="qty-input" value="${i.qty}" min="${i.min}" inputmode="numeric" aria-label="Quantidade">
            <button type="button" data-ci="1" aria-label="Aumentar">+</button>
          </div>
          <button type="button" class="ci-remove" data-remove>Remover</button>
        </div>
      </div>
      <div class="ci-total ${i.price == null ? "is-quote" : ""}">${line}</div>
    </li>`;
}

function renderCart() {
  const items = cartItems();
  const priced = items.filter((i) => i.price != null);
  const quoted = items.filter((i) => i.price == null);
  cartCount.textContent = items.length;
  cartCount.hidden = items.length === 0;

  $("#cartEmpty").hidden = items.length > 0;
  $("#cartFilled").hidden = items.length === 0;

  $("#cartPriced").hidden = priced.length === 0;
  $("#cartPricedList").innerHTML = priced.map(itemRow).join("");
  $("#cartQuoted").hidden = quoted.length === 0;
  $("#cartQuotedList").innerHTML = quoted.map(itemRow).join("");

  const subtotal = priced.reduce((s, i) => s + i.price * i.qty, 0);
  $("#cartSubtotal").textContent = money(subtotal);
  $("#cartTotalNote").hidden = quoted.length === 0;
  $("#cartTotalLabel").textContent = quoted.length ? "Subtotal dos itens com valor" : "Total";
}

function updateQty(key, qty) {
  const item = cart.find((i) => i.key === key);
  if (!item) return;
  const min = hydrate(item).min;
  item.qty = Math.max(min, qty || min);
  saveCart();
  renderCart();
}

cartDialog.addEventListener("click", (e) => {
  if (e.target === cartDialog) { cartDialog.close(); return; }
  const row = e.target.closest(".cart-item");
  if (!row) return;
  const key = row.dataset.key;
  const item = cart.find((i) => i.key === key);
  const step = e.target.closest("[data-ci]");
  if (step && item) updateQty(key, item.qty + Number(step.dataset.ci));
  if (e.target.closest("[data-remove]")) {
    cart = cart.filter((i) => i.key !== key);
    saveCart();
    renderCart();
  }
});
cartDialog.addEventListener("change", (e) => {
  if (!e.target.classList.contains("qty-input")) return;
  const row = e.target.closest(".cart-item");
  updateQty(row.dataset.key, parseInt(e.target.value, 10));
});

function openCart() {
  if (catDialog.open) catDialog.close();
  renderCart();
  if (!cartDialog.open) cartDialog.showModal();
}
$$("[data-open-cart]").forEach((b) => b.addEventListener("click", openCart));
$("#cartClose").addEventListener("click", () => cartDialog.close());
$$("[data-close-cart]").forEach((b) => b.addEventListener("click", () => cartDialog.close()));
$("#cartClear").addEventListener("click", () => {
  cart = [];
  saveCart();
  renderCart();
});

// Envio do pedido pelo WhatsApp
const orderForm = $("#orderForm");
orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = orderForm.elements;
  const nameOk = f.nome.value.trim() !== "";
  f.nome.classList.toggle("is-invalid", !nameOk);
  $("#orderError").hidden = nameOk;
  if (!nameOk) { f.nome.focus(); return; }

  const items = cartItems();
  const priced = items.filter((i) => i.price != null);
  const quoted = items.filter((i) => i.price == null);
  const line = (i) => {
    const opt = i.variantLabel ? ` (${i.variantLabel})` : "";
    return `• ${i.qty}x ${i.name}${opt}`;
  };

  const out = ["Olá! Gostaria de fazer um pedido pelo site da Mainha Personalizados.", ""];
  out.push(`*Nome:* ${f.nome.value.trim()}`);
  if (f.data.value) {
    const [a, m, d] = f.data.value.split("-");
    out.push(`*Data da festa/entrega:* ${d}/${m}/${a}`);
  }
  if (f.tema.value.trim()) out.push(`*Tema ou ocasião:* ${f.tema.value.trim()}`);

  if (priced.length) {
    out.push("", "*ITENS COM VALOR*");
    priced.forEach((i) => out.push(`${line(i)} = ${money(i.price * i.qty)}`));
    out.push(`*${quoted.length ? "Subtotal" : "Total"}:* ${money(priced.reduce((s, i) => s + i.price * i.qty, 0))}`);
  }
  if (quoted.length) {
    out.push("", "*ITENS SOB ORÇAMENTO* (valor a definir)");
    quoted.forEach((i) => out.push(line(i)));
    out.push("", "_Obs.: o total do pedido será atualizado após o orçamento dos itens personalizados._");
  }
  if (f.obs.value.trim()) out.push("", `*Observações:* ${f.obs.value.trim()}`);

  window.open(waUrl(out.join("\n")), "_blank", "noopener");
});

// ---------- Aviso rápido ----------
// O aviso é um popover: fica na camada mais alta, acima das janelas abertas
const toast = $("#toast");
let toastTimer;
function hideToast() {
  clearTimeout(toastTimer);
  if (toast.matches(":popover-open")) toast.hidePopover();
}
function showToast(msg) {
  $("#toastMsg").textContent = msg;
  if (!toast.matches(":popover-open")) toast.showPopover();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 4000);
}
$("#toastCart").addEventListener("click", () => { hideToast(); openCart(); });

// Logo: volta ao topo da página
$(".brand").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", location.pathname + location.search);
});

// ---------- Galeria (lightbox) ----------
const lb = $("#lightbox");
const lbImg = $("#lbImg");
const lbCap = $("#lbCap");
const closeLb = () => { lb.hidden = true; lbImg.src = ""; };
$$(".g-item").forEach((item) => {
  item.addEventListener("click", () => {
    lbImg.src = item.dataset.full;
    lbImg.alt = item.dataset.cap;
    lbCap.textContent = item.dataset.cap;
    lb.hidden = false;
  });
});
lb.addEventListener("click", (e) => { if (e.target !== lbImg) closeLb(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) closeLb(); });

// ---------- Rodapé ----------
$("#ano").textContent = new Date().getFullYear();
renderCart();
