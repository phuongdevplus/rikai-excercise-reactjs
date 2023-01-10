import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ModalAddPost from '../../../components/ModalAddPost';
import ModalUpdatePost from '../../../components/ModalUpdatePost';
import { AppContext } from '../../../context/AppContext';

import {
  Main,
  ContainerDefault,
  BoxNav,
  Span,
  FormData,
  Thead,
  Tbody,
  Tr,
  Th, BoxHeader, Button, TrHead, TableScroll, ThContent, ThContentCss

} from './style'


function TableAdmin() {
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const { allUser } = useContext(AppContext)
  const [dataPost, setDataPost] = useState()
  const [data, setData] = useState()
  const [callApiTable, setCallApiTable] = useState(false)
  const [showModalAdd, setShowModalAdd] = useState(false)

  const handleUpdate = ((e) => {
    setShowModalUpdate(true)
    setDataPost(e)
  })

  async function getData() {
    const url = process.env.REACT_APP_URL_WEBSITE + '/articles'
    await axios.get(url)
      .then(res => {
        let dataPost = res?.data?.data
        dataPost.sort(function () {
          return -1;
        })
        setData(dataPost)
      }
      )
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getData()
  }, [callApiTable])
  function userPost(idUserPost, user) {
    if (idUserPost === user?._id) {
      return user?.Name
    }
  }
  return (
    <Main id="site-main">
      <ModalUpdatePost handle={{ showModalUpdate, setShowModalUpdate, dataPost, callApiTable, setCallApiTable }}></ModalUpdatePost>
      <ModalAddPost handle={{ showModalAdd, setShowModalAdd, callApiTable, setCallApiTable }}></ModalAddPost>
      <ContainerDefault >
        <BoxHeader>
          <BoxNav className="box-nav d-flex justify-between">
            <Span>{data?.length} bài post</Span>
            <Button onClick={() => setShowModalAdd(true)}>
              + Thêm bài viết
            </Button>
          </BoxNav>
        </BoxHeader>
        <FormData action="/" method="POST">
          <TableScroll>
            <Table striped bordered hover style={{ marginBottom: '0' }}>
              <Thead className="thead-dark">
                <TrHead>
                  <Th style={{ color: '#fff' }}>
                    <ThContent>STT</ThContent>
                  </Th>
                  <Th style={{ color: '#fff' }}>
                    <ThContent>Tiêu đề</ThContent>
                  </Th>
                  <Th style={{ color: '#fff' }}>
                    <ThContent>Nội dung</ThContent>
                  </Th>
                  <Th style={{ color: '#fff' }}>
                    <ThContent>Ảnh</ThContent>
                  </Th>
                  <Th style={{ color: '#fff' }}>
                    <ThContent>Tác giả</ThContent>
                  </Th>
                  <Th style={{ color: '#fff' }}>
                    <ThContent>Tùy chọn</ThContent>
                  </Th>
                </TrHead>
              </Thead>
              <Tbody >
                {
                  data?.map((e, index) => (
                    <Tr key={index}>
                      <Th>
                        {
                          index + 1
                        }
                      </Th>
                      <Th >
                        <ThContentCss>
                          {
                            e?.Title
                          }
                        </ThContentCss>
                      </Th>
                      <Th>
                        <ThContentCss >
                          {
                            e?.Content
                          }
                        </ThContentCss>
                      </Th>
                      <Th>
                        {
                          e?.Images ?
                            <img style={{ padding: '5px', width: '100px' }} alt='images' src={e?.Images}></img> : ''
                        }
                      </Th >
                      <Th>
                        <ThContentCss >
                        {
                            allUser?.map((user) => (
                              userPost(e?.UserId, user)
                            ))
                          }
                        </ThContentCss>
                      </Th>
                      <Th >
                        <ThContentCss>
                          <Button onClick={() => handleUpdate(e)} type='button'>
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Button>
                        </ThContentCss>
                      </Th>
                    </Tr>
                  ))
                }

              </Tbody>
            </Table>
          </TableScroll>
        </FormData>
      </ContainerDefault>
    </Main >
  );
}

export default TableAdmin;