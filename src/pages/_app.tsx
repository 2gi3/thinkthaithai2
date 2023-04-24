import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import Layout from "@/components/Layout";
import { appWithTranslation } from "next-i18next";
// import i18n from "../../next-i18next.config";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

export default appWithTranslation(App);
