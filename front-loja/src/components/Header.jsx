import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Header({ onSearch, onFilter, carrinho = [], setPagina }) {
  const [filtroAtivo, setFiltroAtivo] = useState('TODOS');
  const [mostrarMegaMenu, setMostrarMegaMenu] = useState(false);
  const [categoriasDoBanco, setCategoriasDoBanco] = useState([]);
  
  const navigate = useNavigate();

  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/categorias");
        setCategoriasDoBanco(res.data);
      } catch (err) {
        console.error("Erro ao carregar categorias", err);
      }
    };
    carregarCategorias();
  }, []);

  // FUNÇÃO MESTRA: Filtra e garante que o usuário está na vitrine
  const aplicarFiltro = (categoria) => {
    setFiltroAtivo(categoria);
    onFilter(categoria); // Executa a lógica de filtro do App.jsx
    setMostrarMegaMenu(false); 
    if (setPagina) setPagina("loja");
    navigate('/'); // Garante que volta para a vitrine se estiver em Detalhes/Admin
    window.scrollTo(0, 0);
  };

  return (
    <header className="shadow-sm sticky-top bg-white" onMouseLeave={() => setMostrarMegaMenu(false)}>
      <div className="text-white text-center py-1 fw-bold" style={{ backgroundColor: '#cc0066', fontSize: '12px' }}>
        FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 199,90! 🚚
      </div>

      <div className="py-3" style={{ backgroundColor: '#ff007f' }}>
        <div className="container d-flex align-items-center justify-content-between gap-3">
          {/* LOGO */}
          <div 
            className="text-white fw-bold fs-2" 
            style={{ fontFamily: 'cursive', cursor: 'pointer', userSelect: 'none' }} 
            onClick={() => aplicarFiltro('TODOS')}
            onDoubleClick={() => navigate("/admin")}
          >
            🌞 ToyBox
          </div>

          <div className="flex-grow-1 mx-lg-4" style={{ maxWidth: '600px' }}>
            <div className="input-group shadow-sm rounded-pill overflow-hidden">
              <span className="input-group-text bg-white border-0 text-muted">🔍</span>
              <input 
                type="text" 
                className="form-control border-0 py-2 shadow-none" 
                placeholder="Busque por heróis, bonecas ou jogos..." 
                onChange={(e) => onSearch(e.target.value)} 
              />
            </div>
          </div>

          <div className="d-flex align-items-center text-white gap-4 fs-4">
             <span style={{ cursor: 'pointer' }}>👤</span>
             <div 
                style={{ cursor: 'pointer', position: 'relative' }} 
                data-bs-toggle="offcanvas" 
                data-bs-target="#gavetaCarrinho"
             >
                🛒 {totalItens > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
                    {totalItens}
                  </span>
                )}
             </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-bottom position-relative">
        <div className="container d-flex gap-4 py-2 text-uppercase fw-bold" style={{ fontSize: '12px' }}>
            
            <div 
              className="px-2"
              style={{ cursor: 'pointer', color: '#ff007f', borderRight: '1px solid #ddd' }} 
              onMouseEnter={() => setMostrarMegaMenu(true)}
            >
              ☰ TODAS AS CATEGORIAS
            </div>

            <span 
              style={{ cursor: 'pointer', color: filtroAtivo === 'TODOS' ? '#ff007f' : '#6c757d' }} 
              onClick={() => aplicarFiltro('TODOS')}
            >
              HOME
            </span>
            
            {/* FILTROS RÁPIDOS (Agora usam aplicarFiltro para funcionar como as categorias) */}
            <span style={{ cursor: 'pointer', color: filtroAtivo === 'LEGO' ? '#ff007f' : '#6c757d' }} onClick={() => aplicarFiltro('LEGO')}>LEGO</span>
            <span style={{ cursor: 'pointer', color: filtroAtivo === 'MATTEL' ? '#ff007f' : '#6c757d' }} onClick={() => aplicarFiltro('MATTEL')}>MATTEL</span>
            <span style={{ cursor: 'pointer', color: filtroAtivo === 'HASBRO' ? '#ff007f' : '#6c757d' }} onClick={() => aplicarFiltro('HASBRO')}>HASBRO</span>
            <span style={{ cursor: 'pointer', color: filtroAtivo === 'ESTRELA' ? '#ff007f' : '#6c757d' }} onClick={() => aplicarFiltro('ESTRELA')}>ESTRELA</span>
            
            <span className="ms-auto" style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => aplicarFiltro('OFERTAS')}>OFERTAS %</span>
        </div>

        {/* MEGA MENU */}
        {mostrarMegaMenu && (
          <div 
            className="position-absolute shadow-lg border-0 rounded-bottom bg-white p-4" 
            style={{ top: '100%', left: '0', width: '100%', zIndex: 1050 }}
            onMouseEnter={() => setMostrarMegaMenu(true)}
          >
            <div className="container">
                <div className="row">
                    <div className="col-md-3 border-end">
                        <h6 className="fw-bold text-dark mb-3">Categorias do Banco</h6>
                        <ul className="list-unstyled small fw-normal">
                            {categoriasDoBanco.map(cat => (
                                <li key={cat.id} className="mb-2 text-muted" style={{ cursor: 'pointer' }} onClick={() => aplicarFiltro(cat.nome)}>
                                    {cat.nome}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* ... Resto do Mega Menu ... */}
                </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;