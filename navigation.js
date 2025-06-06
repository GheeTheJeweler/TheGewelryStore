document.addEventListener('DOMContentLoaded', function() {
    console.log('Navigation script loaded');
    
    // Try to load navigation instantly from cache
    const quickCache = sessionStorage.getItem('gewelryNavQuick');
    if (quickCache) {
        const navData = JSON.parse(quickCache);
        if (navData.currentPage === getCurrentPage()) {
            document.body.insertAdjacentHTML('afterbegin', navData.html);
            console.log('Navigation loaded instantly from session cache');
            // Continue with full initialization
            initializeAfterCacheLoad();
            return;
        }
    }
    
    // Regular initialization
    initializeNavigation();});

function initializeNavigation() {
    const currentFile = window.location.href;
    console.log('Current file:', currentFile);
    let currentPage = 'home';
    if (currentFile.includes('/shop/')) currentPage = 'shop';
    else if (currentFile.includes('/photos/')) currentPage = 'photos';
    else if (currentFile.includes('/contact/')) currentPage = 'contact';
    console.log('Current page:', currentPage);
      const inSubDir = currentFile.includes('/shop/') || currentFile.includes('/photos/') || currentFile.includes('/contact/');
    const iconPath = inSubDir ? '../icon.png' : './icon.png';    function getNavLink(page) {
        let url;
        if (inSubDir) {
            switch(page) {
                case 'home': url = '../'; break;
                case 'shop': url = '../shop/'; break;
                case 'photos': url = '../photos/'; break;
                case 'contact': url = '../contact/'; break;
                default: url = '../'; break;
            }
        } else {
            switch(page) {
                case 'home': url = './'; break;
                case 'shop': url = './shop/'; break;
                case 'photos': url = './photos/'; break;
                case 'contact': url = './contact/'; break;
                default: url = './'; break;
            }        
        }
        console.log(`Navigation: ${page} -> ${url}`);
        return url;
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
    document.body.insertAdjacentHTML('afterbegin', sidebarNav + mobileNav);    
    console.log('Navigation injected successfully');
    
    // Cache this navigation for instant loading
    cacheNavigationForInstantLoad(currentPage, sidebarNav + mobileNav);
    
    initializeAfterCacheLoad();
}

function initializeAfterCacheLoad() {
    // Initialize performance optimizations
    initializePerformanceOptimizations();
    
    initializeEasterEggs();
}

// PERFORMANCE OPTIMIZATION FUNCTIONS
function cacheNavigationForInstantLoad(currentPage, navHTML) {
    try {
        const quickCache = {
            currentPage: currentPage,
            html: navHTML,
            timestamp: Date.now()
        };
        sessionStorage.setItem('gewelryNavQuick', JSON.stringify(quickCache));
        console.log('Navigation cached for instant loading');
    } catch (e) {
        console.log('Quick cache failed:', e);
    }
}

function initializePerformanceOptimizations() {
    console.log('Initializing performance optimizations...');
    
    // Register service worker for advanced caching
    registerServiceWorker();
    
    // Add transition effects
    addTransitionEffects();
    
    // Add hover preloading for navigation links
    addHoverPreloading();
    
    // Cache navigation state
    cacheNavigationState();
    
    // Initialize instant loading for navigation
    initializeInstantNavigation();
    
    // Prefetch critical resources
    prefetchCriticalResources();
}

function initializeInstantNavigation() {
    // Add instant click handling for even faster navigation
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href]');
        if (link && isInternalLink(link.href)) {
            // Add loading state immediately
            link.style.opacity = '0.7';
            setTimeout(() => {
                if (link.style.opacity === '0.7') {
                    link.style.opacity = '1';
                }
            }, 200);
        }
    });
}

function prefetchCriticalResources() {
    // Prefetch critical assets that aren't already preloaded
    const criticalAssets = [
        './stylesheet.css',
        './navigation.js',
        './icon.png'
    ];
    
    const currentDir = window.location.href.includes('/shop/') || 
                      window.location.href.includes('/photos/') || 
                      window.location.href.includes('/contact/') ? '../' : './';
    
    criticalAssets.forEach(asset => {
        const fullPath = currentDir + asset.replace('./', '');
        if (!document.querySelector(`link[href="${fullPath}"]`)) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = fullPath;
            document.head.appendChild(link);
        }
    });
}

function isInternalLink(href) {
    try {
        const url = new URL(href, window.location.origin);
        return url.origin === window.location.origin;
    } catch {
        return true; // Relative links
    }
}

function loadCachedNavigation() {
    try {
        const cached = localStorage.getItem('gewelryNavCache');
        if (cached) {
            const navState = JSON.parse(cached);
            // Check if cache is less than 1 hour old
            if (Date.now() - navState.timestamp < 3600000) {
                // If we're on the same page, use cached navigation
                if (navState.currentPage === getCurrentPage()) {
                    document.body.insertAdjacentHTML('afterbegin', navState.sidebarHTML + navState.mobileNavHTML);
                    return true;
                }
            }
        }
    } catch (e) {
        console.log('Cache loading failed:', e);
    }
    return false;
}

function registerServiceWorker() {
    // Service workers don't work with file:// protocol
    if (window.location.protocol === 'file:') {
        console.log('Service Worker not available with file:// protocol. Use a local server for full functionality.');
        return;
    }
    
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Use absolute path for service worker to work from any directory
            const swPath = window.location.pathname.includes('/shop/') || 
                          window.location.pathname.includes('/photos/') || 
                          window.location.pathname.includes('/contact/') || 
                          window.location.pathname.includes('/estimates/') ? 
                          '../sw.js' : './sw.js';
            
            navigator.serviceWorker.register(swPath)
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    } else {
        console.log('Service Worker not supported in this browser');
    }
}

