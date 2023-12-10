window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        if(scrolled > section.offsetTop - window.innerHeight + 100) {
            section.style.transform = 'translateY(0)';
            section.style.opacity = '1';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section').forEach(section => {
        section.style.transform = 'translateY(100px)';
        section.style.opacity = '0';
        section.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
    });
});
