package br.edu.fatecgru.CatalogoBrinquedos.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import br.edu.fatecgru.CatalogoBrinquedos.model.entity.Categoria;
import br.edu.fatecgru.CatalogoBrinquedos.repository.CategoriaRepository;
import br.edu.fatecgru.CatalogoBrinquedos.repository.BrinquedoRepository;

@Service
public class CategoriaService {

    @Autowired 
    private CategoriaRepository repository;

    @Autowired 
    private BrinquedoRepository brinquedoRepository;

    public List<Categoria> listarTodas() { 
        return repository.findAll(); 
    }

    public void salvar(String nome) {
        if(repository.findByNome(nome).isEmpty()) {
            repository.save(new Categoria(nome));
        }
    }

    @Transactional
    public void atualizar(Long id, String novoNome) {
        Categoria cat = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada."));
        
        String nomeAntigo = cat.getNome();
        cat.setNome(novoNome);
        repository.save(cat);

        // Atualiza o texto da categoria em todos os brinquedos que a utilizam
        brinquedoRepository.atualizarNomeCategoria(nomeAntigo, novoNome);
    }

    public void excluir(Long id) { 
        repository.deleteById(id); 
    }
}