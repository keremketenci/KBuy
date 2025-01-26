import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// // CSRF token
// const token = document
//     .querySelector('meta[name="csrf-token"]')
//     ?.getAttribute('content');

// if (token) {
//     window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
// } else {
//     console.error(
//         'CSRF token not found: Please ensure a meta tag with name "csrf-token" is present in your layout.',
//     );
// }
