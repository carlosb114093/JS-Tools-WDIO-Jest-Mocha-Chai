const { request } = require('@playwright/test')

const BASE_API = 'https://api.practicesoftwaretesting.com'

class ApiHelper {
    static async registerUser(userData) {
        const api = await request.newContext({ baseURL: BASE_API })
        const response = await api.post('/users/register', { data: userData })
        await api.dispose()
        return response
    }

    static async loginUser(email, password) {
        const api = await request.newContext({ baseURL: BASE_API })
        const response = await api.post('/users/login', {
            data: { email, password }
        })
        await api.dispose()
        return response
    }
}

module.exports = ApiHelper
