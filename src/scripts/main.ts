class ThemeManager {
    private currentTheme: string;
    private themeToggle: HTMLElement | null;
    private themeIcon: HTMLElement | null;
    private themeText: HTMLElement | null;

    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.themeText = this.themeToggle?.querySelector('.nav-text') as HTMLElement;
        
        this.init();
    }

    private init(): void {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    private toggleTheme(): void {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }

    private applyTheme(theme: string): void {
        document.documentElement.setAttribute('data-theme', theme);
        
        if (this.themeIcon && this.themeText) {
            if (theme === 'dark') {
                this.themeIcon.className = 'fas fa-moon';
                this.themeText.textContent = 'Tema Oscuro';
            } else {
                this.themeIcon.className = 'fas fa-sun';
                this.themeText.textContent = 'Tema Claro';
            }
        }
    }

    public getCurrentTheme(): string {
        return this.currentTheme;
    }
}

// Sidebar Manager
class SidebarManager {
    private sidebar: HTMLElement | null;
    private sidebarToggle: HTMLElement | null;
    private navLinks: NodeListOf<HTMLAnchorElement>;
    private sections: NodeListOf<HTMLElement>;
    private isCollapsed: boolean;

    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.sidebarToggle = document.getElementById('sidebarToggle');
        this.navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
        this.sections = document.querySelectorAll('.section');
        this.isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        
        this.init();
    }

    private init(): void {
        this.applySidebarState();
        this.setupEventListeners();
        this.setupNavigation();
    }

    private applySidebarState(): void {
        if (this.isCollapsed && this.sidebar) {
            this.sidebar.classList.add('collapsed');
        }
    }

    private setupEventListeners(): void {
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }
    }

    private toggleSidebar(): void {
        if (this.sidebar) {
            this.sidebar.classList.toggle('collapsed');
            this.isCollapsed = this.sidebar.classList.contains('collapsed');
            localStorage.setItem('sidebarCollapsed', this.isCollapsed.toString());
        }
    }

    private setupNavigation(): void {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                this.showSection(targetSection);
                this.setActiveNavLink(link);
            });
        });

        // Show initial section
        this.showSection('home');
    }

    private showSection(sectionId: string | null): void {
        this.sections.forEach(section => {
            section.classList.remove('active');
        });

        if (sectionId) {
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        }

        // Close sidebar on mobile after selection
        if (window.innerWidth <= 768) {
            this.toggleSidebar();
        }
    }

    private setActiveNavLink(activeLink: HTMLAnchorElement): void {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    public getSidebarState(): boolean {
        return this.isCollapsed;
    }
}

// Scroll Animations
class ScrollAnimations {
    private fadeElements: NodeListOf<Element>;

    constructor() {
        this.fadeElements = document.querySelectorAll('.fade-in');
        this.init();
    }

    private init(): void {
        this.setupScrollAnimations();
    }

    private setupScrollAnimations(): void {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.fadeElements.forEach(element => {
            observer.observe(element);
        });

        // Add fade-in class to elements that should animate
        this.addFadeInClassToElements();
    }

    private addFadeInClassToElements(): void {
        const elementsToAnimate = [
            '.value-card',
            '.project-card',
            '.stack-item',
            '.contact-method',
            '.hero-content',
            '.hero-visual'
        ];

        elementsToAnimate.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.classList.add('fade-in');
            });
        });
    }
}

// Contact Form Handler
class ContactFormHandler {
    private contactForm: HTMLFormElement | null;

    constructor() {
        this.contactForm = document.getElementById('contactForm') as HTMLFormElement;
        this.init();
    }

    private init(): void {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }

    private async handleSubmit(): Promise<void> {
        if (!this.contactForm) return;

        const formData = new FormData(this.contactForm);
        const data = Object.fromEntries(formData);

        // Here you would typically send the data to your backend
        console.log('Form data:', data);
        
        // Show success message
        this.showSuccessMessage();
        
        // Reset form
        this.contactForm.reset();
    }

    private showSuccessMessage(): void {
        const submitButton = this.contactForm?.querySelector('button[type="submit"]') as HTMLButtonElement;
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
    new ScrollAnimations();
    new ContactFormHandler();
});

// Export for module compatibility
export { ThemeManager, SidebarManager, ScrollAnimations, ContactFormHandler };