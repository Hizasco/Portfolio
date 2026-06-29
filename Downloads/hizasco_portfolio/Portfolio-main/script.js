// ============ IMAGE CONFIGURATION ============
const projectImages = {
  'zaichat': [
    'Media/zaichat1.png',
    'Media/zaichat2.png',
    'Media/zaichat3.png',
    'Media/zaichat4.png',
    'Media/zaichat5.png',
    'Media/zaichat6.png',
    'Media/zaichat7.png',
    'Media/zaichat8.png',
    'Media/zaichat9.png',
    'Media/zaichat10.png',
    'Media/zaichat11.png',
    'Media/zaichat12.png',
    'Media/zaichat13.png',
    'Media/zaichat14.png',
    'Media/zaichat15.png',
    'Media/zaichat16.png',
    'Media/zaichat17.png',
    'Media/zaichat18.png',
    'Media/zaichat19.png',
    'Media/zaichat20.png',
    'Media/zaichat21.png',
    'Media/zaichat22.png',
    'Media/zaichat23.png',
    'Media/zaichat24.png',
    'Media/zaichat25.png',
    'Media/zaichat26.png',
    'Media/zaichat27.png'
  ],
  'hizasco-cloud': [
    'https://lh3.googleusercontent.com/d/1KvwY1o4j71AMtvtQxb-dPah6JkEzhk9m=w800',
    'https://lh3.googleusercontent.com/d/1gMCf0iHLlKa4_1KjPTGr1u0cbPWaeQSW=w800',
    'https://lh3.googleusercontent.com/d/1exrtC8lHE9xy8aCpjt3cxJvCe99P8MPp=w800',
    'https://lh3.googleusercontent.com/d/12idVzadWiBFow7hxx6Zqvn8t8Y5xgLTa=w800',
    'https://lh3.googleusercontent.com/d/1T_uvOQdSiLat5OKWjdtQmQw1DVC5J4Ei=w800'
  ],
  'site-tester': [
    'Media/tester1.png',
    'Media/tester2.png'
  ],
  'zaiki': [
    'Media/zaiki-1.jpg',
    'Media/zaiki-2.jpg',
    'Media/zaiki-3.jpg',
    'Media/zaiki-4.jpg'
  ],
  'vault-gard': [
    'Media/vault-1.png',
    'Media/vault-2.png',
    'Media/vault-3.png',
    'Media/vault-4.png',
    'Media/vault-5.png',
    'Media/vault-6.png',
    'Media/vault-7.png'
  ],
  'hizasco-dev': [
    'Media/dev-1.png',
    'Media/dev-2.png',
    'Media/dev-3.png',
    'Media/dev-4.png',
    'Media/dev-5.png',
    'Media/dev-6.png',
    'Media/dev-7.png',
    'Media/dev-8.png',
    'Media/dev-9.png',
    'Media/dev-10.png',
    'Media/dev-11.png',
    'Media/dev-12.png',
    'Media/dev-13.png',
    'Media/dev-14.png',
    'Media/dev-15.png',
    'Media/dev-16.png',
    'Media/dev-17.png',
    'Media/dev-18.png',
    'Media/dev-19.png',
    'Media/dev-20.png',
    'Media/dev-21.png',
    'Media/dev-22.png'
  ],
  'lead-generator': [
    'Media/leads-1.png',
		'Media/leads-2.png',
    'Media/leads-3.png',
    'Media/leads-4.png',
    'Media/leads-5.png'
  ]
};

const galleryState = {};
const VISIBLE_COUNT = 3;

function initGalleries() {
  for (const [project, images] of Object.entries(projectImages)) {
    const track = document.getElementById(`gallery-${project}`);
    if (!track) continue;

    galleryState[project] = {
      currentIndex: 0,
      images: images,
      expanded: false
    };

    renderGallery(project);
  }
}

function renderGallery(project) {
  const track = document.getElementById(`gallery-${project}`);
  const state = galleryState[project];
  if (!track || !state) return;

  // Always show only first 3 images
  const imagesToShow = state.images.slice(0, VISIBLE_COUNT);

  track.innerHTML = imagesToShow.map((img, index) => `
    <div class="gallery-item" onclick="openLightbox('${project}', ${index})">
      <img src="${img}" alt="Screenshot" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22120%22><rect fill=%22%23111b24%22 width=%22200%22 height=%22120%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%235a7a8c%22 text-anchor=%22middle%22 dy=%22.3em%22>Image</text></svg>'">
      <div class="hover-icon"><i class="fas fa-search-plus"></i></div>
    </div>
  `).join('');

  updateGalleryNav(project);
}

