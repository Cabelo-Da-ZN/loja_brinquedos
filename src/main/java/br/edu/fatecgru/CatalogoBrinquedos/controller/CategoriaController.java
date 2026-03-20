package br.edu.fatecgru.CatalogoBrinquedos.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.edu.fatecgru.CatalogoBrinquedos.model.entity.Categoria;
import br.edu.fatecgru.CatalogoBrinquedos.service.CategoriaService;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "http://localhost:5173") 
public class CategoriaController {

    @Autowired
    private CategoriaService service;

    @GetMapping
    public List<Categoria> listar() {
        return service.listarTodas();
    }

    @PostMapping
    public ResponseEntity<String> salvar(@RequestBody String nome) {
        try {
            service.salvar(nome);
            return ResponseEntity.ok("Categoria salva com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizar(@PathVariable Long id, @RequestBody String novoNome) {
        try {
            service.atualizar(id, novoNome);
            return ResponseEntity.ok("Atualizado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}