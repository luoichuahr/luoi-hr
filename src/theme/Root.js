import React from 'react';
import BuyMeCoffee from '@site/src/components/BuyMeCoffee';
import FloatingContact from '@site/src/components/FloatingContact';

export default function Root({ children }) {
  return (
    <>
      {children}
      <BuyMeCoffee />
      <FloatingContact />
    </>
  );
}
