document.addEventListener('DOMContentLoaded', function() {
    console.log('Navigation script loaded');
      // Try to load navigation instantly from cache
    const quickCache = sessionStorage.getItem('gewelryNavQuick');
    if (quickCache) {
        const navData = JSON.parse(quickCache);
        if (navData.currentPage === getCurrentPage()) {
            document.body.insertAdjacentHTML('afterbegin', navData.html);            console.log('Navigation loaded instantly from session cache');
            // Initialize sidebar prices when loading from cache
            initializeSidebarPrices();
            // Add social media footer
            addSocialMediaFooter();
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
          </a>          <a href="${getNavLink('contact')}" class="w3-bar-item w3-button w3-padding-large ${currentPage === 'contact' ? 'nav-active' : 'w3-hover-black'}">
            <i class="fa fa-envelope w3-xxlarge"></i>
            <p>CONTACT</p>
          </a>
            <!-- Metal Prices Section -->
          <div class="w3-bar-item" style="border-top: 1px solid #444; margin-top: 8px; padding: 8px 4px;">
            <div id="sidebarMetalPrices" class="sidebar-metal-prices">
              <div class="sidebar-prices-title">
                💰 LIVE PRICES
              </div>
              <div class="sidebar-price-row">
                <span>🥇 Gold:</span>
                <span id="sidebarGoldPrice">$3,365</span>
              </div>
              <div class="sidebar-price-row">
                <span>🥈 Silver:</span>
                <span id="sidebarSilverPrice">$36.20</span>
              </div>
              <div class="sidebar-price-row">
                <span>💍 Platinum:</span>
                <span id="sidebarPlatinumPrice">$1,240</span>
              </div>
              <div id="sidebarPriceSource" class="sidebar-price-source">Live API 02:35 PM</div>
            </div>
          </div>
        </nav>`;
    const mobileNav = `
        <div class="w3-top w3-hide-large w3-hide-medium" id="myNavbar">
          <div class="w3-bar w3-black w3-center w3-small">            <a href="${getNavLink('home')}" class="w3-bar-item w3-button ${currentPage === 'home' ? 'nav-active' : ''}" style="width:25% !important">HOME</a>
            <a href="${getNavLink('shop')}" class="w3-bar-item w3-button ${currentPage === 'shop' ? 'nav-active' : ''}" style="width:25% !important">SHOP</a>
            <a href="${getNavLink('photos')}" class="w3-bar-item w3-button ${currentPage === 'photos' ? 'nav-active' : ''}" style="width:25% !important">PHOTOS</a>
            <a href="${getNavLink('contact')}" class="w3-bar-item w3-button ${currentPage === 'contact' ? 'nav-active' : ''}" style="width:25% !important">CONTACT</a>
          </div>        </div>`;      document.body.insertAdjacentHTML('afterbegin', sidebarNav + mobileNav);    
    console.log('Navigation injected successfully');
    
    // Cache this navigation for instant loading
    cacheNavigationForInstantLoad(currentPage, sidebarNav + mobileNav);
      // Initialize sidebar metal prices
    initializeSidebarPrices();
    
    // Add social media footer
    addSocialMediaFooter();
    
    initializeAfterCacheLoad();
}

function initializeAfterCacheLoad() {
    // Initialize performance optimizations
    initializePerformanceOptimizations();
    
    initializeEasterEggs();
}

// SIDEBAR METAL PRICES FUNCTIONS
function initializeSidebarPrices() {
    console.log('💰 Initializing sidebar metal prices...');
    
    // Load prices immediately with fallback values
    loadSidebarMetalPrices();
    
    // Set up periodic updates every 45 minutes
    setInterval(loadSidebarMetalPrices, 45 * 60 * 1000);
    
    // Update when page becomes visible again
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            loadSidebarMetalPrices();
        }
    });
      // Add click functionality to price section
    // setTimeout(setupPricesSectionClick, 500); // Removed - estimates page not ready
}

async function loadSidebarMetalPrices() {
    try {
        console.log('📊 Loading metal prices for sidebar...');
        
        // Try to fetch from the same sources as estimates.js
        const prices = await fetchMetalPricesFromAPI();
        
        if (prices) {
            updateSidebarPrices(prices, 'Live API');
        } else {
            // Use fallback prices
            const fallbackPrices = {
                gold: 3350.00,
                silver: 35.50,
                platinum: 1020.00
            };
            updateSidebarPrices(fallbackPrices, 'Estimated');
        }
        
    } catch (error) {
        console.log('❌ Sidebar prices failed, using fallback:', error.message);
        
        // Use fallback prices
        const fallbackPrices = {
            gold: 3350.00,
            silver: 35.50,
            platinum: 1020.00
        };
        updateSidebarPrices(fallbackPrices, 'Estimated');
    }
}

async function fetchMetalPricesFromAPI() {
    try {
        const metalSymbols = {
            'GC=F': 'gold',    // Gold futures
            'SI=F': 'silver',  // Silver futures
            'PL=F': 'platinum' // Platinum futures
        };
        
        const corsProxies = [
            'https://api.allorigins.win/get?url=',
            'https://corsproxy.io/?',
            'https://api.codetabs.com/v1/proxy/?quest='
        ];
        
        const prices = { gold: null, silver: null, platinum: null };
        let successfulProxy = null;
        
        // Try each proxy until we find one that works
        for (const proxyUrl of corsProxies) {
            try {
                const testUrl = `${proxyUrl}${encodeURIComponent('https://query1.finance.yahoo.com/v8/finance/chart/GC=F')}`;
                const testResponse = await fetch(testUrl, { 
                    method: 'GET',
                    timeout: 5000 
                });
                
                if (testResponse.ok) {
                    successfulProxy = proxyUrl;
                    break;
                }
            } catch (e) {
                continue;
            }
        }
        
        if (!successfulProxy) {
            throw new Error('No working proxy found');
        }
        
        // Fetch all metals in parallel
        const fetchPromises = Object.keys(metalSymbols).map(async symbol => {
            try {
                const url = `${successfulProxy}${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`)}`;
                const response = await fetch(url, { timeout: 5000 });
                
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                
                let data;
                if (successfulProxy.includes('allorigins')) {
                    const result = await response.json();
                    data = JSON.parse(result.contents);
                } else {
                    data = await response.json();
                }
                
                const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
                if (price && price > 0) {
                    const metalName = metalSymbols[symbol];
                    prices[metalName] = parseFloat(price.toFixed(2));
                    return true;
                }
                return false;
            } catch (e) {
                console.log(`Failed to fetch ${symbol}:`, e.message);
                return false;
            }
        });
        
        const results = await Promise.allSettled(fetchPromises);
        const successCount = results.filter(r => r.status === 'fulfilled' && r.value).length;
        
        if (successCount > 0) {
            console.log(`✅ Loaded ${successCount}/3 metal prices for sidebar`);
            return prices;
        }
        
        return null;
        
    } catch (error) {
        console.log('❌ API fetch failed:', error.message);
        return null;
    }
}

