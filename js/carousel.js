class Carrusel {
    constructor() {
        // Array de imágenes (requisito cumplido)
        this.imagenes = [
            {
                src: 'imagenes/carousel1.jpg',
                titulo: 'Innovación Digital',
                descripcion: 'Transformamos ideas en soluciones tecnológicas'
            },
            {
                src: 'imagenes/carousel2.jpg',
                titulo: 'Desarrollo Web',
                descripcion: 'Creación de sitios y aplicaciones modernas'
            },
            {
                src: 'imagenes/carousel3.jpg',
                titulo: 'Consultoría IT',
                descripcion: 'Asesoramiento especializado para tu negocio'
            },
            {
                src: 'imagenes/carousel4.jpg',
                titulo: 'Soporte Técnico',
                descripcion: 'Asistencia permanente para tus sistemas'
            }
        ];
        
        this.indiceActual = 0;
        this.total = this.imagenes.length;
        this.intervalo = null;
        
        this.iniciar();
    }
    
    iniciar() {
        this.crearSlides();
        this.crearIndicadores();
        this.mostrarSlide(this.indiceActual);
        this.configurarEventos();
        this.iniciarAutomatico();
    }
    
    crearSlides() {
        const contenedor = document.querySelector('.carrusel-contenedor');
        contenedor.innerHTML = '';
        
        this.imagenes.forEach((img, i) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.dataset.indice = i;
            
            slide.innerHTML = `
                <img src="${img.src}" alt="${img.titulo}">
                <div class="slide-texto">
                    <h2>${img.titulo}</h2>
                    <p>${img.descripcion}</p>
                </div>
            `;
            
            contenedor.appendChild(slide);
        });
        
        this.slides = document.querySelectorAll('.slide');
    }
    
    crearIndicadores() {
        const contenedor = document.querySelector('.indicadores');
        contenedor.innerHTML = '';
        
        for (let i = 0; i < this.total; i++) {
            const indicador = document.createElement('div');
            indicador.className = 'indicador';
            indicador.dataset.indice = i;
            
            indicador.addEventListener('click', () => {
                this.mostrarSlide(i);
                this.reiniciarAutomatico();
            });
            
            contenedor.appendChild(indicador);
        }
    }
    
    mostrarSlide(indice) {
        // Navegación circular (requisito cumplido)
        if (indice < 0) {
            indice = this.total - 1;
        } else if (indice >= this.total) {
            indice = 0;
        }
        
        this.indiceActual = indice;
        
        // Ocultar todos los slides
        this.slides.forEach(slide => {
            slide.classList.remove('activo');
        });
        
        // Mostrar slide actual
        this.slides[this.indiceActual].classList.add('activo');
        
        // Actualizar indicadores
        this.actualizarIndicadores();
    }
    
    actualizarIndicadores() {
        const indicadores = document.querySelectorAll('.indicador');
        indicadores.forEach((ind, i) => {
            if (i === this.indiceActual) {
                ind.classList.add('activo');
            } else {
                ind.classList.remove('activo');
            }
        });
    }
    
    siguiente() {
        let siguiente = this.indiceActual + 1;
        if (siguiente >= this.total) {
            siguiente = 0; // Circular: último → primero
        }
        this.mostrarSlide(siguiente);
    }
    
    anterior() {
        let anterior = this.indiceActual - 1;
        if (anterior < 0) {
            anterior = this.total - 1; // Circular: primero → último
        }
        this.mostrarSlide(anterior);
    }
    
    configurarEventos() {
        // Botones
        document.querySelector('.siguiente').addEventListener('click', () => {
            this.siguiente();
            this.reiniciarAutomatico();
        });
        
        document.querySelector('.anterior').addEventListener('click', () => {
            this.anterior();
            this.reiniciarAutomatico();
        });
        
        // Teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.siguiente();
            if (e.key === 'ArrowLeft') this.anterior();
        });
        
        // Pausar con mouse
        const carrusel = document.querySelector('.carrusel');
        carrusel.addEventListener('mouseenter', () => this.detenerAutomatico());
        carrusel.addEventListener('mouseleave', () => this.iniciarAutomatico());
    }
    
    iniciarAutomatico() {
        this.intervalo = setInterval(() => {
            this.siguiente();
        }, 5000);
    }
    
    detenerAutomatico() {
        if (this.intervalo) {
            clearInterval(this.intervalo);
            this.intervalo = null;
        }
    }
    
    reiniciarAutomatico() {
        this.detenerAutomatico();
        this.iniciarAutomatico();
    }
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.carrusel')) {
        new Carrusel();
    }
});