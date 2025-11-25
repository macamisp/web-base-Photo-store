import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if environment variables are set
export const isSupabaseConfigured = supabaseUrl && supabaseAnonKey &&
    supabaseUrl !== 'your_supabase_url_here' &&
    supabaseAnonKey !== 'your_supabase_anon_key_here';

if (!isSupabaseConfigured) {
    console.warn('⚠️ Supabase not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
    console.warn('📖 See SETUP_GUIDE.md for instructions.');
}

// Create client even if not configured (will fail at runtime but app can still load)
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);

// Storage bucket name
export const PHOTOS_BUCKET = 'photos';

// Storage limit per user (500MB in bytes)
export const STORAGE_LIMIT = 500 * 1024 * 1024; // 500MB

// Helper function to format bytes
export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Helper function to get storage percentage
export const getStoragePercentage = (usedBytes) => {
    return Math.round((usedBytes / STORAGE_LIMIT) * 100);
};
