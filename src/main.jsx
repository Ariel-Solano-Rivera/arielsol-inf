import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

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

function SpiderLogo() {
  return (
    <div className="spider-logo" aria-hidden="true">
      <span className="spider-glow" />
      <span className="spider-body" />
      <span className="spider-head" />
      <span className="spider-leg leg-1" />
      <span className="spider-leg leg-2" />
      <span className="spider-leg leg-3" />
      <span className="spider-leg leg-4" />
      <span className="spider-leg leg-5" />
      <span className="spider-leg leg-6" />
      <span className="spider-leg leg-7" />
      <span className="spider-leg leg-8" />
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

      <section className="hero" id="inicio">
        <div className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">Acceso directo</p>
            <h1>Redes</h1>
            <p>Todo en un solo lugar.</p>
          </div>
          <SpiderLogo />
          <div className="quick-links" aria-label="Accesos directos principales">
            {socialLinks.map((link, index) => (
              <SocialCard key={link.name} link={link} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid">
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
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
