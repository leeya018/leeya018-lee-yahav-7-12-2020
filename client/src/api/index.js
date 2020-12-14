import axios from 'axios'


const getToken = () => {
    let dataStr = localStorage.getItem("data")
    let data = JSON.parse(dataStr)
    return data.token
}

const api = axios.create({
    baseURL: '/api',
})
// const api = axios.create({
//     baseURL: 'http://localhost:5000/api',
// })

export const insertEmail = payload => api.post(`/email`, payload)
export const getAllEmails = () => api.get(`/emails`)
export const getEmailsByUsername = (username) => api.get(`/emails/${username}`, { headers: { Authorization: getToken() } })
export const deleteEmail = payload => api.delete(`/email`, payload)
export const sign = payload => api.post(`/auth/signup`, payload)
export const login = payload => api.post(`/auth/signin`, payload)


const apis = {
    insertEmail,
    getAllEmails,
    getEmailsByUsername,
    deleteEmail,
    sign,
    login
}

export default apis