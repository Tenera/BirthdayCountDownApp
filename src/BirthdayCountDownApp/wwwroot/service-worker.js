/* service-worker.js
   Lightweight registration wrapper. In development you may not want
   a worker, but the published build should register `service-worker.published.js`.
*/

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    const swUrl = 'service-worker.published.js';
    navigator.serviceWorker.register(swUrl).then(function (reg) {
      // Registration successful
      console.log('Service worker registered:', reg.scope);
    }).catch(function (err) {
      console.warn('Service worker registration failed:', err);
    });
  });
}
