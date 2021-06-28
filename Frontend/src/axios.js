import axios from "axios";

const serverURL = "http://localhost:4000/";
const testUsers = {
  adiminister: [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJhY2NvdW50IjoidGhvbXNvbjg2MTEwNiIsInVzZXJuYW1lIjoidGhvbXNvbiIsImVtYWlsIjoidGhvbXNvbjg2MTEwNkBnbWFpbC5jb20iLCJhY3RpdmUiOjEsImFkaW0iOiJhZG1pbmlzdGVyIiwiaWF0IjoxNjIxNjU3MTE4LCJleHAiOjE2Mzk2NTcxMTh9.rx55CJNzevSUFJUP1EFjukPTgs47s2E42Ex-XHe_FdU",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJhY2NvdW50IjoidGhvc21vbjg3MTEwNiIsInVzZXJuYW1lIjoidGhvbXNvbjIiLCJlbWFpbCI6InRob3Ntb244NzExMDZAZ21haWwuY29tIiwiYWN0aXZlIjoxLCJhZGltIjoiYWRtaW5pc3RlciIsImlhdCI6MTYyMTY1NzA2MiwiZXhwIjoxNjM5NjU3MDYyfQ.4-fwrbsyCKAkzwwWzZyBdIvceuO0DKAxPVs69PzEGRY",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJhY2NvdW50IjoidGhvc21vbjg4MTEwNiIsInVzZXJuYW1lIjoidGhvbXNvbjMiLCJlbWFpbCI6InRob3Ntb244ODExMDZAZ21haWwuY29tIiwiYWN0aXZlIjoxLCJhZGltIjoiYWRtaW5pc3RlciIsImlhdCI6MTYyMTY1NzA4NCwiZXhwIjoxNjM5NjU3MDg0fQ.PS68aMdUqW6chb2wEg0w8h7KPGm9Vyn-QenLwH9K_qU",
  ],

  team: [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJhY2NvdW50IjoiY2h1bmdjdCIsInVzZXJuYW1lIjoiQ2h1bmdjdCIsImVtYWlsIjoicjA5NTIyNjI0QG51dC5lZHUudHciLCJhY3RpdmUiOjEsImFkaW0iOiJ0ZWFtIiwiaWF0IjoxNjIxNjU2ODgxLCJleHAiOjE2Mzk2NTY4ODF9.DXGYx-BQjcOuQCxid5TzWD1hfXwN6ofmiHN26M6CXfM",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJhY2NvdW50IjoiY2h1bmdjdDIiLCJ1c2VybmFtZSI6IkNodW5nY3QyIiwiZW1haWwiOiJyMTA1MjI2MjRAbnR1LmVkdS50dyIsImFjdGl2ZSI6MSwiYWRpbSI6InRlYW0iLCJpYXQiOjE2MjE2NTY5NzIsImV4cCI6MTYzOTY1Njk3Mn0.gfQXe6jHVxOMl7_hMYvK7Qvzh04hfzAxHvHZpbyJZaw",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJhY2NvdW50IjoiY2h1bmdjdDMiLCJ1c2VybmFtZSI6IkNodW5nY3QzIiwiZW1haWwiOiJyMTE1MjI2MjRAbnR1LmVkdS50dyIsImFjdGl2ZSI6MSwiYWRpbSI6InRlYW0iLCJpYXQiOjE2MjE2NTY5MjUsImV4cCI6MTYzOTY1NjkyNX0.POeu6ENMWBSjbP9mPlaPc98KJci-DQx25RPXHg4YCDo",
  ],
  recorder: [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJhY2NvdW50IjoiY2h1bmdjdHRlc3QiLCJ1c2VybmFtZSI6IkNodW5nY3R0ZXN0IiwiZW1haWwiOiJyMDk1MjI2MjRAbnR1LmVkdS50dyIsImFjdGl2ZSI6MSwiYWRpbSI6InJlY29yZGVyIiwiaWF0IjoxNjIxNjU2ODE0LCJleHAiOjE2Mzk2NTY4MTR9.z4CTNXZqBofLpJDxE-PE8uyGcZTwLEPhkYzC73kUuzs",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJhY2NvdW50IjoiY2h1bmdjdHRlc3QyIiwidXNlcm5hbWUiOiJDaHVuZ2N0dGVzdDIiLCJlbWFpbCI6InIwOTcyMjYyNEBudHUuZWR1LnR3IiwiYWN0aXZlIjoxLCJhZGltIjoicmVjb3JkZXIiLCJpYXQiOjE2MjE2NTY4NDIsImV4cCI6MTYzOTY1Njg0Mn0.3-9QGyTv4wZ7B4HG-Az-90zAX-CARjeqGUuL0QR_Gyg",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5LCJhY2NvdW50IjoiY2h1bmdjdHRlc3QzIiwidXNlcm5hbWUiOiJDaHVuZ2N0dGVzdDMiLCJlbWFpbCI6InIxMDcyMjYyNEBudHUuZWR1LnR3IiwiYWN0aXZlIjoxLCJhZGltIjoicmVjb3JkZXIiLCJpYXQiOjE2MjE2NTY4NjIsImV4cCI6MTYzOTY1Njg2Mn0.SQXJc-cM496v6AdXi6ERNIJTANQSF5aDZuIwRRR2Aus",
  ],
};

