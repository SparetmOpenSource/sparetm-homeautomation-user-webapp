import React, { useEffect, useRef } from 'react';

interface BirdSimulationProps {
    color: string;
    opacity?: number;
}

// --- Simulation Logic (Moved Outside to Persist) ---

const Bird = {
    v: [
        [5, 0, 0],
        [-5, -2, 1],
        [-5, 0, 0],
        [-5, -2, -1],
        [0, 2, -6],
        [0, 2, 6],
        [2, 0, 0],
        [-3, 0, 0]
    ],
    beak: [
        [0, 1, 2],
        [4, 7, 6],
        [5, 6, 7]
    ]
};

class Vector3 {
    x: number;
    y: number;
    z: number;
    fl: number = 1000;

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    set(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    copy(v: Vector3) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    }

    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    add(v: Vector3) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    sub(v: Vector3) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    subVectors(a: Vector3, b: Vector3) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this;
    }

    scale(s: number) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    }

    divideScalar(s: number) {
        if (s !== 0) {
            const inv = 1 / s;
            this.x *= inv;
            this.y *= inv;
            this.z *= inv;
        } else {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
        return this;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    distanceTo(v: Vector3) {
        return Math.sqrt(this.distanceToSquared(v));
    }

    distanceToSquared(v: Vector3) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        const dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz;
    }

    cross(v: Vector3) {
        const x = this.x, y = this.y, z = this.z;
        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;
        return this;
    }

    dot(v: Vector3) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    normalize() {
        return this.divideScalar(this.length());
    }

    project() {
        const zsc = this.fl + this.z;
        const scale = this.fl / zsc;
        return {
            x: this.x * scale,
            y: this.y * scale,
            scale: scale
        };
    }
}

class Boid {
    pos = new Vector3();
    vel = new Vector3();
    accel = new Vector3();
    area = 200;
    msp = 4;
    mfrc = 0.1;

    constructor() {
        this.pos.set(Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400);
        this.vel.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
    }

    detect(pt: Vector3) {
        const dir = new Vector3();
        dir.copy(this.pos);
        dir.sub(pt);
        const dsq = this.pos.distanceToSquared(pt);
        dir.scale(1 / (dsq || 1));
        return dir;
    }

    run(boids: Boid[], width: number, height: number, depth: number) {
        const w = width / 2;
        const h = height / 2;
        const d = depth / 2;

        const vtr = new Vector3();
        
        vtr.set(-w, this.pos.y, this.pos.z);
        this.accel.add(this.detect(vtr).scale(5));
        
        vtr.set(w, this.pos.y, this.pos.z);
        this.accel.add(this.detect(vtr).scale(5));

        vtr.set(this.pos.x, -h, this.pos.z);
        this.accel.add(this.detect(vtr).scale(5));

        vtr.set(this.pos.x, h, this.pos.z);
        this.accel.add(this.detect(vtr).scale(5));

        vtr.set(this.pos.x, this.pos.y, -d);
        this.accel.add(this.detect(vtr).scale(5));

        vtr.set(this.pos.x, this.pos.y, d);
        this.accel.add(this.detect(vtr).scale(5));

        if (Math.random() > 0.5) {
            this.fly(boids);
        }
        this.move();
    }

    fly(boids: Boid[]) {
        this.accel.add(this.line(boids));
        this.accel.add(this.togeth(boids));
        this.accel.add(this.apart(boids));
    }

    line(boids: Boid[]) {
        const totvel = new Vector3();
        let cnt = 0;
        for (let i = 0; i < boids.length; i++) {
            if (Math.random() > 0.6) continue;
            const b = boids[i];
            const dist = b.pos.distanceTo(this.pos);
            if (dist > 0 && dist <= this.area) {
                totvel.add(b.vel);
                cnt++;
            }
        }
        if (cnt > 0) {
            totvel.divideScalar(cnt);
            const v = totvel.length();
            if (v > this.mfrc) {
                totvel.divideScalar(v / this.mfrc);
            }
        }
        return totvel;
    }

