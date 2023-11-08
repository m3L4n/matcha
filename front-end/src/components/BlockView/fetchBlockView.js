import { fetcherWrapper } from "src/components/Global/fetcherWrapper";

export async function fetchBlockView() {
  return fetcherWrapper("GET", "/block/", "cant get blocked  by users");
}
