import React from 'react';

function Footer() {
  return (
    
    <footer className="text-white pt-5 pb-4 mt-5" style={{ backgroundColor: '#212529' }}>
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">

          {/*Sobre a loja*/}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold" style={{ color: '#ff007f' }}>
              🌞 BrincaTech
            </h5>
            <p className="text-light" style={{ fontSize: '14px' }}>
              A maior loja de brinquedos do universo! Levando alegria para as crianças de todas as idades!
            </p>
          </div>

          {}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold" style={{ color: '#00ccff' }}>
              Departamentos
            </h5>
            <p><a href="#" className="text-light" style={{ textDecoration: 'none', fontSize: '14px' }}>Ação e Aventura</a></p>
            <p><a href="#" className="text-light" style={{ textDecoration: 'none', fontSize: '14px' }}>Bonecas e Casinhas</a></p>
            <p><a href="#" className="text-light" style={{ textDecoration: 'none', fontSize: '14px' }}>Jogos de Tabuleiro</a></p>
            <p><a href="#" className="text-light" style={{ textDecoration: 'none', fontSize: '14px' }}>Para Bebês</a></p>
          </div>

          {}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold" style={{ color: '#00cc66' }}>
              Atendimento
            </h5>
            <p><a href="#" className="text-light" style={{ textDecoration: 'none', fontSize: '14px' }}>Minha Conta</a></p>
            <p><a href="#" className="text-light" style={{ textDecoration: 'none', fontSize: '14px' }}>Meus Pedidos</a></p>
            <p><a href="#" className="text-light" style={{ textDecoration: 'none', fontSize: '14px' }}>Trocas e Devoluções</a></p>
            <p><a href="#" className="text-light" style={{ textDecoration: 'none', fontSize: '14px' }}>Fale Conosco</a></p>
          </div>

          {}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold" style={{ color: '#ffea00' }}>
              Contato
            </h5>
            <p className="text-light" style={{ fontSize: '14px' }}>📍 Guarulhos, SP - Brasil</p>
            <p className="text-light" style={{ fontSize: '14px' }}>✉️ contato@toybox.com.br</p>
            <p className="text-light" style={{ fontSize: '14px' }}>📞 (11) 4002-8922</p>
          </div>

        </div>

        {}
        <hr className="mb-4 mt-4" style={{ borderColor: '#495057' }} />

        {}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-light" style={{ fontSize: '13px' }}>
              © 2026 ToyBox. Todos os direitos reservados. CNPJ: 40.002.800/0009-22.
              <br/>
              Desenvolvido para as crianças do passado presente e futuro!  
            </p>
          </div>
          
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-end">
               {}
               <span className="fs-4 me-3" style={{ cursor: 'pointer' }} title="Instagram">📸</span>
               <span className="fs-4 me-3" style={{ cursor: 'pointer' }} title="Facebook">📘</span>
               <span className="fs-4" style={{ cursor: 'pointer' }} title="YouTube">🎥</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;