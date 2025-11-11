import React from "react";
import { Link } from "react-router-dom";

// Landing/Home diseñado con Tailwind — paleta: menta (verde menta), blanco y negro
export const Home = () => {
	return (
		<div className="min-h-screen bg-white text-black flex items-center justify-center">
			<div className="max-w-5xl mx-auto px-6 py-16">
				<div className="grid md:grid-cols-2 gap-10 items-center">
					<div className="space-y-6">
						<h1 className="text-4xl md:text-5xl font-extrabold text-emerald-300">Generador de nombres</h1>
						<p className="text-lg text-gray-700">
							Crea nombres únicos para personajes de rol, shooters o battle royale en segundos. Elige una
							categoría, mezcla estilos y obtén propuestas listas para usar en tus partidas.
						</p>

						<div className="flex items-center gap-4">
							<Link to="/register" className="inline-block">
								<button className="bg-emerald-300 text-black font-semibold px-6 py-3 rounded-lg shadow-lg transform transition duration-300 hover:-translate-y-1 hover:scale-105">
									Regístrate
								</button>
							</Link>

							<Link to="/login" className="inline-block">
								<button className="border-2 border-black text-black px-6 py-3 rounded-lg font-medium hover:bg-black hover:text-white transition">
									Iniciar sesión
								</button>
							</Link>
						</div>

						<p className="text-sm text-gray-500 mt-4">
							¿Olvidaste tu contraseña? <Link to="/forgot" className="text-emerald-300 underline">Recupérala aquí</Link>.
						</p>
					</div>

					<div className="bg-black rounded-2xl p-8 text-white shadow-2xl">
						<h3 className="text-2xl font-bold mb-4">¿Qué hace este proyecto?</h3>
						<ul className="list-disc pl-5 space-y-2 text-gray-200">
							<li>Genera nombres temáticos automáticamente.</li>
							<li>Permite guardar personajes y listas (próximamente).</li>
							<li>Interfaz moderna y rápida para inspirarte en minutos.</li>
						</ul>

						<div className="mt-6">
							<p className="text-sm text-gray-300">Empieza ahora — regístrate y prueba las sugerencias.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};