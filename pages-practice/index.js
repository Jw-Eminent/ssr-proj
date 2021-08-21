import { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig }= getConfig();
const Index = (props) => {
  useEffect(() => {
    axios.get('/api/user/info').then(res => {
      console.log(res);
    })
  }, []);

  return (
    <>
     <span>Index page {props.count}</span>
     <a href={publicRuntimeConfig.OAUTH_URL}>去登录</a>
    </>
  )
}

const mapState = (state) => ({
  count: state.count
});

export default connect(mapState)(Index);