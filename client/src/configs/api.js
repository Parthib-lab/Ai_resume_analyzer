// import axios from 'axios';

// const api=axios.create({
//     baseURL: import.meta.env.VITE_BASE_URL || ''
// })

// export default api;


import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:3000',   // Backend port
	baseURL: 'https://ai-resume-backend-ntez.onrender.com',
    timeout: 10000,
});

export default api;