import { fetcherWrapper } from "src/components/Global/fetcherWrapper";

async function fetchUser({ queryKey }) {
  return fetcherWrapper(
    "GET",
    `/users/getInfo/${queryKey[1]}`,
    "cant get user info"
  );
}

export default fetchUser;
