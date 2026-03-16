package br.edu.fatecgru.CatalogoBrinquedos.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Isso diz ao Spring: "Sempre que alguém pedir algo em /imagens/**, 
        // vá buscar na pasta física 'uploads' que está na raiz do meu projeto".
        registry.addResourceHandler("/imagens/**")
                .addResourceLocations("file:" + System.getProperty("user.dir") + "/uploads/");
    }
}