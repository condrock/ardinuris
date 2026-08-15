document.addEventListener('DOMContentLoaded', () => {
  const cover = document.getElementById('cover');
  const openBtn = document.getElementById('openInvitation');
  const mainContent = document.getElementById('mainContent');
  const profilSection = document.getElementById('profil');
  const bgMusic = document.getElementById('bgMusic');
  const toggleMusicBtn = document.getElementById('toggleMusic');
  const musicIcon = document.getElementById('musicIcon');

  // ===== BUKA UNDANGAN =====
  openBtn.addEventListener('click', () => {
    cover.classList.add('fade-out');

    // mulai musik otomatis karena diinisiasi dari klik user
    bgMusic.play().catch(() => {
      // jika tetap diblokir browser, tombol manual tetap tersedia
    });
    toggleMusicBtn.hidden = false;

    setTimeout(() => {
      cover.hidden = true;
      cover.style.display = 'none'; // paksa hilang dari flow
      mainContent.hidden = false;
      profilSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800);
  });

  // ===== TOGGLE MUSIK =====
  toggleMusicBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicIcon.textContent = 'music_note';
    } else {
      bgMusic.pause();
      musicIcon.textContent = 'music_off';
    }
  });

  // ===== COUNTDOWN =====
  const targetDate = new Date('2026-08-26T00:00:00+07:00').getTime();
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function pad(num) {
    return String(num).padStart(2, '0');
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
});