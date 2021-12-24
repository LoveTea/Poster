import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components'

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default DefaultLayout
