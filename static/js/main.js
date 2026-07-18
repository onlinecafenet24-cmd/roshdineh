function toggleMobile() {
    document.getElementById('mobileMenu').classList.toggle('open');
}

const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function toPersianNum(num) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num).replace(/\d/g, d => persianDigits[d]);
}

function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const isDecimal = el.dataset.decimal === 'true';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;

        if (isDecimal) {
            el.textContent = toPersianNum(current.toFixed(1));
        } else {
            el.textContent = toPersianNum(Math.round(current).toLocaleString('en-US').replace(/,/g, '٬'));
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (isDecimal) {
                el.textContent = toPersianNum(target.toFixed(1));
            } else {
                el.textContent = toPersianNum(target.toLocaleString('en-US').replace(/,/g, '٬'));
            }
        }
    }
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

(function buildChart() {
    const container = document.getElementById('miniChart');
    if (!container) return;
    const values = [35, 42, 38, 55, 48, 62, 58, 72, 65, 78, 85, 92];
    const months = ['فرو', 'ارد', 'خرد', 'تیر', 'مرد', 'شهر', 'مهر', 'آبا', 'آذر', 'دی', 'بهم', 'اسف'];
    const max = Math.max(...values);

    values.forEach((val, i) => {
        const bar = document.createElement('div');
        bar.className = 'mini-bar' + (i >= 9 ? ' active' : '');
        bar.style.height = '0%';
        bar.innerHTML = `<span class="mini-bar-label">${months[i]}</span>`;
        container.appendChild(bar);
        setTimeout(() => {
            bar.style.height = (val / max * 100) + '%';
        }, 300 + i * 80);
    });
})();

function showToast(message) {
    const toast = document.getElementById('toast');
    const text = document.getElementById('toastText');
    text.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id === '#') return;
        e.preventDefault();
        const target = document.querySelector(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const caseCards = document.querySelectorAll('.case-card');
if (filterButtons.length) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            caseCards.forEach(card => {
                const tags = card.dataset.tags || '';
                const shouldShow = filter === 'all' || tags.includes(filter);
                card.classList.toggle('is-hidden', !shouldShow);
            });
        });
    });
}

const serviceCards = document.querySelectorAll('[data-service-card]');
serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('active');
    });
});
