import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext"

export const Navbar = () => {
	const { darkMode, toggleDarkMode } = useDarkMode()

	return (
		<header className={`shadow ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
			<div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
				<Link to="/" className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-md bg-emerald-300 flex items-center justify-center font-bold text-black">G</div>
					<span className="text-xl font-semibold">NameGen</span>
				</Link>

				<nav className="flex items-center gap-3">
					{/* El enlace al generador se muestra en la página Home como botón principal */}
					<Link to="/register" className={`text-sm font-medium px-3 py-1 rounded transform transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg ${darkMode ? 'bg-emerald-400 text-black' : 'bg-emerald-300 text-black'}`}>
						Regístrate
					</Link>
					<Link to="/login" className={`text-sm font-medium px-3 py-1 rounded transform transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg ${darkMode ? 'border border-gray-600 text-gray-300 hover:bg-gray-800' : 'border border-black text-black hover:text-emerald-300'}`}>
						Entrar
					</Link>
					<button onClick={toggleDarkMode} className={`text-sm font-medium px-3 py-1 rounded transition ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}>
						{darkMode ? '☀️' : '🌙'}
					</button>
				</nav>
			</div>
		</header>
	)
}