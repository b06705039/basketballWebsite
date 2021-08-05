import axios from "axios";

export const GetPlayerObject = (serverURL, token) => {
  return {
    Create: async ({ name, number, student_id, grade, team_id }) => {
      // [Must] studentID            學號
      // [Must] department           隊伍
      // [Must] grade                年級
      // [Q]    PhotoURL?
      try {
        let response = await axios({
          method: "POST",
          url: serverURL + "players/create",
          data: {
            name,
            number,
            student_id,
            grade,
            team_id,
          },
          headers: { Authorization: token },
        });
        return response.data;
      } catch (err) {
        return `[Error][Player][Create]` + err;
      }
    },

    Delete: async ({ player_id }) => {
      // [Must] id       User ID
      // [Must] token    使用者登入憑證 {adim: administer}
      // player_id = player_id.player_id
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

    GetAllPlayerByTeamID: async (team_id) => {
      try {
        let response = await axios({
          method: "GET",
          url: serverURL + "players/getAllPlayerByTeamId",
          params: { team_id },
          headers: { Authorization: token },
        });
        return response.data;
      } catch (err) {
        return `[Error][Player][GetAllPlayerByTeamID]` + err;
      }
    },

    DeleteAllPlayerByTeamID: async (team_id) => {
      try {
        let response = await axios({
          method: "DELETE",
          url: serverURL + "players/deleteAllPlayerByTeamID",
          data: { team_id },
          headers: { Authorization: token },
        });
        return response.data;
      } catch (err) {
        return `[Error][Player][DeleteAllPlayerByTeamID]` + err;
      }
    },

    Update: async ({ player_id, name, number, student_id, grade, team_id }) => {
      // [Must] id       Team name
      // [Must] name     Team department
      // [Must] token    {adim:team}

      try {
        let response = await axios({
          method: "POST",
          url: serverURL + "players/update",
          data: { player_id, name, number, student_id, grade, team_id },
          headers: { Authorization: token },
        });
        return response.data;
      } catch (err) {
        return `[Error][Team][Update]` + err;
      }
    },
  };
};
