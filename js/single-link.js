document.addEventListener('DOMContentLoaded', function() {
    const targetText = 'En Alpine Ski Academy';
    const allLinks = document.querySelectorAll('a');
    const matchingLinks = [];
    
    allLinks.forEach(function(link) {
        if (link.textContent.trim() === targetText) {
            matchingLinks.push(link);
        }
    });
    
    if (matchingLinks.length > 1) {
        const randomIndex = Math.floor(Math.random() * matchingLinks.length);
        
        matchingLinks.forEach(function(link, index) {
            if (index !== randomIndex) {
                const textNode = document.createTextNode(link.textContent);
                link.parentNode.replaceChild(textNode, link);
            }
        });
    }
});
