import axios from "axios";

export const GetUserObject = (serverURL, token) => {
  return {
    Create: async (
      account,
      username,
      password,
      passwordConfirm,
      adim,
      email,
      department
    ) => {
      // [Must] account              使用者帳號
      // [Must] password             使用者密碼
      // [Must] passwordConfirm      使用者密碼確認
      // [Must] adim                 使用者類別 [administer, recorder, team]
      // [Must] email                使用者信箱
      // [Must] department           使用者校系

      try {
        let response = await axios({
          method: "POST",
          url: serverURL + "users/create",
          data: {
            account,
            username,
            password,
            passwordConfirm,
            adim,
            email,
            department,
          },
        });
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
          method: "POST",
          url: serverURL + "users/active",
          data: { id: id },
          headers: { Authorization: token },
        });
        return response.data;
      } catch (err) {
        return `[Error][User][Active]` + err;
      }
    },
    GetRegisterData: async () => {
      try {
        let response = await axios({
          method: "GET",
          url: serverURL + "users/register",
        });
        return response.data;
      } catch (err) {
        return `[Error][User][GetRegisterData]` + err;
      }
    },
    AccountDelete: async (id) => {
      // [Must] id       User ID
      // [Must] token    使用者登入憑證 {adim: administer}

      try {
        let response = await axios({
          method: "DELETE",
          url: serverURL + "users/delete",
          data: { user_id: id },
          headers: { Authorization: token },
        });
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
          method: "GET",
          url: serverURL + "users/data",
          params: { id: id },
          headers: { Authorization: token },
        });
        return response.data[0];
      } catch (err) {
        return `[Error][User][GetUserByID]` + err;
      }
    },

    GetALLAccount: async () => {
      // [Must] id       User ID
      // [Must] token    使用者登入憑證 {adim: administer}

      try {
        let response = await axios({
          method: "GET",
          url: serverURL + "users/getALL",
          headers: { Authorization: token },
        });
        return response.data;
      } catch (err) {
        return `[Error][User][GetALLData]` + err;
      }
    },
    SendRemindEmail: async (email) => {
      // [Must] email    使用者信箱

      try {
        let response = await axios({
          method: "PUT",
          url: serverURL + "users/remind",
          data: { email },
          headers: { Authorization: token },
        });
        return response.data;
      } catch (err) {
        // return `[Error][User][SendRemindInfo]` + err;
        throw err;
      }
    },

    Update: async (account, username, email, department) => {
      // [Must] account
      // [Must] username
      // [Must] email
      // [Must] deparment

      try {
        let response = await axios({
          method: "POST",
          url: serverURL + "users/update",
          data: { account, username, email, department },
          headers: { Authorization: token },
        });
        return response.data;
      } catch (err) {
        return `[Error][User][Update]` + err;
      }
    },
  };
};
