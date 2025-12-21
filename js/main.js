document.addEventListener("DOMContentLoaded", () => {
    const rails = document.querySelectorAll(".slide_rail_inner");

    rails.forEach((rail, railIndex) => {
        const ulElements = rail.querySelectorAll("ul");

        // Set base speed: middle rail slower, side rails faster
        let baseSpeed;
        if (railIndex === 1) {
            baseSpeed = 0.05; // middle rail slower
        } else {
            baseSpeed = 0.05; // side rails faster
        }

        let positions = Array.from(ulElements).map(() => 0);

        // Determine direction: middle rail moves down, sides move up
        const direction = (railIndex === 1) ? 1 : -1;

        function animate() {
            ulElements.forEach((ul, index) => {
                positions[index] += baseSpeed * direction;
                const ulHeight = ul.scrollHeight / 2; // duplicated UL

                // Reset positions for infinite loop
                if (direction === -1 && positions[index] <= -ulHeight) {
                    positions[index] = 0;
                } else if (direction === 1 && positions[index] >= ulHeight) {
                    positions[index] = 0;
                }

                ul.style.transform = `translateY(${positions[index]}px)`;
            });

            requestAnimationFrame(animate);
        }

        animate();
    });
});

document.getElementById('hamburger-btn').addEventListener('click', function() {
  const navbar = document.querySelector('.Navbar');
  navbar.classList.toggle('menu-open');
});
