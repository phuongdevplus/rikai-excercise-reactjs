import Modal from 'react-bootstrap/Modal';
import Axios from 'axios'
import React, { useState, useRef, useEffect, useContext } from 'react';
import Swal from "sweetalert2";
import {
  BtnImgRemove,
  ImgContentButton,
  ImgContent,
  ImgPreview,
  ImgPreviewItem,
  BtnAdd,
  BtnCancel,
  ModalBtn,
  Input,
  LableInput,
  InPutContainer,
  FormDataInput,
  Textarea
} from '../ModalAddPost/style.js'
import { AppContext } from '../../context/AppContext.js';


function ModalUpdatePost(props) {
  const { callApiContent, setCallApiContent } = useContext(AppContext)
  const { showModalUpdate, setShowModalUpdate, dataPost, callApiTable, setCallApiTable } = props.handle
  const [selectedImage, setSelectedImage] = useState();
  const form = document.getElementById('form');
  const refImg = useRef(null);
  
  const removeSelectedImage = (button, id) => {
    setSelectedImage('')
  };
  useEffect(() => {
    setSelectedImage(dataPost?.Images)
  }, [dataPost])
  function handleCancel() {
    setShowModalUpdate(false)
    setSelectedImage('')
  }
  function addImgHandle() {
    refImg.current.click()
  }
  const [data, setData] = useState()
  function handleOnChange(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    if (e.target.id === 'Images') {
      setSelectedImage(URL.createObjectURL(e.target.files[0]))
    }
  }
  async function postData() {
    const url = process.env.REACT_APP_URL_WEBSITE + '/update/' + dataPost?._id
    const formData = new FormData(form)
    await Axios.patch(url, formData)
      .then(res => {
        setShowModalUpdate(false)
      }
      )
  }
  function handleDelete(e) {
    const url = process.env.REACT_APP_URL_WEBSITE + '/articles/' + dataPost?._id
    Swal.fire({
      title: "Xóa bài viết?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(url)
          .then(res => {
            setShowModalUpdate(false)
            Swal.fire("Thành công!", "", "success");
            setCallApiTable(!callApiTable)
          })
      } else {
        Swal.fire(" Hủy!", "", "error");
      }

    })
  }
  async function submit(e) {
    e.preventDefault();
    let timerInterval
    Swal.fire({
      title: "Sửa dữ liệu bài viết?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Đang sửa...!',
          timer: 20000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {

          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
        postData()
          .then(() => {
            Swal.fire("Thành công!", "", "success");
            setCallApiTable(!callApiTable)
          })
      } else {
        Swal.fire(" Hủy!", "", "error");
      }
      setSelectedImage('')
    });
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModalUpdate}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Tùy chọn
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        < FormDataInput id='form' method="POST" onSubmit={(e) =>
          submit(e)
        }>
          <InPutContainer className="mb-6">
            <LableInput f className="form-label">Tiêu đề</LableInput>
            <Input defaultValue={dataPost?.Title} ref={refImg} type='text' className="form-control" id='Title' name="Title" onChange={(e) => handleOnChange(e)} accept="image/*" />
          </InPutContainer>
          <InPutContainer className="mb-6">
            <LableInput f className="form-label">Nội dung</LableInput>
            <Textarea defaultValue={dataPost?.Content} ref={refImg} type='text' className="form-control" id='Content' name="Content" onChange={(e) => handleOnChange(e)} accept="image/*" />
          </InPutContainer>
          <InPutContainer className="mb-6">
            <LableInput f className="form-label">Chọn ảnh</LableInput>
            <Input ref={refImg} type='file' hidden={true} className="form-control" id='Images' name="Images" onChange={(e) => handleOnChange(e)} accept="image/*" />
            <ImgPreview className='img__preview'>
              <ImgContentButton type='button' onClick={() => addImgHandle()}>
                + Thêm Ảnh
              </ImgContentButton>
              {selectedImage ?
                <ImgContent className='img__preview-content'>
                  <ImgPreviewItem
                    className='img__preview-image'
                    src={selectedImage}
                    alt='Image Preview'
                  />
                  <BtnImgRemove onClick={() => removeSelectedImage()} className='btn__remove-img'>
                    <i className="fa-solid fa-xmark"></i>
                  </BtnImgRemove>
                </ImgContent>
                : ''
              }
            </ImgPreview>
          </InPutContainer>
          <ModalBtn className='modal__btn'>
            <div>
              <BtnAdd type="submit" >Sửa bài viết</BtnAdd>
              <BtnAdd onClick={() => handleDelete()} style={{ marginLeft: '10px', backgroundColor: '#dc3545' }} type="button" >Xóa bài viết</BtnAdd>
            </div>
            <BtnCancel onClick={() => handleCancel()}>Hủy</BtnCancel>
          </ModalBtn>
        </ FormDataInput>
      </Modal.Body>
    </Modal>
  );
}

export default ModalUpdatePost

