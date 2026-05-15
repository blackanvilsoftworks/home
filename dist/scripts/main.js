// Export for module compatibility
export { ThemeManager, SidebarManager, 
// ScrollAnimations, 
ContactFormHandler };
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.themeText = this.themeToggle?.querySelector('.nav-text');
        this.init();
    }
    init() {
        this.applyTheme();
        this.setupEventListeners();
    }
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        if (this.themeIcon && this.themeText) {
            if (this.currentTheme === 'dark') {
                this.themeIcon.className = 'fas fa-moon';
                this.themeText.textContent = 'Tema Oscuro';
            }
            else {
                this.themeIcon.className = 'fas fa-sun';
                this.themeText.textContent = 'Tema Claro';
            }
        }
    }
    setupEventListeners() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
        localStorage.setItem('theme', this.currentTheme);
    }
    getCurrentTheme() {
        return this.currentTheme;
    }
}
// Sidebar Manager
class SidebarManager {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.sidebarToggle = document.getElementById('sidebarToggle');
        this.sidebarToggleContainer = document.getElementById('sidebarToggleContainer');
        this.isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        this.init();
    }
    init() {
        this.applySidebarState();
        this.setupEventListeners();
        // this.setupNavigation();
    }
    applySidebarState() {
        if (this.isCollapsed && this.sidebar && this.sidebarToggleContainer) {
            this.sidebar.classList.add('collapsed');
            this.sidebarToggleContainer.classList.add('collapsed');
        }
    }
    setupEventListeners() {
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }
    }
    toggleSidebar() {
        if (this.sidebar && this.sidebarToggleContainer) {
            this.sidebar.classList.toggle('collapsed');
            this.sidebarToggleContainer.classList.toggle('collapsed');
            this.isCollapsed = this.sidebar.classList.contains('collapsed');
            localStorage.setItem('sidebarCollapsed', this.isCollapsed.toString());
        }
    }
    // private setupNavigation(): void {
    //     this.showSection();
    // }
    // private showSection(): void {
    //     // Close sidebar on mobile after selection
    //     if (window.innerWidth <= 768) {
    //         this.toggleSidebar();
    //     }
    // }
    getSidebarState() {
        return this.isCollapsed;
    }
}
// Contact Form Handler
class ContactFormHandler {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.init();
    }
    init() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }
    async handleSubmit() {
        if (!this.contactForm) return;

        // Obtenemos los datos del formulario
        const formData = new FormData(this.contactForm);
        const data = Object.fromEntries(formData);

        // --- Aquí comienza la magia de FormSubmit ---
        // Mostramos un estado de "cargando" en el botón para mejor UX
        const submitButton = this.contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
        submitButton.disabled = true;

        try {
            // Realizamos la petición POST a la API AJAX de FormSubmit
            // Reemplaza 'blackanvilsoftworks@gmail.com' con tu correo si es diferente
            const response = await fetch('https://formsubmit.co/ajax/blackanvilsoftworks@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                console.log('FormSubmit Success:', result);
                // Si el envío fue exitoso, mostramos el mensaje de éxito
                this.showSuccessMessage();
                // Reseteamos el formulario
                this.contactForm.reset();
            } else {
                // Si FormSubmit devuelve un error, lo mostramos al usuario
                console.error('FormSubmit Error:', result);
                alert(`Error al enviar: ${result.message || 'Hubo un problema. Inténtalo de nuevo.'}`);
                // Restauramos el botón en caso de error
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        } catch (error) {
            // Capturamos errores de red (ej: no hay internet)
            console.error('Fetch Error:', error);
            alert('Error de conexión. Por favor, verifica tu internet e inténtalo de nuevo.');
            // Restauramos el botón en caso de error
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    showSuccessMessage() {
        const submitButton = this.contactForm?.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-check me-2"></i>Mensaje Enviado';
        submitButton.disabled = true;
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 3000);
    }
}
// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new SidebarManager();
    // new ScrollAnimations();
    new ContactFormHandler();
});
// // Export for module compatibility
// export { ThemeManager, SidebarManager, ScrollAnimations, ContactFormHandler };
//# sourceMappingURL=main.js.map
