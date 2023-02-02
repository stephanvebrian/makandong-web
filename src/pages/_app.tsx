import type { AppProps } from 'next/app';

import 'modern-normalize/modern-normalize.css';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
