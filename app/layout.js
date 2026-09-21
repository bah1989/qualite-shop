import './globals.css';

export const metadata = {
  title: 'Qualité shop — Kasaprix',
  description:
    'Qualité shop & Kasaprix : Le meilleur des bons plans sur toute l\'étendue du territoire.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
