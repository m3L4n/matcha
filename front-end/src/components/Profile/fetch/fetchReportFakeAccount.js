import { fetcherWrapper } from "src/components/Global/fetcherWrapper";

async function fetchReportFakeAccount(id) {
  return fetcherWrapper(
    "PUT",
    "/users/reportFakeAccount",
    "cant report this user",
    id
  );
}

export default fetchReportFakeAccount;
