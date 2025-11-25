const API_URL = 'http://localhost:5000/api';

// Helper function to get auth token
function getToken() {
    return localStorage.getItem('token');
}

// Helper function to handle API responses
async function handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
    }

    return data;
}

// Auth API
export const authAPI = {
    async register(fullName, email, password) {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullName, email, password }),
        });

        const data = await handleResponse(response);
        if (data.token) {
            localStorage.setItem('token', data.token);
        }
        return data;
    },

    async login(email, password) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await handleResponse(response);
        if (data.token) {
            localStorage.setItem('token', data.token);
        }
        return data;
    },

    async getCurrentUser() {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
        });

        return handleResponse(response);
    },

    logout() {
        localStorage.removeItem('token');
    },
};

// Photos API
export const photosAPI = {
    async getPhotos() {
        const response = await fetch(`${API_URL}/photos`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
        });

        return handleResponse(response);
    },

    async uploadPhoto(file, title) {
        const formData = new FormData();
        formData.append('photo', file);
        if (title) {
            formData.append('title', title);
        }

        const response = await fetch(`${API_URL}/photos/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
            body: formData,
        });

        return handleResponse(response);
    },

    async updatePhoto(id, title) {
        const response = await fetch(`${API_URL}/photos/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });

        return handleResponse(response);
    },

    async deletePhoto(id) {
        const response = await fetch(`${API_URL}/photos/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
        });

        return handleResponse(response);
    },

    async getStorageUsage() {
        const response = await fetch(`${API_URL}/photos/storage`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
        });

        return handleResponse(response);
    },
};

// Storage utilities
export const STORAGE_LIMIT = 500 * 1024 * 1024; // 500MB

export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const getStoragePercentage = (usedBytes) => {
    return Math.round((usedBytes / STORAGE_LIMIT) * 100);
};
