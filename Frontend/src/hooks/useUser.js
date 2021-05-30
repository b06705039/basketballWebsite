import React, { useState, useEffect } from 'react'
import { doLogin, doSignup } from '../axios'
import { usePages } from './usePages'


// [Q] handle 與axios溝通的user資訊，要與context分開寫還是一起寫比較好？

export const useUser = () => {

    const [ userId, setUserId ] = useState()
    const { id, setId } = usePages()
    const [ identity, setIdentity ] = useState(id)
    const [ islogin, setIsLogin ] = useState(false)
    


    // const signup = ( name, pw ) => {
    //     setStatus(()=>isSignup(name, pw))
    //     console.log("in use signup")
    // }

    useEffect(() => {
      setId(identity)
    }, [identity])

    const login = async ( name, pw ) => {


        const msg = await doLogin(name, pw)

        console.log("useUser msg", msg)

        if(msg){
            setUserId(msg.userid)
            setIdentity(msg.identity)
            setIsLogin(true)
            return true
        }else{
            setIsLogin(false)
            return false
        }
            
    }

    const logout = () =>{
        setUserId(null)
        setIdentity('public')
        return true
    }



    return {
        userId,
        // signup,
        login,
        logout
        
    }
}
