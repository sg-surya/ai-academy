import type {Metadata} from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles

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
  title: 'Vasudev AI Academy | Free AI Workshop',
  description: 'Join the free live virtual workshop on AI Fundamentals & Practical Projects. Learn Machine Learning, LLMs, ChatGPT, Claude, Gemini, AI automations, and build real AI projects live.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#fcfdfd] font-sans antialiased text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
