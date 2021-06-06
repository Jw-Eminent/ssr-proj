import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'antd';

function Layout({ children }) {
  const goPage3 = () => {
    // Router.push('/test/page_3');
    Router.push({
      pathname: '/test/page_3',
      query: {
        id: 2
      }
    }, '/test/page_3/2');
  };

  return (
    <>
      <header>
        <Link href="/page_2?id=1" as="/page_2/1">
          <Button>To Page_2</Button>
        </Link>
        <Button onClick={goPage3}>To Page_3</Button>
      </header>
      { children }
    </>
  );
}

export default Layout;