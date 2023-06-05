import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="/favicon.ico" rel="shortcut icon" />
        <link href="/manifest.json" rel="manifest" />
        <link href="/assets/icons/icon-128x128.png" rel="apple-touch-icon" />
        <link href="/assets/icons/icon-192x192.png" rel="apple-touch-icon" sizes="180x180" />
        <link
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css"
          rel="stylesheet"
        />

        <meta content="그 밈" name="apple-mobile-web-app-title" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="default" name="apple-mobile-web-app-status-bar-style" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
