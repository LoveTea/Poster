import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Alert, Button, Container, Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, login } from '../../store/slices/authSlice'
import { useLocation, useNavigate } from 'react-router-dom'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Заполните это поле')
        .email('Введите корректный email')
        .trim(),
    password: Yup.string()
        .required('Заполните это поле')
        .min(4, 'Пароль должен содержать как минимум 4 символа')
        .max(16, 'Пароль не должен содержать больше 16 символов')
        .trim(),
})

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { error } = useSelector((state) => state.auth)

    const [showAlert, setShowAlert] = useState(!!error)

    const fromPage = location.state?.from?.pathname || '/'

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false)
            dispatch(clearError())
        }, 5000)

        return () => {
            clearTimeout(timer)
        }
    }, [dispatch])

    return (
        <Container>
            <div className='w-50 mx-auto mt-4 d-flex flex-column gap-4'>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (
                        { email, password },
                        { resetForm, setSubmitting }
                    ) => {
                        await dispatch(login({ email, password }))
                        setSubmitting(false)
                        resetForm()
                        navigate(fromPage, {
                            replace: true,
                        })
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group
                                className='mb-3'
                                controlId='formBasicEmail'
                            >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    name='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.email && errors.email ? (
                                    <div className='error-message'>
                                        {errors.email}
                                    </div>
                                ) : null}
                            </Form.Group>

                            <Form.Group
                                className='mb-3'
                                controlId='formBasicPassword'
                            >
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control
                                    type='password'
                                    name='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.password && errors.password ? (
                                    <div className='error-message'>
                                        {errors.password}
                                    </div>
                                ) : null}
                            </Form.Group>
                            <Button
                                variant='primary'
                                type='submit'
                                disabled={isSubmitting}
                            >
                                Войти
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Alert show={showAlert} variant='danger'>
                    {error}
                </Alert>
            </div>
        </Container>
    )
}

export default LoginPage
