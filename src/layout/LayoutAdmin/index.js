import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout from '../index';
function LayoutAdmin(props) {
  return (
    <>
      <Header></Header>
      <Layout title={props?.title?props.title:'Rikai-Admin'}>
        {
          props?.children
        }
      </Layout>
      <Footer></Footer>
    </>

  );
}

export default LayoutAdmin