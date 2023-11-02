import { fetcherWrapper } from "src/components/Global/fetcherWrapper";

async function fetchBlockUser({ id, block }) {
  return fetcherWrapper("PUT", `/block/`, "cant block this user", {
    id,
    block
  });
}

export default fetchBlockUser;
