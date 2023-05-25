import { Fragment } from "react";
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    // 스타일 구성 요소의 ServerStyleSheet 클래스를 인스턴스화
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    // renderPage : 이 메서드에 연결하여 초기 페이지 로드 시 서버 측 자식 구성 요소의 스타일 분석
    // renderPage를 커스텀 하는 이유는 서버 측 렌더링에서 제대로 작동하기 위해
    // 애플리케이션을 래핑해야 하는 css-in-js 라이브러리와 함께 사용하기 위한 것
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <Fragment key="1">
            {initialProps.styles}
            {sheet.getStyleElement()}
          </Fragment>,
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        {/* 각종 메타 태그 및 웹 폰트 */}
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}