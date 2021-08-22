import React, { useState, useCallback } from 'react';
import { Button, Layout, Icon, Input, Avatar } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import Container from './Container';
import styled from 'styled-components';

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(Icon)`
  color: #fff;
  font-size: 32px;
`;

const InputSearch = styled(Input.Search)`
  width: 180px;
  margin-left: 15px;
`;

const HeaderRight = styled.div`
  
`;

const FooterTip = styled.h1`
  text-align: center;
  font-size: 16px;
  font-weight: 300;
  a {
    margin-left: 5px;
  }
`;


const { Header, Content, Footer } = Layout;

export default ({ children }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = useCallback((event) => {
    setSearch(event.target.value)
  }, []);

  const handleSearch = useCallback((value) => {
    console.log(value);
  }, []);

  return (
    <Layout>
      <Header>
        <Container renderer={<HeaderInner />}>
          <HeaderLeft>
            <Logo type="github" />
            <InputSearch
              value={search}
              onChange={handleSearchChange}
              onSearch={handleSearch}
              placeholder="搜索仓库"
            />
          </HeaderLeft>
          <HeaderRight>
            <Avatar size={32} icon="user" />
          </HeaderRight>
        </Container>
      </Header>
      <Content>
        <Container>{children}</Container>
      </Content>
      <Footer>
        <FooterTip>
          Develop by
          <a href="mailto:841933550@qq.com">@Jwwang</a>
        </FooterTip>
      </Footer>
      <style jsx global>
        {`
          #__next {
            height: 100%;
          }
          .ant-layout {
            height: 100%;
          }
          .ant-layout-header {
            padding-left: 0;
            padding-right: 0;
          }
          .ant-layout-content {
            background: #fff;
          }
        `}
      </style>
    </Layout>
  );
}
