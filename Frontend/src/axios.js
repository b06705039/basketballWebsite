import axios from 'axios'

const serverURL = 'http://localhost:4000/';

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJhY2NvdW50IjoiY2h1bmdjdCIsInVzZXJuYW1lIjoiQ2h1bmdjdCIsImVtYWlsIjoicjA5NTIyNjI0QG51dC5lZHUudHciLCJhY3RpdmUiOjEsImFkaW0iOiJ0ZWFtIiwiaWF0IjoxNjIxMDY0MzI1LCJleHAiOjE2MjEwODIzMjV9.qEn87PV_OW8SnMJk77_138YzT0sfVewoYhKgv5uWCbo"

export const isLogin = async () => { return undefined }

export const isSignup = async () => { return undefined }

export const Login = async (account, password) => {

    // [Must] account =    使用者帳號
    // [Must] password =   使用者密碼

    try {
        let response = await axios({
            method: 'PUT',
            url: serverURL + '/login',
            data: { account, password }
        })
        token = response.data.token;
        return response.data;
    } catch (err) {
        return `[Login][Error]` + err;
    }
}

export const User = {

    Create: async (account, username, password, passwordConfirm, adim, email, department) => {
        // [Must] account              使用者帳號
        // [Must] password             使用者密碼
        // [Must] passwordConfirm      使用者密碼確認
        // [Must] adim                 使用者類別 [administer, recorder, team]
        // [Must] email                使用者信箱
        // [Must] department           使用者校系

        try {
            let response = await axios({
                method: 'POST',
                url: serverURL + '/users/create',
                data: { account, username, password, passwordConfirm, adim, email, department }
            })
            return response.data;
        } catch (err) {
            return `[Error][User][Create]` + err;
        }
    },

    AccountActive: async (id) => {

        // [Must] id       User ID
        // [Must] token    使用者登入憑證 {adim: administer}  

        try {
            let response = await axios({
                method: 'POST',
                url: serverURL + 'users/active',
                data: { user_id: id },
                headers: { Authorization: token }
            })
            return response.data;
        } catch (err) {
            return `[Error][User][Active]` + err;
        }
    },

    AccountDelete: async (id) => {

        // [Must] id       User ID
        // [Must] token    使用者登入憑證 {adim: administer}  

        try {
            let response = await axios({
                method: 'DELETE',
                url: serverURL + 'users/delete',
                data: { user_id: id },
                headers: { Authorization: token }
            })
            return response.data;
        } catch (err) {
            return `[Error][User][Delete]` + err;
        }
    },

    GetAccountByID: async (id) => {

        // [Must] id       User ID
        // [Must] token    使用者登入憑證 excpet for {adim: public}  

        try {
            let response = await axios({
                method: 'GET',
                url: serverURL + 'users/data',
                query: { id: id },
                headers: { Authorization: token }
            })
            return response.data;
        } catch (err) {
            return `[Error][User][GetUserByID]` + err;
        }
    },

    GetALLAccount: async () => {

        // [Must] id       User ID
        // [Must] token    使用者登入憑證 {adim: administer}  

        try {
            let response = await axios({
                method: 'GET',
                url: serverURL + 'users/getALL',
                headers: { Authorization: token }
            })
            return response.data;
        } catch (err) {
            return `[Error][User][GetALLData]` + err;
        }
    },

    SendRemindEmail: async (email) => {

        // [Must] email    使用者信箱

        try {
            let response = await axios({
                method: 'PUT',
                url: serverURL + 'users/remind',
                data: { email }
            })
            return response.data;
        } catch (err) {
            return `[Error][User][SendRemindInfo]` + err;
        }
    },

    Update: async (account, username, email, deparment) => {

        // [Must] account
        // [Must] username
        // [Must] email
        // [Must] deparment

        try {
            let response = await axios({
                method: 'POST',
                url: serverURL + 'users/update',
                data: { account, username, email, deparment }
            })
            return response.data;
        } catch (err) {
            return `[Error][User][Update]` + err;
        }
    }
}

