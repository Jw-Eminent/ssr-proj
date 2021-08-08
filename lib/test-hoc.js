export default (Comp) => {
  function TestHocComp({ Component, pageProps, ...rest }) {
    console.log(Component, pageProps);
    
    if (pageProps) {
      pageProps.test = 'test';
    }

    return <Comp Component={Component} pageProps={pageProps} {...rest}  />
  }

  TestHocComp.getInitialProps = Comp.getInitialProps;
  return TestHocComp;
}