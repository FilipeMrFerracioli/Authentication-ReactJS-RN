const axios = require('axios').default;

export const authApiConfig = axios.create({
    baseURL: 'http://192.168.0.100:3000'
});

export const login = async (email, password) => {
    try {
        const { data } = await authApiConfig({
            method: 'post',
            headers: {
                // add config
            },
            url: '/auth/login',
            data: {
                email: email,
                password: password
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}