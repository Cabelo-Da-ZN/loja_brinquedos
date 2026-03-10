import React from 'react';

function Banner() {
  const estiloImagem = {
    width: '100%',
    height: '450px',       
    objectFit: 'cover',    
    objectPosition: 'center' 
  };

  return (
    
    <div id="bannerHome" className="carousel slide" data-bs-ride="carousel">
      
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#bannerHome" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#bannerHome" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#bannerHome" data-bs-slide-to="2"></button>
      </div>

      {}
      <div className="carousel-inner">
        
        <div className="carousel-item active" data-bs-interval="4000">
          <img 
            src="/banners/banner1.jpg" 
            className="d-block w-100" 
            alt="Destaque 1"
            style={estiloImagem} 
          />
        </div>

        <div className="carousel-item" data-bs-interval="4000">
          <img 
            src="/banners/banner2.jpg" 
            className="d-block w-100" 
            alt="Destaque 2"
            style={estiloImagem} 
          />
        </div>

        <div className="carousel-item" data-bs-interval="4000">
          <img 
            src="/banners/banner3.jpg" 
            className="d-block w-100" 
            alt="Destaque 3"
            style={estiloImagem} 
          />
        </div>

      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#bannerHome" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#bannerHome" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}

export default Banner;