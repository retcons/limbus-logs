import './styles/global.scss'
import { Bebas_Neue } from 'next/font/google';
const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' });

export const metadata = {
  metadataBase: new URL('https://retcons.github.io/limbus-logs/'),
  title: 'Observation Log Library',
  description:
    'A collection for easy access to observation logs of enemies & abnormalities in Limbus Company. Some entries are combined due to identical content, but not all.',
  keywords: ['Limbus Company', 'Observation logs', 'Abnormality']
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={bebas.variable}>{children}</body>
    </html>
  );
}
