import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import GerenciarCategorias from './components/GerenciarCategorias'; // IMPORTANTE: Importe o componente que criamos

function Admin({ voltarParaLoja, authData }) {
  const [brinquedos, setBrinquedos] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [modo, setModo] = useState('listagem'); 
  const [editandoId, setEditandoId] = useState(null);
  const [categoriasExistentes, setCategoriasExistentes] = useState([]);
  const [marcasExistentes, setMarcasExistentes] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    nome: '', marca: '', categoria: '', preco: 0, 
    caminhoImagem: '', descricao: ''
  });

  const urlApi = "http://localhost:8080/api/brinquedos";
  const authConfig = { auth: authData };

  const listar = async () => {
    try {
      const res = await axios.get(urlApi, authConfig);
      setBrinquedos(res.data);
    } catch (err) { console.error("Erro ao listar", err); }
  };

  const carregarSugestoes = async () => {
    if (!authData) return;
    try {
      // Ajustado para buscar da sua nova rota de categorias reais
      const [resCat, resMar] = await Promise.all([
        axios.get(`http://localhost:8080/api/categorias`, authConfig),
        axios.get(`${urlApi}/marcas`, authConfig)
      ]);
      // resCat.data agora retorna objetos [{id, nome}, ...], pegamos só o nome para o datalist
      setCategoriasExistentes(resCat.data || []);
      setMarcasExistentes(resMar.data || []);
    } catch (err) { console.error("Erro nas sugestões", err); }
  };

  useEffect(() => { listar(); }, []);
  useEffect(() => { if (modo !== 'listagem') carregarSugestoes(); }, [modo]);

  const handleUploadImagem = async (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;

    const data = new FormData();
    data.append('imagem', arquivo);

    try {
      setUploading(true);
      const res = await axios.post(`${urlApi}/upload`, data, {
        auth: authData,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ ...formData, caminhoImagem: res.data });
      Swal.fire('Imagem Pronta!', 'Arquivo carregado com sucesso.', 'success');
    } catch (err) {
      Swal.fire('Erro no Upload', 'Verifique o acesso e o tamanho do arquivo.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const salvar = async (e) => {
    e.preventDefault();
    const dados = { ...formData, preco: Number(formData.preco) };
    try {
      if (modo === 'editar') {
        await axios.put(`${urlApi}/${editandoId}`, dados, authConfig);
      } else {
        await axios.post(urlApi, dados, authConfig);
      }
      Swal.fire('Sucesso!', 'Os dados foram salvos no banco.', 'success');
      setModo('listagem');
      listar();
    } catch (err) { Swal.fire('Erro', 'Não foi possível salvar os dados.', 'error'); }
  };

  const excluir = (id) => {
    Swal.fire({
      title: 'Deseja excluir?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'SIM',
      cancelButtonText: 'NÃO'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${urlApi}/${id}`, authConfig);
        listar();
      }
    });
  };

  const brinquedosFiltrados = brinquedos.filter(b => 
    b.nome?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    b.categoria?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    b.marca?.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      {/* SIDEBAR */}
      <div className="bg-dark text-white p-4 shadow" style={{ width: '280px', position: 'fixed', height: '100vh' }}>
        <h4 className="fw-bold mb-4 border-bottom pb-2 text-center">ToyBox Admin</h4>
        <ul className="nav flex-column gap-2">
          <li className={`nav-item btn ${modo === 'listagem' ? 'btn-primary' : 'btn-outline-light'} text-start border-0`} onClick={() => setModo('listagem')}>
            📦 Ver Catálogo
          </li>
          <li className={`nav-item btn ${modo === 'novo' ? 'btn-primary' : 'btn-outline-light'} text-start border-0`} onClick={() => { 
              setModo('novo'); 
              setEditandoId(null);
              setFormData({nome:'', marca:'', categoria:'', preco:0, caminhoImagem:'', descricao:''}); 
            }}>
            ➕ Novo Brinquedo
          </li>
          
          {/* NOVO BOTÃO: GERENCIAR CATEGORIAS */}
          <li className={`nav-item btn ${modo === 'categorias' ? 'btn-primary' : 'btn-outline-light'} text-start border-0`} onClick={() => setModo('categorias')}>
            🏷️ Gerenciar Categorias
          </li>

          <li className="nav-item btn btn-danger mt-5 rounded-pill fw-bold" onClick={voltarParaLoja}>Sair do Painel</li>
        </ul>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-grow-1" style={{ marginLeft: '280px', padding: '40px' }}>
        
        {/* MODO LISTAGEM */}
        {modo === 'listagem' && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-secondary fw-bold fs-4">Gestão de Estoque</h2>
              <div className="input-group" style={{ maxWidth: '350px' }}>
                <span className="input-group-text bg-white border-end-0">🔍</span>
                <input type="text" className="form-control border-start-0" placeholder="Buscar..." value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)} />
              </div>
            </div>
            <div className="card shadow-sm border-0">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr><th>Foto</th><th>Nome</th><th>Marca</th><th>Categoria</th><th>Valor</th><th className="text-center">Ações</th></tr>
                </thead>
                <tbody>
                  {brinquedosFiltrados.map(b => (
                    <tr key={b.id}>
                      <td>
                        <img 
                          src={b.caminhoImagem?.startsWith('http') ? b.caminhoImagem : `http://localhost:8080/imagens/${b.caminhoImagem}`} 
                          alt="Thumb" 
                          style={{width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px'}}
                          onError={(e) => e.target.src = 'https://via.placeholder.com/40'}
                        />
                      </td>
                      <td><small className="text-muted">#{b.id}</small> {b.nome}</td>
                      <td>{b.marca}</td>
                      <td><span className="badge bg-secondary">{b.categoria}</span></td>
                      <td>R$ {Number(b.preco).toFixed(2)}</td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-info me-2 text-white" onClick={() => { setEditandoId(b.id); setFormData(b); setModo('editar'); }}>Editar</button>
                        <button className="btn btn-sm btn-danger" onClick={() => excluir(b.id)}>Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* MODO NOVO / EDITAR BRINQUEDO */}
        {(modo === 'novo' || modo === 'editar') && (
          <div className="d-flex justify-content-center">
            <div className="card shadow-lg border-0 w-100" style={{ maxWidth: '700px' }}>
              <div className="card-header bg-dark text-white p-3 text-center">
                <h4 className="mb-0">{modo === 'novo' ? 'Novo Cadastro' : 'Editar Produto'}</h4>
              </div>
              <form onSubmit={salvar} className="card-body p-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="fw-bold small">MARCA:</label>
                    <input list="marcas" className="form-control" value={formData.marca} onChange={e => setFormData({...formData, marca: e.target.value})} />
                    <datalist id="marcas">{marcasExistentes.map((m, i) => <option key={i} value={m} />)}</datalist>
                  </div>
                  <div className="col-md-6">
                    <label className="fw-bold small">VALOR (R$):</label>
                    <input type="number" step="0.01" className="form-control" value={formData.preco} onChange={e => setFormData({...formData, preco: e.target.value})} />
                  </div>
                  <div className="col-12">
                    <label className="fw-bold small">NOME DO BRINQUEDO:</label>
                    <input className="form-control" required value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
                  </div>
                  
                  {/* CAMPO CATEGORIA (USANDO SELECT PARA MELHOR CONTROLE) */}
                  <div className="col-12">
                    <label className="fw-bold small">CATEGORIA:</label>
                    <select 
                      className="form-select" 
                      required 
                      value={formData.categoria} 
                      onChange={e => setFormData({...formData, categoria: e.target.value})}
                    >
                      <option value="">Selecione uma categoria...</option>
                      {categoriasExistentes.map((c) => (
                        <option key={c.id} value={c.nome}>{c.nome}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="fw-bold small">IMAGEM (ARQUIVO OU LINK):</label>
                    <div className="input-group mb-2">
                      <label className="input-group-text small" style={{cursor:'pointer'}}>
                        📁 Upload <input type="file" hidden onChange={handleUploadImagem} accept="image/*" />
                      </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Ou cole o link da imagem aqui..."
                        value={formData.caminhoImagem} 
                        onChange={e => setFormData({...formData, caminhoImagem: e.target.value})} 
                      />
                    </div>
                    {uploading && <p className="text-primary small">Enviando arquivo...</p>}
                    {formData.caminhoImagem && (
                      <div className="text-center border p-2 bg-white rounded shadow-sm">
                        <img 
                          src={formData.caminhoImagem.startsWith('http') ? formData.caminhoImagem : `http://localhost:8080/imagens/${formData.caminhoImagem}`} 
                          alt="Preview" style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }} 
                          onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Imagem+Invalida'}
                        />
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="fw-bold small">DESCRIÇÃO:</label>
                    <textarea className="form-control" rows="2" value={formData.descricao} onChange={e => setFormData({...formData, descricao: e.target.value})}></textarea>
                  </div>
                </div>
                <div className="mt-4 d-flex gap-2">
                  <button type="submit" className="btn btn-success px-5 fw-bold" disabled={uploading}>SALVAR TUDO</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setModo('listagem')}>CANCELAR</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODO GERENCIAR CATEGORIAS (INTEGRADO) */}
        {modo === 'categorias' && (
          <GerenciarCategorias authData={authData} />
        )}

      </div>
    </div>
  );
}

export default Admin;