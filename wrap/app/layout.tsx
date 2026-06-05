import type {Metadata} from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vasudev AI Academy | Cohort #01: Learn AI From Scratch',
  description: 'A beginner-friendly live workshop that helped absolute beginners understand AI, explore powerful tools, and build practical AI projects. 17+ participants, 4.5/5 rating. Join the next cohort waitlist.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z75PE4Q41S"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Z75PE4Q41S');
            `,
          }}
        />
      </head>
      <body className="bg-[#fcfdfd] font-sans antialiased text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
