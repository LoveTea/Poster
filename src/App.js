import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import { HomePage, NotFound, Profile } from './pages'

const App = () => {
    return (
        <>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
