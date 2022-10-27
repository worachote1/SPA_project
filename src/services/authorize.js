//Save token and admin username --> in session storage
const authenticate = (res, next) => {
    if (window !== "undefinded") {

        //save token
        //JSON.stringify(res.data.token)
        sessionStorage.setItem("token", res.data.token)
        sessionStorage.setItem("username", res.data.username)
    }
    next()
}

// get token and username (from session storage) after login
// get token
const getToken = () => {
    if (window !== "undefinded") {
        if (sessionStorage.getItem('token')) {
            // JSON.parse(sessionStorage.getItem("token"))
            return sessionStorage.getItem("token")
        }
        else {
            return false
        }
    }
}

// get user
const getUser = () => {
    if (window !== "undefinded") {
        if (sessionStorage.getItem('username')) {
            // JSON.parse(sessionStorage.getItem("username"))
            return sessionStorage.getItem("username")
        }
        else {
            return false
        }
    }
}

// Logout
const logout = (next) => {
    if (window !== "undefinded") {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("username")
    }
    next()
}

module.exports = { authenticate, getToken, getUser, logout } 