export const Team = {
    Create: async (name, department) => {
        // return status success | fail_<reason>

        // [Must] name         隊伍名稱
        // [Must] department   隊伍校系
        // [Must] token        {administer: team}    

        try {
            let response = await axios({
                method: 'POST',
                url: serverURL + 'teams/create',
                data: { name, department },
                headers: { Authorization: token }
            })
            return response.data;
        } catch (err) {
            return `[Error][Team][Create]` + err;
        }
    },

    Status: async (id, status) => {

        // [Must] id       User ID
        // [Must] status   ['已報名', '已繳費', '審核中', '未報名', '未繳費']
        // [Myst] token    {adim:adimister}

        try {
            let response = await axios({
                method: 'POST',
                url: serverURL + 'teams/status',
                data: { id, status },
                headers: { Authorization: token }
            })
            return response.data;
        } catch (err) {
            return `[Error][Team][SetStatus]` + err;
        };
    },

    Delete: async (id) => {

        // [Must] id       User ID
        // [Myst] token    {adim:adimister}

        try {
            let response = await axios({
                method: 'POST',
                url: serverURL + 'teams/status',
                data: { id },
                headers: { Authorization: token }
            })
            return response.data;
        } catch (err) {
            return `[Error][Team][Delete]` + err;
        };
    },

    GetTeamByID: async (id) => {

        // [Must] id       User ID
        // [Must] token    {adim:adimister}

        try {
            let response = await axios({
                method: 'GET',
                url: serverURL + 'teams/data',
                query: { id },
                headers: { Authorization: token }
            })
            return response.data;
        } catch (err) {
            return `[Error][Team][GetInfoByID]` + err;
        };
    },

    GetALLTeam: async () => {

        // [Must] token    {adim:adimister}

        try {
            let response = await axios({
                method: 'GET',
                url: serverURL + 'teams/getALL',
                headers: { Authorization: token }
            })
            return response.data;
        } catch (err) {
            return `[Error][Team][GetALL]` + err;
        };
    },

    Update: async (id, name) => {

        // [Must] id       Team ID
        // [Must] name     Team Name
        // [Myst] token    {adim:team}

        try {
            let response = await axios({
                method: 'POST',
                url: serverURL + 'teams/update',
                data: { id, name },
                headers: { Authorization: token }
            })
            return response.data;
        } catch (err) {
            return `[Error][Team][Update]` + err;
        };
    }
}

export const Time = {
    Update: async (timeString) => {
        // return status success | fail_<reason>

        // [Must] timeString   沒空時間字串
        // [Must] token        {administer: team}    

        try {
            let response = await axios({
                method: 'POST',
                url: serverURL + 'time/update',
                data: { timeString },
                headers: { Authorization: token }
            })
            console.log(response.data)
            return response.data;
        } catch (err) {
            return `[Error][Time][Update]` + err;
        }
    },

    Delete: async (id) => {
        // return status success | fail_<reason>

        // [Must] id            刪除使用者沒空紀錄
        // [Must] token        {administer: team}    

        try {
            let response = await axios({
                method: 'DELETE',
                url: serverURL + 'time/delete',
                data: { id },
                headers: { Authorization: token }
            })
            return response.data;
        } catch (err) {
            return `[Error][Time][Delete]` + err;
        }
    },

    GetALLTime: async () => {
        // return status success | fail_<reason>
        // [Must] token        {administer: team}    

        try {
            let response = await axios({
                method: 'GET',
                url: serverURL + 'time/getALL',
                headers: { Authorization: token }
            })
            return response.data;
        } catch (err) {
            return `[Error][Time][GetAllTime]` + err;
        }
    },

    GetTime: async () => {
        // return status success | fail_<reason>
        // [Must] token        {administer: team}    

        try {
            let response = await axios({
                method: 'GET',
                url: serverURL + 'time/data',
                headers: { Authorization: token }
            })
            return response.data;
        } catch (err) {
            return `[Error][Time][GetTime]` + err;
        }
    }
}



