export const loginUser = async () => {
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error('Error in loginUser');
    }
};

export const logoutUser = async () => {
    try {
        const res = await fetch('/api/auth/logout', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error('Error in logoutUser');
    }
};
