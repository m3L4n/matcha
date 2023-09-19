import { notify } from "../../Global/toast-notify";
export async  function disconect(setLoading){
  const options = {
    method: "delete",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    credentials: "include",
  };
  fetch("http://localhost:4000/users/disconect", options)
    .then(response => {
      console.log(response);
      if (response.status == 200) {
        notify(
          "sucess",
          "disconected"
        );
        setLoading(false);
      }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => {
      notify("error", "we can't send email for the moment, please retry");
    });

}