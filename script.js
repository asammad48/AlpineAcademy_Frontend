// Toggle FAQ answers - Global function for inline onclick handlers
function toggleFaq(element) {
    // Get the answer element
    const answer = element.nextElementSibling;
    
    // Toggle active class for smooth animation
    answer.classList.toggle('active');
    
    // Toggle chevron icon
    const icon = element.querySelector('i');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
}

// Bootstrap & jQuery JS
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize FAQ items - Make sure all FAQ answers start as hidden
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.classList.remove('active');
    });
    
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('shadow-sm').css('padding', '10px 0');
            $('.navbar-brand img').css('height', '40px');
        } else {
            $('.navbar').removeClass('shadow-sm').css('padding', '15px 0');
            $('.navbar-brand img').css('height', '50px');
        }
        
        // Check if why-us section is in view for counter animation
        checkCounterAnimation();
    });
    
    // Smooth scrolling for anchor links (only same-page anchors)
    $('a[href^="#"]').on('click', function(e) {
        const href = $(this).attr('href');
        
        // Only prevent default for same-page anchors (#section)
        // Don't prevent for links to other pages with anchors (/page.html#section)
        if (href.startsWith('#') && href.length > 1) {
            const target = $(href);
            if (target.length) {
                e.preventDefault();
                $('html, body').animate(
                    {
                        scrollTop: target.offset().top - 70,
                    },
                    500,
                    'linear'
                );
            }
        }
    });

    // Counter animation functionality
    let countersAnimated = false;
    
    function checkCounterAnimation() {
        if (countersAnimated) return;
        
        const whyUsSection = $('#why-us');
        
        // Check if why-us section exists on this page
        if (!whyUsSection.length) return;
        
        const scrollPos = $(window).scrollTop();
        const whyUsPos = whyUsSection.offset().top;
        const windowHeight = $(window).height();
        
        // If why-us section is in viewport
        if (scrollPos > whyUsPos - windowHeight + 200) {
            animateCounters();
            countersAnimated = true;
        }
    }
    
    function animateCounters() {
        $('.counter-number').each(function() {
            const $this = $(this);
            const target = parseInt($this.data('target'));
            const duration = 300; // 0.3 seconds
            const steps = 30; // Number of animation steps
            const increment = target / steps;
            let current = 0;
            let step = 0;
            
            const timer = setInterval(() => {
                current += increment;
                step++;
                
                if (step >= steps) {
                    $this.text(target.toLocaleString());
                    clearInterval(timer);
                } else {
                    $this.text(Math.round(current).toLocaleString());
                }
            }, duration / steps);
        });
    }
    
    // Initial check in case page is loaded with section already in view
    setTimeout(checkCounterAnimation, 500);
    
    // Scroll to Top Button functionality
    // Create the button element dynamically
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTop';
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.setAttribute('title', 'Back to top');
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button based on scroll position
    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            $('#scrollToTop').addClass('show');
        } else {
            $('#scrollToTop').removeClass('show');
        }
    });
    
    // Scroll to top when button is clicked
    $('#scrollToTop').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 600, 'swing');
    });
});

// Bootstrap dropdown functionality - Click-based behavior for both desktop and mobile
// Bootstrap handles all dropdown behavior natively, no custom JavaScript needed
// Dropdowns open on click thanks to data-bs-toggle="dropdown" attribute