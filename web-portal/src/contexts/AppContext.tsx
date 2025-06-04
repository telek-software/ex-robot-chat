"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { DefaultProps } from "~utils/type.utils";

type AppData = {
  breadcrumb: { label: string; url: string }[];
};

type AppContextType = {
  breadcrumb?: AppData["breadcrumb"];
  setBreadcrumb: (value: AppData["breadcrumb"]) => void;
};

const AppContext = createContext<AppContextType | null>(null);

/**
 * AppProvider
 * @context
 * @description
 * This context will provide common features for the components
 */
function AppProvider(props: DefaultProps) {
  const { children } = props;
  const t = useTranslations();
  const initialInfos = {
    breadcrumb: [{ label: t("HOME"), url: "/" }],
  };
  const [infos, setInfo] = useState<AppData>(initialInfos);

  const setBreadcrumb = (arr: AppData["breadcrumb"]) =>
    setInfo((state) => {
      return {
        ...state,
        breadcrumb: [...initialInfos.breadcrumb, ...arr],
      };
    });

  const { breadcrumb } = infos || {};
  const value = useMemo(
    () => ({
      breadcrumb: breadcrumb || [],
      setBreadcrumb,
    }),
    [breadcrumb] // eslint-disable-line
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;

/** @hook */
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be called inside AppProvider");
  return context;
};
