document.addEventListener('DOMContentLoaded', () => {
    const car = document.querySelector('.car');
    const gameContainer = document.querySelector('.game-container');
    const road = document.querySelector('.road');
    
    // Get all other vehicles
    const otherCars = document.querySelectorAll('.other-car');
    const motorcycles = document.querySelectorAll('.motorcycle');
    
    let carPosition = {
        x: gameContainer.offsetWidth / 2,
        y: gameContainer.offsetHeight - 90
    };
    
    const speed = 5;
    const roadLeft = road.offsetLeft;
    const roadRight = roadLeft + road.offsetWidth;
    
    // Vehicle positions and speeds
    const vehicles = [
        ...Array.from(otherCars).map(car => ({
            element: car,
            y: parseInt(car.style.top || getComputedStyle(car).top),
            speed: 2 + Math.random() * 3
        })),
        ...Array.from(motorcycles).map(bike => ({
            element: bike,
            y: parseInt(bike.style.top || getComputedStyle(bike).top),
            speed: 3 + Math.random() * 2
        }))
    ];
    
    function updateCarPosition() {
        car.style.left = `${carPosition.x}px`;
        car.style.bottom = `${gameContainer.offsetHeight - carPosition.y}px`;
    }
    
    function checkCollision(vehicle) {
        const carRect = car.getBoundingClientRect();
        const vehicleRect = vehicle.element.getBoundingClientRect();
        
        return !(carRect.right < vehicleRect.left || 
                carRect.left > vehicleRect.right || 
                carRect.bottom < vehicleRect.top || 
                carRect.top > vehicleRect.bottom);
    }
    
    function moveVehicles() {
        vehicles.forEach(vehicle => {
            vehicle.y += vehicle.speed;
            
            // Reset position when vehicle goes off screen
            if (vehicle.y > gameContainer.offsetHeight) {
                vehicle.y = -100;
                // Randomize horizontal position
                const randomX = roadLeft + 50 + Math.random() * (roadRight - roadLeft - 100);
                vehicle.element.style.left = `${randomX}px`;
            }
            
            vehicle.element.style.top = `${vehicle.y}px`;
            
            // Check for collision
            if (checkCollision(vehicle)) {
                alert('Game Over! You crashed into another vehicle.');
                resetGame();
            }
        });
    }
    
    function resetGame() {
        carPosition.x = gameContainer.offsetWidth / 2;
        carPosition.y = gameContainer.offsetHeight - 90;
        updateCarPosition();
        
        // Reset other vehicles
        vehicles.forEach(vehicle => {
            vehicle.y = -100 - Math.random() * 300;
            vehicle.element.style.top = `${vehicle.y}px`;
        });
    }
    
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowLeft':
                if (carPosition.x > roadLeft + 10) {
                    carPosition.x -= speed;
                }
                break;
            case 'ArrowRight':
                if (carPosition.x < roadRight - 50) {
                    carPosition.x += speed;
                }
                break;
            case 'ArrowUp':
                if (carPosition.y < gameContainer.offsetHeight - 20) {
                    carPosition.y += speed;
                }
                break;
            case 'ArrowDown':
                if (carPosition.y > 90) {
                    carPosition.y -= speed;
                }
                break;
        }
        updateCarPosition();
    });
    
    // Game loop
    function gameLoop() {
        moveVehicles();
        requestAnimationFrame(gameLoop);
    }
    
    // Initial car position
    updateCarPosition();
    
    // Start the game loop
    gameLoop();
}); 