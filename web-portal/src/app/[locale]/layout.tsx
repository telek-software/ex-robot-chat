import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, useLocale as getLocale } from "next-intl";

import Contexts from "~contexts";
import {
  GlobalStyle,
  StyledProvider,
  StyledRegistry,
} from "~lib/styled-components";
import * as AuthModule from "~modules/AuthModule";
import * as LayoutModule from "~modules/LayoutModule";
import * as SettingsModule from "~modules/SettingsModule";

import { AppFonts } from "./fonts";

import "normalize.css";
import "./layout.css";

type RootProps = {
  children: ReactNode;
  params: { locale: string };
};

export const metadata = {
  title: "ChappyGo",
  description: "My personal ChatBot",
};

/**
 * RootLayout
 * @description
 * Main layout
 */
async function RootLayout(props: RootProps) {
  const { children, params } = props;
  const locale = getLocale();
  let messages;
  try {
    messages = (await import(`~lib/i18n/dictionaries/${locale}.json`)).default;
  } catch (error) {
    messages = (await import(`~lib/i18n/dictionaries/en.json`)).default;
  }
  if (params.locale !== locale) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body className={AppFonts}>
        <StyledRegistry>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Contexts>
              <StyledProvider>
                <GlobalStyle />

                <LayoutModule.Header>
                  <SettingsModule.LanguageSwitcher />
                  <AuthModule.Login />
                  <AuthModule.Registration />
                </LayoutModule.Header>

                <LayoutModule.Main>{children}</LayoutModule.Main>

                <LayoutModule.Footer />
              </StyledProvider>
            </Contexts>
          </NextIntlClientProvider>
        </StyledRegistry>
      </body>
    </html>
  );
}
export default RootLayout;
