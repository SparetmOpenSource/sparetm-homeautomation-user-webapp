import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import { MdRefresh, MdWifiOff } from 'react-icons/md';

interface CubeData {
  ts: number;
  face: number;
  corner: number;
  rot: number;
  vec?: [number, number, number];
}

// ================= CONFIG =================
const MQTT_OPT = {
  protocol: 'wss' as const,
  hostname: 'c99945788e22476f8c84208ec9166146.s1.eu.hivemq.cloud',
  port: 8884,
  path: '/mqtt',
  username: 'openbridge',
  password: '272927@Sparetm',
  clientId: 'cube-monitor-web-' + Math.random().toString(16).substr(2, 8),
};

const TOPIC = 'openbridge/cube/data';

// Smoothness factor (Lower = Slower/Smoother, Higher = Faster/Jittery)
const LERP_FACTOR = 0.05; 

export const CubeMonitor: React.FC = () => {
  const [data, setData] = useState<CubeData | null>(null);
  const [status, setStatus] = useState<string>('Disconnected');
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Calibration State
  const [invertX, setInvertX] = useState(false);
  const [invertY, setInvertY] = useState(false);
  const [swapAxes, setSwapAxes] = useState(false);
  const [mirrorText, setMirrorText] = useState(false);
  const [simulateMissingVec, setSimulateMissingVec] = useState(true);

  // Animation Refs
  const cubeRef = React.useRef<HTMLDivElement>(null);
  const targetRot = React.useRef({ x: 0, y: 0 });
  const currentRot = React.useRef({ x: 0, y: 0 });
  const requestRef = React.useRef<number>();

  // Process incoming data into Target Rotation
  useEffect(() => {
    if (!data) return;
    
    let rotX = 0;
    let rotY = 0;

    // Logic: Use vector if available AND NOT simulating missing vector
    if (data.vec && !simulateMissingVec) {
        let [x, y, z] = data.vec;
        
        // 1. Swap Axes
        if (swapAxes) [x, y] = [y, x];
    
        // 2. Calculate Pitch/Roll
        // FIX: Subtract 90 from X-rotation to align standard Gravity (Z-up) with Web (Z-forward)
        rotX = (Math.atan2(y, z) * (180 / Math.PI)) - 90;
        rotY = Math.atan2(-x, Math.sqrt(y*y + z*z)) * (180 / Math.PI);
        
        // 3. Invert
        if (invertX) rotX = -rotX;
        if (invertY) rotY = -rotY;
    } else if (data.corner !== -1) {
        // Fallback: Use Corner ID (Visualize 45-degree angles)
        switch (data.corner) {
            case 7: rotX = -45; rotY = -45; break;  // R-F-T
            case 6: rotX = -45; rotY = 45; break;   // L-F-T
            case 5: rotX = -45; rotY = -135; break; // R-B-T
            case 4: rotX = -45; rotY = 135; break;  // L-B-T
            case 3: rotX = 45; rotY = -45; break;   // R-F-B
            case 2: rotX = 45; rotY = 45; break;    // L-F-B
            case 1: rotX = 45; rotY = -135; break;  // R-B-B
            case 0: rotX = 45; rotY = 135; break;   // L-B-B
        }
    } else {
        // Fallback: Use Face ID
        // Firmware Static Mapping (1-6)
        // 1(+X)=Right, 2(-X)=Left, 3(+Y)=Front, 4(-Y)=Back, 5(+Z)=Top, 6(-Z)=Bottom
        switch (data.face) {
            case 1: rotX = 0; rotY = -90; break;  // Right
            case 2: rotX = 0; rotY = 90; break;   // Left
            case 3: rotX = 0; rotY = 0; break;    // Front
            case 4: rotX = 0; rotY = 180; break;  // Back
            case 5: rotX = -90; rotY = 0; break;  // Top
            case 6: rotX = 90; rotY = 0; break;   // Bottom
        }
    }

    // Update Target
    targetRot.current = { x: rotX, y: rotY };
  }, [data, invertX, invertY, swapAxes, simulateMissingVec]);

  // Animation Loop Effect
  useEffect(() => {
    const animate = () => {
        const target = targetRot.current;
        const current = currentRot.current;
    
        const dx = target.x - current.x;
        const dy = target.y - current.y;
    
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
           current.x += dx * LERP_FACTOR;
           current.y += dy * LERP_FACTOR;
           
           if (cubeRef.current) {
             cubeRef.current.style.transform = `rotateX(${current.x.toFixed(2)}deg) rotateY(${current.y.toFixed(2)}deg)`;
           }
        }
    
        requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  useEffect(() => {
    setStatus('Connecting...');
    const url = `${MQTT_OPT.protocol}://${MQTT_OPT.hostname}:${MQTT_OPT.port}${MQTT_OPT.path}`;
    const client = mqtt.connect(url, {
      username: MQTT_OPT.username,
      password: MQTT_OPT.password,
      clientId: MQTT_OPT.clientId,
      clean: true,
      connectTimeout: 10000, 
      reconnectPeriod: 2000,
    });

    client.on('connect', () => {
      setStatus('Connected');
      client.subscribe(TOPIC);
    });

    client.on('message', (_topic, message) => {
      try {
        const payload = JSON.parse(message.toString());
        setData(payload);
      } catch (e) { console.error('JSON Error', e); }
    });

    client.on('error', (err) => setStatus('Error: ' + err.message));

    return () => { client.end(); };
  }, [refreshKey]);

  // Helper to apply mirror to face transform
  const getFaceStyle = (baseStyle: React.CSSProperties, faceIdx: number) => {
      const isActive = data?.face === faceIdx;
      // FIX: Apply mirror BEFORE 3D transforms
      const t = (mirrorText ? 'scaleX(-1) ' : '') + (baseStyle.transform as string);
      return {
          ...styles.face,
          ...baseStyle,
          transform: t,
          backgroundColor: isActive ? '#4caf50' : 'rgba(255,255,255,0.95)'
      };
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerBar}>
        <h2 style={styles.header}>ESP32 Cube Monitor</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* REFRESH BUTTON */}
            <button 
                style={styles.refreshBtn} 
                onClick={() => {
                    setData(null);
                    setStatus('Disconnected');
                    setRefreshKey(prev => prev + 1);
                }}
                title="Reconnect"
            >
                <MdRefresh size={20} />
            </button>

            <div style={styles.statusBadge}>
            <span style={{...styles.statusDot, backgroundColor: status === 'Connected' ? '#4caf50' : '#f44336'}}></span>
            {status}
            </div>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* LEFT PANEL: VISUALIZATION */}
        <div style={styles.leftPanel}>
          <div style={styles.vizCard}>
            {/* 3D CUBE VIZ */}
            <div style={styles.scene}>
              <div ref={cubeRef} style={styles.cube}>
                {/* Mapping faces to layout: Right(1), Left(2), Front(3), Back(4), Top(5), Btm(6) */}
                <div style={getFaceStyle(styles.right, 1)}>{data ? '1 (+X)' : <MdWifiOff size={48} color="#ddd" />}</div>
                <div style={getFaceStyle(styles.left, 2)}>{data ? '2 (-X)' : <MdWifiOff size={48} color="#ddd" />}</div>
                <div style={getFaceStyle(styles.front, 3)}>{data ? '3 (+Y)' : <MdWifiOff size={48} color="#ddd" />}</div>
                <div style={getFaceStyle(styles.back, 4)}>{data ? '4 (-Y)' : <MdWifiOff size={48} color="#ddd" />}</div>
                <div style={getFaceStyle(styles.top, 5)}>{data ? '5 (+Z)' : <MdWifiOff size={48} color="#ddd" />}</div>
                <div style={getFaceStyle(styles.bottom, 6)}>{data ? '6 (-Z)' : <MdWifiOff size={48} color="#ddd" />}</div>
              </div>
            </div>

            {/* CALIBRATION CONTROLS */}
            <div style={styles.controls}>
              <label style={styles.checkboxLabel}><input type="checkbox" checked={invertX} onChange={e => setInvertX(e.target.checked)} /> Invert X</label>
              <label style={styles.checkboxLabel}><input type="checkbox" checked={invertY} onChange={e => setInvertY(e.target.checked)} /> Invert Y</label>
              <label style={styles.checkboxLabel}><input type="checkbox" checked={swapAxes} onChange={e => setSwapAxes(e.target.checked)} /> Swap X/Y</label>
              <label style={styles.checkboxLabel}><input type="checkbox" checked={mirrorText} onChange={e => setMirrorText(e.target.checked)} /> Mirror Text</label>
              <label style={{...styles.checkboxLabel, background: '#ffebee', color: '#c62828'}}><input type="checkbox" checked={simulateMissingVec} onChange={e => setSimulateMissingVec(e.target.checked)} /> Sim. No Vector</label>
            </div>
          </div>

          {/* DASHBOARD CARDS */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <h3 style={styles.statLabel}>Rotation</h3>
              <div style={styles.statValue}>{data?.rot ?? '--'}</div>
            </div>
            <div style={styles.statCard}>
              <h3 style={styles.statLabel}>Active Face</h3>
              <div style={styles.statValue}>{data?.face !== -1 ? data?.face : '--'}</div>
            </div>
            <div style={styles.statCard}>
              <h3 style={styles.statLabel}>Corner</h3>
              <div style={styles.statValue}>{data?.corner !== -1 ? data?.corner : 'None'}</div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: DATA */}
        <div style={styles.rightPanel}>
          <h3 style={styles.panelTitle}>Raw Telemetry</h3>
          <div style={styles.codeWindow}>
             <pre style={styles.json}>{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// ================= CSS (IN JS) =================
const styles: Record<string, React.CSSProperties> = {
  // Layout
  container: { fontFamily: 'Inter, sans-serif', padding: '40px', background: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  headerBar: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px', gap: '10px' },
  header: { color: '#1a1a1a', margin: 0, fontSize: '28px', fontWeight: '700' },
  statusBadge: { display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'white', borderRadius: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', fontSize: '14px', fontWeight: '600', color: '#555' },
  statusDot: { width: '8px', height: '8px', borderRadius: '50%' },
  refreshBtn: { background: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', color: '#555', transition: 'all 0.2s' },

  mainContent: { display: 'flex', flexDirection: 'row', gap: '40px', width: '100%', maxWidth: '1200px', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center' },
  
  // Panels
  leftPanel: { flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' },
  rightPanel: { flex: '1 1 400px', display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', height: '100%', minHeight: '500px' },
  
  // Vis Card
  vizCard: { background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' },

  // 3D Scene
  scene: { width: '250px', height: '250px', perspective: '800px' },
  cube: { width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d', willChange: 'transform' }, 
  face: { position: 'absolute', width: '100%', height: '100%', boxSizing: 'border-box', border: '2px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: '800', color: '#333', opacity: 0.85, borderRadius: '12px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)', backfaceVisibility: 'hidden', background: 'rgba(255,255,255,0.95)' },
  
  // Face Transforms
  front:  { transform: 'rotateY(0deg) translateZ(125px)' },
  back:   { transform: 'rotateY(180deg) translateZ(125px)' },
  right:  { transform: 'rotateY(90deg) translateZ(125px)' },
  left:   { transform: 'rotateY(-90deg) translateZ(125px)' },
  top:    { transform: 'rotateX(90deg) translateZ(125px)' },
  bottom: { transform: 'rotateX(-90deg) translateZ(125px)' },

  // Controls
  controls: { display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' },
  checkboxLabel: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', background: '#f1f3f5', padding: '8px 16px', borderRadius: '12px', transition: 'all 0.2s', userSelect: 'none' },

  // Stats
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', width: '100%' },
  statCard: { background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'center' },
  statLabel: { margin: '0 0 10px 0', fontSize: '14px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' },
  statValue: { fontSize: '28px', fontWeight: '800', color: '#2c3e50' },

  // Code Panel
  panelTitle: { margin: '0 0 5px 0', color: '#333' },
  codeWindow: { flex: '1', background: '#1e1e1e', borderRadius: '12px', padding: '20px', overflow: 'hidden', minHeight: '400px' },
  json: { color: '#d4d4d4', fontFamily: 'Fira Code, monospace', fontSize: '18px', margin: 0, height: '100%', overflowY: 'auto' }
};
