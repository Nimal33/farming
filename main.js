import translations from './translations.js';

document.addEventListener('DOMContentLoaded', () => {
    // 0. Language Handling
    let currentLang = localStorage.getItem('lang') || 'en';

    const applyTranslations = (lang) => {
        const trans = translations[lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (trans[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = trans[key];
                } else {
                    el.innerHTML = trans[key];
                }
            }
        });

        const langBtn = document.getElementById('langToggle');
        if (langBtn) langBtn.innerText = trans.lang_btn;
        document.documentElement.lang = lang;
    };

    const toggleLanguage = () => {
        currentLang = currentLang === 'en' ? 'ta' : 'en';
        localStorage.setItem('lang', currentLang);
        applyTranslations(currentLang);
    };

    const langToggleBtn = document.getElementById('langToggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', toggleLanguage);
    }

    // Apply initial language
    applyTranslations(currentLang);

    // 1. Farmer Form Handling
    const farmerForm = document.getElementById('farmerForm');
    if (farmerForm) {
        farmerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('fName').value;
            const mobile = document.getElementById('fMobile').value;
            const location = document.getElementById('fLocation').value;
            const workType = document.getElementById('fWorkType').value;
            const count = document.getElementById('fCount').value;
            const wage = document.getElementById('fWage').value;
            const date = document.getElementById('fDate').value;

            // WhatsApp Message Generation (Localized)
            let message = '';
            if (currentLang === 'ta') {
                message = `வணக்கம், எனக்கு ${count} பேர் ${workType} வேலைக்கு வேணும்.\n\n` +
                    `📍 இடம்: ${location}\n` +
                    `💰 தினக்கூலி: ₹${wage}\n` +
                    `📅 தொடக்க தேதி: ${date}\n` +
                    `👤 விவசாயி பெயர்: ${name}\n` +
                    `📞 தொடர்பு: ${mobile}\n\n` +
                    `திருச்சி பண்ணை தொழிலாளர் இணைப்பு தளம் வழியாக அனுப்பப்பட்டது.`;
            } else {
                message = `Vanakkam, I need ${count} workers for ${workType} work.\n\n` +
                    `📍 Location: ${location}\n` +
                    `💰 Daily Wage: ₹${wage}\n` +
                    `📅 Start Date: ${date}\n` +
                    `👤 Farmer Name: ${name}\n` +
                    `📞 Contact: ${mobile}\n\n` +
                    `Sent via Trichy Farm Labour Connect Platform.`;
            }

            const whatsappUrl = `https://wa.me/919943213010?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // 2. Worker Form Handling
    const workerForm = document.getElementById('workerForm');
    if (workerForm) {
        workerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('wName').value;
            const mobile = document.getElementById('wMobile').value;
            const skill = document.getElementById('wSkill').value;
            const exp = document.getElementById('wExp').value;

            let message = '';
            if (currentLang === 'ta') {
                message = `தொழிலாளர் பதிவு:\n\n` +
                    `👤 பெயர்: ${name}\n` +
                    `📞 செல்போன்: ${mobile}\n` +
                    `🛠 திறன்: ${skill}\n` +
                    `🚀 அனுபவம்: ${exp} ஆண்டுகள்\n\n` +
                    `நான் திருச்சி பகுதியில் பண்ணை வேலை தேடுகிறேன்.`;
            } else {
                message = `Registering as Worker:\n\n` +
                    `👤 Name: ${name}\n` +
                    `📞 Mobile: ${mobile}\n` +
                    `🛠 Skill: ${skill}\n` +
                    `🚀 Experience: ${exp} Years\n\n` +
                    `I am looking for farm work in Trichy area.`;
            }

            const whatsappUrl = `https://wa.me/919943213010?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // 3. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });

    // 5. View More Jobs Toggle
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const extraJobs = document.getElementById('extraJobs');

    if (viewMoreBtn && extraJobs) {
        viewMoreBtn.addEventListener('click', () => {
            const isHidden = extraJobs.classList.contains('d-none');

            if (isHidden) {
                extraJobs.classList.remove('d-none');
                viewMoreBtn.setAttribute('data-i18n', 'btn_viewLess');
            } else {
                extraJobs.classList.add('d-none');
                viewMoreBtn.setAttribute('data-i18n', 'btn_viewMore');
            }

            // Re-apply translations to update button text
            const trans = translations[currentLang];
            const key = viewMoreBtn.getAttribute('data-i18n');
            viewMoreBtn.innerText = trans[key];
        });
    }
});
