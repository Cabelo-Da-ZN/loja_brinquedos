import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';

function Detalhes({ adicionarAoCarrinho, carrinho, onSearch, onFilter }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brinquedo, setBrinquedo] = useState(null);

  useEffect(() => {
    // Rola para o topo da página ao abrir um novo produto
    window.scrollTo(0, 0);
    
    axios.get(`http://localhost:8080/api/brinquedos/${id}`)
      .then(res => setBrinquedo(res.data))
      .catch(err => console.error("Erro ao carregar detalhes", err));
  }, [id]);

  if (!brinquedo) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  return (
    <div className="bg-white min-vh-100">
      <Header carrinho={carrinho} onSearch={onSearch} onFilter={onFilter} />
      
      <div className="container py-4">
        {/* Navegação Inteligente */}
        <button 
          className="btn btn-link text-decoration-none text-muted mb-3 p-0" 
          onClick={() => navigate(-1)}
        >
          ← Voltar para resultados
        </button>

        <div className="row g-5">
          {/* LADO ESQUERDO: IMAGEM */}
          <div className="col-md-7 d-flex align-items-center justify-content-center bg-light rounded-4 p-5">
            <img 
              src={brinquedo.caminhoImagem} 
              alt={brinquedo.nome} 
              className="img-fluid" 
              style={{ maxHeight: '450px', objectFit: 'contain' }} 
            />
          </div>

          {/* LADO DIREITO: COMPRA */}
          <div className="col-md-5">
            <p className="text-uppercase text-muted small mb-1">{brinquedo.marca}</p>
            <h1 className="fw-bold fs-2 mb-3">{brinquedo.nome}</h1>
            
            <div className="py-4 border-top border-bottom my-4">
              <span className="text-muted text-decoration-line-through small">R$ {(brinquedo.preco * 1.2).toFixed(2)}</span>
              <h2 className="display-5 fw-bold mb-1" style={{ color: '#6610f2' }}>
                R$ {Number(brinquedo.preco).toFixed(2)}
              </h2>
              <p className="text-success fw-bold small mb-0">Disponível em estoque</p>
            </div>

            <button 
              className="btn btn-lg w-100 py-3 fw-bold text-white rounded-pill shadow-sm"
              style={{ backgroundColor: '#ff007f', border: 'none' }}
              onClick={() => adicionarAoCarrinho(brinquedo)}
            >
              ADICIONAR AO CARRINHO
            </button>

            <div className="mt-4 p-3 border rounded-4 bg-light">
              <h6 className="fw-bold mb-2">Informações de Entrega</h6>
              <div className="d-flex gap-2">
                <input type="text" className="form-control form-control-sm" placeholder="Seu CEP" />
                <button className="btn btn-dark btn-sm px-3">Ok</button>
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <div className="mt-5 pt-5 border-top">
          <h4 className="fw-bold mb-4">Descrição do Produto</h4>
          <p className="text-secondary fs-5" style={{ lineHeight: '1.8', textAlign: 'justify' }}>
            {brinquedo.descricao || "Este brinquedo incrível foi projetado para proporcionar momentos inesquecíveis de alegria. Com acabamento premium e materiais seguros, é o presente ideal para todas as idades."}
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Detalhes;