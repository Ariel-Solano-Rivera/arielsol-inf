import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import profilePhoto from '../mi-foto.png';
import maskPhoto from './assets/sp1.png';

const socialLinks = [
  {
    name: 'Instagram',
    handle: '@arielsol_30',
    href: 'https://www.instagram.com/arielsol_30/?hl=es-la',
    accent: '#e1306c',
    icon: 'IG',
  },
  {
    name: 'Vsco',
    handle: '@arielus30-',
    href: 'https://vsco.co/arielus30-/gallery',
    accent: '#64748b',
    icon: 'VS',
  },
  {
    name: 'TikTok',
    handle: '@ariel.sol_30',
    href: 'https://www.tiktok.com/@ariel.sol_30',
    accent: '#06b6d4',
    icon: 'TK',
  },
  {
    name: 'Spotify',
    handle: 'Arielus',
    href: 'https://open.spotify.com/user/ovt164auivhpmodedjyqz45hu?si=8000666dbf894408',
    accent: '#22c55e',
    icon: 'SP',
  },
];

function SocialCard({ link, index }) {
  const isAnchor = link.href.startsWith('#');

  return (
    <a
      className="social-card"
      href={link.href}
      target={isAnchor ? undefined : '_blank'}
      rel={isAnchor ? undefined : 'noreferrer'}
      style={{ '--accent': link.accent, '--delay': `${index * 90}ms` }}
    >
      <span className="social-icon">{link.icon}</span>
      <span>
        <strong>{link.name}</strong>
        <small>{link.handle}</small>
      </span>
      <span className="arrow">Abrir</span>
    </a>
  );
}

function TopSocialLink({ link, index }) {
  const isAnchor = link.href.startsWith('#');

  return (
    <a
      className="top-social-link"
      href={link.href}
      target={isAnchor ? undefined : '_blank'}
      rel={isAnchor ? undefined : 'noreferrer'}
      style={{ '--accent': link.accent, '--delay': `${index * 80}ms` }}
    >
      <span>{link.icon}</span>
      {link.name}
    </a>
  );
}

