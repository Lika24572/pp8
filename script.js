document.addEventListener('DOMContentLoaded', function() {
    const signupButtons = document.querySelectorAll('.signup-button');
    signupButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = 'sign_up.html';
        });
    });
    const priceLinks = document.querySelectorAll('.price-link');
    priceLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const service = this.dataset.service; 
            alert(`Прайс для услуги: ${service}`);
        });
    });
});
function countVisits() {
    let visits = localStorage.getItem("visits");
    visits = visits ? parseInt(visits) + 1 : 1;
    localStorage.setItem("visits", visits);
    document.getElementById("visitorCount").textContent = `Вы посетитель номер: ${visits}`;
  }
  window.onload = countVisits;

  // Скрипт для кнопки "Наверх"
        document.addEventListener('DOMContentLoaded', function() {
            const backToTopButton = document.querySelector('.back-to-top');
            
            // Показываем/скрываем кнопку при прокрутке
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('active');
                } else {
                    backToTopButton.classList.remove('active');
                }
            });
            
            // Плавная прокрутка вверх при клике
            backToTopButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });

        document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
    });
});
  
// Сортировка новостей
document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sort-news');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const newsGrid = document.querySelector('.news-grid');
            const newsCards = Array.from(newsGrid.querySelectorAll('.news-card'));
            
            newsCards.sort((a, b) => {
                const dateA = new Date(a.querySelector('.day').textContent + ' ' + a.querySelector('.month').textContent);
                const dateB = new Date(b.querySelector('.day').textContent + ' ' + b.querySelector('.month').textContent);
                return this.value === 'asc' ? dateA - dateB : dateB - dateA;
            });

            newsCards.forEach(card => newsGrid.appendChild(card));
        });
    }
});


// плавный скролл для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// не помню что хотела тут написать 
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    lightbox.style.display = 'flex';
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// хзхзхз
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('ServiceWorker registered'))
            .catch(err => console.log('ServiceWorker registration failed: ', err));
    });
}

// Проверка авторизации при загрузке account.html
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('account.html')) {
        checkAuth();
    }
    
    // Инициализация модального окна
    initModal();
    
    // Обработчики для форм в личном кабинете
    if (document.getElementById('profileForm')) {
        initProfileForms();
    }
});

// Проверка авторизации
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'index.html';
    }
}

// Инициализация модального окна
function initModal() {
    const modal = document.getElementById('loginModal');
    const btn = document.querySelector('.user-actions .btn[aria-label="Личный кабинет"]');
    const span = document.querySelector('.close-modal');
    
    if (btn && modal) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    }
    
    if (span) {
        span.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Обработка формы входа
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Простая проверка (в реальном проекте нужно подключение к бэкенду)
            if (email === 'maxpetrov@gmail.com' && password === '123') {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                window.location.href = 'account.html';
            } else {
                document.getElementById('loginError').textContent = 'Неверный email или пароль';
            }
        });
    }
}

// Инициализация форм в личном кабинете
function initProfileForms() {
    // Форма изменения аватара
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    const avatarInput = document.getElementById('avatarInput');
    const userAvatar = document.getElementById('userAvatar');
    
    changeAvatarBtn.addEventListener('click', function() {
        avatarInput.click();
    });
    
    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                userAvatar.src = event.target.result;
                showSuccessMessage('Аватар успешно изменен');
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Форма изменения данных профиля
    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // В реальном проекте здесь будет отправка данных на сервер
        showSuccessMessage('Данные успешно сохранены');
    });
    
    function showSuccessMessage(message) {
        const existingMessage = document.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageElement = document.createElement('p');
        messageElement.className = 'success-message';
        messageElement.textContent = message;
        profileForm.appendChild(messageElement);
        
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Валидация номера телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Удаляем все нецифровые символы
            this.value = this.value.replace(/\D/g, '');
            
            // Ограничиваем длину до 11 символов
            if (this.value.length > 11) {
                this.value = this.value.slice(0, 11);
            }
        });
        
        // Проверка перед отправкой формы
        const form = phoneInput.closest('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                if (phoneInput.value.length !== 11) {
                    e.preventDefault();
                    alert('Пожалуйста, введите корректный номер телефона (11 цифр)');
                    phoneInput.focus();
                }
            });
        }
    }
});

