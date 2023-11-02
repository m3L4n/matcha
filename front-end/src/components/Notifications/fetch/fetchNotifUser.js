import { fetcherWrapper } from "src/components/Global/fetcherWrapper";

export async function fetchNotifUser() {
  return fetcherWrapper(
    "GET",
    "/notifications/",
    "cant get notifications users"
  );
}
