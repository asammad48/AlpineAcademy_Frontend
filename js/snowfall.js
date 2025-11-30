(function() {
    'use strict';
    
    const currentMonth = new Date().getMonth();
    const isWinterMonth = (currentMonth === 11 || currentMonth === 0 || currentMonth === 1);
    
    if (!isWinterMonth) {
        return;
    }
    
    const style = document.createElement('style');
    style.textContent = `
        .snowfall-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        }
        
        .snowflake {
            position: absolute;
            top: -10px;
            color: #fff;
            font-size: 1em;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
            animation: fall linear infinite;
            opacity: 0.8;
            user-select: none;
        }
        
        @keyframes fall {
            0% {
                transform: translateY(-10px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0.3;
            }
        }
        
        @keyframes sway {
            0%, 100% {
                margin-left: 0;
            }
            25% {
                margin-left: 15px;
            }
            75% {
                margin-left: -15px;
            }
        }
    `;
    document.head.appendChild(style);
    
    function createSnowfall() {
        const container = document.createElement('div');
        container.className = 'snowfall-container';
        container.id = 'snowfall';
        document.body.appendChild(container);
        
        const snowflakeChars = ['❄', '❅', '❆', '•', '◦'];
        const snowflakeCount = 50;
        
        for (let i = 0; i < snowflakeCount; i++) {
            setTimeout(() => {
                createSnowflake(container, snowflakeChars);
            }, i * 200);
        }
        
        setInterval(() => {
            if (container.children.length < 60) {
                createSnowflake(container, snowflakeChars);
            }
        }, 300);
    }
    
    function createSnowflake(container, chars) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = chars[Math.floor(Math.random() * chars.length)];
        
        const size = Math.random() * 1 + 0.5;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 2;
        
        snowflake.style.left = left + '%';
        snowflake.style.fontSize = size + 'em';
        snowflake.style.animationDuration = duration + 's';
        snowflake.style.animationDelay = delay + 's';
        snowflake.style.animation = `fall ${duration}s linear ${delay}s, sway ${duration / 2}s ease-in-out ${delay}s infinite`;
        
        container.appendChild(snowflake);
        
        setTimeout(() => {
            if (snowflake.parentNode) {
                snowflake.remove();
            }
        }, (duration + delay) * 1000);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createSnowfall);
    } else {
        createSnowfall();
    }
})();
