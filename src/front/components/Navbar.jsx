import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<header className="bg-white shadow">
			<div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
				<Link to="/" className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-md bg-emerald-300 flex items-center justify-center font-bold text-black">G</div>
					<span className="text-xl font-semibold">NameGen</span>
				</Link>

				<nav className="flex items-center gap-3">
					<Link to="/generator" className="text-sm font-medium text-black hover:underline">Generador</Link>
					<Link to="/register" className="text-sm font-medium text-emerald-300 hover:underline">Regístrate</Link>
					<Link to="/login" className="text-sm font-medium text-black border px-3 py-1 rounded hover:bg-black hover:text-white transition">Entrar</Link>
				</nav>
			</div>
		</header>
	)
}