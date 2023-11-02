import { fetcherWrapper } from "src/components/Global/fetcherWrapper";

export async function fetchViewHistory() {
  return fetcherWrapper("GET", "/views", "Can't get view history ");
}
