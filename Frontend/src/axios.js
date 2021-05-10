// fake axios
// import 

const isLogin = ( username, password ) => {
    // compare if map any user
    // get user identity
    const msg = true

    return msg
}

const isSignup = ( department, username, identity, password) => {
    // return status success | fail_<reason>
    console.log("in isSignup sent data:", department, username, identity, password)
    const msg = "success"
    return msg
}

export { isLogin, isSignup }