function addTransitionEffects() {
    // Add CSS for smooth transitions
    const style = document.createElement('style');
    style.textContent = `
        .w3-sidebar {
            transition: opacity 0.3s ease-in-out;
        }
        .w3-sidebar.loading {
            opacity: 0.7;
        }
        .nav-transition {
            transition: all 0.2s ease-in-out;
        }
        .page-transition {
            animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Add transition class to main content
    setTimeout(() => {
        const mainContent = document.querySelector('.w3-main, .w3-content, main, .content');
        if (mainContent) {
            mainContent.classList.add('page-transition');
        }
    }, 100);
}

function addHoverPreloading() {
    // Wait for navigation to be fully loaded
    setTimeout(() => {
        const navLinks = document.querySelectorAll('nav a[href], .w3-bar a[href]');
        
        navLinks.forEach(link => {
            let preloadTimeout;
            
            link.addEventListener('mouseenter', function() {
                const href = this.getAttribute('href');
                if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                    // Preload after 100ms hover to avoid excessive requests
                    preloadTimeout = setTimeout(() => {
                        preloadPage(href);
                    }, 100);
                }
            });
            
            link.addEventListener('mouseleave', function() {
                if (preloadTimeout) {
                    clearTimeout(preloadTimeout);
                }
            });
        });
    }, 500);
}

function preloadPage(url) {
    // Check if already preloaded
    if (document.querySelector(`link[rel="prefetch"][href="${url}"]`)) {
        return;
    }
    
    // Create prefetch link
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
    
    console.log(`Preloading: ${url}`);
}

function cacheNavigationState() {
    // Store navigation state for faster rendering
    const navState = {
        currentPage: getCurrentPage(),
        iconPath: getIconPath(),
        timestamp: Date.now(),
        sidebarHTML: generateSidebarHTML(),
        mobileNavHTML: generateMobileNavHTML()
    };
    
    try {
        localStorage.setItem('gewelryNavCache', JSON.stringify(navState));
        sessionStorage.setItem('gewelryNav', JSON.stringify(navState));
    } catch (e) {
        console.log('Storage not available');
    }
}

function generateSidebarHTML() {
    const currentPage = getCurrentPage();
    const iconPath = getIconPath();
    const inSubDir = window.location.href.includes('/shop/') || 
                    window.location.href.includes('/photos/') || 
                    window.location.href.includes('/contact/');
    
    return `
        <nav class="w3-sidebar w3-bar-block w3-small w3-hide-small w3-center">
          <img src="${iconPath}" style="width:100%">
          <a href="${getNavLinkForPage('home', inSubDir)}" class="w3-bar-item w3-button w3-padding-large ${currentPage === 'home' ? 'nav-active' : 'w3-hover-black'}">
            <i class="fa fa-home w3-xxlarge"></i>
            <p>HOME</p>
          </a>
          <a href="${getNavLinkForPage('shop', inSubDir)}" class="w3-bar-item w3-button w3-padding-large ${currentPage === 'shop' ? 'nav-active' : 'w3-hover-black'}">
            <i class="fa fa-shopping-cart w3-xxlarge"></i>
            <p>SHOP</p>
          </a>
          <a href="${getNavLinkForPage('photos', inSubDir)}" class="w3-bar-item w3-button w3-padding-large ${currentPage === 'photos' ? 'nav-active' : 'w3-hover-black'}">
            <i class="fa fa-camera w3-xxlarge"></i>
            <p>PHOTOS</p>
          </a>
          <a href="${getNavLinkForPage('contact', inSubDir)}" class="w3-bar-item w3-button w3-padding-large ${currentPage === 'contact' ? 'nav-active' : 'w3-hover-black'}">
            <i class="fa fa-envelope w3-xxlarge"></i>
            <p>CONTACT</p>
          </a>        </nav>`;
}

function generateMobileNavHTML() {
    const currentPage = getCurrentPage();
    const inSubDir = window.location.href.includes('/shop/') || 
                    window.location.href.includes('/photos/') || 
                    window.location.href.includes('/contact/');
    
    return `
        <div class="w3-top w3-hide-large w3-hide-medium" id="myNavbar">
          <div class="w3-bar w3-black w3-center w3-small">            <a href="${getNavLinkForPage('home', inSubDir)}" class="w3-bar-item w3-button ${currentPage === 'home' ? 'nav-active' : ''}" style="width:25% !important">HOME</a>
            <a href="${getNavLinkForPage('shop', inSubDir)}" class="w3-bar-item w3-button ${currentPage === 'shop' ? 'nav-active' : ''}" style="width:25% !important">SHOP</a>
            <a href="${getNavLinkForPage('photos', inSubDir)}" class="w3-bar-item w3-button ${currentPage === 'photos' ? 'nav-active' : ''}" style="width:25% !important">PHOTOS</a>
            <a href="${getNavLinkForPage('contact', inSubDir)}" class="w3-bar-item w3-button ${currentPage === 'contact' ? 'nav-active' : ''}" style="width:25% !important">CONTACT</a>
          </div>        </div>`;
}

function getNavLinkForPage(page, inSubDir) {
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

function getCurrentPage() {
    const currentFile = window.location.href;
    if (currentFile.includes('/shop/')) return 'shop';
    if (currentFile.includes('/photos/')) return 'photos';
    if (currentFile.includes('/contact/')) return 'contact';
    return 'home';
}

function getIconPath() {
    const inSubDir = window.location.href.includes('/shop/') || 
                    window.location.href.includes('/photos/') || 
                    window.location.href.includes('/contact/');
    return inSubDir ? '../icon.png' : './icon.png';
}

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
