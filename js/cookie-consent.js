(function() {
    const COOKIE_CONSENT_KEY = 'alpine_cookie_consent';
    
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
    
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
    }
    
    function hasConsented() {
        return getCookie(COOKIE_CONSENT_KEY) === 'accepted';
    }
    
    function acceptCookies() {
        setCookie(COOKIE_CONSENT_KEY, 'accepted', 365);
        hideBanner();
    }
    
    function hideBanner() {
        const banner = document.getElementById('cookieConsentBanner');
        if (banner) {
            banner.classList.add('cookie-banner-hidden');
            setTimeout(() => banner.remove(), 300);
        }
    }
    
    function getTranslations() {
        const lang = document.documentElement.lang || 'es';
        const translations = {
            es: {
                message: 'Utilizamos cookies para mejorar tu experiencia en nuestra web. Al continuar navegando, aceptas el uso de cookies.',
                accept: 'Aceptar',
                moreInfo: 'Más información'
            },
            en: {
                message: 'We use cookies to improve your experience on our website. By continuing to browse, you accept the use of cookies.',
                accept: 'Accept',
                moreInfo: 'More information'
            },
            fr: {
                message: 'Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant à naviguer, vous acceptez l\'utilisation des cookies.',
                accept: 'Accepter',
                moreInfo: 'Plus d\'informations'
            },
            ca: {
                message: 'Utilitzem cookies per millorar la teva experiència al nostre web. En continuar navegant, acceptes l\'ús de cookies.',
                accept: 'Acceptar',
                moreInfo: 'Més informació'
            },
            pt: {
                message: 'Utilizamos cookies para melhorar a sua experiência no nosso site. Ao continuar a navegar, aceita o uso de cookies.',
                accept: 'Aceitar',
                moreInfo: 'Mais informações'
            }
        };
        return translations[lang] || translations['es'];
    }
    
    function getCookiePolicyUrl() {
        const lang = document.documentElement.lang || 'es';
        const urls = {
            es: '/politica-de-cookies',
            en: '/en/cookie-policy',
            fr: '/fr/politique-de-cookies',
            ca: '/ca/politica-de-cookies',
            pt: '/pt/politica-de-cookies'
        };
        return urls[lang] || urls['es'];
    }
    
    function createBanner() {
        if (hasConsented()) return;
        
        const t = getTranslations();
        const policyUrl = getCookiePolicyUrl();
        
        const banner = document.createElement('div');
        banner.id = 'cookieConsentBanner';
        banner.className = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <p class="cookie-consent-text">${t.message}</p>
                <div class="cookie-consent-buttons">
                    <a href="${policyUrl}" class="cookie-consent-link">${t.moreInfo}</a>
                    <button id="acceptCookies" class="cookie-consent-accept">${t.accept}</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        setTimeout(() => banner.classList.add('cookie-banner-visible'), 100);
        
        document.getElementById('acceptCookies').addEventListener('click', acceptCookies);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createBanner);
    } else {
        createBanner();
    }
})();
