import { notify } from "../../Global/toast-notify";
export default async function disconnect() {
  const options = {
    method: "delete",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    credentials: "include",
  };
  fetch("http://localhost:4000/users/disconnect", options)
    .then((response) => {
      if (response.status == 200) {
        notify("success", "disconnected");
        return {};
      }
      return response.json();
    })
    .catch(() => {
      notify("error", "we can't disconnect you, please retry");
    });
}
