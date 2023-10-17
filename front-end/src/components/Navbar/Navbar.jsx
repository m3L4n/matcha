import { useContext, useEffect, useState } from 'react'
import './Navbar.scoped.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { disconnect } from 'components/Authentification/disconnect/disconnect'

import { socket } from 'src/socket/socket'
import { useAuth } from 'src/Context/AuthContext'

export default function Navbar() {
    const { setTriggerReload, user } = useAuth()
    const navigate = useNavigate()
    let pages = ['match', 'profile', 'message', 'notifications']
    const [sidebar, setSidebar] = useState(false)

    if (Object.keys(user)?.length == 0) {
        pages = ['login', 'register']
    }
    useEffect(() => {
        if (Object.keys(user).length > 0) {
            socket.emit('notifications', { userId: user.id })
            socket.on('number-notif-not-seen', (msg) => {})
        }
        return () => {
            socket.off('notifications', (reason) => {})
        }
    }, [user])
    const toggleSidebar = () => setSidebar(!sidebar)
    const handleDisconnect = async () => {
        disconnect()
        setTriggerReload(true)
        navigate('/')
    }

    return (
        <nav className={sidebar ? 'navbar navbar-deployed' : 'navbar'}>
            <div className="burger-icon">
                <a
                    className={
                        sidebar ? 'sidebar-toggle nav-open' : 'sidebar-toggle'
                    }
                    onClick={toggleSidebar}
                >
                    <span className="burger menu-toggle-bar--top"></span>
                    <span className="burger menu-toggle-bar--middle"></span>
                    <span className="burger menu-toggle-bar--bottom"></span>
                </a>
            </div>
            <ul
                className={
                    sidebar
                        ? 'navbar-content navbar-content-visible'
                        : 'navbar-content'
                }
            >
                {pages.map((page) => (
                    <li key={pages.indexOf(page)}>
                        {sidebar &&
                            (page != 'profile' ? (
                                <NavLink className={`body`} to={page}>
                                    {page}
                                </NavLink>
                            ) : (
                                <NavLink
                                    className={`body`}
                                    to={`/profile/${user.id}`}
                                >
                                    {page}
                                </NavLink>
                            ))}
                    </li>
                ))}
                <li>
                    {sidebar && Object.keys(user)?.length > 0 && (
                        <button
                            className="disconnect-button body"
                            onClick={handleDisconnect}
                        >
                            Disconnect{' '}
                        </button>
                    )}
                </li>
            </ul>
        </nav>
    )
}
