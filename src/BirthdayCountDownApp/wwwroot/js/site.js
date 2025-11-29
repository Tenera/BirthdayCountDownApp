window.app = (function () {
    // Simple persistent birthday storage in MM-DD format
    function getBirthday() {
        try {
            return localStorage.getItem('birthday');
        } catch (e) {
            return null;
        }
    }

    function setBirthday(month, day) {
        try {
            const m = String(month).padStart(2, '0');
            const d = String(day).padStart(2, '0');
            localStorage.setItem('birthday', m + '-' + d);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Minimal confetti implementation using canvas
    let confettiRunning = false;
    function startConfetti() {
        if (confettiRunning) return;
        confettiRunning = true;
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.left = '0';
        canvas.style.top = '0';
        canvas.style.pointerEvents = 'none';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        const colors = ['#ff3b6b','#ffcc00','#00d1b2','#7c4dff','#ff6a00'];
        const confetti = [];
        for (let i = 0; i < 150; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                w: 8 + Math.random() * 8,
                h: 4 + Math.random() * 6,
                vx: -1 + Math.random() * 2,
                vy: 2 + Math.random() * 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                rot: Math.random() * 360,
                vr: -5 + Math.random() * 10
            });
        }

        let raf;
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let p of confetti) {
                p.x += p.vx;
                p.y += p.vy;
                p.rot += p.vr;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
                ctx.restore();
                if (p.y > canvas.height + 20) {
                    p.y = -20 - Math.random() * 200;
                    p.x = Math.random() * canvas.width;
                }
            }
            raf = requestAnimationFrame(draw);
        }

        draw();

        // stop after some time
        setTimeout(function () {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            document.body.removeChild(canvas);
            confettiRunning = false;
        }, 8000);
    }

    return {
        getBirthday: getBirthday,
        setBirthday: setBirthday,
        startConfetti: startConfetti
    };
})();
