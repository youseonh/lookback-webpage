---
### ⭐ 데모

https://lookbackweb.netlify.app/
---

### ⭐ 구현 기능 관련

- 기능 To Do 관리 ⇒ Git issue
- 기능
  | 요구 사항 | 구현 정도 | 세부 기능 | 잔존 오류 | 비고 |
  | --------- | --------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | 목록 조회 | 100% | 등록된 관심 사이트의 목록을 확인 | | 기존에 localStorage를 사용하는 hook 생성하여 사용하다가 삭제 기능 후 상태 관리를 위해 Recoil을 도입하였고 Recoil effect를 사용하여 localStorage와 동기화했습니다. |
  | 상세 | 90% | 1월 1일 기준으로 10년치 과거 URL 주소 확인 / 각 리스트에 URL과 날짜 필수 표시 / URL 클릭 시 과거 URL 페이지 이동 | 페이징 Max 계산 후 현재 페이지 번호 계산 오류로 빈 테이블 조회되는 이슈 존재함 | Reqct-Query 과 Axios 사용한 url 10년치 상세 API 조회 |
  | 생성 | 100% | 인풋 박스로 관심있는 URL 입력해서 등록 / 등록 개수 4개 제한 / 4개 초과 등록 시 알림 / 로컬 스토리지 사용 / 유효성 검증 | | |
  | 삭제 | 100% | 삭제 알림창 확인 후 삭제 | | 목록 조회와 동일 |

---

### ⭐ 추가 구현 필요 기능

1. 수정
   - 이유 = 이미 등록한 url 정보를 수정할 필요가 있음
