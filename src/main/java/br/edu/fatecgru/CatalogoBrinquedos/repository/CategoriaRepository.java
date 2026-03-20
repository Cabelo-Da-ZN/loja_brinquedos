package br.edu.fatecgru.CatalogoBrinquedos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.edu.fatecgru.CatalogoBrinquedos.model.entity.Categoria;
import java.util.Optional;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    Optional<Categoria> findByNome(String nome);
}