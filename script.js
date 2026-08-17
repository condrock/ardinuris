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

    if (bgMusic) {
      bgMusic.play().catch(() => {});
    }
    if (toggleMusicBtn) toggleMusicBtn.hidden = false;

    setTimeout(() => {
      cover.hidden = true;
      cover.style.display = 'none';
      mainContent.hidden = false;
      profilSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800);
  });

  // ===== TOGGLE MUSIK =====
  if (toggleMusicBtn && bgMusic) {
    toggleMusicBtn.addEventListener('click', () => {
      if (bgMusic.paused) {
        bgMusic.play();
        musicIcon.textContent = 'music_note';
      } else {
        bgMusic.pause();
        musicIcon.textContent = 'music_off';
      }
    });
  }

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

  // ===== TANDA KASIH =====
  const giftToggle = document.getElementById('giftToggle');
  const giftDetail = document.getElementById('giftDetail');
  const copyRekBtn = document.getElementById('copyRek');
  const rekNumber = document.getElementById('rekNumber');

  if (giftToggle && giftDetail) {
    giftToggle.addEventListener('click', () => {
      const isHidden = giftDetail.hidden;
      giftDetail.hidden = !isHidden;
      giftToggle.setAttribute('aria-expanded', String(isHidden));
    });
  }

  if (copyRekBtn && rekNumber) {
    copyRekBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(rekNumber.textContent.trim()).then(() => {
        const originalHTML = copyRekBtn.innerHTML;
        copyRekBtn.classList.add('copied');
        copyRekBtn.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">check</span> Tersalin';
        setTimeout(() => {
          copyRekBtn.innerHTML = originalHTML;
          copyRekBtn.classList.remove('copied');
        }, 2000);
      });
    });
  }
});