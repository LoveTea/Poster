import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import { HomePage, LoginPage, NotFound, ProfilePage } from './pages'
import RequireAuth from './hoc/RequireAuth'

const App = () => {
    return (
        <>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route
                        index
                        element={
                            <RequireAuth>
                                <HomePage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='profile'
                        element={
                            <RequireAuth>
                                <ProfilePage />
                            </RequireAuth>
                        }
                    />
                    <Route path='login' element={<LoginPage />} />
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
