let version = 'v1.0';
var cacheFiles = [
	'./',
	'index.html',
	'restaurant.html',
	'js/dbhelper.js',
	'js/main.js',
	'js/restaurant_info.js',
	'data/restaurants.json'
]

self.addEventListener('fetch', function(event){
	event.respondWith(
		caches.match(event.request)
			.then(function(res){
				if(res){
					return res;
				}
				return fetch(event.request);
			})
	)
});

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys().then(function(version){
			return Promise.all(version.map(function(name){
				if(name !== version){
					return caches.delete(name);
				}
			}))
		})
	)
})

self.addEventListener('install', function(event){
	
	event.waitUntil(
		caches.open(version).then(function(cache){
			return cache.addAll(cacheFiles);
		})
	)
});