import { fetcherWrapper } from "src/components/Global/fetcherWrapper";

async function fetchBlockUser({ id, block }) {
  return fetcherWrapper("PUT", `match/block/${id}`, "cant block this user", {
    block
  });
}

export default fetchBlockUser;