2. 관심 url의 og태그 image url을 가져와서 미리보기 기능

   - 구현 정도 ⇒ 50%
   - 필요한 이유 = url을 조회 할 때 해당 url의 og태그를 가져와서 image를 보여주면 어떤 url인지 한눈에 파악하기 쉬움
   - 발생 이슈 ⇒ 관심 url의 document를 읽어 들인 후 정규식을 통해 og:image의 url 추출 후 이미지 생성하려 했으나 일부 url의 이미지를 읽어들이지 못함

     - OG 태그 정규 표현식 관련
       - og태그 이미지 url 가져오기
         ![image](https://github.com/youseonh/lookback-webpage/assets/72364918/d39b3c99-b81c-4cf8-821d-8f962e9771df)

     ```jsx
     // 1. 해당 url의 정보를 useQuery를 통해 가져옴
     const ogQuery = useGetOpenGraph(props.url);

     // 2. <meta property="og:image" content="(.+?)">/ => 정규식을 통해 og:image의 url 추출 후 이미지 생성
     const getOgImage = () => {
       if (ogQuery.data) {
         const content = ogQuery.data.match(/<meta property="og:image" content="(.+?)">/);
         if (content.length >= 2) {
           setOGImage(content[1]);
         }
         if (ogImage) {
           return <img alt={ogImage} src={ogImage} width={300} />;
         }
       }
     };
     ```

---

### ⭐스킬

| 이름              | 버전    |
| ----------------- | ------- |
| React             | 18.2.0  |
| Typescript        | 5.0.4   |
| Next              | 13.4.3  |
| Recoil            | 0.7.7   |
| React-Query       | ^3.39.3 |
| Axios             | 1.4.0   |
| Styled-components | ^5.1.26 |
| Ant-Design        | ^5.5.1  |
| eslint            | ^8.41.0 |
| prettier          | ^2.8.8  |

---

### ⭐ 로컬 실행 방법

1. npm version
   - npm ^9.6.4
2. git Clone

   ```bash
   git clone https://github.com/youseonh/lookback-webpage.git
   ```

3. npm install

   ```bash
   npm i
   ```

4. npm install

   ```bash
   npm run dev
   ```

5. open

   ```bash
   http://localhost:3000
   ```

---

### ⭐ 프로젝트 환경 구성 방법

1. create-next-app을 활용한 기본 구조 구축

   ```bash
   npx create-next-app --typescript
   ```

2. eslint 와 prettier

   ```bash
   npm add prettier eslint eslint-config-prettier eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-import-resolver-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
   ```

3. antd UI 프레임워크 설치

   ```bash
   npm i antd @types/antd
   ```

- styled-component, styled-reset

  - 설치
    ```bash
    npm i --save-dev @types/styled-components
    npm add styled-reset
    ```
  - `styled-reset`
      <aside>
      📌 브라우저마다 기본적으로 설치되어 있는 스타일을 지워주는 Node.js 패키지입니다. 즉, 기본 제공 스타일을 초기화시켜 호환성을 맞춥니다. styled-reset을 사용하면 다음과 같은 이점이 있습니다.
      
      - 브라우저마다 다른 기본 스타일로 인해 발생하는 문제를 해결할 수 있습니다.
      - 코드가 더 깔끔하고 일관되게 유지됩니다.
      - 개발 시간을 절약할 수 있습니다.
      </aside>

- React Query
  가장 사용률이 높고, 세분화되고 많은 기능을 제공해주는 것으로 보여 선택했다.

  - 참고

    1. 비교

       [Comparison | React Query vs SWR vs Apollo vs RTK Query vs React Router | TanStack Query Docs](https://tanstack.com/query/v4/docs/react/comparison)

    2. 카카오 리액트 쿼리 경험 공유 동영상

       [눈에 보이지 않는 개선: My구독의 Redux에서 React-Query 전환 경험 공유 / if(kakao)2022](https://www.youtube.com/watch?v=YTDopBR-7Ac)

    3. Develogger 사내 도입

       [https://develogger.kro.kr/blog/LKHcoding/153#2-6 orval.config.ts](https://develogger.kro.kr/blog/LKHcoding/153#2-6%20orval.config.ts)

  - `axios`와 `react-query` 설치
    ```bash
    npm install axios react-query
    ```

- Netlify 배포

  - 프로젝트 root 디렉토리에 netlify.toml 파일 생성 (안에 주석 넣으면 오류 발생함)

    ```bash
    [build]
      command = "npm run build"
      publish = ".next"

    [[plugins]]
      package = "@netlify/plugin-nextjs"
    ```

---

### ⭐ 트러블 슈팅 관록

1. \***\*Warning: Expected server HTML to contain a matching <div> in <div>.\*\***

   - 원인
     - 첫 번째 렌더링이 서버의 초기 렌더와 일치해야하기 때문에, 브라우저에서만 실행되어야하는 코드는 useEffect 코드 내부에서 실행되어야 한다. window 객체는 클라이언트 측에서 브라우저의 요소들과 자바스크립트 엔진들을 담고 있는 객체이기 때문에 useEffect 코드 내부에 존재하거나 @next/dynamic을 통한 lazy loading을 이용하는 해결하는 방법이 있다.
   - 해결 방안

     - useEffect로 감싸서 사용

       ```jsx
       const [arr, setArr] = useState<ReactNode[]>([]);

       useEffect(() => {
           const newArr = [];
           for (let i = 0; i < 4; i++) {
             if (storedValue[i]) {
               newArr.push(<CustomCard key={i} {...storedValue[i]} />);
             } else {
               newArr.push(<CustomCard key={i} name="" url="" />);
             }
           }
           setArr(newArr);
         }, [storedValue]);
       ```

   - 참고
     [Warning: Expected server HTML to contain a matching <div> in <div>. · vercel/next.js · Discussion #17443](https://github.com/vercel/next.js/discussions/17443)
     [[Next.js] window is not defined 원인 및 해결방법](https://handhand.tistory.com/272)

2. **XMLHttpRequest at 'http://web.archive.org/cdx/search/cdx?url=https://www.google.com&date_range=2013-01-01:2023-01-01' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.**

   - 원인
     - CORS오류가 발생했는데 Proxy 설정을 하지 않았다.. 얼마 전에도 Vue3 프로젝트 설정하면서 똑같은 실수를 해 놓고 이번에 똑같은 실수를 반복하고 시간을 날렸다.. 괜한 API ACCESS KEY 와 SECRET KEY만 찾아보느라 반나절을 허비함
   - 해결 방안

     - next.config.js 파일 수정
     - /api로 오는 요청은 https://web.archive.org로 바꾸기

       ```jsx
       /** @type {import('next').NextConfig} */
       const nextConfig = {
         reactStrictMode: true,
         async rewrites() {
           return [
             {
               source: "/api/:path*",
               destination: `https://web.archive.org/:path*`,
             },
           ];
         },
       };

       module.exports = nextConfig;
       ```

   - 참고
     [React와 Next.js의 Cors 에러 해결 (Proxy)](https://velog.io/@leehyunho2001/Next.js-Cors-에러-해결-Proxy)

3. **Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.**

   - 원인
     - 모든 함수형 컴포넌트는 async로 실행될 수 없기 때문이었다!
   - 해결 방안

     - async 삭제 후 useEffect 사용

       ```jsx
       const Detail = () => {
         const useFetchData = async () => {
           return await useGetWayBack("https://www.google.com");
         };
         const data = useFetchData();
         useEffect(() => {
           if (data) {
             console.log(data);
           }
         }, []);

       ... 생략
       ```

   - 참고
     [Objects are not valid as a React child (found: [object Promise]) 에러 원인 및 해결](https://velog.io/@lire_eruel/Objects-are-not-valid-as-a-React-child-found-object-Promise-에러-원인-및-해결)

---
