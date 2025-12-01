import { KeyPrefix } from "i18next";
import { useCallback } from "react";
import { useTranslation, UseTranslationOptions } from "react-i18next";

// ----------------------------------------------------------------------

export function useTranslate(
  options?: UseTranslationOptions<KeyPrefix<string>>,
  ns?: string
) {
  const { t, i18n, ready } = useTranslation(ns, options);

  const onChangeLang = useCallback(
    (newlang: string) => {
      i18n.changeLanguage(newlang);
    },
    [i18n]
  );

  const getCustomT = useCallback(
    (prefix: string) => (key: string, options?: Record<string, any>) =>
      t(`${prefix}.${key}`, options),
    [t]
  );

  return {
    t,
    i18n,
    ready,
    onChangeLang,
    getCustomT,
  };
}
