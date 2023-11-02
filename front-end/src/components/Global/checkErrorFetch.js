import { notify } from "src/components/Global/toast-notify";

export function checkErrorFetch(result) {
  console.log("get data");
  if (result.status == 401) {
    notify("warning", "you need to be connected");
    return { error: true, authorized: false, result };
  }
  if (result instanceof Error) {
    notify("error", result.message);
    return { error: true, authorized: true, result };
  }
  console.log(result instanceof Error);

  return { error: false, authorized: true };
}
