package br.edu.fatecgru.CatalogoBrinquedos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.fatecgru.CatalogoBrinquedos.model.entity.Brinquedo;

@Repository // Avisa o Spring que essa interface cuida do banco de dados
public interface BrinquedoRepository extends JpaRepository<Brinquedo, Long> {
    /*JpaRepository é uma classe existente criada pelos desenvolvedores do java spring
	Nela já há todos os métodos de comandos SQL criados, então nós apenas herdamos
	os métodos dela na interface (interface somente herda métodos)*/
	
    // Vazio mesmo pq o JpaRepository já tem o save(), findById(), delete()...
}