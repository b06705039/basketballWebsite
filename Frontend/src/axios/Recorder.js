import axios from "axios";

export const GetRecorderObject = (serverURL, token) => {
  return {
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
    InCharge: async (id) => {
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
    },
  };
};
