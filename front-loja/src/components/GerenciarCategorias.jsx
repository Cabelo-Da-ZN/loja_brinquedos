import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function GerenciarCategorias({ authData }) {
  const [categorias, setCategorias] = useState([]);
  const [novoNome, setNovoNome] = useState('');
  const [editando, setEditando] = useState(null); // Armazena o ID da categoria em edição

  const url = "http://localhost:8080/api/categorias";
  
  // Configuração de autenticação para o Axios
  const config = { 
    auth: authData,
    headers: { 'Content-Type': 'text/plain' } // Importante para enviar String pura ao Spring
  };

  const carregar = async () => {
    try {
      const res = await axios.get(url, { auth: authData });
      setCategorias(res.data);
    } catch (err) { 
      console.error("Erro ao carregar categorias:", err); 
    }
  };

  useEffect(() => { carregar(); }, []);

  const salvar = async () => {
    if (!novoNome.trim()) {
      Swal.fire('Aviso', 'O nome da categoria não pode estar vazio.', 'warning');
      return;
    }

    try {
      if (editando) {
        // PUT para editar: enviamos o ID na URL e o novo nome no corpo
        await axios.put(`${url}/${editando}`, novoNome, config);
        Swal.fire('Sucesso!', 'Categoria atualizada e brinquedos vinculados foram corrigidos.', 'success');
      } else {
        // POST para adicionar: enviamos o nome no corpo
        await axios.post(url, novoNome, config);
        Swal.fire('Sucesso!', 'Nova categoria adicionada.', 'success');
      }

      // Limpa os campos e recarrega a lista
      setNovoNome('');
      setEditando(null);
      carregar();
    } catch (err) { 
      console.error(err);
      Swal.fire('Erro', 'Não foi possível salvar a categoria.', 'error'); 
    }
  };

  const excluir = (id, nome) => {
    Swal.fire({
      title: `Excluir "${nome}"?`,
      text: "Isso removerá a categoria do sistema. Os brinquedos vinculados a ela não serão apagados, mas perderão essa classificação.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${url}/${id}`, { auth: authData });
          carregar();
          Swal.fire('Excluído!', 'A categoria foi removida.', 'success');
        } catch (err) {
          Swal.fire('Erro', 'Erro ao excluir categoria.', 'error');
        }
      }
    });
  };

  const prepararEdicao = (cat) => {
    setEditando(cat.id);
    setNovoNome(cat.nome);
    window.scrollTo(0, 0); // Sobe a página para o input
  };

  return (
    <div className="card shadow-sm border-0 p-4 animate__animated animate__fadeIn">
      <h4 className="fw-bold mb-4 text-secondary d-flex align-items-center">
        <span className="me-2">🏷️</span> Gerenciar Categorias
      </h4>
      
      <div className="input-group mb-4 shadow-sm rounded">
        <input 
          type="text" 
          className="form-control border-0 py-2" 
          placeholder="Ex: Heróis, Meninas, LEGO..." 
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && salvar()}
        />
        <button className={`btn ${editando ? 'btn-warning' : 'btn-dark'} px-4 fw-bold`} onClick={salvar}>
          {editando ? 'ATUALIZAR' : 'ADICIONAR'}
        </button>
        {editando && (
          <button className="btn btn-light border" onClick={() => { setEditando(null); setNovoNome(''); }}>
            Cancelar
          </button>
        )}
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: '10%' }}>ID</th>
              <th>Nome da Categoria</th>
              <th className="text-end">Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-muted py-4">Nenhuma categoria cadastrada.</td>
              </tr>
            ) : (
              categorias.map(cat => (
                <tr key={cat.id}>
                  <td className="text-muted small">#{cat.id}</td>
                  <td className="fw-bold text-dark">{cat.nome}</td>
                  <td className="text-end">
                    <button 
                      className="btn btn-sm btn-outline-info me-2 rounded-pill px-3" 
                      onClick={() => prepararEdicao(cat)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger rounded-pill px-3" 
                      onClick={() => excluir(cat.id, cat.nome)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GerenciarCategorias;