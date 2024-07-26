document.addEventListener('DOMContentLoaded', () => {
    const repoList = document.getElementById('repo-list');
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

    // Fetch GitHub repositories
    const username = 'Wassuples';
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                // Create a container for the repo entry and chart
                const repoEntry = document.createElement('div');
                repoEntry.className = 'repo-entry';
                repoEntry.innerHTML = `
                    <div class="repo-content">
                        <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
                        <p>${repo.description || 'No description available.'}</p>
                    </div>
                    <div class="repo-chart">
                        <canvas id="chart-${repo.name}" width="150" height="150"></canvas>
                    </div>
                `;
                repoList.appendChild(repoEntry);

                // Fetch language data for this repo
                fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`)
                    .then(response => response.json())
                    .then(languages => {
                        const ctx = document.getElementById(`chart-${repo.name}`).getContext('2d');
                        const data = {
                            labels: Object.keys(languages),
                            datasets: [{
                                data: Object.values(languages),
                                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#E7E9ED']
                            }]
                        };

                        new Chart(ctx, {
                            type: 'pie',
                            data: data,
                            options: {
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: function(tooltipItem) {
                                                return `${tooltipItem.label}: ${tooltipItem.raw} bytes`;
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    })
                    .catch(error => {
                        console.error(`Error fetching languages for ${repo.name}:`, error);
                    });
            });
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
        });
});
