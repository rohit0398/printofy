import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="Printofy3D" content={"Printofy3D"} />
        <title>Meet The Best 3D Printing In The Ludhiana City</title>
        <meta
          name="description"
          content={`We are providing 3D Printing service, 3D Printing Lab Setup, Filaments with a vision of helping the industries and students to grow with the innovative ideas and reduce their new products development time in India at very reasonable prices. Special discounts for the students. Printers available 1) Prusa (MK3S) (250*210*210) 2) Creality ender 3 s1 (220*220*270) 3) Divide by zero -Alpha 500 (500*500*500 mm)/(19.7"*19."7*19.7")`}
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        <meta
          property="og:description"
          content="Shroom City - Where The Magic Happens"
        />
        <meta
          property="og:image"
          content="/assets/shroom-logo-small.png"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Aboreto&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Aboreto&family=Noto+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,300;1,400;1,500;1,600;1,700;1,900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
