import { useEffect, useState } from 'react'
import './BrowsingPage.scoped.css'
import Card from './Card/Card'
import SearchBar from './SearchBar/SearchBar'
import getMatches from './fetchMatches'
import { useQuery } from '@tanstack/react-query'
import { notify } from '../Global/toast-notify'
import { useAuth } from 'src/Context/AuthContext'

function isNotEmptyButNaN(param) {
    if (param !== '' && (isNaN(param) || !isFinite(param))) {
        return true
    }
    return false
}

export default function BrowsingPage() {
    const [requestParams, setRequestParams] = useState({
        action: '',
        age: '',
        location: '',
        fame: '',
        tags: '',
    })

    const [filterParams, setFilterParams] = useState({
        ageGap: '',
        locationGap: '',
        fameGap: '',
        sortBy: '',
        sortOption: 'ascending',
    })

    const [matches, setMatches] = useState([])

    function distanceBetweenTwoPoints(positionA, positionB) {
        // Haversine algorithm
        const EARTH_RADIUS = 6.3788

        const latA = positionA.x / (180 / Math.PI)
        const latB = positionB.x / (180 / Math.PI)

        const longA = positionA.y / (180 / Math.PI)
        const longB = positionB.y / (180 / Math.PI)

        let distLong = longB - longA
        let distLat = latB - latA

        let a =
            Math.pow(Math.sin(distLat / 2), 2) +
            Math.cos(latA) *
                Math.cos(latB) *
                Math.pow(Math.sin(distLong / 2), 2)

        let c = 2 * Math.asin(Math.sqrt(a))

        return c * EARTH_RADIUS * 1000
    }

    const sortMatches = (toSort) => {
        if (filterParams.sortBy === 'age') {
            toSort.sort((a, b) => a.age - b.age)
        } else if (filterParams.sortBy === 'location') {
            toSort.sort((a, b) => a.location - b.location)
        } else if (filterParams.sortBy === 'fame') {
            toSort.sort((a, b) => a.rate_fame - b.rate_fame)
        }
        return toSort
    }

    const filterMatches = (toFilter) => {
        if (isNotEmptyButNaN(filterParams.ageGap)) {
            notify('Error: invalid age gap filter parameters')
        } else if (isNotEmptyButNaN(filterParams.fameGap)) {
            notify('Error: invalid fame gap filter parameters')
        } else if (isNotEmptyButNaN(filterParams.locationGap)) {
            notify('Error: invalid location gap filter parameters')
        } else {
            if (filterParams.ageGap !== '') {
                const ageGap = Number(filterParams.ageGap)
                const currentUserAge = Number(currentUser.age)
                let minAge = currentUserAge - ageGap
                minAge = minAge < 18 ? 18 : minAge
                const maxAge = currentUserAge + ageGap
                toFilter = toFilter.filter(
                    (user) =>
                        Number(user.age) >= minAge && Number(user.age) <= maxAge
                )
            }
            if (filterParams.fameGap !== '') {
                const minFame = currentUser.rate_fame - filterMatches.fameGap
                const maxFame = currentUser.rate_fame + filterMatches.fameGap
                toFilter = toFilter.filter(
                    (user) =>
                        user.rate_fame >= minFame && user.rate_fame <= maxFame
                )
            }
            if (filterParams.locationGap !== '') {
                const locationGap = Number(filterParams.locationGap)
                const currentUserPosition = Number(currentUser.position)
                toFilter = toFilter.filter(
                    (user) =>
                        distanceBetweenTwoPoints(
                            currentUserPosition,
                            user.position
                        ) < locationGap
                )
            }
        }
        return toFilter
    }

    const { user: currentUser } = useAuth()

    const {
        status,
        error,
        data: users,
    } = useQuery({
        queryKey: ['matches', requestParams],
        queryFn: getMatches,
        enabled: currentUser.valided,
    })

    useEffect(() => {
        if (status === 'success') {
            const filterAndSort = (users) => sortMatches(filterMatches(users))
            setMatches(filterAndSort(users?.result ?? []))
        }
    }, [status, users])

    if (error) {
        return (
            <div className="matchesError">
                <h2>Cannot find any matches for you ... 💔</h2>
            </div>
        )
    }

    return status === 'success' ? (
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
                {sortMatches(filterMatches(matches)).map((user) => {
                    return (
                        <Card
                            key={user.id}
                            id={user.id}
                            username={user.username}
                            age={user.age}
                            profilePicture={user.profile_picture}
                            city={user.city}
                        />
                    )
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
    )
}
