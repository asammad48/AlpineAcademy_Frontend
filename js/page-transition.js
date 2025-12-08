(function() {
    function createLoader() {
        if (document.getElementById('pageLoader')) return;
        
        const loader = document.createElement('div');
        loader.id = 'pageLoader';
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner">
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                </div>
                <div class="loader-text">Alpine Ski Academy</div>
            </div>
        `;
        document.body.appendChild(loader);
    }
    
    function showLoader() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.classList.add('loader-active');
        }
    }
    
    function hideLoader() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.classList.remove('loader-active');
        }
    }
    
    function addPageTransition() {
        document.body.classList.add('page-transition-ready');
        
        setTimeout(() => {
            document.body.classList.add('page-loaded');
        }, 100);
    }
    
    function handleLinkClick(e) {
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        if (!href) return;
        
        if (href.startsWith('#') || 
            href.startsWith('mailto:') || 
            href.startsWith('tel:') || 
            href.startsWith('https://wa.me') ||
            href.startsWith('http://') && !href.includes(window.location.hostname) ||
            href.startsWith('https://') && !href.includes(window.location.hostname) ||
            link.hasAttribute('target') && link.getAttribute('target') === '_blank' ||
            link.classList.contains('no-transition')) {
            return;
        }
        
        e.preventDefault();
        
        document.body.classList.remove('page-loaded');
        document.body.classList.add('page-leaving');
        showLoader();
        
        setTimeout(() => {
            window.location.href = href;
        }, 300);
    }
    
    function init() {
        createLoader();
        addPageTransition();
        
        document.addEventListener('click', handleLinkClick);
        
        window.addEventListener('pageshow', function(e) {
            if (e.persisted) {
                hideLoader();
                document.body.classList.remove('page-leaving');
                document.body.classList.add('page-loaded');
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    window.addEventListener('load', function() {
        hideLoader();
    });
})();
