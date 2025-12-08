(function() {
    function addSalvonixFooter() {
        const existingPoweredBy = document.querySelector('.powered-by a[href*="salvonixtech"]');
        if (existingPoweredBy) return;
        
        const copyrightElement = document.querySelector('.copyright');
        if (!copyrightElement) return;
        
        const existingPoweredByElement = copyrightElement.parentElement.querySelector('.powered-by');
        if (existingPoweredByElement) return;
        
        const poweredBy = document.createElement('p');
        poweredBy.className = 'powered-by';
        poweredBy.style.cssText = 'margin-top: 10px; font-size: 0.9em; color: rgba(255, 255, 255, 0.7);';
        poweredBy.innerHTML = 'Powered by <a href="https://salvonixtech.net" target="_blank" rel="noopener noreferrer" style="color: rgba(255, 255, 255, 0.8); text-decoration: none;">SalvonixTech</a>';
        
        copyrightElement.insertAdjacentElement('afterend', poweredBy);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addSalvonixFooter);
    } else {
        addSalvonixFooter();
    }
})();
