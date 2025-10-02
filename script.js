document.getElementById('year').textContent = new Date().getFullYear();
(function(){
  const now = new Date();
  const deadline = new Date(now.getTime() + 7*24*60*60*1000);
  const cdElem = document.getElementById('countdown');
  function pad(n){ return n.toString().padStart(2,'0'); }
  function updateCountdown(){
    const t = deadline - new Date();
    if (t <= 0){
      cdElem.textContent = "Promo berakhir";
      clearInterval(interval);
      return;
    }
    const days = Math.floor(t / (1000*60*60*24));
    const hours = Math.floor((t / (1000*60*60)) % 24);
    const minutes = Math.floor((t / (1000*60)) % 60);
    const seconds = Math.floor((t / 1000) % 60);
    cdElem.textContent = `${pad(days)}d : ${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;
  }
  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
})();
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if (target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
const sections = document.querySelectorAll('.animate-fade-in, .animate-zoom-in, .animate-slide-left, .animate-slide-right, .animate-bounce-in');
const observerOptions = {
  threshold: 0.1
};
const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
sections.forEach(section => {
  section.style.animationPlayState = 'paused';
  sectionObserver.observe(section);
});
const heroImageContainer = document.querySelector('.hero-image-container');
const heroImage = document.querySelector('.hero-image');
const imageFiles = Array.from({ length: 14 }, (_, i) => `${i + 1}.jpg`);
let currentIndex = 0;
function changeHeroImage() {
  heroImage.style.opacity = 0;
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % imageFiles.length;
    heroImage.src = imageFiles[currentIndex];
    heroImage.style.opacity = 1;
  }, 500);
}
setInterval(changeHeroImage, 3000);