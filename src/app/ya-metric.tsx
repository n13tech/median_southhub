"use client";

import { YMInitializer } from "react-yandex-metrika";

const YM_COUNTER_ID = 89187152;

export const YandexMetrika = () => {
  return (
    <YMInitializer
      accounts={[YM_COUNTER_ID]}
      options={{
        defer: true,
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        ecommerce:"dataLayer"
      }}
      version="2"
    />
  );
};