function updateSidebarPrices(prices, source) {
    // Update individual price elements
    const goldElement = document.getElementById('sidebarGoldPrice');
    const silverElement = document.getElementById('sidebarSilverPrice');
    const platinumElement = document.getElementById('sidebarPlatinumPrice');
    const sourceElement = document.getElementById('sidebarPriceSource');
    const pricesContainer = document.getElementById('sidebarMetalPrices');
    
    if (goldElement && prices.gold) {
        goldElement.textContent = `$${prices.gold.toLocaleString()}`;
        goldElement.classList.add('price-updated');
        setTimeout(() => goldElement.classList.remove('price-updated'), 1000);
    }
    
    if (silverElement && prices.silver) {
        silverElement.textContent = `$${prices.silver.toFixed(2)}`;
        silverElement.classList.add('price-updated');
        setTimeout(() => silverElement.classList.remove('price-updated'), 1000);
    }
    
    if (platinumElement && prices.platinum) {
        platinumElement.textContent = `$${prices.platinum.toLocaleString()}`;
        platinumElement.classList.add('price-updated');
        setTimeout(() => platinumElement.classList.remove('price-updated'), 1000);
    }
      if (sourceElement) {
        const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        sourceElement.textContent = `${source} ${timestamp}`;
        
        // Update CSS class based on source
        sourceElement.className = 'sidebar-price-source'; // Reset to base class
        if (source.includes('Live')) {
            sourceElement.classList.add('sidebar-price-live');
        } else {
            sourceElement.classList.add('sidebar-price-estimated');
        }
    }
    
    // Add visual feedback to the entire container
    if (pricesContainer) {
        pricesContainer.classList.add('price-updated');
        setTimeout(() => pricesContainer.classList.remove('price-updated'), 1000);
    }
    
    console.log(`💰 Sidebar prices updated (${source}):`, prices);
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
    if (window.location.protocol === 'file:') {
        console.log('Service Worker not available with file:// protocol. Use a local server for full functionality.');
        return;
    }
    
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            const swPath = window.location.pathname.includes('/shop/') || 
                          window.location.pathname.includes('/photos/') || 
                          window.location.pathname.includes('/contact/') ? 
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
    
    setTimeout(() => {
        const mainContent = document.querySelector('.w3-main, .w3-content, main, .content');
        if (mainContent) {
            mainContent.classList.add('page-transition');
        }
    }, 100);
}

