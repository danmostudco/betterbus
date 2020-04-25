import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    const title = `Better Bus`;
    const description = "Look up bus routes easily in Washington DC";
    const featuredImage = "/static/betterBusAvatar.png";
    const date = "2020-04-19";

    return (
      <Container>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link href="/static/favicon.ico" rel="shortcut icon" />
          <link href="/static/styles.css" rel="stylesheet" />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
            rel="stylesheet"
          />
          <meta content={description} name="description" />
          <meta property="og:title" content={title} />
          <meta property="og:image" content="/static/banner.jpg" />
          <meta content="en_US" property="og:locale" />
          <meta content={description} property="og:description" />
          <meta content="https://next-mapbox-demo.now.sh" property="og:url" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <meta
            content="/static/favicons/browserconfig.xml"
            name="msapplication-config"
          />
          <link
            href="/static/favicons/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="/static/favicons/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/static/favicons/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link href="/static/favicons/site.webmanifest" rel="manifest" />
          <link
            color="#4a9885"
            href="/static/favicons/safari-pinned-tab.svg"
            rel="mask-icon"
          />
          <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
          <meta content="en_US" property="og:locale" />
          <meta content="Better Bus" property="og:title" />
          <meta content={description} property="og:description" />
          <meta content="https://better-bus.now.sh/" property="og:url" />
          {featuredImage && (
            <>
              <meta
                content={`/static/betterBusAvatar.png`}
                property="og:image"
              />
              <meta content={description} property="og:image:alt" />
            </>
          )}
          {date && (
            <>
              <meta content="article" property="og:type" />
              <meta content={date} property="article:published_time" />
            </>
          )}
          <meta content="summary_large_image" name="twitter:card" />
          <meta content="@danmostudco" name="twitter:site" />
          <meta content="@danmostudco" name="twitter:creator" />
        </Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
