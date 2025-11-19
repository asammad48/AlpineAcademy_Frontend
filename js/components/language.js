// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
  // Function to handle language switching
  function switchLanguage(lang) {
    const currentPath = window.location.pathname;
    
    // Get the current page filename without language prefix
    let pageName = currentPath.split('/').pop() || 'index.html';
    
    // If we're in a language subdirectory, get just the filename
    if (currentPath.includes('/en/') || currentPath.includes('/fr/') || 
        currentPath.includes('/pt/') || currentPath.includes('/ca/')) {
      pageName = currentPath.split('/').pop();
    }
    
    // Default to index.html if no page specified
    if (!pageName || pageName === '' || pageName.endsWith('/')) {
      pageName = 'index.html';
    }
    
    // Build target path based on language
    let targetPath;
    switch(lang) {
      case 'en':
        targetPath = '/en/' + pageName;
        break;
      case 'fr':
        targetPath = '/fr/' + pageName;
        break;
      case 'pt':
        targetPath = '/pt/' + pageName;
        break;
      case 'ca':
        targetPath = '/ca/' + pageName;
        break;
      default:
        // Spanish is in root
        targetPath = '/' + pageName;
    }
    
    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Redirect to the target page
    window.location.href = targetPath;
  }
  
  // Set up language option click handlers
  document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });
  
  // Check for stored language preference
  const preferredLanguage = localStorage.getItem('preferredLanguage');
  if (preferredLanguage) {
    // Update UI to reflect preferred language
    const button = document.querySelector('.language-switcher .dropdown-toggle');
    if (button) {
      button.innerHTML = `<i class="fas fa-globe me-1"></i> ${preferredLanguage.toUpperCase()}`;
    }
    
    document.querySelectorAll('.language-option').forEach(option => {
      option.classList.remove('active');
      if (option.getAttribute('data-lang') === preferredLanguage) {
        option.classList.add('active');
      }
    });
  }
});