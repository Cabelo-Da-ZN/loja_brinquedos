package br.edu.fatecgru.CatalogoBrinquedos.model;

import jakarta.persistence.Column;
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

    private String descricao;

    // Armazenamos apenas a URL / caminho relativo da imagem.
    // Ex: "/images/produtos/boneca.jpg"
    // Por que não salvar BLOBs no DB?
    // - Mantém o banco leve e rápido (melhor I/O para consultas)
    // - Permite servir imagens estáticas via servidor/CDN (cache eficiente)
    // - Simplifica backups e deploys (separação de responsabilidades)
    @Column(name = "imagem_url", length = 255)
    private String imagemUrl;

    // Para o teste do banco, só isso já é suficiente!
    // Adicionamos descrição e imagem para compatibilidade com a view.

    // Construtores, getters e setters
    public Brinquedo() {
    }

    public Brinquedo(Long id, String nome, String descricao, Double preco, String imagemUrl) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.imagemUrl = imagemUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getImagemUrl() {
        return imagemUrl;
    }

    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }
}
