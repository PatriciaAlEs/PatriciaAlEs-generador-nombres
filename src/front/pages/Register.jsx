import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMsg(null)
        try {
            const backend = import.meta.env.VITE_BACKEND_URL || ''
            const res = await fetch(backend + '/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()
            if (res.status === 201) {
                setMsg({ type: 'success', text: 'Registro correcto. Puedes iniciar sesión.' })
                setTimeout(() => navigate('/login'), 1200)
            } else {
                setMsg({ type: 'error', text: data.msg || 'Error en el registro' })
            }
        } catch (err) {
            setMsg({ type: 'error', text: err.message })
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-emerald-300">Crear cuenta</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Contraseña</label>
                        <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200" />
                    </div>

                    <div className="flex items-center justify-between">
                        <button className="bg-emerald-300 text-black font-semibold px-4 py-2 rounded">Registrarme</button>
                        <a className="text-sm text-gray-500" href="/forgot">¿Olvidaste tu contraseña?</a>
                    </div>
                </form>

                {msg && (
                    <div className={`mt-4 p-3 rounded ${msg.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        {msg.text}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Register
