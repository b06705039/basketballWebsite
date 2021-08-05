import axios from "axios";

export const GetRecordObject = (serverURL, token) => {
  return {
    CreateTeamRecord: async (match_id, team_id) => {
      try {
        let response = await axios({
          method: "POST",
          url: serverURL + "records/createTeamRecord",
          data: { match_id, team_id },
          headers: { Authorization: token },
        });
        return response;
      } catch (err) {
        return `[Error][Record][CreateTeamRecord]`;
      }
    },
  };
};
