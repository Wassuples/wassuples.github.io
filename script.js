document.addEventListener('DOMContentLoaded', () => {
    const overlayLeft = document.getElementById('overlay-left');
    const overlayRight = document.getElementById('overlay-right');
    const nameElement = document.getElementById('name');
    const aboutBtn = document.getElementById('about-btn');
    const aboutModal = document.getElementById('about-modal');
    const closeModal = document.querySelector('.close');
    const ageEl = document.getElementById('age');

    // Update age every 50 milliseconds
    setInterval(() => {
        let time = dayjs().diff(dayjs('2008-02-26T15:13:00'), 'year', true);
        ageEl.innerText = time.toFixed(10);
    }, 50);

    // Show the modal with about information
    function showModal() {
        aboutModal.style.display = 'block';
    }

    // Close the modal
    function closeModalWindow() {
        aboutModal.style.display = 'none';
    }

    // Initial animations
    setTimeout(() => {
        overlayLeft.style.width = '0';
        overlayRight.style.width = '0';
        setTimeout(() => {
            nameElement.style.opacity = '1';
        }, 500);
    }, 500);

    // Initialize particles.js
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('particles.json loaded...');
    });

    // Event listeners for modal
    aboutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
    });

    closeModal.addEventListener('click', closeModalWindow);

    window.addEventListener('click', (event) => {
        if (event.target === aboutModal) {
            closeModalWindow();
        }
    });
});