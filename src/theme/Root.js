import React from 'react';
import BuyMeCoffee from '@site/src/components/BuyMeCoffee';
import FloatingContact from '@site/src/components/FloatingContact';
import GoogleTranslate from '@site/src/components/GoogleTranslate';

export default function Root({ children }) {
  return (
    <>
      {children}
      <BuyMeCoffee />
      <FloatingContact />
      <GoogleTranslate />
    </>
  );
}
