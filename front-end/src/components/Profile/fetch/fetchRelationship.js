import { fetcherWrapper } from "src/components/Global/fetcherWrapper";

async function fetchRelationships({ queryKey }) {
  return fetcherWrapper(
    "GET",
    `/match/${queryKey[1]}`,
    "cant get relation with user"
  );
}

export default fetchRelationships;
