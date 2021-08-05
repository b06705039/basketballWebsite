import axios from "axios";

export const GetTimeObject = (serverURL, token) => {
  return {
    Update: async (timeString) => {
      // return status success | fail_<reason>

      // [Must] timeString   沒空時間字串
      // [Must] token        {administer: team}
      try {
        let response = await axios({
          method: "POST",
          url: serverURL + "time/update",
          data: { timeString },
          headers: { Authorization: token },
        });
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
};
