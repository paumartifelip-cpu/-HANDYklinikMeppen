/**
 * HANDYKLINIK MEPPEN - VENDEDOR EXPERTO IA 24/7
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     1. TAB NAVIGATION (Recommender / Comparator / 7 Stores)
     ========================================================= */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  /* =========================================================
     2. INTERACTIVE RECOMMENDER QUIZ ENGINE
     ========================================================= */
  const recommenderState = {
    budget: '300-600',
    priority: 'camera',
    brand: 'any'
  };

  const catalog = [
    {
      id: 'samsung-a55',
      name: 'Samsung Galaxy A55 5G',
      brand: 'samsung',
      budget: '300-600',
      price: '429 €',
      badge: 'Recomendación Equilibrada #1',
      specs: [
        { icon: 'fa-camera', text: 'Cámara 50MP OIS con modo noche mejorado' },
        { icon: 'fa-battery-full', text: '5.000 mAh (Día y medio de uso intenso)' },
        { icon: 'fa-microchip', text: '8GB RAM + 256GB Almacenamiento' },
        { icon: 'fa-shield-halved', text: 'Protección al agua IP67 y soporte Wertgarantie' }
      ],
      verdict: 'Excelente si buscas fotos nítidas sin gastar 1.000€ y una batería que dure toda la jornada.',
      tags: ['camera', 'battery', 'social', 'work']
    },
    {
      id: 'xiaomi-13t',
      name: 'Xiaomi 13T Pro con Óptica Leica',
      brand: 'xiaomi',
      budget: '300-600',
      price: '489 €',
      badge: 'Fotografía Profesional Leica',
      specs: [
        { icon: 'fa-camera', text: 'Triple cámara Leica 50MP con teleobjetivo' },
        { icon: 'fa-bolt', text: 'Carga ultrarrápida 67W / 120W' },
        { icon: 'fa-display', text: 'Pantalla AMOLED 144Hz ultrabrillante' },
        { icon: 'fa-gamepad', text: 'Máxima fluidez para juegos y aplicaciones pesadas' }
      ],
      verdict: 'Para usuarios que buscan fotos artísticas con lente Leica y carga inmediata.',
      tags: ['camera', 'gaming', 'social', 'screen']
    },
    {
      id: 'iphone-15',
      name: 'Apple iPhone 15 (128GB / 256GB)',
      brand: 'apple',
      budget: 'over600',
      price: '879 €',
      badge: 'Ecosistema Premium Apple',
      specs: [
        { icon: 'fa-camera', text: 'Cámara principal 48MP con retratos inteligentes' },
        { icon: 'fa-circle-notch', text: 'Dynamic Island y conector estándar USB-C' },
        { icon: 'fa-microchip', text: 'Chip A16 Bionic (Rendimiento ultra fluido)' },
        { icon: 'fa-video', text: 'La mejor grabación de vídeo 4K del sector' }
      ],
      verdict: 'La opción ideal para creadores de contenido, redes sociales y máxima reventa futura.',
      tags: ['camera', 'work', 'social', 'gaming']
    },
    {
      id: 'samsung-s24',
      name: 'Samsung Galaxy S24 (Galaxy AI)',
      brand: 'samsung',
      budget: 'over600',
      price: '899 €',
      badge: 'Inteligencia Artificial Galaxy AI',
      specs: [
        { icon: 'fa-brain', text: 'Galaxy AI: Traducción simultánea y edición pro' },
        { icon: 'fa-display', text: 'Pantalla Dynamic AMOLED 2X 120Hz compacta' },
        { icon: 'fa-camera', text: 'Triple cámara 50MP con zoom óptico 3x' },
        { icon: 'fa-arrows-rotate', text: '7 años de actualizaciones oficiales garantizadas' }
      ],
      verdict: 'Perfecto para profesionales y usuarios que buscan lo último en tecnología compacta.',
      tags: ['work', 'camera', 'social', 'screen']
    },
    {
      id: 'redmi-note-13-pro',
      name: 'Xiaomi Redmi Note 13 Pro',
      brand: 'xiaomi',
      budget: 'under300',
      price: '249 €',
      badge: 'Líder Calidad / Precio Económico',
      specs: [
        { icon: 'fa-camera', text: 'Cámara 200MP ultra nítida con OIS' },
        { icon: 'fa-battery-full', text: '5.000 mAh + Carga rápida 67W' },
        { icon: 'fa-display', text: 'Pantalla AMOLED 120Hz sin bordes' },
        { icon: 'fa-tag', text: 'Máxima prestación por debajo de los 300 €' }
      ],
      verdict: 'La opción ganadora con presupuesto ajustado sin sacrificar diseño ni pantalla.',
      tags: ['camera', 'battery', 'price', 'social']
    },
    {
      id: 'samsung-a15',
      name: 'Samsung Galaxy A15 5G',
      brand: 'samsung',
      budget: 'under300',
      price: '189 €',
      badge: 'Económico y Fiable',
      specs: [
        { icon: 'fa-battery-full', text: 'Batería 5.000 mAh para casi 2 días de autonomía' },
        { icon: 'fa-display', text: 'Pantalla Super AMOLED 90Hz' },
        { icon: 'fa-shield-halved', text: 'Seguridad Samsung Knox y 4 años de parches' },
        { icon: 'fa-wifi', text: 'Conectividad 5G' }
      ],
      verdict: 'Ideal para uso diario, WhatsApp, llamadas y máxima duración de batería.',
      tags: ['battery', 'work', 'price']
    }
  ];

  function setupQuizPills(containerId, stateKey) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const pills = container.querySelectorAll('.pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        recommenderState[stateKey] = pill.getAttribute('data-val');
        renderRecommendation();
      });
    });
  }

  function renderRecommendation() {
    const outputContainer = document.getElementById('recommenderOutput');
    if (!outputContainer) return;

    let matched = catalog.filter(phone => {
      const budgetMatch = phone.budget === recommenderState.budget;
      const brandMatch = (recommenderState.brand === 'any') || (phone.brand === recommenderState.brand);
      return budgetMatch && brandMatch;
    });

    if (matched.length === 0) {
      if (recommenderState.brand === 'apple') {
        matched = [catalog.find(p => p.id === 'iphone-15')];
      } else {
        matched = catalog.filter(phone => phone.budget === recommenderState.budget);
      }
    }

    const bestPhone = matched[0] || catalog[0];

    outputContainer.innerHTML = `
      <div class="rec-card-rendered">
        <span class="rec-tag"><i class="fa-solid fa-check"></i> ${bestPhone.badge}</span>
        <h4 class="rec-title">${bestPhone.name}</h4>
        <div class="rec-price">${bestPhone.price}</div>
        
        <div class="rec-specs">
          ${bestPhone.specs.map(s => `
            <div class="rec-spec-item">
              <i class="fa-solid ${s.icon}"></i>
              <span>${s.text}</span>
            </div>
          `).join('')}
        </div>

        <div class="rec-verdict">
          <strong>Veredicto de HANDYklinik:</strong> ${bestPhone.verdict}
        </div>

        <div class="rec-actions">
          <a href="https://wa.me/?text=Hola%20HANDYklinik%20Meppen,%20el%20asesor%20virtual%20me%20ha%20recomendado%20el%20${encodeURIComponent(bestPhone.name)}.%20¿Tenéis%20stock%20disponible?" target="_blank" class="btn btn-primary btn-sm" style="flex:1;">
            <i class="fa-brands fa-whatsapp"></i> Consultar en Tienda
          </a>
          <button class="btn btn-light btn-sm" style="border:1px solid #e2e8f0;" onclick="alert('El chatbot ha preparado una funda reforzada y protector de cristal templado compatibles con ${bestPhone.name}.');">
            <i class="fa-solid fa-plus text-orange"></i> Accesorios
          </button>
        </div>
      </div>
    `;
  }

  setupQuizPills('budgetPills', 'budget');
  setupQuizPills('priorityPills', 'priority');
  setupQuizPills('brandPills', 'brand');
  renderRecommendation();

  /* =========================================================
     3. INTERACTIVE COMPARATOR ENGINE
     ========================================================= */
  const phonesDb = {
    iphone15: {
      name: 'Apple iPhone 15',
      price: '879 €',
      camera: '48 MP Retratos Pro + Grabación de Cine 4K',
      battery: '3.349 mAh (20 horas de autonomía vídeo)',
      screen: 'OLED Super Retina XDR 6.1" (2.000 nits)',
      performance: 'Chip A16 Bionic (Gama Ultra Alta)',
      storage: '128 GB / 256 GB',
      pros: 'Máxima longevidad, ecosistema iOS y menor depreciación.',
      persona: 'Creadores de contenido en redes, vídeos y usuarios fieles a Apple.'
    },
    samsungS24: {
      name: 'Samsung Galaxy S24',
      price: '899 €',
      camera: 'Triple 50MP + Teleobjetivo Zoom 3x Óptico',
      battery: '4.000 mAh + Carga inalámbrica rápida',
      screen: 'Dynamic AMOLED 2X 120Hz (2.600 nits)',
      performance: 'Procesador Galaxy AI con traducción en directo',
      storage: '128 GB / 256 GB',
      pros: 'Inteligencia Artificial integrada, pantalla 120Hz y 7 años de soporte.',
      persona: 'Productividad, viajes, multitarea y fotografía versátil.'
    },
    xiaomi13t: {
      name: 'Xiaomi 13T Pro',
      price: '599 €',
      camera: '50MP Óptica Profesional Leica + Zoom Óptico 50MP',
      battery: '5.000 mAh + Carga HyperCharge 120W (100% en 19 min)',
      screen: 'CrystalRes AMOLED 144Hz (2.600 nits)',
      performance: 'MediaTek Dimensity 9200+ (Extremo)',
      storage: '512 GB / 1 TB',
      pros: 'Carga ultrarrápida, doble de capacidad y óptica Leica por 300€ menos.',
      persona: 'Quien busca máxima potencia ahorrando 300€ respecto a la gama alta tradicional.'
    }
  };

  const selectA = document.getElementById('phoneSelectA');
  const selectB = document.getElementById('phoneSelectB');
  const compDisplay = document.getElementById('comparisonDisplay');

  function renderComparison() {
    if (!selectA || !selectB || !compDisplay) return;

    const keyA = selectA.value;
    const keyB = selectB.value;
    const phoneA = phonesDb[keyA];
    const phoneB = phonesDb[keyB];

    compDisplay.innerHTML = `
      <div class="compare-grid-cards">
        <!-- Phone A -->
        <div class="compare-col">
          <div class="col-header">
            <h4 class="col-title">${phoneA.name}</h4>
            <div class="col-price">${phoneA.price}</div>
          </div>
          <div class="col-spec-row">
            <span class="spec-label"><i class="fa-solid fa-camera text-orange"></i> Cámara:</span>
            <span class="spec-val">${phoneA.camera}</span>
          </div>
          <div class="col-spec-row">
            <span class="spec-label"><i class="fa-solid fa-battery-full text-orange"></i> Batería:</span>
            <span class="spec-val">${phoneA.battery}</span>
          </div>
          <div class="col-spec-row">
            <span class="spec-label"><i class="fa-solid fa-display text-orange"></i> Pantalla:</span>
            <span class="spec-val">${phoneA.screen}</span>
          </div>
          <div class="col-spec-row">
            <span class="spec-label"><i class="fa-solid fa-microchip text-orange"></i> Potencia:</span>
            <span class="spec-val">${phoneA.performance}</span>
          </div>
          <div class="col-spec-row">
            <span class="spec-label"><i class="fa-solid fa-hard-drive text-orange"></i> Capacidad:</span>
            <span class="spec-val">${phoneA.storage}</span>
          </div>
          <div class="col-persona">
            <strong>¿Para quién es?</strong> ${phoneA.persona}
          </div>
        </div>

        <!-- Phone B -->
        <div class="compare-col winner">
          <div class="col-header">
            <h4 class="col-title">${phoneB.name}</h4>
            <div class="col-price">${phoneB.price}</div>
          </div>
          <div class="col-spec-row">
            <span class="spec-label"><i class="fa-solid fa-camera text-orange"></i> Cámara:</span>
            <span class="spec-val">${phoneB.camera}</span>
          </div>
          <div class="col-spec-row">
            <span class="spec-label"><i class="fa-solid fa-battery-full text-orange"></i> Batería:</span>
            <span class="spec-val">${phoneB.battery}</span>
          </div>
          <div class="col-spec-row">
            <span class="spec-label"><i class="fa-solid fa-display text-orange"></i> Pantalla:</span>
            <span class="spec-val">${phoneB.screen}</span>
          </div>
          <div class="col-spec-row">
            <span class="spec-label"><i class="fa-solid fa-microchip text-orange"></i> Potencia:</span>
            <span class="spec-val">${phoneB.performance}</span>
          </div>
          <div class="col-spec-row">
            <span class="spec-label"><i class="fa-solid fa-hard-drive text-orange"></i> Capacidad:</span>
            <span class="spec-val">${phoneB.storage}</span>
          </div>
          <div class="col-persona">
            <strong>¿Para quién es?</strong> ${phoneB.persona}
          </div>
        </div>
      </div>

      <!-- Verdict Banner -->
      <div class="comparator-verdict-box">
        <div class="verdict-text">
          <h4><i class="fa-solid fa-award text-orange"></i> “Para ti recomendamos este”</h4>
          <p>“Si priorizas <strong>${phoneA.name}</strong> obtienes <em>${phoneA.pros}</em>; mientras que con <strong>${phoneB.name}</strong> ganas en <em>${phoneB.pros}</em>.”</p>
        </div>
        <a href="https://wa.me/?text=Hola%20HANDYklinik,%20he%20comparado%20el%20${encodeURIComponent(phoneA.name)}%20con%20el%20${encodeURIComponent(phoneB.name)}.%20¿Tenéis%20ambos%20en%20tienda?" target="_blank" class="btn btn-primary btn-sm" style="white-space:nowrap;">
          <i class="fa-brands fa-whatsapp"></i> Preguntar en WhatsApp
        </a>
      </div>
    `;
  }

  if (selectA && selectB) {
    selectA.addEventListener('change', renderComparison);
    selectB.addEventListener('change', renderComparison);
    renderComparison();
  }

  /* =========================================================
     4. 7 STORES OF HANDYKLINIK NETWORK
     ========================================================= */
  const storesData = [
    {
      id: 1,
      name: 'HANDYklinik Meppen (Hauptfiliale)',
      city: 'Meppen Zentrum · Emsland',
      address: 'Hasestraße 12, 49716 Meppen',
      hours: 'Mo - Fr: 10:00 - 18:00 Uhr | Sa: 10:00 - 16:00 Uhr',
      phone: '05931 49 89 143',
      whatsapp: '+49 5931 4989143',
      stockNote: 'Sede central con almacén completo y taller Reparaturservice express.',
      chatSample: '“¿Tenéis disponible el Samsung Galaxy A55 en la tienda de Meppen para pasar esta tarde?”'
    },
    {
      id: 2,
      name: 'HANDYklinik Filiale Lingen',
      city: 'Lingen (Ems) · Fußgängerzone',
      address: 'Lookenstraße 28, 49808 Lingen',
      hours: 'Mo - Fr: 10:00 - 18:00 Uhr | Sa: 10:00 - 16:00 Uhr',
      phone: '0591 91 22 340',
      whatsapp: '+49 591 9122340',
      stockNote: 'Punto de entrega rápida y servicio Wertgarantie autorizado.',
      chatSample: '“¿Puedo recoger en Lingen la funda y cristal que me recomendó el bot?”'
    },
    {
      id: 3,
      name: 'HANDYklinik Filiale Nordhorn',
      city: 'Nordhorn · Grafschaft Bentheim',
      address: 'Hauptstraße 42, 48529 Nordhorn',
      hours: 'Mo - Fr: 10:00 - 18:00 Uhr | Sa: 10:00 - 14:00 Uhr',
      phone: '05921 78 44 110',
      whatsapp: '+49 5921 7844110',
      stockNote: 'Especialistas en telefonía para empresas y smartphones reacondicionados.',
      chatSample: '“¿Tenéis financiación sin intereses disponible en Nordhorn?”'
    },
    {
      id: 4,
      name: 'HANDYklinik Filiale Papenburg',
      city: 'Papenburg · Obenende',
      address: 'Am Hauptkanal links 65, 26871 Papenburg',
      hours: 'Mo - Fr: 10:00 - 18:00 Uhr | Sa: 10:00 - 15:00 Uhr',
      phone: '04961 83 90 220',
      whatsapp: '+49 4961 8390220',
      stockNote: 'Promoción activa: Protector de pantalla gratis con tu nuevo smartphone.',
      chatSample: '“¿Cuánto me dais por mi móvil usado si compro uno nuevo en Papenburg?”'
    },
    {
      id: 5,
      name: 'HANDYklinik Filiale Leer',
      city: 'Leer (Ostfriesland) · Mühlenstraße',
      address: 'Mühlenstraße 74, 26789 Leer',
      hours: 'Mo - Fr: 09:30 - 18:30 Uhr | Sa: 10:00 - 16:00 Uhr',
      phone: '0491 97 66 100',
      whatsapp: '+49 491 9766100',
      stockNote: 'Showroom de modelos Apple y Samsung listos para probar.',
      chatSample: '“¿Tenéis el iPhone 15 de 256GB en exposición en Leer?”'
    },
    {
      id: 6,
      name: 'HANDYklinik Filiale Emden',
      city: 'Emden Stadtmitte',
      address: 'Neutorstraße 31, 26721 Emden',
      hours: 'Mo - Fr: 10:00 - 18:00 Uhr | Sa: 10:00 - 14:00 Uhr',
      phone: '04921 68 55 400',
      whatsapp: '+49 4921 6855400',
      stockNote: 'Servicio técnico directo y sustitución de baterías en el acto.',
      chatSample: '“¿Hacéis traspaso de datos de mi móvil viejo al nuevo en Emden?”'
    },
    {
      id: 7,
      name: 'HANDYklinik Filiale Osnabrück',
      city: 'Osnabrück · Große Straße',
      address: 'Große Straße 89, 49074 Osnabrück',
      hours: 'Mo - Sa: 10:00 - 19:00 Uhr (Continuo)',
      phone: '0541 33 44 800',
      whatsapp: '+49 541 3344800',
      stockNote: 'Gran volumen de stock y catálogo completo de accesorios de gama alta.',
      chatSample: '“¿Puedo reservar un Xiaomi 13T para recoger hoy mismo en Osnabrück?”'
    }
  ];

  let currentStoreId = 1;

  function renderStores() {
    const listCol = document.getElementById('storesList');
    const detailsCol = document.getElementById('storeDetailsCard');
    if (!listCol || !detailsCol) return;

    listCol.innerHTML = storesData.map(st => `
      <div class="store-btn ${st.id === currentStoreId ? 'active' : ''}" data-id="${st.id}">
        <div>
          <span class="store-btn-name">${st.name}</span>
          <span class="store-btn-city">${st.city}</span>
        </div>
        <span class="store-btn-badge"><i class="fa-solid fa-circle text-green"></i> Conectada</span>
      </div>
    `).join('');

    const btns = listCol.querySelectorAll('.store-btn');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        currentStoreId = parseInt(b.getAttribute('data-id'), 10);
        renderStores();
      });
    });

    const curr = storesData.find(s => s.id === currentStoreId) || storesData[0];
    detailsCol.innerHTML = `
      <div>
        <span class="section-badge badge-orange"><i class="fa-solid fa-store"></i> Tienda Seleccionada</span>
        <h4 class="store-det-title">${curr.name}</h4>
        
        <div class="store-info-list">
          <div class="store-info-row">
            <i class="fa-solid fa-location-dot"></i>
            <div>
              <strong>Dirección:</strong>
              <span>${curr.address} (${curr.city})</span>
            </div>
          </div>

          <div class="store-info-row">
            <i class="fa-solid fa-clock"></i>
            <div>
              <strong>Horario de Atención:</strong>
              <span>${curr.hours}</span>
            </div>
          </div>

          <div class="store-info-row">
            <i class="fa-solid fa-phone"></i>
            <div>
              <strong>Teléfono Directo:</strong>
              <span>${curr.phone}</span>
            </div>
          </div>

          <div class="store-info-row">
            <i class="fa-solid fa-box-open"></i>
            <div>
              <strong>Disponibilidad & Stock:</strong>
              <span>${curr.stockNote}</span>
            </div>
          </div>
        </div>

        <div class="store-chat-preview-box">
          <strong style="color:#e26a27; font-size:0.8rem; text-transform:uppercase; display:block; margin-bottom:4px;">
            <i class="fa-solid fa-robot"></i> Ejemplo de Enrutamiento Inteligente del Chatbot:
          </strong>
          <p>${curr.chatSample}</p>
        </div>
      </div>

      <div style="margin-top:16px;">
        <a href="https://wa.me/?text=Hola%20${encodeURIComponent(curr.name)},%20tengo%20una%20consulta%20sobre%20un%20teléfono." target="_blank" class="btn btn-primary btn-md" style="width:100%;">
          <i class="fa-brands fa-whatsapp"></i> Hablar con el Vendedor de esta Tienda
        </a>
      </div>
    `;
  }

  renderStores();

});