function RevealPortrait() {
  const portraitRef = useRef(null);
  const maskRef = useRef(null);
  const trailRef = useRef(null);
  const frameRef = useRef(null);
  const targetRef = useRef({ x: 50, y: 44 });
  const currentRef = useRef({ x: 50, y: 44 });
  const dropsRef = useRef([]);
  const isActiveRef = useRef(false);
  const lastDropRef = useRef({ x: 50, y: 44 });
  const dropIdRef = useRef(0);

  useEffect(() => {
    function animate() {
      const portrait = portraitRef.current;
      const mask = maskRef.current;
      const trail = trailRef.current;
      const isTouchLike = window.matchMedia('(hover: none)').matches;

      if (portrait) {
        currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.16;
        currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.16;
        portrait.style.setProperty('--reveal-x', `${currentRef.current.x}%`);
        portrait.style.setProperty('--reveal-y', `${currentRef.current.y}%`);
      }

      dropsRef.current = dropsRef.current
        .map((drop) => ({ ...drop, life: drop.life - drop.decay }))
        .filter((drop) => drop.life > 0);

      const maskImage = dropsRef.current
        .map((drop) => {
          const rx = Math.max(16, drop.rx * drop.life);
          const ry = Math.max(18, drop.ry * drop.life);
          const softX = rx + 42;
          const softY = ry + 42;

          return `radial-gradient(ellipse ${softX}px ${softY}px at ${drop.x}% ${drop.y}%, #000 0 ${Math.min(rx, ry)}px, rgba(0,0,0,.72) ${Math.min(rx, ry) + 18}px, rgba(0,0,0,.28) ${Math.min(softX, softY) - 14}px, transparent ${Math.min(softX, softY)}px)`;
        })
        .join(', ');

      if (mask && trail) {
        const shouldUseCssFallback = !maskImage && window.matchMedia('(hover: none)').matches;
        const value = shouldUseCssFallback
          ? ''
          : maskImage || 'radial-gradient(circle at 50% 44%, transparent 0, transparent 1px)';

        mask.style.maskImage = value;
        mask.style.webkitMaskImage = value;
        trail.style.maskImage = value;
        trail.style.webkitMaskImage = value;
      }

      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  function updateReveal(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const point = event.touches?.[0] || event;
    const next = {
      x: ((point.clientX - bounds.left) / bounds.width) * 100,
      y: ((point.clientY - bounds.top) / bounds.height) * 100,
    };

    targetRef.current = next;

    const distance = Math.hypot(
      next.x - lastDropRef.current.x,
      next.y - lastDropRef.current.y,
    );

    if (distance > 1.15 || dropsRef.current.length === 0) {
      const id = dropIdRef.current;
      const wave = Math.sin(id * 1.37);
      const drift = Math.cos(id * 0.91);
      const touchLike = window.matchMedia('(hover: none)').matches;

      dropsRef.current.push({
        x: next.x + wave * 0.9,
        y: next.y + drift * 0.6,
        life: 1,
        rx: touchLike ? 34 + wave * 7 : 78 + wave * 20,
        ry: touchLike ? 48 + drift * 9 : 92 + drift * 22,
        decay: 0.010 + (id % 4) * 0.0016,
      });

      dropsRef.current = dropsRef.current.slice(touchLike ? -16 : -30);
      lastDropRef.current = next;
      dropIdRef.current += 1;
    }
  }

  function resetReveal(event) {
    isActiveRef.current = false;
    targetRef.current = { x: 50, y: 44 };
    event.currentTarget.classList.remove('is-revealing');
  }

  function startTouchReveal(event) {
    isActiveRef.current = true;
    event.currentTarget.classList.add('is-revealing');
    updateReveal(event);
  }

  return (
    <div
      ref={portraitRef}
      className="reveal-portrait"
      onContextMenu={(event) => event.preventDefault()}
      onPointerEnter={(event) => {
        if (window.matchMedia('(hover: none)').matches) return;

        isActiveRef.current = true;
        event.currentTarget.classList.add('is-revealing');
        updateReveal(event);
      }}
      onPointerDown={(event) => {
        isActiveRef.current = true;
        event.currentTarget.classList.add('is-revealing');
        event.currentTarget.setPointerCapture?.(event.pointerId);
        updateReveal(event);
      }}
      onPointerMove={updateReveal}
      onPointerUp={resetReveal}
      onPointerCancel={resetReveal}
      onPointerLeave={resetReveal}
      onTouchStart={startTouchReveal}
      onTouchMove={(event) => {
        event.preventDefault();
        updateReveal(event);
      }}
      onTouchEnd={resetReveal}
      onTouchCancel={resetReveal}
    >
      <img className="portrait-base" src={profilePhoto} alt="Foto de perfil" />
      <img ref={maskRef} className="portrait-mask" src={maskPhoto} alt="" aria-hidden="true" />
      <span ref={trailRef} className="reveal-liquid" />
      <span className="reveal-ring" />
    </div>
  );
}

function App() {
  return (
    <main className="page-shell">
      <div className="grain" />

      <header className="topbar" id="redes">
        <a className="brand" href="/">
          <span>Mis</span>
          <strong>Redes</strong>
        </a>
        <nav className="top-socials" aria-label="Redes sociales">
          {socialLinks.map((link, index) => (
            <TopSocialLink key={link.name} link={link} index={index} />
          ))}
        </nav>
      </header>

      <section className="hero snap-section" id="inicio">
        <div className="hero-stage">
          <div className="hero-intro">
            <p className="hero-kicker">Personal social hub</p>
            <h1>Ariel Solano</h1>
            <span className="hero-signature">Solff</span>
          </div>
          <RevealPortrait />
          <a className="scroll-cue" href="#redes-principales">
            Ver redes
          </a>
        </div>
      </section>

      <section className="links-block snap-section" id="redes-principales">
        <div className="web-pull" aria-hidden="true">
          <span className="web-thread web-thread-one" />
          <span className="web-thread web-thread-two" />
          <span className="web-thread web-thread-three" />
          <span className="web-thread web-thread-four" />
          <span className="web-thread web-thread-five" />
          <span className="web-arc web-arc-one" />
          <span className="web-arc web-arc-two" />
          <span className="web-arc web-arc-three" />
          <span className="web-knot" />
        </div>
        <div className="links-panel">
          <div className="social-section">
            <div className="section-heading">
              <p>Acceso directo</p>
              <h1>Mis redes</h1>
            </div>
            <div className="quick-links" aria-label="Accesos directos principales">
              {socialLinks.map((link, index) => (
                <SocialCard key={link.name} link={link} index={index} />
              ))}
            </div>
          </div>

          <div className="content-grid">
            <div id="playlist" className="panel playlist-panel">
              <div className="section-heading">
                <p>Spotify</p>
                <h2>Playlist</h2>
              </div>
              <div className="spotify-frame">
                <iframe
                  title="Playlist secundaria de Spotify"
                  src="https://open.spotify.com/embed/playlist/7LeW1x0C74XY6GWKX6IWym?utm_source=generator"
                  width="100%"
                  height="520"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
