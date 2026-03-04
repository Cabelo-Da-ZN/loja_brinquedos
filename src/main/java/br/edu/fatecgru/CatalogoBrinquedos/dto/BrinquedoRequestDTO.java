package br.edu.fatecgru.CatalogoBrinquedos.dto;

public class BrinquedoRequestDTO {
    
    private String nome;
    private Double preco;

    public BrinquedoRequestDTO() {
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
}