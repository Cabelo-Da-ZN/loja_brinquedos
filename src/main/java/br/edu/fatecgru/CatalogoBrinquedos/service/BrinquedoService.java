package br.edu.fatecgru.CatalogoBrinquedos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.fatecgru.CatalogoBrinquedos.dto.BrinquedoRequestDTO;
import br.edu.fatecgru.CatalogoBrinquedos.dto.BrinquedoResponseDTO;
import br.edu.fatecgru.CatalogoBrinquedos.model.entity.Brinquedo;
import br.edu.fatecgru.CatalogoBrinquedos.repository.BrinquedoRepository;

@Service // Avisa o Spring que esta classe contém as regras de negócio
public class BrinquedoService {

    @Autowired // Pede para o Spring injetar o nosso Repository de 3 linhas aqui automaticamente. Uma injeção de dependência
    private BrinquedoRepository repository;

    // Método para Salvar um Brinquedo
    public BrinquedoResponseDTO salvarBrinquedo(BrinquedoRequestDTO request) {
        
    	//Padrões de segurança. Nunca devemos mandar o DTO diretamente para o banco, nem o entity direto para tela

        // 1. CONVERSÃO DE ENTRADA: Pega o DTO (só nome e preço) e transforma na Entidade
        Brinquedo entidade = new Brinquedo();
        entidade.setNome(request.getNome());
        entidade.setPreco(request.getPreco());

        // 2. AÇÃO NO BANCO: Manda o Repository salvar no Docker. 
        // Aqui o banco gera o ID sozinho e devolve a entidade completa salva.
        Brinquedo entidadeSalva = repository.save(entidade);

        // 3. CONVERSÃO DE SAÍDA: Pega a Entidade salva (agora com ID) e transforma no Response DTO
        BrinquedoResponseDTO response = new BrinquedoResponseDTO(
            entidadeSalva.getId(),
            entidadeSalva.getNome(),
            entidadeSalva.getPreco()
        );

        // Devolve a caixa de saída já pronta
        return response;
    }
}