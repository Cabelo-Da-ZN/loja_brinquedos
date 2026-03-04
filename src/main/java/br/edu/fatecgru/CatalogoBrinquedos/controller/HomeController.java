package br.edu.fatecgru.CatalogoBrinquedos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import br.edu.fatecgru.CatalogoBrinquedos.dto.BrinquedoRequestDTO;
import br.edu.fatecgru.CatalogoBrinquedos.service.BrinquedoService;

@Controller // Indica ao Spring que esta classe gerencia as telas e URLs
public class HomeController {

    @Autowired // O Spring injeta automaticamente o nosso Service (regras de negócio) aqui *Injeção de dependência
    private BrinquedoService service; 

    // ROTA GET: Acionada ao acessar "localhost:8080/". Prepara e carrega a tela.
    @GetMapping("/")
    public String abrirTelaInicial(Model model) {
        
        // 1. Envia o DTO vazio para o formulário HTML preencher os dados
        model.addAttribute("novoBrinquedo", new BrinquedoRequestDTO());
        
        // 2. Busca a lista de brinquedos no Service e envia para a tabela
        model.addAttribute("brinquedos", service.listarTodos());
        
        return "index"; // Renderiza o arquivo "index.html" da pasta templates
    }

    // ROTA POST: Acionada quando o usuário clica em "Salvar" no formulário
    @PostMapping("/salvar")
    public String salvarBrinquedo(@ModelAttribute BrinquedoRequestDTO request) {
        
        // O @ModelAttribute empacota os dados da tela. Repassamos para o Service salvar no banco.
        service.salvarBrinquedo(request);
        
        // Redireciona para a rota "/" para recarregar a página e atualizar a tabela
        return "redirect:/";
    }
}