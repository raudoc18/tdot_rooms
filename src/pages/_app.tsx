import React, { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import { IBM_Plex_Mono } from '@next/font/google'

const ibm = IBM_Plex_Mono({
  style: 'normal',
  subsets: [],
  weight: '400',
  variable: '--font-ibm',
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Layout = ({ Component, pageProps }: AppPropsWithLayout) => {
  return (
    <main className={`${ibm.variable} font-mono h-full flex flex-col`}>
      <Component {...pageProps} />
    </main>
  );
};

export default Layout;
