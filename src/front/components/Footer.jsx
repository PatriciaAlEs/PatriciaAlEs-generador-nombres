import { useDarkMode } from "../context/DarkModeContext"

export const Footer = () => {
	const { darkMode } = useDarkMode()

	return (
		<footer className={`mt-auto py-6 text-center ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-700'}`}>
			<div className="max-w-4xl mx-auto px-4">
				<p className="mb-2">Pensado y desarrollado por <strong>Patricia Alvarez</strong></p>
				<div className="flex items-center justify-center gap-4">
					<a href="https://www.linkedin.com/in/patricia-alvarez" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-emerald-300 hover:opacity-80">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="inline-block">
							<path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v14H0V8zm7.5 0h4.7v1.9h.1c.65-1.24 2.23-2.54 4.6-2.54 4.92 0 5.83 3.24 5.83 7.44V22H18v-7.2c0-1.72-.03-3.94-2.4-3.94-2.4 0-2.76 1.87-2.76 3.8V22H7.5V8z" />
						</svg>
					</a>

					<a href="https://github.com/PatriciaAlEs" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-emerald-300 hover:opacity-80">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="inline-block">
							<path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.2 1.18a11.1 11.1 0 012.92-.39c.99.01 1.99.13 2.92.39 2.22-1.5 3.2-1.18 3.2-1.18.63 1.58.24 2.75.12 3.04.74.81 1.19 1.84 1.19 3.1 0 4.42-2.71 5.4-5.29 5.68.42.36.8 1.08.8 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.2.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
						</svg>
					</a>
				</div>
			</div>
		</footer>
	)
};
