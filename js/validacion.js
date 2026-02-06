class ValidacionFormulario {
    constructor() {
        this.formulario = document.getElementById('formulario');
        this.sectionFormulario = document.getElementById('formulario-section');
        
        if (this.formulario) {
            this.iniciar();
        }
    }
    
    iniciar() {
        this.formulario.addEventListener('submit', (e) => this.enviar(e));
        
        // Contador de caracteres
        const mensaje = document.getElementById('mensaje');
        const contador = document.getElementById('contador');
        
        if (mensaje && contador) {
            mensaje.addEventListener('input', () => {
                contador.textContent = mensaje.value.length;
            });
        }
        
        // Limpiar errores al escribir
        ['nombre', 'email', 'telefono', 'mensaje'].forEach(campo => {
            const elemento = document.getElementById(campo);
            if (elemento) {
                elemento.addEventListener('input', () => {
                    this.limpiarError(campo);
                });
            }
        });
    }
    
    validarCampo(nombre, valor) {
        switch(nombre) {
            case 'nombre':
                return valor.length >= 2 && valor.length <= 50;
                
            case 'email':
                const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regexEmail.test(valor);
                
            case 'telefono':
                const numeros = valor.replace(/\D/g, ''); 
                const tieneLongitudValida = numeros.length >= 7 && numeros.length <= 15;
                const tieneFormatoValido = /^[+]?[\d\s\-\(\)]{7,}$/.test(valor);
                return tieneLongitudValida && tieneFormatoValido;
                
            case 'mensaje':
                return valor.length >= 10 && valor.length <= 500;
                
            case 'privacidad':
                const checkbox = document.getElementById('privacidad');
                return checkbox.checked;
                
            default:
                return true;
        }
    }
    
    mostrarError(campo, mensaje) {
        const elementoError = document.getElementById(`error-${campo}`);
        if (elementoError) {
            elementoError.textContent = mensaje;
            const input = document.getElementById(campo);
            if (input) input.style.borderColor = '#e74c3c';
        }
    }
    
    limpiarError(campo) {
        const elementoError = document.getElementById(`error-${campo}`);
        if (elementoError) {
            elementoError.textContent = '';
            const input = document.getElementById(campo);
            if (input) input.style.borderColor = '#ddd';
        }
    }
    
    validarFormulario() {
        let valido = true;
        
        const campos = [
            {nombre: 'nombre', msg: 'El nombre debe tener entre 2 y 50 caracteres'},
            {nombre: 'email', msg: 'Ingresa un email válido'},
            {nombre: 'telefono', msg: 'Teléfono inválido. Debe tener entre 7 y 15 Numeros'},
            {nombre: 'mensaje', msg: 'El mensaje debe tener entre 10 y 500 caracteres'},
            {nombre: 'privacidad', msg: 'Debes aceptar la política de privacidad'}
        ];
        
        campos.forEach(campo => {
            const elemento = document.getElementById(campo.nombre);
            const valor = elemento ? elemento.value.trim() : '';
            
            if (!this.validarCampo(campo.nombre, valor)) {
                this.mostrarError(campo.nombre, campo.msg);
                valido = false;
            } else {
                this.limpiarError(campo.nombre);
            }
        });
        
        return valido;
    }
    
    obtenerDatos() {
        return {
            nombre: document.getElementById('nombre').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            servicio: document.getElementById('servicio').value,
            mensaje: document.getElementById('mensaje').value.trim(),
            fecha: new Date().toLocaleString('es-ES')
        };
    }
    
    mostrarConfirmacion(datos) {
        const confirmacion = document.createElement('div');
        confirmacion.className = 'confirmacion';
        confirmacion.innerHTML = `
            <h2><i class="fas fa-check-circle"></i> ¡Mensaje Enviado!</h2>
            <p>Gracias ${datos.nombre}, te contactaremos pronto.</p>
            <div class="datos-enviados">
                <p><strong>Email:</strong> ${datos.email}</p>
                <p><strong>Teléfono:</strong> ${datos.telefono}</p>
                <p><strong>Servicio:</strong> ${datos.servicio || 'No especificado'}</p>
                <p><strong>Fecha:</strong> ${datos.fecha}</p>
            </div>
            <button id="nuevo-mensaje" class="btn-enviar">Nuevo mensaje</button>
        `;
        
        this.sectionFormulario.replaceWith(confirmacion);
        
        document.getElementById('nuevo-mensaje').addEventListener('click', () => {
            location.reload();
        });
    }
    
    enviar(e) {
        e.preventDefault();
        
        if (this.validarFormulario()) {
            const datos = this.obtenerDatos();
            this.mostrarConfirmacion(datos);
        }
    }
}

// Iniciar validación
document.addEventListener('DOMContentLoaded', () => {
    new ValidacionFormulario();
});