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
        // this.navLinks       = document.querySelectorAll('.sidebar-nav .nav-link');
        // this.sections       = document.querySelectorAll('.section');
        this.isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        this.init();
    }
    init() {
        this.applySidebarState();
        this.setupEventListeners();
        this.setupNavigation();
    }
    applySidebarState() {
        if (this.isCollapsed && this.sidebar) {
            this.sidebar.classList.add('collapsed');
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
    setupNavigation() {
        // this.navLinks.forEach(link => {
        //     link.addEventListener('click', (e) => {
        //         e.preventDefault();
        //         // const targetSection = link.getAttribute('data-section');
        //         // this.showSection(targetSection);
        //         // this.setActiveNavLink(link);
        //     });
        // });
        // Show initial section
        this.showSection();
    }
    showSection() {
        // this.sections.forEach(section => {
        //     section.classList.remove('active');
        // });
        // if (sectionId) {
        //     const targetSection = document.getElementById(sectionId);
        //     if (targetSection) {
        //         targetSection.classList.add('active');
        //     }
        // }
        // Close sidebar on mobile after selection
        if (window.innerWidth <= 768) {
            this.toggleSidebar();
        }
    }
    // private setActiveNavLink(activeLink: HTMLAnchorElement): void {
    //     this.navLinks.forEach(link => {
    //         link.classList.remove('active');
    //     });
    //     activeLink.classList.add('active');
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
        if (!this.contactForm)
            return;
        const formData = new FormData(this.contactForm);
        const data = Object.fromEntries(formData);
        // Here you would typically send the data to your backend
        console.log('Form data:', data);
        // https://chat.deepseek.com/share/245t9e3x8le56kszs4 Revisar para menejo de evnío de email
        // Show success message
        this.showSuccessMessage();
        // Reset form
        this.contactForm.reset();
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