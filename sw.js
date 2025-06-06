const CACHE_NAME = 'gewelry-store-v2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './stylesheet.css',
    './navigation.js',
    './icon.png',
    './logo.png',
    './shop/',
    './shop/index.html',
    './photos/',
    './photos/index.html',
    './contact/',
    './contact/index.html',
    './images/image_1.jpg',
    './images/image_2.jpg',
    './images/image_3.jpg',
    './images/image_4.jpg',
    './images/image_5.jpg',
    './images/image_6.jpg',
    './images/image_7.jpg',
    './images/image_8.jpg',
    './images/image_9.jpg',
    './images/image_10.jpg',
    'https://www.w3schools.com/w3css/4/w3.css',
    'https://fonts.googleapis.com/css?family=Lato',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://instant.page/5.1.0'
];

const NAVIGATION_CACHE_KEY = 'navigation-cache';
const CRITICAL_RESOURCES = [
    './stylesheet.css',
    './navigation.js',
    './icon.png'
];

self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching critical resources...');
                // Cache critical resources first for instant navigation
                return cache.addAll(CRITICAL_RESOURCES);
            })
            .then(() => {
                // Cache remaining assets in background
                return caches.open(CACHE_NAME)
                    .then(cache => cache.addAll(ASSETS_TO_CACHE.filter(url => !CRITICAL_RESOURCES.includes(url))));
            })
            .then(() => {
                console.log('Service Worker: All assets cached');
                self.skipWaiting();
            })
            .catch(error => {
                console.log('Service Worker: Caching failed', error);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Activated');
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip external requests (except for our cached CDN resources)
    const url = new URL(event.request.url);
    const isExternal = url.origin !== location.origin;
    const isAllowedExternal = ASSETS_TO_CACHE.some(asset => event.request.url.includes(asset));
    
    if (isExternal && !isAllowedExternal) {
        return;
    }

    event.respondWith(
        handleRequest(event.request)
    );
});

async function handleRequest(request) {
    const url = new URL(request.url);
    
    // Handle navigation requests with special caching strategy
    if (request.mode === 'navigate' || (request.method === 'GET' && request.headers.get('accept').includes('text/html'))) {
        return handleNavigationRequest(request);
    }
    
    // Handle asset requests (CSS, JS, images)
    if (isAssetRequest(request)) {
        return handleAssetRequest(request);
    }
    
    // Default cache-first strategy
    return cacheFirst(request);
}

async function handleNavigationRequest(request) {
    try {
        // Try cache first for instant loading
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('Service Worker: Serving navigation from cache');
            // Update cache in background
            fetch(request).then(response => {
                if (response.ok) {
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, response.clone());
                    });
                }
            }).catch(() => {
                // Network failed, but we have cache
            });
            return cachedResponse;
        }
        
        // If not in cache, fetch from network
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        // Network failed and no cache
        console.log('Service Worker: Navigation request failed', error);
        return new Response('Offline - Please check your connection', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
                'Content-Type': 'text/html'
            })
        });
    }
}

async function handleAssetRequest(request) {
    // Critical assets: cache-first with immediate response
    const isCritical = CRITICAL_RESOURCES.some(asset => request.url.includes(asset));
    
    if (isCritical) {
        return cacheFirst(request);
    }
    
    // Non-critical assets: stale-while-revalidate
    return staleWhileRevalidate(request);
}

async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('Service Worker: Cache-first failed', error);
        throw error;
    }
}

async function staleWhileRevalidate(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    });
    
    // Return cached version immediately if available
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // Otherwise wait for network
    return fetchPromise;
}

function isAssetRequest(request) {
    const url = new URL(request.url);
    return url.pathname.endsWith('.css') ||
           url.pathname.endsWith('.js') ||
           url.pathname.endsWith('.png') ||
           url.pathname.endsWith('.jpg') ||
           url.pathname.endsWith('.jpeg') ||
           url.pathname.endsWith('.gif') ||
           url.pathname.endsWith('.svg') ||
           url.pathname.endsWith('.webp');
}