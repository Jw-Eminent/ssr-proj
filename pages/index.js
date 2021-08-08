import { connect } from 'react-redux';

const Index = (props) => {
  return (
    <>
     <span>Index page {props.count}</span>
    </>
  )
}

const mapState = (state) => ({
  count: state.count
});

export default connect(mapState)(Index);