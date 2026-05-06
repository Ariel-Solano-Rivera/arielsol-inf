import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const socialLinks = [
  {
    name: 'Instagram',
    handle: '@arielsol_30',
    href: 'https://www.instagram.com/arielsol_30/?hl=es-la',
    accent: '#ff7ab6',
    icon: 'IG',
  },
  {
    name: 'TikTok',
    handle: '@tu_usuario',
    href: 'https://tiktok.com/@tu_usuario',
    accent: '#c77dff',
    icon: 'TK',
  },
  {
    name: 'YouTube',
    handle: 'Tu canal',
    href: 'https://youtube.com/@tu_usuario',
    accent: '#ff9f80',
    icon: 'YT',
  },
  {
    name: 'Vsco',
    handle: '@tu_usuario',
    href: 'https://x.com/tu_usuario',
    accent: '#f7c8e0',
    icon: 'VC',
  },
];

const favoriteTracks = [
  'Track para arrancar el mood',
  'Cancion favorita de la semana',
  'Beat para estudiar o crear',
];

function SocialCard({ link, index }) {
  return (
    <a
      className="social-card"
      href={link.href}
      target="_blank"
      rel="noreferrer"
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
  return (
    <a
      className="top-social-link"
      href={link.href}
      target="_blank"
      rel="noreferrer"
      style={{ '--accent': link.accent, '--delay': `${index * 80}ms` }}
    >
      <span>{link.icon}</span>
      {link.name}
    </a>
  );
}

function App() {
  return (
    <main className="page-shell">
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="grain" />

      <header className="topbar" id="redes">
        <a className="brand" href="/">
          <span>Ariel</span>
          <strong>Solano</strong>
        </a>
        <nav className="top-socials" aria-label="Redes sociales">
          {socialLinks.map((link, index) => (
            <TopSocialLink key={link.name} link={link} index={index} />
          ))}
        </nav>
      </header>

      <section className="hero">
        <p className="eyebrow">Mi espacio digital + playlist</p>
        <div className="hero-grid">
          <div className="intro-card">
            <span className="sparkle-tag">Soft mood, cute energy</span>
            <h1>Hola, soy Ariel.</h1>
            <p>
              Este es mi espacio para compartir mis redes, mi musica favorita,
              fotos, momentos y todo lo que me inspira.
            </p>
            <div className="cta-row">
              <a className="primary-btn" href="#playlist">
                Escuchar playlist
              </a>
              <a className="ghost-btn" href="#redes">
                Ver redes
              </a>
            </div>
          </div>

          <aside className="profile-card" aria-label="Foto de perfil">
            <div className="photo-frame">
              <img src="/mi-foto.png" alt="Foto de mi perfil" />
            </div>
            <div className="profile-caption">
              <p>Digital diary</p>
              <h2>Ariel Solano</h2>
              <span>Fotos, musica, momentos y contenido nuevo.</span>
            </div>
            <div className="wave">
              {Array.from({ length: 24 }).map((_, index) => (
                <span key={index} style={{ '--i': index }} />
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel socials-panel">
          <div className="section-heading">
            <p>Conectemos</p>
            <h2>Redes sociales</h2>
          </div>
          <div className="social-list">
            {socialLinks.map((link, index) => (
              <SocialCard key={link.name} link={link} index={index} />
            ))}
          </div>
        </div>

        <div id="playlist" className="panel playlist-panel">
          <div className="section-heading">
            <p>Spotify</p>
            <h2>Mi playlist favorita</h2>
          </div>
          <div className="spotify-frame">
            <iframe
              title="Playlist de Spotify"
              src="https://open.spotify.com/embed/playlist/7LeW1x0C74XY6GWKX6IWym?utm_source=generator"
              width="100%"
              height="420"
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
