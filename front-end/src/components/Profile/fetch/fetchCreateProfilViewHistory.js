import { fetcherWrapper } from "src/components/Global/fetcherWrapper";
export async function fetchCreateProfilViewHistory({ paramId: id_watched }) {
  return fetcherWrapper("POST", `/views`, "Can't create profil view History", {
    id_watched
  });
}
