import { loginStart, loginSuccess, loginFailure } from './authSlice';

export const login = async (dispatch, credentials) => {
    dispatch(loginStart());
    try {
        // Mock API call - Replace with your actual API endpoint
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        
        // Store token if provided
        if (data.token) {
            localStorage.setItem('authToken', data.token);
        }

        dispatch(loginSuccess(data.user));
        return data;
    } catch (error) {
        dispatch(loginFailure(error.message || 'Login failed'));
        throw error;
    }
};

export const logout = (dispatch) => {
    localStorage.removeItem('authToken');
    // dispatch logout action if needed
};
