import axios from "axios";

export const GetPostObject = (serverURL, token) => {
  return {
    Create: async (type, title_category, title_content, content) => {
      try {
        let response = await axios({
          method: "POST",
          url: serverURL + "posts/create",
          data: { type, title_category, title_content, content },
          headers: { Authorization: token },
        });
        return response.data;
      } catch (err) {
        return err;
      }
    },
    GetTypeContent: async (type) => {
      try {
        let response = await axios({
          method: "GET",
          url: serverURL + "posts/getType",
          params: { type },
          // headers: { Authorization: token }
        });
        return response.data;
      } catch (err) {
        return `[Error][Post][GetTypeContent]`;
      }
    },
    DeletePost: async (post_id) => {
      try {
        let response = await axios({
          method: "DELETE",
          url: serverURL + "posts/deletePost",
          data: { post_id },
          headers: { Authorization: token },
        });
        return response.data;
      } catch (err) {
        throw err;
      }
    },
  };
};
