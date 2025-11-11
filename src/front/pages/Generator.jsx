import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const CATEGORIES = {
  rpg: {
    label: 'Rol / Fantasía',
    prefixes: ['Aer', 'Bel', 'Cal', 'Dor', 'El', 'Fin', 'Gal', 'Har', 'Ith', 'Jar', 'Kel', 'Lun', 'Mor', 'Ner', 'Or', 'Pel', 'Qir', 'Ryn', 'Sol', 'Tor'],
    middles: ['an', 'or', 'en', 'is', 'ar', 'il', 'us', 'ath', 'ion', 'el', 'ir'],
    suffixes: ['dor', 'wen', 'thas', 'mar', 'gorn', 'dil', 'wyn', 'nor', 'ion', 'rus', 'mir', 'thil']
  },
  shooter: {
    label: 'Shooter',
    prefixes: ['Ghost', 'Viper', 'Zero', 'Alpha', 'Blaze', 'Raptor', 'Strike', 'Delta', 'Nova', 'Echo', 'Reaper', 'Shadow', 'Specter'],
    middles: ['_', '-', 'X', '', 'Z', 'Rx'],
    suffixes: ['01', '99', 'Pro', 'Elite', 'Sniper', 'Shot', 'Ops', 'Core', 'Edge']
  },
  br: {
    label: 'Battle Royale',
    prefixes: ['Sky', 'Storm', 'Grim', 'Wild', 'Iron', 'Titan', 'Prime', 'Blade', 'Rogue', 'Pulse', 'Venom', 'Apex', 'Crimson', 'Vortex', 'Phantom'],
    middles: ['', '-', '_', '', 'X', 'Rx', 'Z'],
    suffixes: ['Survivor', 'Runner', 'King', 'Queen', 'Slayer', 'Champion', 'Drift', 'Edge', 'Hunter', 'Breaker', 'Master']
  }
}

const STYLE_MODS = {
    fantasy: { label: 'Fantasía' },
    futuristic: { label: 'Futurista' },
    grim: { label: 'Oscuro' },
    silly: { label: 'Divertido' }
}

function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function applyStyle(name, styles) {
    // simple modifiers based on styles
    let out = name
    if (styles.fantasy) out = out.replace(/X/g, 'a').replace(/0/g, 'o')
    if (styles.futuristic) out = out.split('').map((c, i) => i % 2 ? c.toUpperCase() : c).join('')
    if (styles.grim) out = out.replace(/[aeiou]/gi, '')
    if (styles.silly) out = out + rand(['~', '!!', '_o_', '~'])
    return out
}

export const Generator = () => {
    const [category, setCategory] = useState('rpg')
    const [styles, setStyles] = useState({ fantasy: true, futuristic: false, grim: false, silly: false })
    const [count, setCount] = useState(8)
    const [results, setResults] = useState([])

    const generateOne = () => {
        const cat = CATEGORIES[category]
        const a = rand(cat.prefixes)
        const b = rand(cat.middles)
        const c = rand(cat.suffixes)
        let name = `${a}${b}${c}`
        name = applyStyle(name, styles)
        return name
    }

    const generate = () => {
        const list = []
        for (let i = 0; i < count; i++) list.push(generateOne())
        setResults(list)
    }

    const toggleStyle = (k) => setStyles(s => ({ ...s, [k]: !s[k] }))

    return (
        <div className="min-h-screen bg-white text-black py-12">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl font-extrabold text-emerald-300 mb-2">Generador de nombres</h2>
                <p className="text-gray-700 mb-6">Crea nombres únicos para personajes de rol, shooters o battle royale en segundos. Elige una categoría, mezcla estilos y obtén propuestas listas para usar en tus partidas.</p>

                <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
                    <div className="grid md:grid-cols-3 gap-4 items-end">
                        <div>
                            <label className="block text-sm font-medium mb-1">Categoría</label>
                            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border rounded px-3 py-2">
                                {Object.keys(CATEGORIES).map(k => <option key={k} value={k}>{CATEGORIES[k].label}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Cantidad</label>
                            <input type="number" min="1" max="50" value={count} onChange={e => setCount(Number(e.target.value))} className="w-full border rounded px-3 py-2" />
                        </div>

                        <div className="flex gap-2">
                            <button onClick={generate} className="bg-emerald-300 text-black px-4 py-2 rounded font-semibold">Generar</button>
                            <button onClick={() => { setResults([]) }} className="border px-4 py-2 rounded">Limpiar</button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-2">Estilos (mezcla)</label>
                        <div className="flex gap-3 flex-wrap">
                            {Object.keys(STYLE_MODS).map(k => (
                                <label key={k} className="inline-flex items-center gap-2">
                                    <input type="checkbox" checked={styles[k]} onChange={() => toggleStyle(k)} />
                                    <span className="text-sm">{STYLE_MODS[k].label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    {results.length === 0 ? (
                        <div className="text-gray-500">Pulsa Generar para obtener nombres.</div>
                    ) : (
                        <div className="grid sm:grid-cols-2 gap-4">
                            {results.map((r, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white border rounded px-4 py-3">
                                    <div className="font-medium">{r}</div>
                                    <div className="flex items-center gap-2">
                                        <CopyToClipboard text={r}>
                                            <button className="text-sm px-3 py-1 border rounded hover:bg-gray-100">Copiar</button>
                                        </CopyToClipboard>
                                        <button onClick={() => navigator.clipboard.writeText(r)} className="text-sm px-3 py-1 border rounded hidden">Copy2</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Generator
