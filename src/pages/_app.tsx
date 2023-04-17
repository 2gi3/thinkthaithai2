import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import Layout from "@/components/Layout";
import { appWithTranslation } from "next-i18next";
// import i18n from "../../next-i18next.config";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default appWithTranslation(App);
