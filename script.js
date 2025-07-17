document.addEventListener('DOMContentLoaded', () => {

    // --- ЛОГИКА АНИМАЦИИ ТЕКСТА ---
    const textToAnimate = document.querySelector('.animate-text-reveal');
    if (textToAnimate) {
        const text = textToAnimate.textContent;
        const chars = text.split('');
        textToAnimate.innerHTML = '';
        
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.05}s`;
            textToAnimate.appendChild(span);
        });
    }

    // Эффект "прилипающей" шапки при скролле
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Анимация появления элементов при прокрутке
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // --- ЛОГИКА МОДАЛЬНОГО ОКНА ---
    
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeModalButton = document.querySelector(".close-modal-button");

    const posterImages = document.querySelectorAll(".event-poster-image");

    posterImages.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = "block";
            modalImg.src = img.src;

            if (img.dataset.size === 'small') {
                modalImg.classList.add('small');
            } else {
                modalImg.classList.remove('small');
            }
        });
    });

    function closeModal() {
        modal.style.display = "none";
    }

    closeModalButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

});