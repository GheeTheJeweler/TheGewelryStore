document.addEventListener('DOMContentLoaded', function() {
    console.log('Navigation script loaded');
    
    const currentFile = window.location.href;
    console.log('Current file:', currentFile);
      let currentPage = 'home';
    if (currentFile.includes('/shop/')) currentPage = 'shop';
    else if (currentFile.includes('/photos/')) currentPage = 'photos';
    else if (currentFile.includes('/contact/')) currentPage = 'contact';
    console.log('Current page:', currentPage);
      const inSubDir = currentFile.includes('/shop/') || currentFile.includes('/photos/') || currentFile.includes('/contact/');
    const iconPath = inSubDir ? '../icon.png' : './icon.png';    function getNavLink(page) {
        if (inSubDir) {
            switch(page) {
                case 'home': return '../';
                case 'shop': return '../shop/';
                case 'photos': return '../photos/';
                case 'contact': return '../contact/';
                default: return '../';
            }
        } else {
            switch(page) {
                case 'home': return './';
                case 'shop': return './shop/';
                case 'photos': return './photos/';
                case 'contact': return './contact/';
                default: return './';
            }        
        }
    }
    
    const sidebarNav = `
        <nav class="w3-sidebar w3-bar-block w3-small w3-hide-small w3-center">
          <img src="${iconPath}" style="width:100%">
          <a href="${getNavLink('home')}" class="w3-bar-item w3-button w3-padding-large ${currentPage === 'home' ? 'nav-active' : 'w3-hover-black'}">
            <i class="fa fa-home w3-xxlarge"></i>
            <p>HOME</p>
          </a>
          <a href="${getNavLink('shop')}" class="w3-bar-item w3-button w3-padding-large ${currentPage === 'shop' ? 'nav-active' : 'w3-hover-black'}">
            <i class="fa fa-shopping-cart w3-xxlarge"></i>
            <p>SHOP</p>
          </a>
          <a href="${getNavLink('photos')}" class="w3-bar-item w3-button w3-padding-large ${currentPage === 'photos' ? 'nav-active' : 'w3-hover-black'}">
            <i class="fa fa-camera w3-xxlarge"></i>
            <p>PHOTOS</p>
          </a>
          <a href="${getNavLink('contact')}" class="w3-bar-item w3-button w3-padding-large ${currentPage === 'contact' ? 'nav-active' : 'w3-hover-black'}">
            <i class="fa fa-envelope w3-xxlarge"></i>
            <p>CONTACT</p>
          </a>        </nav>`;      
    const mobileNav = `
        <div class="w3-top w3-hide-large w3-hide-medium" id="myNavbar">
          <div class="w3-bar w3-black w3-center w3-small">            <a href="${getNavLink('home')}" class="w3-bar-item w3-button ${currentPage === 'home' ? 'nav-active' : ''}" style="width:25% !important">HOME</a>
            <a href="${getNavLink('shop')}" class="w3-bar-item w3-button ${currentPage === 'shop' ? 'nav-active' : ''}" style="width:25% !important">SHOP</a>
            <a href="${getNavLink('photos')}" class="w3-bar-item w3-button ${currentPage === 'photos' ? 'nav-active' : ''}" style="width:25% !important">PHOTOS</a>
            <a href="${getNavLink('contact')}" class="w3-bar-item w3-button ${currentPage === 'contact' ? 'nav-active' : ''}" style="width:25% !important">CONTACT</a>
          </div>        </div>`;
    
    document.body.insertAdjacentHTML('afterbegin', sidebarNav + mobileNav);    console.log('Navigation injected successfully');
    
    initializeEasterEggs();
});

// EASTER EGG FUNCTIONS

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

function initializeEasterEggs() {
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > 10) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === 10 && konamiCode.join(',') === konamiSequence.join(',')) {
            triggerSecretMode();
            konamiCode = [];
        }
    });
    
    setTimeout(() => {
        setupLogoClicker();
    }, 500);
    
    addTimeBasedMessage();
}

