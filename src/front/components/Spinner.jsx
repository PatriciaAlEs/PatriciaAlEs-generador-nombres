import React, { useEffect, useState, useRef } from 'react'

// Spinner muestra un overlay solo si `active` se mantiene true por más de `delay` ms.
const Spinner = ({ active = false, delay = 3000, transparentBackground = false }) => {
    const [visible, setVisible] = useState(false)
    const timer = useRef(null)

    useEffect(() => {
        if (active) {
            // start timer to show spinner after delay
            timer.current = setTimeout(() => setVisible(true), delay)
        } else {
            // hide immediately and clear timer
            setVisible(false)
            if (timer.current) {
                clearTimeout(timer.current)
                timer.current = null
            }
        }

        return () => {
            if (timer.current) {
                clearTimeout(timer.current)
                timer.current = null
            }
        }
    }, [active, delay])

    if (!visible) return null

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${transparentBackground ? '' : 'bg-black bg-opacity-30'}`}>
            <div className="flex items-center gap-3 p-4 rounded">
                <svg className="animate-spin h-10 w-10 text-emerald-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span className="text-emerald-200 font-medium">Cargando...</span>
            </div>
        </div>
    )
}

export default Spinner
