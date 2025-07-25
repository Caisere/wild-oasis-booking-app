import styled from "styled-components"
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


const FullStyled = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    align-items: center;
`

const ProtectedRoute = ({children}) => {
    // load the authenticated user
    const {isPending, isAuthenticated} = useUser()

    const navigate = useNavigate()


    // no authenticated user, redirect to login page
    // if (!isAuthenticated) {
    //     navigate('/login')
    // }

    // with useEffect
    useEffect(() => {
        if(!isAuthenticated && !isPending) navigate('/login')
    }, [isAuthenticated, isPending, navigate ])


    //spinner
    if (isPending) return (
        <FullStyled>
            <Spinner />
        </FullStyled>
    )


    // user, render the app
    if (isAuthenticated) return children
}

export default ProtectedRoute