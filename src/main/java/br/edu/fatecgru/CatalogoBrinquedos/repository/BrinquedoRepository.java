package br.edu.fatecgru.CatalogoBrinquedos.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import br.edu.fatecgru.CatalogoBrinquedos.model.entity.Brinquedo;

public interface BrinquedoRepository extends JpaRepository<Brinquedo, Long> {

    List<Brinquedo> findByNomeContainingIgnoreCase(String nome);

    List<Brinquedo> findByCategoria(String categoria);

    @Query("SELECT DISTINCT b.categoria FROM Brinquedo b WHERE b.categoria IS NOT NULL")
    List<String> buscarCategoriasUnicas();

    @Query("SELECT DISTINCT b.marca FROM Brinquedo b WHERE b.marca IS NOT NULL AND b.marca <> ''")
    List<String> buscarMarcasUnicas();

    // NOVO: Método para atualizar o nome da categoria em todos os brinquedos vinculados
    @Modifying
    @Transactional
    @Query("UPDATE Brinquedo b SET b.categoria = :novoNome WHERE b.categoria = :nomeAntigo")
    void atualizarNomeCategoria(String nomeAntigo, String novoNome);

    List<Brinquedo> findAllByOrderByPrecoAsc();
    List<Brinquedo> findAllByOrderByPrecoDesc();
    List<Brinquedo> findTop3ByOrderByIdDesc();
    List<Brinquedo> findTop3ByOrderByVendasDesc();
}