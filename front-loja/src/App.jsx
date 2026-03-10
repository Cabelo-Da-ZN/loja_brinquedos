import { useState, useEffect } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Footer from './components/Footer';
// 1. IMPORTAÇÃO DA BIBLIOTECA DE ALERTAS
import Swal from 'sweetalert2';

function CardBrinquedo({ brinquedo, adicionarAoCarrinho }) {
  const urlImagem = brinquedo.caminhoImagem || "https://via.placeholder.com/300x300.png?text=Brinquedo+Sem+Foto";

  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="d-flex justify-content-center align-items-center bg-white p-3" style={{ height: '220px', borderBottom: '1px solid #f0f0f0' }}>
          <img 
            src={urlImagem} 
            alt={brinquedo.nome} 
            className="img-fluid"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', display: 'block' }}
          />
        </div>
        <div className="card-body d-flex flex-column bg-white">
          <span className="badge align-self-start mb-2 text-uppercase" style={{ backgroundColor: '#00ccff', fontSize: '11px' }}>
            {brinquedo.categoria}
          </span>
          <h6 className="card-title text-secondary mb-3 fs-6" style={{ minHeight: '40px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {brinquedo.nome}
          </h6>
          <div className="mt-auto">
            <p className="card-text fs-4 fw-bold mb-1" style={{ color: '#ff007f' }}>
              R$ {brinquedo.preco.toFixed(2).replace('.', ',')}
            </p>
            {brinquedo.desconto > 0 && (
              <small className="text-danger fw-bold mb-3 d-block">
                -{brinquedo.desconto}% OFF
              </small>
            )}
            
            <button 
              className="btn w-100 fw-bold rounded-pill text-white mt-2" 
              style={{ backgroundColor: '#00cc66' }}
              onClick={() => adicionarAoCarrinho(brinquedo)}
            >
              Adicionar 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// ------------------------------------------------------------------

function App() {
  const [estoqueCompleto, setEstoqueCompleto] = useState([]);
  const [brinquedosVisiveis, setBrinquedosVisiveis] = useState([]);
  
  const [carrinho, setCarrinho] = useState([]);

  //bd
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

  useEffect(() => {
    carregarBrinquedos();
  }, []);

  // filtros
  const filtrarPorCategoria = (categoria) => {
    if (categoria === "TODOS") {
      setBrinquedosVisiveis(estoqueCompleto);
    } else if (categoria === "OFERTAS") {
      const ofertas = estoqueCompleto.filter(brinquedo => brinquedo.desconto > 0);
      setBrinquedosVisiveis(ofertas);
    } else if (categoria === "TOP VENDAS") {
      const topVendas = estoqueCompleto.slice(0, 4);
      setBrinquedosVisiveis(topVendas);
    } else {
      const filtrados = estoqueCompleto.filter(brinquedo => 
        brinquedo.categoria.toUpperCase() === categoria.toUpperCase()
      );
      setBrinquedosVisiveis(filtrados);
    }
  };

  // add no carrinho
  const adicionarAoCarrinho = (brinquedo) => {
    setCarrinho((carrinhoAtual) => {
      
      const itemExistente = carrinhoAtual.find(item => item.id === brinquedo.id);
      
      if (itemExistente) {
        // Se já existe apenas aumenta a quantidade
        return carrinhoAtual.map(item => 
          item.id === brinquedo.id 
            ? { ...item, quantidade: item.quantidade + 1 } 
            : item
        );
      } else {
        // Se não existe adiciona o brinquedo novo 
        return [...carrinhoAtual, { ...brinquedo, quantidade: 1 }];
      }
    });

    // 2. DISPARO DO AVISO VISUAL (O "Toast" do canto da tela)
    Swal.fire({
      title: `${brinquedo.nome}`,
      text: "Adicionado ao carrinho com sucesso! 🛒",
      icon: 'success',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      iconColor: '#00cc66'
    });
  };

  //REMOVER ITEM DO CARRINHo
  const removerDoCarrinho = (idBrinquedo) => {
    setCarrinho(carrinhoAtual => carrinhoAtual.filter(item => item.id !== idBrinquedo));
  };

  return (
    <div className="min-vh-100 bg-light">
      
      <Header 
        onSearch={carregarBrinquedos} 
        onFilter={filtrarPorCategoria} 
        carrinho={carrinho}
        removerDoCarrinho={removerDoCarrinho}
      />

      <Banner />

      <div className="container py-4">
        <h2 className="mb-4 fw-bold text-secondary">
          Mais Vendidos na <span style={{ color: '#ff007f' }}>ToyBox</span> 🧸
        </h2>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          
          {brinquedosVisiveis.map(brinquedo => (
            
            <CardBrinquedo 
              key={brinquedo.id} 
              brinquedo={brinquedo} 
              adicionarAoCarrinho={adicionarAoCarrinho} 
            />
          ))}

          {brinquedosVisiveis.length === 0 && (
            <div className="col-12 text-center mt-5 text-muted">
              <h3>Nenhum brinquedo encontrado nesta categoria! 🛰️</h3>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;