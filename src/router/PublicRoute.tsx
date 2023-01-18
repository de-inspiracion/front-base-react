import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PublicRoute({isAuthenticated, component: Component, ...rest}:any) {
    // si no esta logeado va al componente si no al home
    return (
        !isAuthenticated ? Component: <Navigate to='home'/>
    )
}