function slideGallery(project, direction) {
  const state = galleryState[project];
  if (!state) return;
  const images = state.images.slice(0, VISIBLE_COUNT);
  const maxIndex = Math.max(0, images.length - VISIBLE_COUNT);

  state.currentIndex = Math.max(0, Math.min(state.currentIndex + direction, maxIndex));

  const track = document.getElementById(`gallery-${project}`);
  if (track) {
    const itemWidth = track.querySelector('.gallery-item')?.offsetWidth || 300;
    const gap = 12;
    track.style.transform = `translateX(-${state.currentIndex * (itemWidth + gap)}px)`;
  }

  updateGalleryNav(project);
}

function updateGalleryNav(project) {
  const state = galleryState[project];
  if (!state) return;
  const images = state.images.slice(0, VISIBLE_COUNT);
  const maxIndex = Math.max(0, images.length - VISIBLE_COUNT);

  const track = document.getElementById(`gallery-${project}`);
  if (!track) return;

  const prevBtn = track.parentElement.querySelector('.gallery-nav.prev');
  const nextBtn = track.parentElement.querySelector('.gallery-nav.next');

  if (prevBtn) prevBtn.disabled = state.currentIndex === 0;
  if (nextBtn) nextBtn.disabled = state.currentIndex >= maxIndex;
}

let lightboxProject = null;
let lightboxIndex = 0;

function openLightbox(project, index) {
  lightboxProject = project;
  lightboxIndex = index;
  updateLightboxImage();
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
  lightboxProject = null;
}

function lightboxNav(direction) {
  if (!lightboxProject) return;
  const images = projectImages[lightboxProject];
  if (!images) return;
  lightboxIndex = (lightboxIndex + direction + images.length) % images.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  if (!lightboxProject) return;
  const images = projectImages[lightboxProject];
  const img = document.getElementById('lightbox-img');
  const counter = document.getElementById('lightbox-counter');
  img.src = images[lightboxIndex];
  counter.textContent = `${lightboxIndex + 1} / ${images.length}`;
}

// ============ PROJECT PREVIEW URLS ============
const projectPreviewUrls = {
  'zaichat': 'https://hizasc.pagekite.me/hizasco/social', // Replace with actual URL
  'hizasco-cloud': 'https://hizasc.pagekite.me/hizasco/manage/web-host/my_vms', // Replace with actual URL
  'site-tester': 'https://hizasc.pagekite.me/hizasco/site/test', // Replace with actual URL
  'zaiki': 'https://hizasc.pagekite.me/hizasco/ai-live-chat', // Replace with actual URL
  'vault-gard': 'https://hizasc.pagekite.me/hizasco/VaultGuard/client', // Replace with actual URL
  'hizasco-dev': 'https://hizasc.pagekite.me', // Replace with actual URL
  'lead-generator': 'https://hizasc.pagekite.me/hizasco/manage/market' // Replace with actual URL
};

// ============ YOUTUBE VIDEO CONFIGURATION ============
const videoIds = {
  'zaichat': 'u-GumWIBkPk',
  'hizasco-cloud': '',
  'site-tester': 'SQBAEFa4rkk',
  'zaiki': '',
  'vault-gard': '7QsT6Kws6PE',
  'hizasco-dev': '3lKVdVzD3y8',
  'lead-generator': ''
};

const projectNames = {
  'zaichat': 'ZAICHAT',
  'hizasco-cloud': 'HIZASCO CLOUD',
  'site-tester': 'HIZASCO SITE TESTER',
  'zaiki': 'ZAIKI',
  'vault-gard': 'VAULT GARD',
  'hizasco-dev': 'HIZASCO DEV',
  'lead-generator': 'HIZASCO LEAD GENERATOR'
};

function openVideoModal(projectKey) {
  const videoId = videoIds[projectKey] || '3lKVdVzD3y8';
  const iframe = document.getElementById('demoVideoIframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  document.getElementById('videoProjectName').textContent = projectNames[projectKey] || projectKey;
  document.getElementById('videoModal').classList.add('active');
}

function closeVideoModal() {
  document.getElementById('videoModal').classList.remove('active');
  document.getElementById('demoVideoIframe').src = '';
}

// ============ PREVIEW FUNCTION - OPENS ACTUAL URL ============
function openPreview(projectKey) {
  const url = projectPreviewUrls[projectKey];
  if (url) {
    window.open(url, '_blank');
  } else {
    // Fallback if no URL is set
    alert('Preview URL not configured for this project yet.');
  }
}

// Keep the old modal function for backward compatibility if needed
function openPreviewModal() {
  document.getElementById('previewModal').classList.add('active');
}

function closePreviewModal() {
  document.getElementById('previewModal').classList.remove('active');
}

window.addEventListener('click', function(e) {
  if (e.target === document.getElementById('previewModal')) closePreviewModal();
  if (e.target === document.getElementById('videoModal')) closeVideoModal();
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closePreviewModal();
    closeVideoModal();
    closeLightbox();
  }
  if (e.key === 'ArrowLeft' && lightboxProject) lightboxNav(-1);
  if (e.key === 'ArrowRight' && lightboxProject) lightboxNav(1);
});

window.addEventListener('DOMContentLoaded', initGalleries);