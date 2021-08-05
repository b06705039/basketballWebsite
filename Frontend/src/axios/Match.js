import axios from "axios";

function DateConverter(date) {
  return date !== null ? new Date(date).toISOString() : null;
}

export const GetMatchObject = (serverURL, token) => {
  return {
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
          data: {
            home_id: home,
            away_id: away,
            stage: stage,
            stage_session: stage_session,
          },
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
    DeleteSession: async (stage) => {
      try {
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
    CheckIfStage: async (stage) => {
      try {
        let response = await axios({
          method: "GET",
          url: serverURL + "matches/checkIfStage",
          params: { stage },
          headers: { Authorization: token },
        });
        return response.data;
      } catch (err) {
        throw err;
      }
    },
  };
};
