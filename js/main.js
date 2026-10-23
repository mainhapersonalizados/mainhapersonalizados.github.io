// ===== CONFIGURAÇÃO DA EMPRESA =====
// Preencha com os dados reais antes de publicar.
const CONFIG = {
  // WhatsApp com DDI + DDD + número, só dígitos. Ex.: "5571999999999"
  // Vazio = o botão abre o WhatsApp para escolher o contato.
  whatsapp: "5583998459265",
  // Perfil do Instagram, sem @. Ex.: "mainhapersonalizados". Vazio = botão fica oculto.
  instagram: "mainha_personalizados",
};

// WhatsApp: monta o link com a mensagem de cada botão
document.querySelectorAll("[data-wa]").forEach((el) => {
  const text = encodeURIComponent(el.dataset.wa);
  const base = CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp}` : "https://wa.me/";
  el.href = `${base}?text=${text}`;
  el.target = "_blank";
  el.rel = "noopener";
});

// Instagram
document.querySelectorAll("[data-instagram]").forEach((el) => {
  if (!CONFIG.instagram) { el.hidden = true; return; }
  el.href = `https://instagram.com/${CONFIG.instagram}`;
  el.target = "_blank";
  el.rel = "noopener";
});

// Menu mobile
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
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

// Abas de preços
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
    });
    document.querySelectorAll(".panel").forEach((p) => {
      p.hidden = p.id !== `tab-${tab.dataset.tab}`;
    });
  });
});

// Lightbox da galeria
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
const closeLb = () => { lb.hidden = true; lbImg.src = ""; };

document.querySelectorAll(".g-item").forEach((item) => {
  item.addEventListener("click", () => {
    lbImg.src = item.dataset.full;
    lbImg.alt = item.dataset.cap;
    lbCap.textContent = item.dataset.cap;
    lb.hidden = false;
  });
});
lb.addEventListener("click", (e) => { if (e.target !== lbImg) closeLb(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) closeLb(); });

// Formulário de orçamento: monta a mensagem e abre o WhatsApp
const quoteForm = document.getElementById("quoteForm");
const quoteError = document.getElementById("quoteError");
quoteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = quoteForm.elements;
  let ok = true;
  [f.nome, f.produto, f.quantidade, f.tema].forEach((el) => {
    const bad = !el.value.trim() || (el.type === "number" && Number(el.value) < 1);
    el.classList.toggle("is-invalid", bad);
    if (bad) ok = false;
  });
  quoteError.hidden = ok;
  if (!ok) return;

  const linhas = [
    "Olá! Gostaria de um orçamento pelo site da Mainha Personalizados.",
    "",
    `*Nome:* ${f.nome.value.trim()}`,
    `*Produto:* ${f.produto.value}`,
    `*Quantidade:* ${f.quantidade.value}`,
    `*Tema/ocasião:* ${f.tema.value.trim()}`,
  ];
  if (f.data.value) {
    const [a, m, d] = f.data.value.split("-");
    linhas.push(`*Data da festa:* ${d}/${m}/${a}`);
  }
  if (f.obs.value.trim()) linhas.push(`*Detalhes:* ${f.obs.value.trim()}`);

  const base = CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp}` : "https://wa.me/";
  const texto = encodeURIComponent(linhas.join("\n"));
  window.open(`${base}?text=${texto}`, "_blank", "noopener");
});

// Ano do rodapé
document.getElementById("ano").textContent = new Date().getFullYear();