function triggerSecretMode() {
    document.body.style.background = 'linear-gradient(45deg,rgb(172, 109, 51),rgb(23, 70, 162),rgb(50, 35, 145), #27ae60, #e67e22, #8e44ad)';
    document.body.style.backgroundSize = '400% 400%';
    document.body.style.animation = 'rainbow 3s ease infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }        .sparkle {
            position: fixed;
            pointer-events: none;
            font-size: 24px;
            animation: sparkleFloat 4s linear forwards;
            z-index: 9999;
        }
        @keyframes sparkleFloat {
            0% { 
                transform: translateY(0px) rotate(0deg) scale(1); 
                opacity: 0; 
            }
            10% { 
                opacity: 1; 
            }
            90% { 
                opacity: 0.8; 
            }
            100% { 
                transform: translateY(-100vh) rotate(360deg) scale(0.5); 
                opacity: 0; 
            }
        }    `;
    document.head.appendChild(style);
    
    startContinuousSparkles();
    
    setTimeout(() => {
        alert('🎉✨ SECRET MODE ACTIVATED! ✨🎉\n\nYou found the Konami Code!\nThe Gewelry Store is now EXTRA sparkly! 💎\n\nIf you don\'t like it or something, it\'ll go away when you refresh your page, but only boring people don\'t like sparkles.\n\nWhat did you expect? It\'s a jewelry store, the entire reason for showing up is to see things that are sparkly and shiny, so I\'m doing you a favor and giving you what you wanted!');
    }, 1000);
}

function createSparkle() {
    const sparkles = ['✨', '⭐', '🌟', '💎', '💍', '👑'];
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 2000);
}

function createFloatingSparkle() {    const sparkles = ['✨', '⭐', '🌟', '💎', '💍', '👑', '💫', '🔸', '🔹', '💠'];
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    
    sparkle.style.left = Math.random() * (window.innerWidth - 50) + 'px';
    sparkle.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.remove();
        }
    }, 4000);
}

let sparkleInterval;

function startContinuousSparkles() {
    if (sparkleInterval) {
        clearInterval(sparkleInterval);
    }
    
    sparkleInterval = setInterval(() => {
        createFloatingSparkle();
    }, 300);
}

function createPermanentSparkle() {
    createFloatingSparkle();
}

let logoClicks = 0;
const secretMessages = [
    "💎 That's some serious dedication!",
    "🔍 You're really exploring every pixel!",
    "✨ The jewelry appreciates your attention!",
    "👑 You've got the eye of a true gem hunter!",
    "🎯 Ten clicks! You're persistent!",
    "🏆 ULTIMATE CLICKER ACHIEVED! 🏆"
];

function setupLogoClicker() {
    const logo = document.querySelector('.w3-sidebar img');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            logoClicks++;
            
            if (logoClicks === 5 || logoClicks === 10 || logoClicks === 15 || logoClicks === 20) {
                const messageIndex = Math.min(Math.floor(logoClicks / 5) - 1, secretMessages.length - 1);
                showSecretMessage(secretMessages[messageIndex]);
            }
        });
    }
}

function showSecretMessage(messageText) {
    // Create floating message
    const message = document.createElement('div');
    message.textContent = messageText;
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.9);
        color: #gold;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 18px;
        z-index: 9999;
        animation: fadeInOut 3s ease-in-out forwards;
        text-align: center;
        border: 2px solid #ffd700;
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
    `;
    
    // Add animation CSS if not already added
    if (!document.querySelector('#fadeInOutStyle')) {
        const fadeStyle = document.createElement('style');
        fadeStyle.id = 'fadeInOutStyle';
        fadeStyle.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            }
        `;
        document.head.appendChild(fadeStyle);
    }
    
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
}

function addTimeBasedMessage() {
    const hour = new Date().getHours();
    let message = '';
    
    if (hour >= 2 && hour < 6) {
        message = "🌙 Wow, you're up late! Shopping for midnight sparkles? ✨";
    } else if (hour >= 6 && hour < 12) {
        message = "🌅 Good morning, early bird! The best gems are found by those who rise early! 💎";
    } else if (hour >= 12 && hour < 17) {
        message = "☀️ Perfect afternoon for some jewelry browsing! ☀️";
    } else if (hour >= 17 && hour < 21) {
        message = "🌆 Evening glow calls for evening jewelry! ✨";
    } else if (hour >= 21 || hour < 2) {
        message = "🌟 Night owl spotted! Perfect time for some sparkling discoveries! 🦉";
    }
    
    if (message) {
        console.log(`%c${message}`, 'color: #ffd700; font-size: 14px; font-weight: bold; text-shadow: 1px 1px 2px #000;');
    }
}
