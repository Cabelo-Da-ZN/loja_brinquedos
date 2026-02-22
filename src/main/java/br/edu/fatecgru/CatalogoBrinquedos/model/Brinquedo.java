package br.edu.fatecgru.CatalogoBrinquedos.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // Avisa o banco que isso vai virar uma tabela
public class Brinquedo {

    @Id // Avisa que esse é o ID (Chave Primária)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Avisa para o banco gerar os números sozinho (1, 2, 3...)
    private Long id;
    
    private String nome;
    private Double preco;
    
    // Para o teste do banco, só isso já é suficiente! 
    // Depois vocês podem gerar os Getters e Setters pelo Eclipse.
}