function addHoverPreloading() {
    setTimeout(() => {
        const navLinks = document.querySelectorAll('nav a[href], .w3-bar a[href]');
        
        navLinks.forEach(link => {
            let preloadTimeout;
            
            link.addEventListener('mouseenter', function() {
                const href = this.getAttribute('href');
                if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
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
    if (document.querySelector(`link[rel="prefetch"][href="${url}"]`)) {
        return;
    }
        const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
    
    console.log(`Preloading: ${url}`);
}

function cacheNavigationState() {
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
          </a>          <a href="${getNavLinkForPage('contact', inSubDir)}" class="w3-bar-item w3-button w3-padding-large ${currentPage === 'contact' ? 'nav-active' : 'w3-hover-black'}">
            <i class="fa fa-envelope w3-xxlarge"></i>
            <p>CONTACT</p>          </a>
          
          <!-- Metal Prices Section -->
          <div class="w3-bar-item" style="border-top: 1px solid #444; margin-top: 8px; padding: 8px 4px;">
            <div id="sidebarMetalPrices" class="sidebar-metal-prices">
              <div class="sidebar-prices-title">
                💰 LIVE PRICES
              </div>
              <div class="sidebar-price-row">
                <span>🥇 Gold:</span>
                <span id="sidebarGoldPrice">$3,365</span>
              </div>
              <div class="sidebar-price-row">
                <span>🥈 Silver:</span>
                <span id="sidebarSilverPrice">$36.20</span>
              </div>
              <div class="sidebar-price-row">
                <span>💍 Platinum:</span>
                <span id="sidebarPlatinumPrice">$1,240</span>
              </div>
              <div id="sidebarPriceSource" class="sidebar-price-source">Live API 02:35 PM</div>
            </div>
          </div>
        </nav>`;
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

// SOCIAL MEDIA FOOTER FUNCTIONS
function addSocialMediaFooter() {
    // Check if footer already exists to avoid duplicates
    if (document.querySelector('.social-media-footer')) {
        return;
    }
      const footerHTML = `
        <footer class="w3-content w3-padding-64 w3-text-grey w3-xlarge social-media-footer">
            <i class="fab fa-facebook w3-hover-opacity"></i>
            <i class="fab fa-instagram w3-hover-opacity"></i>
            <i class="fab fa-snapchat w3-hover-opacity"></i>
            <i class="fab fa-linkedin w3-hover-opacity"></i>
            <i class="fab fa-tiktok w3-hover-opacity"></i>
        </footer>
    `;
    
    // Find the main content div and add footer inside it at the end
    const mainDiv = document.querySelector('#main');
    if (mainDiv) {
        mainDiv.insertAdjacentHTML('beforeend', footerHTML);
        console.log('Social media footer added automatically');
    } else {
        // Fallback: add footer before the closing body tag
        document.body.insertAdjacentHTML('beforeend', footerHTML);
        console.log('Social media footer added to body (fallback)');
    }
}
