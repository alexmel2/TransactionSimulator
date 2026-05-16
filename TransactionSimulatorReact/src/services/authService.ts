import config from '../config';

const BASE_URL = `${config.apiBaseUrl}Auth`;

export const authService = {
    // 1. התחברות למערכת (Login)
    login: async (username: string, password: string) => {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            // אם השרת מחזיר שגיאה (למשל 401 או 400), ננסה לקרוא את טקסט השגיאה
            const errorText = await response.text();
            throw new Error(errorText || 'Invalid username or password');
        }

        // השרת מחזיר אובייקט עם הטוקן (למשל: { token: "ey..." } או מחרוזת ישירה)
        return await response.json();
    },

    // 2. רישום חשבון חדש (Register)
    register: async (username: string, email: string, password: string) => {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Registration failed');
        }

        return await response.json();
    }
};