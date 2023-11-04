import { fetcherWrapper } from "src/components/Global/fetcherWrapper";

async function fetchTags() {
  return fetcherWrapper("GET", "/tags", `cant have all enum`);
}

export default fetchTags;
