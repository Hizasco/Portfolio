// ============ IMAGE CONFIGURATION ============
const projectImages = {
  'zaichat': [
    'media/zaichat1.png',
    'media/zaichat2.png',
    'media/zaichat3.png',
    'media/zaichat4.png',
    'media/zaichat5.png',
    'media/zaichat6.png',
    'media/zaichat7.png',
    'media/zaichat8.png',
    'media/zaichat9.png',
    'media/zaichat10.png',
    'media/zaichat11.png',
    'media/zaichat12.png',
    'media/zaichat13.png',
    'media/zaichat14.png',
    'media/zaichat15.png',
    'media/zaichat16.png',
    'media/zaichat17.png',
    'media/zaichat18.png',
    'media/zaichat19.png',
    'media/zaichat20.png',
    'media/zaichat21.png',
    'media/zaichat22.png',
    'media/zaichat23.png',
    'media/zaichat24.png',
    'media/zaichat25.png',
    'media/zaichat26.png',
    'media/zaichat27.png'
  ],
  'hizasco-cloud': [
    'https://lh3.googleusercontent.com/d/1KvwY1o4j71AMtvtQxb-dPah6JkEzhk9m=w800',
    'https://lh3.googleusercontent.com/d/1gMCf0iHLlKa4_1KjPTGr1u0cbPWaeQSW=w800',
    'https://lh3.googleusercontent.com/d/1exrtC8lHE9xy8aCpjt3cxJvCe99P8MPp=w800',
    'https://lh3.googleusercontent.com/d/12idVzadWiBFow7hxx6Zqvn8t8Y5xgLTa=w800',
    'https://lh3.googleusercontent.com/d/1T_uvOQdSiLat5OKWjdtQmQw1DVC5J4Ei=w800'
  ],
  'site-tester': [
    'media/tester1.png',
    'media/tester2.png'
  ],
  'zaiki': [
    'media/zaiki-1.jpg',
    'media/zaiki-2.jpg',
    'media/zaiki-3.jpg',
    'media/zaiki-4.jpg'
  ],
  'vault-gard': [
    'media/vault-1.png',
    'media/vault-2.png',
    'media/vault-3.png',
    'media/vault-4.png',
    'media/vault-5.png',
    'media/vault-6.png',
    'media/vault-7.png'
  ],
  'hizasco-dev': [
    'media/dev-1.png',
    'media/dev-2.png',
    'media/dev-3.png',
    'media/dev-4.png',
    'media/dev-5.png',
    'media/dev-6.png',
    'media/dev-7.png',
    'media/dev-8.png',
    'media/dev-9.png',
    'media/dev-10.png',
    'media/dev-11.png',
    'media/dev-12.png',
    'media/dev-13.png',
    'media/dev-14.png',
    'media/dev-15.png',
    'media/dev-16.png',
    'media/dev-17.png',
    'media/dev-18.png',
    'media/dev-19.png',
    'media/dev-20.png',
    'media/dev-21.png',
    'media/dev-22.png'
  ],
  'lead-generator': [
    'media/leads-1.png',
		'media/leads-2.png',
    'media/leads-3.png',
    'media/leads-4.png',
    'media/leads-5.png'
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