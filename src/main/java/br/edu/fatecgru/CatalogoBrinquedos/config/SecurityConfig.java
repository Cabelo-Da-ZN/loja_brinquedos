package br.edu.fatecgru.CatalogoBrinquedos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults()) 
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // 1. ROTAS PÚBLICAS (Acesso livre para a Vitrine e Header)
                .requestMatchers(HttpMethod.GET, "/api/brinquedos/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/categorias/**").permitAll() // LIBERADO: Header consegue ler as categorias
                .requestMatchers(HttpMethod.POST, "/api/brinquedos/encomendar/**").permitAll()
                .requestMatchers("/imagens/**").permitAll() 
                
                // 2. ROTAS PROTEGIDAS (Exigem Login de Admin)
                // Categorias (Escrita)
                .requestMatchers(HttpMethod.POST, "/api/categorias/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/categorias/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/categorias/**").authenticated()
                
                // Brinquedos (Escrita e Upload)
                .requestMatchers(HttpMethod.POST, "/api/brinquedos/upload").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/brinquedos").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/brinquedos/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/brinquedos/**").authenticated()
                .requestMatchers(HttpMethod.PATCH, "/api/brinquedos/**").authenticated()
                
                .anyRequest().authenticated() 
            )
            .httpBasic(basic -> basic.authenticationEntryPoint((request, response, authException) -> {
                // Retorna 401 Unauthorized para o Axios capturar, sem abrir pop-up do browser
                response.sendError(401, authException.getMessage()); 
            }));

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
  }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173") 
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                        .allowCredentials(true);
            }
        };
    }
}