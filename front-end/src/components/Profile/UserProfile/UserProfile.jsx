import React from "react";
import { useParams } from "react-router-dom";
import fetchUser from "../fetchUser";
import { useQuery } from "@tanstack/react-query";
export default function UserProfile() {
  const { id } = useParams();
  const user = useQuery(["id", id], fetchUser);
  if (user.isLoading) return <p> Loading </p>;

  return <div>UserProfile</div>;
}
