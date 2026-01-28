import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { JSX } from 'react'

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { user, loading } = useAuth()

    if (loading) return <p>Carregando...</p>

    if (!user) return <Navigate to="/login" />

    return children
}