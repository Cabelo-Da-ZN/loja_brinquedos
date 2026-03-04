package br.edu.fatecgru.CatalogoBrinquedos.model.entity;

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
    private String categoria;
    private String caminhoImagem;
    private double desconto;
    
    // Para o teste do banco, só isso já é suficiente! 
    // Depois vocês podem gerar os Getters e Setters pelo Eclipse.
    

	// Construtor vazio
    public Brinquedo() {
    }

    //construtor completo
    public Brinquedo(Long id, String nome, Double preco, String categoria, String caminhoImagem, double desconto) {
		this.id = id;
		this.nome = nome;
		this.preco = preco;
		this.categoria = categoria;
		this.caminhoImagem = caminhoImagem;
		this.desconto = desconto;
	}



	// Getters e Setters
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
    public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public String getCaminhoImagem() {
		return caminhoImagem;
	}

	public void setCaminhoImagem(String caminhoImagem) {
		this.caminhoImagem = caminhoImagem;
	}

	public double getDesconto() {
		return desconto;
	}

	public void setDesconto(double desconto) {
		this.desconto = desconto;
	}
}
