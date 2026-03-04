package br.edu.fatecgru.CatalogoBrinquedos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import br.edu.fatecgru.CatalogoBrinquedos.dto.BrinquedoRequestDTO;
import br.edu.fatecgru.CatalogoBrinquedos.service.BrinquedoService;

@Controller // Avisa o Spring que essa classe controla as telas e URLs
public class HomeController {

    @Autowired
    private BrinquedoService service; // Injetamos o nosso "Gerente" aqui!

    // 1. ROTA GET: O que acontece quando o usuário digita "localhost:8080/"
    @GetMapping("/")
    public String abrirTelaInicial(Model model) {
        // Criamos uma "caixa vazia" e mandamos para a tela pro usuário preencher
        model.addAttribute("novoBrinquedo", new BrinquedoRequestDTO());
        
        // Futuramente, é aqui que vamos buscar a lista do banco para montar a tabela!
        
        return "index"; // Renderiza o arquivo index.html. Ele busca o arquivo index da pasta templates
    }

    // 2. ROTA POST: O que acontece quando o usuário clica no botão "Salvar" no HTML
    @PostMapping("/salvar")
    public String salvarBrinquedo(@ModelAttribute BrinquedoRequestDTO request) {
        // O Controller não pensa, ele só passa a caixa pro Service trabalhar!
        service.salvarBrinquedo(request);
        
        // Redireciona de volta para a tela inicial para limpar o formulário
        return "redirect:/";
    }
}