// ========================================
// UNPMWR Website JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const megaMenu = document.getElementById('mega-menu');

    if (mobileMenuToggle && megaMenu) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            megaMenu.classList.toggle('mobile-open');
        });
    }

    // ========================================
    // Search Toggle
    // ========================================
    const searchToggle = document.querySelector('.nav-link-global-search-block--wrapper');
    const searchBlock = document.getElementById('globalsearchblock--wrapper');

    if (searchToggle && searchBlock) {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            searchBlock.classList.toggle('show');

            if (searchBlock.classList.contains('show')) {
                const searchInput = searchBlock.querySelector('input[type="search"]');
                if (searchInput) {
                    setTimeout(() => searchInput.focus(), 100);
                }
            }
        });
    }

    // ========================================
    // Clear Search Input
    // ========================================
    const clearBtn = document.querySelector('.uw-input-btn--clear');
    const searchInput = document.getElementById('edit-uw-search-string');

    if (clearBtn && searchInput) {
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.focus();
        });

        // Show/hide clear button based on input
        searchInput.addEventListener('input', function() {
            clearBtn.style.display = this.value ? 'block' : 'none';
        });
    }

    // ========================================
    // Mega Menu Tabs
    // ========================================
    const megaMenuTabs = document.querySelectorAll('.uw-nav .nav-link');
    const megaMenuPanels = document.querySelectorAll('.tab-pane');
    const megaMenuPane = document.querySelector('.uw-mega-menu--pane');

    let currentActiveTab = null;
    let hideTimeout = null;

    megaMenuTabs.forEach(tab => {
        tab.addEventListener('mouseenter', function(e) {
            e.preventDefault();
            clearTimeout(hideTimeout);

            const targetId = this.getAttribute('href');
            const targetPanel = document.querySelector(targetId);

            // Remove active class from all tabs and panels
            megaMenuTabs.forEach(t => t.classList.remove('active'));
            megaMenuPanels.forEach(p => {
                p.classList.remove('show', 'active');
            });

            // Add active class to current tab and panel
            this.classList.add('active');
            if (targetPanel) {
                targetPanel.classList.add('show', 'active');
                megaMenuPane.style.display = 'block';
            }

            currentActiveTab = this;
        });
    });

    // Hide mega menu when mouse leaves
    if (megaMenu) {
        megaMenu.addEventListener('mouseleave', function() {
            hideTimeout = setTimeout(() => {
                if (megaMenuPane) {
                    megaMenuPane.style.display = 'none';
                }
                megaMenuTabs.forEach(t => t.classList.remove('active'));
                megaMenuPanels.forEach(p => {
                    p.classList.remove('show', 'active');
                });
            }, 300);
        });

        megaMenu.addEventListener('mouseenter', function() {
            clearTimeout(hideTimeout);
        });
    }

    // ========================================
    // Language Switcher Dropdown
    // ========================================
    const langSwitcher = document.querySelector('.uw-language-switcher');
    const langDropdown = document.querySelector('.dropdown-menu');

    if (langSwitcher && langDropdown) {
        langSwitcher.addEventListener('mouseenter', function() {
            langDropdown.style.display = 'block';
        });

        langSwitcher.addEventListener('mouseleave', function() {
            setTimeout(() => {
                langDropdown.style.display = 'none';
            }, 200);
        });
    }

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#main-content') {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========================================
    // Skip to Main Content
    // ========================================
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
            }
        });
    }

    // ========================================
    // Form Validation
    // ========================================
    const searchForm = document.getElementById('global-search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            const searchInput = this.querySelector('input[name="uw_search_string"]');
            if (searchInput && searchInput.value.trim() === '') {
                e.preventDefault();
                searchInput.focus();
                alert('Please enter a search term');
            }
        });
    }

    // ========================================
    // Responsive Menu for Mobile
    // ========================================
    function handleResponsiveMenu() {
        if (window.innerWidth <= 768) {
            megaMenuTabs.forEach(tab => {
                tab.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetPanel = document.querySelector(targetId);

                    // Toggle panel visibility on mobile
                    if (targetPanel) {
                        const isActive = targetPanel.classList.contains('show');

                        megaMenuPanels.forEach(p => {
                            p.classList.remove('show', 'active');
                        });
                        megaMenuTabs.forEach(t => t.classList.remove('active'));

                        if (!isActive) {
                            targetPanel.classList.add('show', 'active');
                            this.classList.add('active');
                            megaMenuPane.style.display = 'block';
                        } else {
                            megaMenuPane.style.display = 'none';
                        }
                    }
                });
            });
        }
    }

    handleResponsiveMenu();
    window.addEventListener('resize', handleResponsiveMenu);

    // ========================================
    // Accessibility: Keyboard Navigation
    // ========================================
    megaMenuTabs.forEach((tab, index) => {
        tab.addEventListener('keydown', function(e) {
            let newIndex = index;

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                newIndex = (index + 1) % megaMenuTabs.length;
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                newIndex = (index - 1 + megaMenuTabs.length) % megaMenuTabs.length;
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }

            if (newIndex !== index) {
                megaMenuTabs[newIndex].focus();
            }
        });
    });

    console.log('✅ UNPMWR Website JavaScript loaded successfully');
});
