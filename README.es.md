🧪 Generador de Nombres

Aplicación full-stack que genera nombres de forma dinámica.
Frontend en React, backend en Flask, comunicándose mediante API REST.
Proyecto orientado a practicar integración cliente-servidor, estructura de proyectos escalables y buenas prácticas de desarrollo web.

🚀 Funcionalidades

Generación de nombres desde el backend

Interfaz sencilla en React

Consumo de API propia

Arquitectura separada: UI (Frontend) + Lógica (Backend)

🛠️ Tecnologías utilizadas
Frontend

React

JavaScript

HTML / CSS

Backend

Python

Flask

Otros

Fetch API
Instalación via Pipenv / Docker (opcional)

⚙️ Instalación y ejecución

Clonar el repositorio:

git clone https://github.com/PatriciaAlEs/PatriciaAlEs-generador-nombres
cd PatriciaAlEs-generador-nombres

🔹 Backend (Flask)
cd src/server
pipenv install
pipenv run start



🔹 Frontend (React)
cd src/front
npm install
npm run start


Frontend disponible en: http://localhost:3001

Asegúrate de tener ambos servicios levantados para que la app funcione correctamente.

🏗️ Arquitectura
React (Frontend) --> API REST --> Flask (Backend)


Separación por carpetas:

src/front → interfaz y lógica del cliente

src/server → API y lógica del generador de nombres

🧩 Mejoras futuras / Roadmap

Temáticas diferentes de generación de nombres

Sistema de favoritos

Estilos más avanzados en la interfaz

Despliegue online (Render / Netlify)

👩‍💻 Autora

Patricia Álvarez
🔗 LinkedIn: (https://www.linkedin.com/in/patricia-alvarez-estevez/)
📌 Portfolio: (work in progress)

