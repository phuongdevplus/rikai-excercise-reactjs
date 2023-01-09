import Content from '../../components/Content';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout from '../index';
function DefaultLayout
  (props) {
  return (
    <>
      <Header></Header>
      <Layout title={props?.title?props.title:'Rikai-News'}>
        {
          props?.children
        }
      </Layout>
      <Footer></Footer>
    </>

  );
}

export default DefaultLayout
  ;