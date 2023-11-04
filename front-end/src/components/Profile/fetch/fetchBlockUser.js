import { fetcherWrapper } from "src/components/Global/fetcherWrapper";

async function fetchBlockUser(body) {
  return fetcherWrapper("PUT", `/block`, "cant block this user", { ...body });
}

export default fetchBlockUser;
