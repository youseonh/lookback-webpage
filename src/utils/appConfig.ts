const activeConfig = process.env.NODE_ENV;

const appConfig = {
  // setup enviroment for development
  development: {
    appName: "LookBack",
    url: {
      api: process.env.BASE_URL_API,
      assets: "",
      origin: "",
    },
    openGraph: {
      site_title: "LookBack",
      site_description: "way back API를 사용한 관심 웹사이트 개편 사항 확인 사이트",
      type: "website",
      url: "localhost://3000",
    },
  },
  // setup enviroment for testing
  test: {
    appName: "",
    url: {
      api: "",
      assets: "",
      origin: "",
    },
    openGraph: {
      site_name: "",
      type: "",
      locale: "",
      url: "",
    },
  },
  // setup enviroment for production
  production: {
    appName: "LookBack",
    url: {
      api: process.env.BASE_URL_API,
      assets: "",
      origin: "",
    },
    openGraph: {
      site_title: "LookBack",
      site_description: "way back API를 사용한 관심 웹사이트 개편 사항 확인 사이트",
      type: "website",
      url: "localhost://3000",
    },
  },
};

export default appConfig[activeConfig];
