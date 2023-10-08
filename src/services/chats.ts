import axios from "axios";

type CreateChatType = {
  file_key: string;
  file_name: string;
};

export const createChat = async ({ file_key, file_name }: CreateChatType) => {
  const response = await axios.post("/api/create-chat", {
    file_key,
    file_name,
  });
  return response.data;
};
