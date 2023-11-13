import { useEffect, useState } from "react";
import "./BrowsingPage.scoped.css";
import Card from "./Card/Card";
import SearchBar from "./SearchBar/SearchBar";
import getMatches from "./fetchMatches";
import { useQuery } from "@tanstack/react-query";
import { notify } from "../Global/toast-notify";
import { useAuth } from "src/Context/AuthContext";
import { useNavigate } from "react-router-dom";

function isNotEmptyButNaN(param) {
  if (param !== "" && (isNaN(param) || !isFinite(param))) {
    return true;
  }
  return false;
}

export default function BrowsingPage() {
  const navigate = useNavigate();
  const [requestParams, setRequestParams] = useState({
    action: "",
    age: "",
    location: "",
    fame: "",
    tags: "",
  });

  const [filterParams, setFilterParams] = useState({
    ageGap: "",
    locationGap: "",
    fameGap: "",
    commongTags: "",
    sortBy: "",
    sortOption: "ascending",
  });

  const [matches, setMatches] = useState([]);
  const { user: currentUser } = useAuth();

  function distanceBetweenTwoPoints(positionA, positionB) {
    // Haversine algorithm
    const EARTH_RADIUS = 6.3788;

    const latA = positionA.x / (180 / Math.PI);
    const latB = positionB.x / (180 / Math.PI);

    const longA = positionA.y / (180 / Math.PI);
    const longB = positionB.y / (180 / Math.PI);

    let distLong = longB - longA;
    let distLat = latB - latA;

    let a = Math.pow(Math.sin(distLat / 2), 2) + Math.cos(latA) * Math.cos(latB) * Math.pow(Math.sin(distLong / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    return c * EARTH_RADIUS * 1000;
  }

  const sortMatches = (toSort) => {
    if (filterParams.sortBy === "age") {
      if (filterParams.sortOption === "ascending") {
        toSort.sort((a, b) => a.age - b.age);
      } else {
        toSort.sort((a, b) => b.age - a.age);
      }
    } else if (filterParams.sortBy === "location") {
      if (filterParams.sortOption === "ascending") {
        toSort.sort((a, b) => distanceBetweenTwoPoints(a.position, currentUser.position) - distanceBetweenTwoPoints(b.position, currentUser.position));
      } else {
        toSort.sort((a, b) => distanceBetweenTwoPoints(b.position, currentUser.position) - distanceBetweenTwoPoints(a.position, currentUser.position));
      }
    } else if (filterParams.sortBy === "fame") {
      if (filterParams.sortOption === "ascending") {
        toSort.sort((a, b) => a.rate_fame - b.rate_fame);
      } else {
        toSort.sort((a, b) => b.rate_fame - a.rate_fame);
      }
    } else if (filterParams.sortBy === "tags") {
      if (filterParams.sortOption === "ascending") {
        toSort.sort((a, b) => a.common_tags.length - b.common_tags.length);
      } else {
        toSort.sort((a, b) => b.common_tags.length - a.common_tags.length);
      }
    }
    return toSort;
  };

  const filterMatches = (toFilter) => {
    if (isNotEmptyButNaN(filterParams.ageGap)) {
      notify("Error: invalid age gap filter parameters");
    } else if (isNotEmptyButNaN(filterParams.fameGap)) {
      notify("Error: invalid fame gap filter parameters");
    } else if (isNotEmptyButNaN(filterParams.locationGap)) {
      notify("Error: invalid location gap filter parameters");
    } else {
      if (filterParams.ageGap !== "") {
        const ageGap = Number(filterParams.ageGap);
        const currentUserAge = Number(currentUser.age);
        let minAge = currentUserAge - ageGap;
        minAge = minAge < 18 ? 18 : minAge;
        const maxAge = currentUserAge + ageGap;
        toFilter = toFilter.filter((user) => Number(user.age) >= minAge && Number(user.age) <= maxAge);
      }
      if (filterParams.fameGap !== "") {
        const minFame = currentUser.rate_fame - Number(filterParams.fameGap);
        const maxFame = currentUser.rate_fame + Number(filterParams.fameGap);
        toFilter = toFilter.filter((user) => user.rate_fame >= minFame && user.rate_fame <= maxFame);
      }
      if (filterParams.locationGap !== "") {
        const locationGap = Number(filterParams.locationGap);
        toFilter = toFilter.filter((user) => distanceBetweenTwoPoints(currentUser.position, user.position) < locationGap);
      }
      if (filterParams.commongTags !== "") {
        const commonTags = Number(filterParams.commongTags);
        toFilter = toFilter.filter((user) => user.common_tags.length >= commonTags);
      }
    }
    return toFilter;
  };

  const { status, refetch, data: users } = useQuery({
    queryKey: ["matches", requestParams],
    queryFn: getMatches,
    retry: true,
    staleTime: 10000,
    cacheTime: 1000,
    onSuccess: (response) => {
      if (response?.status === "error") {
        if (response?.code === 400) {
          notify("error", response?.message);
        }
      }
    },
  });

  useEffect(() => {
    if (status === "success") {
      const filterAndSort = (users) =>
        sortMatches(filterMatches(users))
          .map((user) => ({
            ...user,
            common_tags: user.common_tags.filter((value, index) => user.common_tags.indexOf(value) === index),
          }))
          .filter((match) => match.common_tags.length > 1);
      setMatches(filterAndSort(users?.result ?? []));
    }
  }, [status, users]);

  if (users?.status === "error") {
    return (
      <div className="matchesError">
        <h2>Cannot find any matches for you 💔</h2>
        <button
          className="retry-button"
          onClick={() => {
            setRequestParams({
              action: "",
              age: "",
              location: "",
              fame: "",
              tags: "",
            });

            setFilterParams({
              ageGap: "",
              locationGap: "",
              fameGap: "",
              commongTags: "",
              sortBy: "",
              sortOption: "ascending",
            });

            refetch();
          }}
        >
          retry
        </button>
      </div>
    );
  }
  function handleMapUser() {
    navigate("/maps", { state: { data: sortMatches(filterMatches(matches)) } });
  }
  return status === "success" ? (
    <>
      <header className="title">
        <h1 className="header-title header">Matcha</h1>
      </header>
      <SearchBar requestParams={requestParams} setRequestParams={setRequestParams} setFilterParams={setFilterParams} />
      <div className="container-button-maps">
        <button onClick={handleMapUser} className="button-maps body">
          {" "}
          See map of user
        </button>
      </div>
      <section className="matches">
        {sortMatches(filterMatches(matches)).map((user) => {
          return <Card key={user.id} id={user.id} username={user.username} age={user.age} profilePicture={user.profile_picture} city={user.city} />;
        })}
      </section>
    </>
  ) : (
    <div className="loadingMatches">
      <h2>
        Loading matches
        <span className="loading__dot"></span>
        <span className="loading__dot"></span>
        <span className="loading__dot"></span>
      </h2>
    </div>
  );
}
