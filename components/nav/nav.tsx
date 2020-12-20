import react from 'react'
import { useRouter } from 'next/router'

export default function nav() {
    const router = useRouter()

    return (<>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a onClick={() => router.push('/')} className="navbar-brand" href="#">Los Criados</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a onClick={() => router.push('/')} className="nav-link" href="#"> Ventas</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={() => router.push('/product/')} className="nav-link" href="#"> Productos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => router.push('/estadistisc')} href="#">Estadisticas</a>
                    </li>
                </ul>
            </div>
        </nav>
    </>)
}
  