package br.edu.fatecgru.CatalogoBrinquedos.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import br.edu.fatecgru.CatalogoBrinquedos.model.Brinquedo;
import java.util.List;
import java.util.ArrayList;

@Controller
public class HomeController {

    @GetMapping("/")
    public String mostrarPaginaInicial(Model model) {
        model.addAttribute("produtos", exemplosDestaques());
        model.addAttribute("pagina", "home");
        return "home";
    }

    @GetMapping("/catalogo")
    public String mostrarCatalogo(Model model) {
        model.addAttribute("produtos", exemplosDestaques());
        model.addAttribute("pagina", "catalogo");
        return "home";
    }

    @GetMapping("/categorias")
    public String mostrarCategorias(Model model) {
        model.addAttribute("produtos", exemplosDestaques());
        model.addAttribute("pagina", "categorias");
        return "home";
    }

    @GetMapping("/sobre")
    public String mostrarSobre(Model model) {
        model.addAttribute("produtos", exemplosDestaques());
        model.addAttribute("pagina", "sobre");
        return "home";
    }

    @GetMapping("/admin")
    public String mostrarAdmin(Model model) {
        model.addAttribute("produtos", exemplosDestaques());
        model.addAttribute("pagina", "admin");
        return "home";
    }

    // Método auxiliar que cria brinquedos de exemplo para popular a view
    private List<Brinquedo> exemplosDestaques() {
        List<Brinquedo> lista = new ArrayList<>();
        // Salvamos apenas o caminho relativo para imagens que estarão em src/main/resources/static/images/produtos/
    lista.add(new Brinquedo(1L, "Boneca Barbie", "Boneca fashion com acessórios", 89.90, "/images/produtos/barbie.jpg"));
    lista.add(new Brinquedo(2L, "Quebra-Cabeça 3D", "Peças educativas para todas as idades", 129.50, "/images/produtos/quebracabeca.png"));
    lista.add(new Brinquedo(3L, "Carrinho RC", "Carrinho de controle remoto com alta performance", 149.00, "/images/produtos/Carrinho.png"));
    lista.add(new Brinquedo(4L, "Godzilla Figure", "Action figure colecionável", 199.90, "/images/produtos/Godzilla.jpeg"));
    lista.add(new Brinquedo(5L, "Stitch Pelúcia", "Pelúcia macia do Stitch", 59.90, "/images/produtos/Stitch.png"));
        return lista;
    }
}