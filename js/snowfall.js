(function() {
    'use strict';
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();
    
    const isWinterMonth = (
        (currentMonth === 10 && currentDay >= 20) ||
        currentMonth === 11 ||
        currentMonth === 0 ||
        currentMonth === 1
    );
    
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
            transition: opacity 0.3s ease;
        }
        
        .snowfall-container.hidden {
            opacity: 0;
            visibility: hidden;
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
        
        .snow-toggle-btn {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #4a9eff 0%, #1e7fd9 100%);
            border: 2px solid #fff;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            transition: all 0.3s ease;
            pointer-events: auto;
        }
        
        .snow-toggle-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        
        .snow-toggle-btn.disabled {
            background: linear-gradient(135deg, #888 0%, #666 100%);
        }
        
        .snow-toggle-btn .icon {
            transition: transform 0.3s ease;
        }
        
        .snow-toggle-btn:hover .icon {
            transform: rotate(20deg);
        }
        
        @media (max-width: 768px) {
            .snow-toggle-btn {
                width: 44px;
                height: 44px;
                font-size: 20px;
                bottom: 15px;
                left: 15px;
            }
        }
    `;
    document.head.appendChild(style);
    
    let snowfallEnabled = localStorage.getItem('snowfallEnabled') === 'true';
    let container = null;
    let snowInterval = null;
    
    function createToggleButton() {
        const btn = document.createElement('button');
        btn.className = 'snow-toggle-btn' + (snowfallEnabled ? '' : ' disabled');
        btn.id = 'snow-toggle';
        btn.title = snowfallEnabled ? 'Desactivar nieve' : 'Activar nieve';
        btn.innerHTML = '<span class="icon">❄</span>';
        btn.setAttribute('aria-label', snowfallEnabled ? 'Desactivar efecto de nieve' : 'Activar efecto de nieve');
        
        btn.addEventListener('click', toggleSnowfall);
        document.body.appendChild(btn);
    }
    
    function toggleSnowfall() {
        snowfallEnabled = !snowfallEnabled;
        localStorage.setItem('snowfallEnabled', snowfallEnabled);
        
        const btn = document.getElementById('snow-toggle');
        if (btn) {
            btn.classList.toggle('disabled', !snowfallEnabled);
            btn.title = snowfallEnabled ? 'Desactivar nieve' : 'Activar nieve';
            btn.setAttribute('aria-label', snowfallEnabled ? 'Desactivar efecto de nieve' : 'Activar efecto de nieve');
        }
        
        if (container) {
            container.classList.toggle('hidden', !snowfallEnabled);
        }
        
        if (snowfallEnabled && container) {
            startSnowfall();
        } else if (!snowfallEnabled) {
            stopSnowfall();
        }
    }
    
    function startSnowfall() {
        if (snowInterval) return;
        
        const snowflakeChars = ['❄', '❅', '❆', '•', '◦'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                if (snowfallEnabled) {
                    createSnowflake(container, snowflakeChars);
                }
            }, i * 200);
        }
        
        snowInterval = setInterval(() => {
            if (snowfallEnabled && container && container.children.length < 60) {
                createSnowflake(container, snowflakeChars);
            }
        }, 300);
    }
    
    function stopSnowfall() {
        if (snowInterval) {
            clearInterval(snowInterval);
            snowInterval = null;
        }
    }
    
    function createSnowfall() {
        container = document.createElement('div');
        container.className = 'snowfall-container' + (snowfallEnabled ? '' : ' hidden');
        container.id = 'snowfall';
        document.body.appendChild(container);
        
        createToggleButton();
        
        if (snowfallEnabled) {
            startSnowfall();
        }
    }
    
    function createSnowflake(container, chars) {
        if (!container || !snowfallEnabled) return;
        
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
