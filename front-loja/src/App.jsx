import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Admin from './Admin'; 
import LoginAdmin from './Login'; 
import SobreEquipe from './Equipe'; 
import Detalhes from './Detalhes';
import Swal from 'sweetalert2';

// COMPONENTE DE SELETOR DE CATEGORIAS (Círculos com Zoom)
function SeletorCategorias({ onFilter }) {
  const filtrosReais = [
    { id: 'Heróis', label: 'Heróis e Heroinas', img: '/Filtros/Herois.png' },
    { id: 'Meninas', label: 'Meninas', img: '/Filtros/Meninas.png' },
    { id: 'Bebês', label: 'Bebês', img: '/Filtros/Bebes.png' },
    { id: 'Jogos', label: 'Jogos', img: '/Filtros/Jogos.png' },
    { id: 'LEGO', label: 'LEGO', img: '/Filtros/Lego.png' },
  ];

  return (
    <div className="container py-5 mt-2"> 
      <div 
        className="d-flex justify-content-center align-items-start gap-5 overflow-auto pb-4" 
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          minHeight: '220px'
        }}
      >
        {filtrosReais.map((f) => (
          <div 
            key={f.id} 
            className="text-center" 
            style={{ 
                cursor: 'pointer', 
                minWidth: '160px',
                paddingTop: '10px'
            }}
            onClick={() => onFilter(f.id)}
          >
            <div 
              className="rounded-circle shadow-lg mb-3 d-flex align-items-center justify-content-center"
              style={{ 
                width: '150px', 
                height: '150px', 
                backgroundColor: '#fff',
                overflow: 'hidden',
                border: 'none',
                position: 'relative',
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                margin: '0 auto'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img 
                src={f.img} 
                alt={f.label} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transform: 'scale(1.35)',
                  display: 'block'
                }}
                onError={(e) => e.target.src = 'https://via.placeholder.com/150/ff007f/ffffff?text=' + f.label} 
              />
            </div>
            <p className="fw-bold text-dark text-uppercase m-0" style={{ fontSize: '14px', letterSpacing: '1px' }}>
              {f.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// VITRINE DE PRODUTOS
function Vitrine({ brinquedos, adicionarAoCarrinho }) {
  const navigate = useNavigate();

  return (
    <div className="row row-cols-1 row-cols-md-4 g-4">
      {brinquedos.map(b => (
        <div key={b.id} className="col">
          <div 
            className="card h-100 border-0 shadow-sm rounded-4 p-3 text-center" 
            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onClick={() => navigate(`/produto/${b.id}`)}
          >
            <img 
              src={b.caminhoImagem.startsWith('http') 
                ? b.caminhoImagem 
                : `http://localhost:8080/imagens/${b.caminhoImagem}`} 
              alt={b.nome} 
              className="img-fluid mb-2" 
              style={{height: '180px', objectFit: 'contain'}} 
            />
            <h6 className="text-secondary small text-truncate">{b.nome}</h6>
            <p className="fw-bold fs-5" style={{color: '#ff007f'}}>R$ {Number(b.preco).toFixed(2)}</p>
            <button 
              className="btn btn-success btn-sm rounded-pill fw-bold w-100" 
              onClick={(e) => { e.stopPropagation(); adicionarAoCarrinho(b); }}
            >
              Adicionar 🛒
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [estoqueCompleto, setEstoqueCompleto] = useState([]);
  const [brinquedosVisiveis, setBrinquedosVisiveis] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [logado, setLogado] = useState(false);
  const [credenciais, setCredenciais] = useState(null);

  const carregarBrinquedos = (termo = "") => {
    const url = termo 
      ? `http://localhost:8080/api/brinquedos/buscar?termo=${termo}`
      : "http://localhost:8080/api/brinquedos";

    fetch(url)
      .then(res => res.json())
      .then(dados => {
        setEstoqueCompleto(dados);
        setBrinquedosVisiveis(dados);
      })
      .catch(err => console.error("Erro na integração:", err));
  };

  useEffect(() => { carregarBrinquedos(); }, []);

  const filtrarPorCategoria = (categoria) => {
    if (categoria === "TODOS") {
      setBrinquedosVisiveis(estoqueCompleto);
    } else {
      // Ajustado para lidar com o Array de categorias do banco de dados
      const filtrados = estoqueCompleto.filter(b => 
        b.categorias?.some(cat => cat.toUpperCase() === categoria.toUpperCase()) ||
        b.categoria?.toUpperCase() === categoria.toUpperCase() // Compatibilidade com versão anterior
      );
      setBrinquedosVisiveis(filtrados);
    }
  };

  const adicionarAoCarrinho = (brinquedo) => {
    setCarrinho((atual) => {
      const existe = atual.find(item => item.id === brinquedo.id);
      if (existe) return atual.map(item => item.id === brinquedo.id ? { ...item, quantidade: item.quantidade + 1 } : item);
      return [...atual, { ...brinquedo, quantidade: 1 }];
    });
    Swal.fire({ title: 'Adicionado!', icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="loja-layout min-vh-100 bg-light">
            <Header onSearch={carregarBrinquedos} onFilter={filtrarPorCategoria} carrinho={carrinho} />
            <Banner />
            
            {/* INSERÇÃO DO SELETOR DE CATEGORIAS */}
            <SeletorCategorias onFilter={filtrarPorCategoria} />

            <div className="container py-5">
              <h2 className="mb-4 fw-bold text-secondary text-center">
                Brinquedos em <span style={{ color: '#ff007f' }}>Destaque</span> 🧸
              </h2>
              <Vitrine brinquedos={brinquedosVisiveis} adicionarAoCarrinho={adicionarAoCarrinho} />
            </div>
            <Footer />
          </div>
        } />

        <Route path="/produto/:id" element={
          <Detalhes 
            adicionarAoCarrinho={adicionarAoCarrinho} 
            carrinho={carrinho} 
            onSearch={carregarBrinquedos} 
            onFilter={filtrarPorCategoria} 
          />
        } />
        
        <Route path="/equipe" element={<SobreEquipe />} />
        
        <Route path="/admin" element={
          !logado ? (
            <LoginAdmin onLogin={(u, s) => {
              if (u === 'admin' && s === 'admin123') {
                setCredenciais({ username: u, password: s });
                setLogado(true);
              } else { Swal.fire('Erro', 'Dados inválidos', 'error'); }
            }} />
          ) : (
            <Admin authData={credenciais} voltarParaLoja={() => setLogado(false)} />
          )
        } />
      </Routes>
    </Router>
  );
}

export default App;