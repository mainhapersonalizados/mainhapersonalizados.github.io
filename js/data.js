// Catálogo da Mainha Personalizados.
// price: valor em reais; price null = sob orçamento.
// variants: opções que mudam o valor (ex.: Tradicional / Premium).
// min: quantidade mínima de compra; unit: texto exibido junto do preço.

const OFFSET_180 = "Papel Offset 180g, impressão de alta qualidade, laços e elementos 3D já inclusos.";
const PREMIUM = "Na versão Premium pode receber papel lamicote colorido (brilhoso), pedrarias e acetato.";

function caixinha(id, name, trad, prem) {
  return {
    id, name,
    desc: `${OFFSET_180} ${PREMIUM}`,
    variants: [
      { label: "Tradicional", price: trad },
      { label: "Premium", price: prem },
    ],
  };
}

function sacolinha(id, name, medidas, price) {
  return {
    id, name,
    desc: `${medidas}. Papel Offset 180g e impressão de alta qualidade. Também fazemos sacolinhas em outros tamanhos, é só pedir orçamento.`,
    variants: [
      { label: "Alça de fio de nylon branca", price },
      { label: "Alça de cetim (+ R$ 1,50)", price: Math.round((price + 1.5) * 100) / 100 },
    ],
  };
}

const CATEGORIES = [
  // ===== Com valor no catálogo =====
  {
    id: "caixinhas", kind: "festa", title: "Caixinhas de lembrancinha",
    blurb: "Seis modelos nas versões Tradicional e Premium, com laços e elementos 3D.",
    img: "img/caixa-piramide.jpg",
    products: [
      { ...caixinha("cx-piramide", "Caixa pirâmide", 3.3, 5.8), img: "img/caixa-piramide.jpg" },
      caixinha("cx-maletinha", "Caixa maletinha", 3.3, 5.8),
      { ...caixinha("cx-meia-bala", "Caixa meia bala", 3.3, 5.8), img: "img/caixa-meia-bala.jpg" },
      caixinha("cx-canudo", "Caixa canudo", 3.6, 6.1),
      caixinha("cx-diamante", "Caixa diamante", 3.6, 6.1),
      caixinha("cx-milk", "Caixa milk", 4.0, 6.5),
    ],
  },
  {
    id: "sacolinhas", kind: "festa", title: "Sacolinhas",
    blurb: "Três tamanhos (P, M e G) e também sob medida.",
    img: "img/sacolinhas.jpg",
    products: [
      { ...sacolinha("sac-p", "Sacolinha P", "12 cm C × 16 cm A × 5 cm L", 2.9), img: "img/sacolinha-rosa.jpg" },
      { ...sacolinha("sac-m", "Sacolinha M", "20 cm C × 16 cm A × 7 cm L", 3.9), img: "img/sacolinha-azul.jpg" },
      { ...sacolinha("sac-g", "Sacolinha G", "28 cm C × 21 cm A × 10 cm L", 4.9), img: "img/sacola-g.jpg" },
    ],
  },
  {
    id: "adesivos-tags", kind: "festa", title: "Adesivos & tags",
    blurb: "Detalhes que fazem a diferença nas lembrancinhas.",
    img: "img/tags.jpg",
    products: [
      { id: "adesivo-corte", name: "Adesivos com corte", price: 10,
        desc: "Papel fotográfico brilhoso e impressão de alta qualidade, com corte no formato da arte." },
      { id: "adesivo-sem-corte", name: "Adesivos sem corte", price: 7,
        desc: "Papel fotográfico brilhoso e impressão de alta qualidade, sem corte." },
      { id: "tag-offset", name: "Tags de agradecimento, papel Offset", price: 7, min: 10, img: "img/tags.jpg",
        desc: "Tamanho aproximado de 5 × 7,5 cm. Pedido mínimo de 10 unidades." },
      { id: "tag-foto", name: "Tags de agradecimento, papel fotográfico", price: 9, min: 10, img: "img/tags.jpg",
        desc: "Tamanho aproximado de 5 × 7,5 cm, em papel fotográfico. Pedido mínimo de 10 unidades." },
    ],
  },
  {
    id: "centro-mesa", kind: "festa", title: "Centro de mesa",
    blurb: "Plaquinhas e cachepôs para compor a decoração.",
    img: null,
    products: [
      { id: "plaquinha", name: "Plaquinha simples", price: 1.6,
        desc: "Personalizada conforme o tema da sua comemoração." },
      { id: "plaquinha-suporte", name: "Plaquinha com suporte", price: 1.9,
        desc: "Personalizada conforme o tema da sua comemoração." },
      { id: "cachepo", name: "Cachepô", price: 3,
        desc: "Personalizado conforme o tema da sua comemoração." },
    ],
  },
  {
    id: "quadros", kind: "festa", title: "Quadro de aniversário",
    blurb: "Decoração personalizada em três tamanhos.",
    img: null,
    products: [
      { id: "quadro-20x30", name: "Quadro 20 × 30 cm", price: 19,
        desc: "Papel Holler (papelão rígido). Acompanha fita 3M. Arte personalizada no seu tema." },
      { id: "quadro-60x40", name: "Quadro 60 × 40 cm", price: 38,
        desc: "Papel Holler (papelão rígido). Acompanha fita 3M. Arte personalizada no seu tema." },
      { id: "quadro-90x60", name: "Quadro 90 × 60 cm", price: 48,
        desc: "Papel Holler (papelão rígido). Acompanha fita 3M. Arte personalizada no seu tema." },
    ],
  },
  {
    id: "fotos", kind: "grafico", title: "Impressão de fotos",
    blurb: "Fotos tradicionais, pacotes com 10 unidades e polaroids personalizadas.",
    img: null,
    products: [
      // Fotos tradicionais
      { group: "Fotos tradicionais (valor unitário)", id: "foto-10x15", name: "Foto 10 × 15 cm", price: 2.5, desc: "Impressão fotográfica de qualidade, valor por foto." },
      { group: "Fotos tradicionais (valor unitário)", id: "foto-13x18", name: "Foto 13 × 18 cm", price: 4, desc: "Impressão fotográfica de qualidade, valor por foto." },
      { group: "Fotos tradicionais (valor unitário)", id: "foto-15x21", name: "Foto 15 × 21 cm", price: 5, desc: "Impressão fotográfica de qualidade, valor por foto." },
      { group: "Fotos tradicionais (valor unitário)", id: "foto-20x30", name: "Foto 20 × 30 cm", price: 10, desc: "Impressão fotográfica de qualidade, valor por foto." },
      // Pacotes
      { group: "Pacotes com 10 fotos", id: "pct-3x4", name: "10 fotos 3 × 4", price: 5, unit: "pacote", desc: "Pacote com 10 fotos no tamanho 3 × 4 cm." },
      { group: "Pacotes com 10 fotos", id: "pct-5x7", name: "10 fotos 5 × 7", price: 10, unit: "pacote", desc: "Pacote com 10 fotos no tamanho 5 × 7 cm." },
      { group: "Pacotes com 10 fotos", id: "pct-10x15", name: "10 fotos 10 × 15", price: 20, unit: "pacote", desc: "Pacote com 10 fotos no tamanho 10 × 15 cm." },
      { group: "Pacotes com 10 fotos", id: "pct-13x18", name: "10 fotos 13 × 18", price: 35, unit: "pacote", desc: "Pacote com 10 fotos no tamanho 13 × 18 cm." },
      { group: "Pacotes com 10 fotos", id: "pct-15x21", name: "10 fotos 15 × 21", price: 45, unit: "pacote", desc: "Pacote com 10 fotos no tamanho 15 × 21 cm." },
      { group: "Pacotes com 10 fotos", id: "pct-20x30", name: "10 fotos 20 × 30", price: 95, unit: "pacote", desc: "Pacote com 10 fotos no tamanho 20 × 30 cm." },
      // Polaroid
      { group: "Fotos Polaroid", id: "pol-p", name: "Polaroid P, 5 × 7 cm", price: 0.45, min: 14,
        desc: "Mínimo de 14 unidades. Dá para adicionar nome, data ou frase na parte branca." },
      { group: "Fotos Polaroid", id: "pol-m", name: "Polaroid M, 7 × 9 cm", price: 1.2, min: 6,
        desc: "Mínimo de 6 unidades. Dá para adicionar nome, data ou frase na parte branca." },
      { group: "Fotos Polaroid", id: "pol-g", name: "Polaroid G, 9 × 11 cm", price: 10, unit: "pacote com 5", desc: "Pacote com 5 unidades. Dá para adicionar nome, data ou frase na parte branca." },
    ],
  },

  // ===== Sob orçamento =====
  {
    id: "caixas-cartonadas", kind: "festa", title: "Caixas cartonadas",
    blurb: "Caixas rígidas com tampa, arte exclusiva e fita de cetim.",
    img: "img/caixas-cartonadas.jpg",
    products: [
      { id: "cart-cetim", name: "Caixa cartonada com fita de cetim", img: "img/caixas-cartonadas.jpg",
        desc: "Caixa rígida com tampa, forrada com arte exclusiva e finalizada com fita de cetim e pérola. Vários tamanhos. Ideal para presentes, convites e lembranças de alto padrão." },
      { id: "cart-convite-fechada", name: "Caixa convite de madrinha (fechada)", img: "img/caixa-maria-victoria.jpg",
        desc: "Caixa cartonada branca com laço de cetim e arte personalizada com o nome e o tema escolhidos." },
      { id: "cart-convite-aberta", name: "Caixa convite com carta na tampa", img: "img/caixa-convite-crisma.jpg",
        desc: "A parte interna da tampa leva o texto do convite, como o convite para madrinha de crisma, com moldura e arte personalizadas." },
    ],
  },
  {
    id: "caixas-personalizadas", kind: "festa", title: "Caixas personalizadas",
    blurb: "Convites, kits e presentes para padrinhos, batizados, casamentos e datas especiais.",
    img: "img/caixa-batismo.jpg",
    products: [
      { id: "cp-batismo", name: "Caixa de batismo personalizada", img: "img/caixa-batismo.jpg",
        desc: "Caixa com impressão de alta qualidade, arte de folhagens e o nome do batizando na tampa." },
      { id: "cp-madrinha", name: "Caixa convite de madrinha com presente", img: "img/caixa-madrinha.jpg",
        desc: "Caixa com carta personalizada na tampa e espaço para o presente, como o copo térmico personalizado." },
    ],
  },
  {
    id: "porta-oracao", kind: "festa", title: "Porta oração do lar",
    blurb: "Escapulário de parede com fita de cetim.",
    img: "img/porta-oracao-lar.jpg",
    products: [
      { id: "porta-oracao-lar", name: "Escapulário porta oração do lar", img: "img/porta-oracao-lar.jpg",
        desc: "Peça para pendurar com fita de cetim no topo, acabamento em cordão e borla, com a arte da oração ou da imagem que você escolher." },
    ],
  },
  {
    id: "cartao-sus", kind: "grafico", title: "Cartão do SUS personalizado",
    blurb: "Seu Cartão do SUS com arte exclusiva.",
    img: "img/cartao-sus.jpg",
    products: [
      { id: "cartao-sus", name: "Cartão do SUS personalizado", price: 12, img: "img/cartao-sus.jpg",
        desc: "Cartão do SUS personalizado com arte exclusiva, no tema que você escolher." },
    ],
  },
  {
    id: "crachas", kind: "grafico", title: "Crachás personalizados",
    blurb: "Para eventos, retiros, encontros e equipes.",
    img: "img/cracha.jpg",
    products: [
      { id: "cracha", name: "Crachá personalizado", price: 3.5, img: "img/cracha.jpg",
        desc: "Crachá personalizado com cordão e a arte do seu evento. Tamanho: 8 × 5 cm." },
    ],
  },
  {
    id: "cartoezinhos", kind: "grafico", title: "Cartõezinhos personalizados",
    blurb: "Cartõezinhos de agradecimento para encantar seus clientes.",
    img: null,
    products: [
      { id: "cartoezinhos", name: "Cartõezinhos de agradecimento",
        desc: "Cartõezinhos com a sua arte, uma mensagem de agradecimento e os seus contatos, para entregar junto com o pedido." },
    ],
  },
];

// Preço mínimo de uma categoria com valor (para exibir "a partir de")
function categoryPriced(cat) {
  return cat.products.some((p) => productPrices(p).length > 0);
}
function productPrices(p) {
  if (p.variants) return p.variants.map((v) => v.price).filter((v) => v != null);
  return p.price != null ? [p.price] : [];
}
function categoryFromPrice(cat) {
  const all = cat.products.flatMap(productPrices);
  return all.length ? Math.min(...all) : null;
}