    togeth(boids: Boid[]) {
        const plus = new Vector3();
        const dir = new Vector3();
        let cnt = 0;
        for (let i = 0; i < boids.length; i++) {
            if (Math.random() > 0.6) continue;
            const b = boids[i];
            const dist = b.pos.distanceTo(this.pos);
            if (dist > 0 && dist <= this.area) {
                plus.add(b.pos);
                cnt++;
            }
        }
        if (cnt > 0) {
            plus.divideScalar(cnt);
        }
        dir.subVectors(plus, this.pos);
        const l = dir.length();
        if (l > this.mfrc) {
            dir.divideScalar(l / this.mfrc);
        }
        return dir;
    }

    apart(boids: Boid[]) {
        const plus = new Vector3();
        const rep = new Vector3();
        for (let i = 0; i < boids.length; i++) {
            if (Math.random() > 0.6) continue;
            const b = boids[i];
            const dist = b.pos.distanceTo(this.pos);
            if (dist > 0 && dist <= this.area) {
                rep.subVectors(this.pos, b.pos);
                rep.normalize();
                rep.divideScalar(dist);
                plus.add(rep);
            }
        }
        return plus;
    }

    move() {
        this.vel.add(this.accel);
        const l = this.vel.length();
        if (l > this.msp) {
            this.vel.divideScalar(l / this.msp);
        }
        this.pos.add(this.vel);
        this.accel.set(0, 0, 0);
    }
}

class BirdGeometry {
    boid: Boid;
    phase: number;
    vtxs: Vector3[][] = [];
    
    constructor(boid: Boid) {
        this.boid = boid;
        this.phase = Math.floor(Math.random() * 62.83);
        
        Bird.beak.forEach(indices => {
            const triangle = indices.map(idx => {
                const v = Bird.v[idx];
                return new Vector3(v[0] * 1.5, v[1] * 1.5, v[2] * 1.5);
            });
            this.vtxs.push(triangle);
        });
    }

    render(ctx: CanvasRenderingContext2D, birdColor: string) {
        const rotY = Math.atan2(-this.boid.vel.z, this.boid.vel.x);
        const rotZ = Math.asin(this.boid.vel.y / this.boid.vel.length());
        this.phase = (this.phase + (Math.max(0, rotZ) + 0.1)) % 62.83;
        
        const wingY = Math.sin(this.phase) * 5;

        ctx.fillStyle = birdColor;
        ctx.strokeStyle = birdColor;
        ctx.lineWidth = 0.1;

        this.vtxs.forEach((triangle, i) => {
            ctx.beginPath();
            triangle.forEach((v, j) => {
                const tv = v.clone();
                if (i > 0 && j === 0) tv.y = wingY;

                const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
                const x1 = tv.x * cosY + tv.z * sinY;
                const z1 = -tv.x * sinY + tv.z * cosY;
                tv.x = x1; tv.z = z1;

                const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);
                const x2 = tv.x * cosZ - tv.y * sinZ;
                const y2 = tv.x * sinZ + tv.y * cosZ;
                tv.x = x2; tv.y = y2;

                tv.add(this.boid.pos);

                const projected = tv.project();
                if (j === 0) ctx.moveTo(projected.x, projected.y);
                else ctx.lineTo(projected.x, projected.y);
            });
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        });
    }
}

const BirdSimulation: React.FC<BirdSimulationProps> = ({ color, opacity = 0.5 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const colorRef = useRef(color);

    // Update color ref silently when prop changes
    useEffect(() => {
        colorRef.current = color;
    }, [color]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        
        const boids: Boid[] = [];
        const birds: BirdGeometry[] = [];
        for (let i = 0; i < 120; i++) {
            const boid = new Boid();
            boids.push(boid);
            birds.push(new BirdGeometry(boid));
        }

        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
            }
        };
        window.addEventListener('resize', resize);
        resize();

        let lastTime = 0;
        const fpsLimit = 60;
        const interval = 1000 / fpsLimit;

        const render = (time: number) => {
            animationFrameId = requestAnimationFrame(render);

            const delta = time - lastTime;
            if (delta < interval) return;
            
            lastTime = time - (delta % interval);

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.scale(1, -1);

            const sorted = birds.slice().sort((a, b) => a.boid.pos.z - b.boid.pos.z);
            
            sorted.forEach(bird => {
                bird.boid.run(boids, canvas.width, canvas.height, 800);
                bird.render(ctx, colorRef.current); // Use color from ref
            });
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, []); // Only run once on mount

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                opacity: opacity,
                zIndex: 10
            }}
        />
    );
};

export default BirdSimulation;