// 調整這去改變目前使用者身分 Ex: testUser.team[0] (0號系隊使用者)
let token = testUsers.adiminister[0];

export const gettoken = () => {
  return token
}
function DateConverter(date) {
  return date !== null ? new Date(date).toISOString() : null;
}

export const isLogin = async () => {
  return undefined;
};

export const isSignup = async () => {
  return undefined;
};

export const Login = async (account, password) => {
  // [Must] account =    使用者帳號
  // [Must] password =   使用者密碼

  try {
    let response = await axios({
      method: "PUT",
      url: serverURL + "users/login",
      data: { account, password },
    });
    token = response.data.token;
    return response.data;
  } catch (err) {
    // return `[Login][Error]` + err;
    throw err;
  }
};

export const Player = {
  Create: async (
    {name,
    number,
    student_id,
    grade,
    team_id}
  ) => {
    // [Must] studentID            學號
    // [Must] department           隊伍 
    // [Must] grade                年級
    // [Q]    PhotoURL?
    console.log(name)
    try {
      let response = await axios({
        method: "POST",
        url: serverURL + "players/create",
        data: {
          name,
          number,
          student_id,
          grade,
          team_id
        },
        headers: { Authorization: token }
      });
      return response.data;
    } catch (err) {
      return `[Error][Player][Create]` + err;
    }
  },

  Delete: async ({player_id}) => {
    // [Must] id       User ID
    // [Must] token    使用者登入憑證 {adim: administer}
    // player_id = player_id.player_id
    console.log(player_id)
    try {
      let response = await axios({
        method: "DELETE",
        url: serverURL + "players/delete",
        data: { player_id },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Player][Delete]` + err;
    }
  },

  GetAllPlayerByTeamID: async(team_id) => {
    try {
      let response = await axios({
        method: "GET",
        url: serverURL + "players/getAllPlayerByTeamId",
        params: {team_id},
        headers: { Authorization: token }
      });
      return response.data;
    } catch (err) {
      return `[Error][Player][GetAllPlayerByTeamID]` + err;
    }
  },

  DeleteAllPlayerByTeamID: async(team_id) => {
    try {
      let response = await axios({
        method: "DELETE",
        url: serverURL + "players/deleteAllPlayerByTeamID",
        data: {team_id},
        headers: { Authorization: token }
      });
      return response.data;
    } catch (err) {
      return `[Error][Player][DeleteAllPlayerByTeamID]` + err;
    }
  },

  Update: async ({player_id, name, number, student_id, grade, team_id}) => {
    // [Must] id       Team name
    // [Must] name     Team department
    // [Must] token    {adim:team}

    try {
      let response = await axios({
        method: "POST",
        url: serverURL + "players/update",
        data: { player_id, name, number, student_id, grade, team_id  },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Team][Update]` + err;
    }
  }
}

export const CheckToken = async (storageToken) => {
  token = storageToken.slice(1,-1);

  try {
    let response = await axios({
      method: "GET",
      url: serverURL + "users/checkToken",
      headers: { Authorization: token },
    });
    return response.data.token;
  } catch (err) {
    throw err;
  }
}


export const User = {
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

export const Team = {
  Create: async (name, department) => {
    // return status success | fail_<reason>

    // [Must] name         隊伍名稱
    // [Must] department   隊伍校系
    // [Must] token        {administer: team}

    try {
      let response = await axios({
        method: "POST",
        url: serverURL + "teams/create",
        data: { name, department },
        headers: { Authorization: token },
      });
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
        method: "POST",
        url: serverURL + "teams/status",
        data: { id, status },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Team][SetStatus]` + err;
    }
  },

  Delete: async (id) => {
    // [Must] id       User ID
    // [Myst] token    {adim:adimister}

    try {
      let response = await axios({
        method: "POST",
        url: serverURL + "teams/status",
        data: { id },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Team][Delete]` + err;
    }
  },

  GetTeamByID: async (id) => {
    // [Must] id       User ID
    // [Must] token    {adim:adimister}

    try {
      let response = await axios({
        method: "GET",
        url: serverURL + "teams/data",
        query: { id },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Team][GetInfoByID]` + err;
    }
  },

  GetALLTeam: async () => {
    // [Must] token    {adim:adimister}

    try {
      let response = await axios({
        method: "GET",
        url: serverURL + "teams/getALL",
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Team][GetALL]` + err;
    }
  },
  GetTeamIDbyUser: async (user_id) => {
    // [Must] token    {adim:adimister}
    console.log(user_id)
    try {
      let response = await axios({
        method: "GET",
        url: serverURL + "teams/GetTeamIDbyUser",
        headers: { Authorization: token },
        query: {user_id}
      });
      return response.data;
    } catch (err) {
      return `[Error][Team][GetTeamIDbyUser]` + err;
    }
  },
  GetInterGame: async () => {
    // [Must] token {adim: adiminister}
    try{
      let response = await axios({
        method: "GET",
        url: serverURL + "teams/getInterGame",
        headers: { Authorization: token },
      });
      console.log("in axios", response)
      return response.data;
    } catch (err) {
      return `[Error][Team][GetInterGame]` + err;
    }
  },

  Update: async (name, department) => {
    // [Must] id       Team name
    // [Must] name     Team department
    // [Must] token    {adim:team}

    try {
      let response = await axios({
        method: "POST",
        url: serverURL + "teams/update",
        data: { name, department },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Team][Update]` + err;
    }
  },
  UpdatePaid: async (team_id, status) => {
    // [Must] id       Team name
    // [Must] name     Team department
    // [Must] token    {adim:team}

    try {
      let response = await axios({
        method: "POST",
        url: serverURL + "teams/updatePaid",
        data: { team_id, status },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Team][UpdatePaid]` + err;
    }
  },

  UpdateSession: async(sessionType, id, teamSession) => {
    // [Must] sessionType     preGame || interGame
    // [Must] id              Team ID
    // [Must] teamSession     Team assined session
    // [Must] token           {adim: adimister} 

    try{
      let response = await axios({
        method: "POST",
        url: serverURL + "teams/update_session",
        data: { sessionType, id, teamSession },
        headers: { Authorization: token }
      });
      return response.data;
    } catch (err) {
      return `[ERROR][Team][Update_session]` + err;
    }
  },

  CheckFillSession: async( sessionType ) => {
    try{
      let response = await axios({
        method: "GET",
        url: serverURL + "teams/checkFillSession",
        params: { sessionType },
        headers: { Authorization: token }
      })
      console.log("in axios, teams, checkFillSession: ", response)
      return response.data;
    } catch (err){
      throw err;
    }
  }
};

export const Time = {
  Update: async (timeString) => {
    // return status success | fail_<reason>

    // [Must] timeString   沒空時間字串
    // [Must] token        {administer: team}
    console.log("Update " + timeString);
    try {
      let response = await axios({
        method: "POST",
        url: serverURL + "time/update",
        data: { timeString },
        headers: { Authorization: token },
      });
      console.log(response.data);
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
        method: "DELETE",
        url: serverURL + "time/delete",
        data: { id },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Time][Delete]` + err;
    }
  },

  GetALLTime: async () => {
    // return status success | fail_<reason>
    // [Must] token        {administer: administer}

    try {
      let response = await axios({
        method: "GET",
        url: serverURL + "time/getALL",
        headers: { Authorization: token },
      });
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
        method: "GET",
        url: serverURL + "time/data",
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Time][GetTime]` + err;
    }
  },
  
};

export const Match = {
  GetALLMatch: async () => {
    try {
      let response = await axios({
        method: "GET",
        url: serverURL + "matches/getALL",
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Match][GetALL]` + err;
    }
  },

  Update: async (id, startDate, field, recorder_id) => {
    try {
      let response = await axios({
        method: "POST",
        url: serverURL + "matches/update",
        data: {
          match_id: id,
          startDate: DateConverter(startDate) || null,
          field: field,
          recorder_id: recorder_id,
        },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Match][Update]` + err;
    }
  },

  Create: async (home, away, stage, stage_session) => {
    try {
      let response = await axios({
        method: "POST",
        url: serverURL + "matches/create",
        data: { home_id: home, away_id: away, stage: stage, stage_session: stage_session },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Match][Create]` + err;
    }
  },

  // CreateInterMatch: async( home, away, stage ) => {
  //   try{
  //     let response = await axios({
  //       method: "POST",
  //       url: serverURL + "matches/createInterMatch",
  //       data: { home_id: home, away_id: away, stage: stage},
  //       headers: { Authorization: token },
  //     });
  //     return response.data;
  //   } catch (err){
  //     return `[Error][Match][CreateInterMatch]` + err;
  //   }
  // },
  DeleteSession: async( stage ) => {
    try{
      let response = await axios({
        method: "DELETE",
        url: serverURL + "matches/deleteSession",
        params: { stage: stage },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  CheckIfStage: async( stage ) => {
    try{
      let response = await axios({
        method: "GET",
        url: serverURL + "matches/checkIfStage",
        params: { stage }, 
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      throw err
    }
  },

};


export const Recorder = {
  Create: async (name, department) => {
    // return status success | fail_<reason>

    // [Must] name         隊伍名稱
    // [Must] department   隊伍校系
    // [Must] token        {administer: team}

    try {
      let response = await axios({
        method: "POST",
        url: serverURL + "recorders/create",
        data: { name, department },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Recorder][Create]` + err;
    }
  },

  Status: async (id, status) => {
    // [Must] id       User ID
    // [Must] status   ['已報名', '已繳費', '審核中', '未報名', '未繳費']
    // [Myst] token    {adim:adimister}

    try {
      let response = await axios({
        method: "POST",
        url: serverURL + "recorders/status",
        data: { id, status },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Recorder][SetStatus]` + err;
    }
  },

  Delete: async (id) => {
    // [Must] id       User ID
    // [Myst] token    {adim:adimister}

    try {
      let response = await axios({
        method: "POST",
        url: serverURL + "recorders/status",
        data: { id },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Recorder][Delete]` + err;
    }
  },

  GetRecorderByID: async (id) => {
    // [Must] id       User ID
    // [Must] token    {adim:adimister}

    try {
      let response = await axios({
        method: "GET",
        url: serverURL + "recorders/data",
        query: { id },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Recorder][GetInfoByID]` + err;
    }
  },

  GetALLRecorder: async () => {
    // [Must] token    {adim:adimister}

    try {
      let response = await axios({
        method: "GET",
        url: serverURL + "recorders/getALL",
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Recorder][GetALL]` + err;
    }
  },

  Update: async (id, name) => {
    // [Must] id       Team ID
    // [Must] name     Team Name
    // [Myst] token    {adim:team}

    try {
      let response = await axios({
        method: "POST",
        url: serverURL + "recorders/update",
        data: { id, name },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Recorder][Update]` + err;
    }
  },
  InCharge: async( id ) => {
    try {
      let response = await axios({
        method: "GET",
        url: serverURL + "recorders/Incharge",
        params: { id },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      return `[Error][Recorder][Incharge]` + err;
    }
  }
};



const doLogin = async (username, password) => {
  const msg = { userid: 1, identity: "admin" };
  return msg;
};

const doSignup = async (SignUpObj) => {
  const { account, username, password, identity, email, department } =
    SignUpObj;
  await User.Create(
    account,
    username,
    password,
    password,
    identity,
    email,
    department
  );
  if (SignUpObj["identity"] === "team") {
    const { teamname, teamdepartment } = SignUpObj;
    await Team.Create(teamname, teamdepartment);
  } else if (SignUpObj["identity"] === "recorder") {
    await Recorder.Create(username, department);
  }
  const msg = true;
  return msg;
};


export const Post = {
  Create: async ( type, title_category, title_content, content ) => {
    try{
      let response = await axios({
        method: "POST",
        url: serverURL + "posts/create",
        data: { type, title_category, title_content, content },
        headers: { Authorization: token },
      })
      return response.data
    } catch (err) {
      return err
    }
  },
  GetTypeContent: async( type ) => {
    try{
      let response = await axios({
        method: "GET",
        url: serverURL + "posts/getType",
        params: { type },
        // headers: { Authorization: token }
      })
      return response.data
    } catch (err) {
      return `[Error][Post][GetTypeContent]`
    }
  }
}

export const Record = {
  CreateTeamRecord: async( match_id, team_id ) => {
    try{
      let response = await axios({
        method: "POST",
        url: serverURL + "records/createTeamRecord",
        data: { match_id, team_id },
        headers: { Authorization: token }
      })
      console.log("in createTeamRecord, res: ", response)
    } catch (err) {
      return `[Error][Record][CreateTeamRecord]`
    }
  }
}


export { doLogin, doSignup };