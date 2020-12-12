const getUsername = () => {
    let dataStr = localStorage.getItem("data")
    if (dataStr) {
        let data = JSON.parse(dataStr)
        return data.username
    }
    return ""
}

const getToken = () => {
    let dataStr = localStorage.getItem("data")
    if (dataStr) {
        let data = JSON.parse(dataStr)
        return data.token
    }
    return ""
}


let util = {getUsername, getToken}

export default util