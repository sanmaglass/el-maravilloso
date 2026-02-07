// Auth View
window.Views = window.Views || {};

window.Views.login = (container) => {
    // Premium animated background specifically for Login
    container.innerHTML = `
        <div class="login-container" style="
            position: fixed; top:0; left:0; width:100%; height:100vh;
            background: linear-gradient(135deg, #2a0000 0%, #000000 100%);
            display: flex; align-items: center; justify-content: center;
            z-index: 9999; overflow: hidden;
        ">
            <!-- Animated Background Particles -->
            <div id="particles" style="position:absolute; top:0; left:0; width:100%; height:100%;"></div>

            <!-- Glass Card -->
            <div class="login-card" style="
                background: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 40px;
                border-radius: 24px;
                width: 100%;
                max-width: 400px;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                transform: translateY(0);
                animation: floatCard 6s ease-in-out infinite;
                position: relative;
                z-index: 2;
            ">
                <div style="text-align:center; margin-bottom:30px;">
                    <div style="
                        width:80px; height:80px; margin:0 auto 15px; 
                        background: linear-gradient(135deg, var(--primary), #ff0000);
                        border-radius: 50%; display:flex; align-items:center; justify-content:center;
                        box-shadow: 0 0 30px rgba(220, 38, 38, 0.6);
                    ">
                        <i class="ph ph-shield-check" style="font-size:40px; color:white;"></i>
                    </div>
                    <h1 style="color:white; font-family:'Outfit', sans-serif; font-weight:700; margin:0;">EL MARAVILLOSO</h1>
                    <p style="color:rgba(255,255,255,0.6); font-size:0.9rem;">Acceso Seguro Restringido</p>
                </div>

                <form id="login-form">
                    <div class="form-group" style="margin-bottom:20px;">
                        <label style="color:rgba(255,255,255,0.8); font-size:0.85rem; margin-bottom:8px; display:block;">ID de Usuario</label>
                        <div style="position:relative;">
                            <i class="ph ph-user" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:rgba(255,255,255,0.5);"></i>
                            <input type="text" id="inp-user" class="form-input" placeholder="Ingresa tu ID" style="
                                background: rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.1); 
                                color:white; padding-left:40px; width:100%;
                            ">
                        </div>
                    </div>

                    <div class="form-group" style="margin-bottom:30px;">
                        <label style="color:rgba(255,255,255,0.8); font-size:0.85rem; margin-bottom:8px; display:block;">Contraseña</label>
                        <div style="position:relative;">
                            <i class="ph ph-lock-key" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:rgba(255,255,255,0.5);"></i>
                            <input type="password" id="inp-pass" class="form-input" placeholder="••••••••" style="
                                background: rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.1); 
                                color:white; padding-left:40px; width:100%;
                            ">
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary" style="
                        width:100%; padding:14px; font-size:1rem; 
                        background: linear-gradient(90deg, #b91c1c, #ef4444);
                        box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
                        border:none;
                    ">
                        Ingresar al Sistema <i class="ph ph-arrow-right"></i>
                    </button>
                </form>

                <div id="login-error" style="
                    margin-top:20px; text-align:center; color:#ff6b6b; font-size:0.9rem; 
                    opacity:0; transition:opacity 0.3s;
                ">
                    <i class="ph ph-warning"></i> Credenciales Incorrectas
                </div>
            </div>
            
            <style>
                @keyframes floatCard {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                .form-input::placeholder { color: rgba(255,255,255,0.3); }
                .form-input:focus { 
                    border-color: var(--primary) !important; 
                    box-shadow: 0 0 15px rgba(220, 38, 38, 0.3);
                    background: rgba(0,0,0,0.5) !important;
                }
            </style>
        </div>
    `;

    // Particles Effect (Simple CSS/JS simulation)
    const particleContainer = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 4 + 1;
        p.style.cssText = `
            position: absolute;
            width: ${size}px; height: ${size}px;
            background: rgba(220, 38, 38, ${Math.random() * 0.5});
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            border-radius: 50%;
            animation: moveParticle ${Math.random() * 10 + 10}s linear infinite;
        `;
        particleContainer.appendChild(p);
    }

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes moveParticle {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Login Logic
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('inp-user').value.trim();
        const pass = document.getElementById('inp-pass').value.trim();
        const errorMsg = document.getElementById('login-error');

        // Credentials Check
        if (user === 'admin' && pass === 'sanma123') {
            // Success
            // Animation out
            const card = document.querySelector('.login-card');
            card.style.transform = 'scale(0.9) translateY(20px)';
            card.style.opacity = '0';
            card.style.transition = 'all 0.5s ease';

            setTimeout(() => {
                // Save Session
                sessionStorage.setItem('wm_auth', 'true');
                sessionStorage.setItem('wm_user', 'Admin');

                // Reload or Re-init App
                window.location.reload();
            }, 500);
        } else {
            // Error
            errorMsg.style.opacity = '1';
            // Shake animation
            const card = document.querySelector('.login-card');
            card.style.transform = 'translateX(10px)';
            setTimeout(() => card.style.transform = 'translateX(-10px)', 100);
            setTimeout(() => card.style.transform = 'translateX(0)', 200);
        }
    });
};
