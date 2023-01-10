import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ContainerText } from './style';
import { AppContext } from '../../context/AppContext';
import DetailPost from '../DetailPost';

function Content() {
  const { callApiContent, allUser} = useContext(AppContext)
  const [showModalDetail, setShowModalDetail] = useState(false)
  const [data, setData] = useState()
  const [dataDetail, setDataDetail] = useState()

  async function getData() {
    const url = process.env.REACT_APP_URL_WEBSITE + '/articles'
    await Axios.get(url)
      .then(res => {
        let dataPost = res?.data?.data
        dataPost.sort(function () {
          return -1;
        })
        setData(dataPost)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getData()
  }, [callApiContent])

  function handleShowDetail(e) {
    setDataDetail(e)
    setShowModalDetail(true)
  }
  function userPost(idUserPost,user){
   if(idUserPost ===user?._id ){
    return user?.Name
   }
  }
  return (
    <Row xs={1} md={4} className="g-4" >
      {
        showModalDetail?
        <DetailPost handle={{ showModalDetail, setShowModalDetail, dataDetail }}></DetailPost>:''
      }
      {data?.map((e, index) => (
        <Col onClick={() => handleShowDetail(e)} style={{ cursor: 'pointer' }} key={index}>
          <Card>
            {
              e?.Images ?
                <Card.Img variant="top" src={e?.Images} /> : ''
            }
            <Card.Body>
              <Card.Title>{e?.Title}</Card.Title>
              <Card.Text>
                <ContainerText>
                  {e?.Content}
                </ContainerText>
                <ContainerText style={{marginTop: '10px'}}>
                  <b>
                    Tác giả:</b> {
                      allUser?.map((user)=>(
                        userPost(e?.UserId, user)
                      ))
                    }
                </ContainerText>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Content;