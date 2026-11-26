// TOC Editorial Redesign Interactions

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Scroll State & Mobile Nav
  const siteHeader = document.getElementById('siteHeader');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mainNav = document.querySelector('.main-nav');

  function updateHeaderScroll() {
    if (!siteHeader) return;
    siteHeader.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  hamburgerBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mainNav?.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', String(Boolean(isOpen)));
  });

  document.addEventListener('click', (e) => {
    if (mainNav?.classList.contains('open') && !siteHeader?.contains(e.target)) {
      mainNav.classList.remove('open');
      hamburgerBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', () => {
      if (!item.getAttribute('target')) {
        document.querySelectorAll('.nav-item').forEach((n) => n.classList.remove('active'));
        item.classList.add('active');
      }
      mainNav?.classList.remove('open');
      hamburgerBtn?.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll-spy for sticky navbar underline
  const sectionNavLinks = Array.from(document.querySelectorAll('.nav-item[href^="#"]'));
  function updateActiveNavOnScroll() {
    const scrollPos = window.scrollY + 130;
    let currentId = '#beranda';
    sectionNavLinks.forEach((link) => {
      const sec = document.querySelector(link.getAttribute('href'));
      if (sec && sec.offsetTop <= scrollPos) {
        currentId = link.getAttribute('href');
      }
    });
    sectionNavLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === currentId);
    });
  }
  window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });

  // 2. Branch Accordion (+ / x)
  document.querySelectorAll('.acc-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.acc-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item').forEach((el) => {
        el.classList.remove('open');
        el.querySelector('.acc-trigger')?.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 6. Modal Detail Reader (Services & Blog Articles)
  const modal = document.getElementById('detailModal');
  const modalClose = document.getElementById('modalClose');
  const modalEyebrow = document.getElementById('modalEyebrow');
  const modalTitle = document.getElementById('modalTitle');
  const modalImageWrap = document.getElementById('modalImageWrap');
  const modalContent = document.getElementById('modalContent');
  const modalContactBtn = document.getElementById('modalContactBtn');

  const SERVICE_DETAILS = {
    'suku-cadang': {
      eyebrow: 'Jasa dan Layanan Kami',
      title: 'Penjualan Suku Cadang',
      image: 'assets/services/1-1.png',
      paragraphs: [
        'Lebih dari 1200 produk kami menjual suku cadang dengan kulitas yang teruji dan memenuhi standar internasional.'
      ]
    },
    maintenance: {
      eyebrow: 'Jasa dan Layanan Kami',
      title: 'Maintenance Rutin',
      image: 'assets/blog/medical-equipment.png',
      paragraphs: [
        'Kami memberikan perawatan rutin sehingga memastikan produk kami terjaga dengan baik semua fungsinya.'
      ]
    },
    'office-hour': {
      eyebrow: 'Jasa dan Layanan Kami',
      title: 'Office Hour Medical',
      image: 'assets/services/3.png',
      paragraphs: [
        'Tidak perlu khawatir kami memberikan pelayanan service 24 jam anda tinggal menghubungi Service Department kami.'
      ]
    },
    instalasi: {
      eyebrow: 'Jasa dan Layanan Kami',
      title: 'Instalasi dan pelatihan',
      image: 'assets/services/4.png',
      paragraphs: [
        'Pelatihan penggunaan produk agar lebih cepat, mudah, serta mengoptimalkan kinerja dari produk kami.'
      ]
    },
    workshop: {
      eyebrow: 'Jasa dan Layanan Kami',
      title: 'Workshop',
      image: 'assets/services/5.png',
      paragraphs: [
        'Kami menyediakan workshop dan fasilitas pendukung lainnya sebagai alat persentasi kami.'
      ]
    },
    evaluasi: {
      eyebrow: 'Jasa dan Layanan Kami',
      title: 'Evaluasi',
      image: 'assets/services/6.png',
      paragraphs: [
        'Kami melakukan pengecekan fasilitas kami sesuai dengan SOP untuk customer kami.'
      ]
    }
  };

  const ARTICLE_DETAILS = {
    earthquake: {
      eyebrow: 'Artikel dan Berita • April 15, 2025',
      title: 'Apa itu Earthquake Simulator Unit',
      image: 'assets/blog/earthquake.png',
      paragraphs: [
        'Earthquake Simulator Unit adalah fasilitas canggih yang digunakan untuk mensimulasikan efek gempa bumi pada struktur bangunan dan infrastruktur. Alat ini biasanya terdiri dari platform yang dapat bergerak secara horizontal dan vertikal, memungkinkan peneliti untuk mereplikasi getaran dan guncangan yang terjadi selama gempa.',
        'Dengan menggunakan teknologi seperti aktuator elektromagnetik atau hidrolik, simulator ini dapat menghasilkan berbagai pola gerakan, termasuk frekuensi dan amplitudo yang berbeda. Pengujian ini membantu dalam mengevaluasi respons struktur terhadap stres dinamis dan mengidentifikasi potensi kerusakan.',
        'Penelitian yang dilakukan di unit ini sangat penting untuk pengembangan kode dan standar konstruksi yang lebih baik, serta untuk merancang bangunan yang lebih aman. Simulator juga digunakan dalam pendidikan untuk melatih insinyur dan arsitek tentang teknik rekayasa tahan gempa.'
      ]
    },
    jarum: {
      eyebrow: 'Artikel dan Berita • April 15, 2025',
      title: 'Mengapa jarum suntik harus diganti setelah dipakai',
      image: 'assets/blog/Untitled-design-20.png',
      paragraphs: [
        'Jarum suntik harus diganti setelah dipakai karena beberapa alasan penting. Pertama, penggunaan jarum yang sama berisiko tinggi menularkan infeksi, baik dari pasien ke pasien maupun dari lingkungan ke pasien. Bakteri dan virus dapat tinggal di permukaan jarum, sehingga mengganti jarum mencegah risiko infeksi.',
        'Kedua, jarum dapat menjadi tumpul atau rusak setelah digunakan. Jarum yang tumpul dapat menyebabkan lebih banyak rasa sakit dan trauma jaringan saat disuntikkan, dan dapat mengurangi efisiensi dalam memberikan obat.',
        'Ketiga, untuk menjaga kualitas pengobatan, penggunaan jarum baru memastikan bahwa dosis obat tidak terkontaminasi dan tetap efektif. Akhirnya, mengganti jarum suntik adalah praktik standar dalam prosedur medis, yang memastikan keselamatan dan kesehatan pasien secara keseluruhan.'
      ]
    }
  };

  function openModal(item) {
    if (!item || !modal) return;
    modalEyebrow.textContent = item.eyebrow;
    modalTitle.textContent = item.title;
    modalImageWrap.innerHTML = item.image ? `<img src="${item.image}" alt="${item.title}" />` : '';
    modalContent.innerHTML = item.paragraphs.map((p) => `<p>${p}</p>`).join('');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal?.classList.remove('open');
    modal?.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('[data-service]').forEach((card) => {
    card.addEventListener('click', () => openModal(SERVICE_DETAILS[card.dataset.service]));
  });
  document.querySelectorAll('[data-article]').forEach((btn) => {
    btn.addEventListener('click', () => openModal(ARTICLE_DETAILS[btn.dataset.article]));
  });

  modalClose?.addEventListener('click', closeModal);
  modalContactBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 7. Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('yourName').value.trim();
    const email = document.getElementById('yourEmail').value.trim();
    const phone = document.getElementById('yourPhone').value.trim();
    const subject = document.getElementById('yourSubject').value.trim() || 'Pertanyaan Website TOC';
    const msg = document.getElementById('yourMessage').value.trim();

    if (!name || !email) {
      formFeedback.textContent = 'Mohon lengkapi nama dan alamat email Anda.';
      formFeedback.style.color = '#d83030';
      return;
    }

    formFeedback.textContent = `Terima kasih ${name}! Pesan Anda siap dikirim ke info@toc.co.id.`;
    formFeedback.style.color = '#032e42';
    const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\nTelepon: ${phone}\n\nPesan:\n${msg}`);
    window.location.href = `mailto:info@toc.co.id?subject=${encodeURIComponent(subject)}&body=${body}`;
  });
});
