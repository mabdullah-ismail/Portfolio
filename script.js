document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarCollapse.classList.remove('show');
            });
        });
    }
    
    
    const interactiveElements = document.querySelectorAll('.cyberButton, .contactLink, .projectCard, .infoCard, .nav-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            element.classList.add('neon-glow');
        });
        
        element.addEventListener('mouseleave', function() {
            element.classList.remove('neon-glow');
        });
    });
    
   
    function isAndroid() {
        return /Android/i.test(navigator.userAgent);
    }
    
    
    if (!isAndroid()) {
       
        const cursorTrail = document.createElement('div');
        cursorTrail.className = 'cursor-trail';
        document.body.appendChild(cursorTrail);
        
        const trail = [];
        const trailLength = 20;
        
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'trail-dot';
            cursorTrail.appendChild(dot);
            trail.push({
                element: dot,
                x: 0,
                y: 0,
                delay: i * 2
            });
        }
        
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animate() {
            let x = mouseX;
            let y = mouseY;
            
            trail.forEach((dot, index) => {
                const nextDot = trail[index + 1] || trail[0];
                
                dot.x = x;
                dot.y = y;
                
                dot.element.style.left = `${x}px`;
                dot.element.style.top = `${y}px`;
                dot.element.style.opacity = 1 - (index / trailLength);
                dot.element.style.transform = `scale(${1 - (index / trailLength) * 0.5})`;
                
                
                if (Math.random() > 0.97) {
                    dot.element.style.left = `${x + (Math.random() * 10 - 5)}px`;
                    dot.element.style.top = `${y + (Math.random() * 10 - 5)}px`;
                    setTimeout(() => {
                        dot.element.style.left = `${x}px`;
                        dot.element.style.top = `${y}px`;
                    }, 50);
                }
                
                x += (nextDot.x - dot.x) * 0.3;
                y += (nextDot.y - dot.y) * 0.3;
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
   
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        
        skillBars.forEach(bar => {
            bar.style.width = '0%';
        });
        
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const level = bar.getAttribute('data-level');
                    
                  
                    setTimeout(() => {
                        bar.style.width = level + '%';
                    }, 200);
                    
                    
                    const glitchInterval = setInterval(() => {
                        if (Math.random() > 0.7) {
                            const currentWidth = parseInt(bar.style.width);
                            bar.style.width = (currentWidth + Math.random() * 10 - 5) + '%';
                            
                            setTimeout(() => {
                                bar.style.width = level + '%';
                            }, 150);
                        }
                    }, 2000);
                    
                    
                    skillObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.2 });
        
        
        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }
    
    
    initSkillBars();
    
   
    const easterEggTrigger = document.getElementById('easter-egg-trigger');
    const miniGame = document.getElementById('mini-game');
    const closeGame = document.getElementById('close-game');
    const startGame = document.getElementById('start-game');
    const gameArea = document.getElementById('game-area');
    const player = document.getElementById('player');
    const scoreDisplay = document.getElementById('game-score');
    
    let gameActive = false;
    let playerPosition = 50; 
    let score = 0;
    let speed = 2;
    let obstacles = [];
    let gameLoop;
    
    
    easterEggTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        miniGame.classList.add('active');
    });
    
    
    closeGame.addEventListener('click', function() {
        miniGame.classList.remove('active');
        resetGame();
    });
    
    
    startGame.addEventListener('click', function() {
        if (!gameActive) {
            startGameplay();
        }
    });
    
    
    document.addEventListener('keydown', function(e) {
        if (gameActive) {
            if ((e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') && playerPosition > 0) {
                playerPosition -= 5;
            } else if ((e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') && playerPosition < 100) {
                playerPosition += 5;
            }
            player.style.left = playerPosition + '%';
        }
    });
    
    
    let touchStartX = 0;
    gameArea.addEventListener('touchstart', function(e) {
        if (gameActive) {
            touchStartX = e.touches[0].clientX;
            e.preventDefault();
        }
    }, { passive: false });
    
    gameArea.addEventListener('touchmove', function(e) {
        if (gameActive) {
            const touchX = e.touches[0].clientX;
            const diff = touchX - touchStartX;
            const movePercent = (diff / gameArea.offsetWidth) * 100;
            
            playerPosition = Math.max(0, Math.min(100, playerPosition + movePercent));
            player.style.left = playerPosition + '%';
            
            touchStartX = touchX;
            e.preventDefault();
        }
    }, { passive: false });
    
    
    const leftBtn = document.getElementById('control-left');
    const rightBtn = document.getElementById('control-right');
    
    if (leftBtn && rightBtn) {
        leftBtn.addEventListener('touchstart', function(e) {
            if (gameActive && playerPosition > 0) {
                const moveInterval = setInterval(() => {
                    playerPosition = Math.max(0, playerPosition - 2);
                    player.style.left = playerPosition + '%';
                }, 20);
                
                leftBtn.addEventListener('touchend', function() {
                    clearInterval(moveInterval);
                }, { once: true });
            }
            e.preventDefault();
        }, { passive: false });
        
        rightBtn.addEventListener('touchstart', function(e) {
            if (gameActive && playerPosition < 100) {
                const moveInterval = setInterval(() => {
                    playerPosition = Math.min(100, playerPosition + 2);
                    player.style.left = playerPosition + '%';
                }, 20);
                
                rightBtn.addEventListener('touchend', function() {
                    clearInterval(moveInterval);
                }, { once: true });
            }
            e.preventDefault();
        }, { passive: false });
    }
    
    
    function startGameplay() {
        gameActive = true;
        score = 0;
        speed = 2;
        scoreDisplay.textContent = score;
        startGame.textContent = 'RUNNING';
        
        
        obstacles.forEach(obstacle => {
            if (obstacle.element && obstacle.element.parentNode) {
                obstacle.element.parentNode.removeChild(obstacle.element);
            }
        });
        obstacles = [];
        
       
        gameLoop = setInterval(function() {
            
            if (Math.random() > 0.95) {
                createObstacle();
            }
            
            
            moveObstacles();
            
            
            checkCollisions();
            
         
            score++;
            scoreDisplay.textContent = score;
            
            
            if (score % 500 === 0) {
                speed += 0.5;
            }
        }, 20);
    }
    
  
    function createObstacle() {
        const obstacle = document.createElement('div');
        obstacle.className = 'game-obstacle';
        
        
        const posX = Math.random() * 100;
        obstacle.style.left = posX + '%';
        obstacle.style.top = '-20px';
        
        
        const size = 10 + Math.random() * 20;
        obstacle.style.width = size + 'px';
        obstacle.style.height = size + 'px';
        
       
        gameArea.appendChild(obstacle);
        
        
        obstacles.push({
            element: obstacle,
            position: { x: posX, y: 0 }
        });
    }
    
    function moveObstacles() {
        obstacles.forEach((obstacle, index) => {
            obstacle.position.y += speed;
            obstacle.element.style.top = obstacle.position.y + 'px';
            
           
            if (obstacle.position.y > gameArea.offsetHeight) {
                gameArea.removeChild(obstacle.element);
                obstacles.splice(index, 1);
            }
        });
    }
    
    
    function checkCollisions() {
        const playerRect = player.getBoundingClientRect();
        
        obstacles.forEach(obstacle => {
            const obstacleRect = obstacle.element.getBoundingClientRect();
            
            if (playerRect.left < obstacleRect.right && 
                playerRect.right > obstacleRect.left && 
                playerRect.top < obstacleRect.bottom && 
                playerRect.bottom > obstacleRect.top) {
                gameOver();
            }
        });
    }
    
    
    function gameOver() {
        gameActive = false;
        clearInterval(gameLoop);
        startGame.textContent = 'RETRY';
        
      
        gameArea.classList.add('glitch');
        
        
        const gameOverMsg = document.querySelector('.game-over-message');
        gameOverMsg.classList.add('visible');
        
        setTimeout(() => {
            gameArea.classList.remove('glitch');
            setTimeout(() => {
                gameOverMsg.classList.remove('visible');
            }, 500);
        }, 1000);
    }
    
   
    function resetGame() {
        gameActive = false;
        clearInterval(gameLoop);
        score = 0;
        scoreDisplay.textContent = score;
        startGame.textContent = 'START';
        
       
        obstacles.forEach(obstacle => {
            if (obstacle.element && obstacle.element.parentNode) {
                obstacle.element.parentNode.removeChild(obstacle.element);
            }
        });
        obstacles = [];
        
        
        playerPosition = 50;
        player.style.left = playerPosition + '%';
        
        
        const gameOverMsg = document.querySelector('.game-over-message');
        gameOverMsg.classList.remove('visible');
        
        
        gameArea.classList.remove('glitch');
    }
});
