import React from 'react';

function CarrinhoLateral({ carrinho, alterarQuantidade, remover }) {
  // Calcula o valor total de todos os itens multiplicado pelas suas quantidades
  const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  // Função para gerar o link do WhatsApp com os detalhes do pedido
  const finalizarPedido = () => {
    if (carrinho.length === 0) return;

    const listaProdutos = carrinho.map(i => `*${i.quantidade}x* ${i.nome} - _R$ ${i.preco.toFixed(2)}_`).join('%0A');
    const mensagem = `Olá! Gostaria de fazer o seguinte pedido:%0A%0A${listaProdutos}%0A%0A*Total: R$ ${total.toFixed(2)}*`;
    
    // Substitua pelo seu número de WhatsApp
    window.open(`https://wa.me/5511999999999?text=${mensagem}`, '_blank');
  };

  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="gavetaCarrinho" style={{ width: '400px' }}>
      <div className="offcanvas-header border-bottom bg-light">
        <h5 className="fw-bold mb-0">🛒 Meu Carrinho</h5>
        <button type="button" className="btn-close shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>

      <div className="offcanvas-body">
        {carrinho.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">Seu carrinho está vazio.</p>
            <button className="btn btn-sm btn-outline-secondary rounded-pill" data-bs-dismiss="offcanvas">
              Continuar Comprando
            </button>
          </div>
        ) : (
          <>
            {carrinho.map(item => (
              <div key={item.id} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                {/* Imagem do Produto */}
                <img 
                  src={item.caminhoImagem.startsWith('http') ? item.caminhoImagem : `http://localhost:8080/imagens/${item.caminhoImagem}`} 
                  alt={item.nome} 
                  style={{ width: '60px', height: '60px', objectFit: 'contain' }} 
                  className="me-3 rounded bg-white border" 
                />

                <div className="flex-grow-1">
                  <h6 className="mb-0 small fw-bold text-truncate" style={{ maxWidth: '180px' }}>{item.nome}</h6>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    {/* Botões de Quantidade */}
                    <button className="btn btn-sm btn-light border py-0 px-2" onClick={() => alterarQuantidade(item.id, -1)}>-</button>
                    <span className="small fw-bold">{item.quantidade}</span>
                    <button className="btn btn-sm btn-light border py-0 px-2" onClick={() => alterarQuantidade(item.id, 1)}>+</button>
                    
                    <span className="ms-auto fw-bold" style={{ color: '#ff007f', fontSize: '14px' }}>
                      R$ {(item.preco * item.quantidade).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Botão Remover */}
                <button className="btn btn-sm text-danger ms-2 border-0" onClick={() => remover(item.id)}>
                  🗑️
                </button>
              </div>
            ))}

            {/* Resumo e Botão de Finalizar */}
            <div className="mt-4 p-3 bg-light rounded-4 border">
              <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                <span>Total:</span>
                <span style={{ color: '#ff007f' }}>R$ {total.toFixed(2)}</span>
              </div>
              <button className="btn btn-success w-100 rounded-pill fw-bold py-3 shadow-sm" onClick={finalizarPedido}>
                PEDIR NO WHATSAPP ✅
              </button>
              <small className="text-muted d-block text-center mt-2" style={{ fontSize: '11px' }}>
                Você será redirecionado para o WhatsApp da loja.
              </small>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CarrinhoLateral;