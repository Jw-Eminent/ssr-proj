import { withRouter } from 'next/router';
import styled from 'styled-components';

const Title = styled.h1`
  color: red
`;

const Page_2 = ({ router, name }) => (
  <>
    <Title>page 2</Title>
    <span>{`This is page 2, query=${router.query.id}, name=${name}`}</span>
    <style jsx>
      {`
        span {
          color: blue
        }
      `}
    </style>
  </>
);

Page_2.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'jwwang'
      });
    }, 1000);
  });

  const res = await promise;
  return res;
}

export default withRouter(Page_2);