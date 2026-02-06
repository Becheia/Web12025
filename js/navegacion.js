// Navegación simple
document.addEventListener('DOMContentLoaded', () => {
    const paginaActual = window.location.pathname.split('/').pop();
    const enlaces = document.querySelectorAll('.menu a');
    
    enlaces.forEach(enlace => {
        enlace.classList.remove('activo');
        
        const paginaEnlace = enlace.getAttribute('href');
        if (paginaEnlace === paginaActual || 
            (paginaActual === '' && paginaEnlace === 'index.html')) {
            enlace.classList.add('activo');
        }
    });
});