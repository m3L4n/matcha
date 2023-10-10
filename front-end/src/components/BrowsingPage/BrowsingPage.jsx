import { useEffect, useState } from "react";
import "./BrowsingPage.scoped.css";
import Card from "./Card/Card";
import SearchBar from "./SearchBar/SearchBar";
import getMatches from "./fetchMatches";
import { useQuery } from "@tanstack/react-query";
import { notify } from "../Global/toast-notify";
import getCurrentUser from "./fetchCurrentUser";

function isNotEmptyButNaN(param) {
  if (param !== "" && (isNaN(param) || !isFinite(param))) {
    return true;
  }
  return false;
}

export default function BrowsingPage() {
  const [requestParams, setRequestParams] = useState({
    action: "",
    age: "",
    location: "",
    fame: "",
    tags: ""
  });

  const [filterParams, setFilterParams] = useState({
    ageGap: "",
    locationGap: "",
    fameGap: "",
    sortBy: "",
    sortOption: "ascending"
  });

  const [matches, setMatches] = useState([]);

  const sortMatches = toSort => {
    if (filterParams.sortBy === "age") {
      toSort.sort((a, b) => a.age - b.age);
    } else if (filterParams.sortBy === "location") {
      toSort.sort((a, b) => a.location - b.location);
    } else if (filterParams.sortBy === "fame") {
      toSort.sort((a, b) => a.rate_fame - b.rate_fame);
    }
    return toSort;
  };

  const filterMatches = toFilter => {
    if (
      isNotEmptyButNaN(filterParams.ageGapMin) ||
      isNotEmptyButNaN(filterParams.ageGapMax)
    ) {
      notify("Error: invalid age gap filter parameters");
    } else if (
      isNotEmptyButNaN(filterParams.fameMin) ||
      isNotEmptyButNaN(filterParams.fameMax)
    ) {
      notify("Error: invalid fame gap filter parameters");
    } else if (
      isNotEmptyButNaN(filterParams.locationMin) ||
      isNotEmptyButNaN(filterParams.locationMax)
    ) {
      notify("Error: invalid location gap filter parameters");
    } else {
      if (filterParams.ageGapMin != "" && filterParams.ageGapMax != "") {
        console.log("LOL");
      }
    }
    return toFilter;
  };

  const { data: whoami } = useQuery({
    queryKey: ["whoami"],
    queryFn: getCurrentUser
  });

  const currentUser = whoami || {
    valided: false
  };

  const { status, error, data: users } = useQuery({
    queryKey: ["matches", requestParams],
    queryFn: getMatches,
    enabled: currentUser.valided
  });

  useEffect(() => {
    if (status === "success") {
      const filterAndSort = users => sortMatches(filterMatches(users));
      setMatches(filterAndSort(users?.result ?? []));
    }
  }, [status, users]);

  if (error) {
    return (
      <div className="matchesError">
        <h2>Cannot find any matches for you ... 💔</h2>
      </div>
    );
  }

  return status === "success" ? (
    <>
      <header className="title">
        <h1 className="header-title header">Matcha</h1>
      </header>
      <SearchBar
        requestParams={requestParams}
        setRequestParams={setRequestParams}
        setFilterParams={setFilterParams}
      />
      <section className="matches">
        {sortMatches(filterMatches(matches)).map(user => {
          return (
            <Card
              key={user.id}
              id={user.id}
              username={user.username}
              age={user.age}
              profilePicture={`http://placekitten.com/${Math.floor(
                Math.random() * (280 - 250 + 1) + 250
              )}/${Math.floor(Math.random() * (350 - 300 + 1) + 300)}`}
              city={"Paris"}
            />
          );
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
