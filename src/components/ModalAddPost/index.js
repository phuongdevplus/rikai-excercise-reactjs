import Modal from 'react-bootstrap/Modal';
import Axios from 'axios'
import React, { useState, useRef, useContext } from 'react';
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
} from './style.js'
import { AppContext } from '../../context/AppContext.js';


function ModalAddPost(props) {
  const { callApiContent, setCallApiContent, user } = useContext(AppContext)
  const { showModalAdd, setShowModalAdd, callApiTable, setCallApiTable } = props.handle
  const [selectedImage, setSelectedImage] = useState();
  const form = document.getElementById('form');
  const refImg = useRef(null);
  const removeSelectedImage = (button, id) => {
    const img = []
    selectedImage?.forEach((e, index) => {
      if (id !== index) {
        img.push(e)
      }
    })
    setSelectedImage(img)
  };
  function handleCancel() {
    setShowModalAdd(false)
    setSelectedImage('')
  }
  function addImgHandle() {
    refImg.current.click()
  }
  const [data, setData] = useState()
  const fileImg = [];
  function handleOnChange(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    if (e.target.id === 'Images') {
      Object.values(e.target.files).forEach((e) => {
        fileImg.push({ preview: URL.createObjectURL(e), data: e })
      })
      setSelectedImage(fileImg)
    }
  }
  async function postData() {
    const url = process.env.REACT_APP_URL_WEBSITE + '/articles/'+ user?.id
    const formData = new FormData(form)
    await Axios.post(url, formData)
      .then(res =>  setShowModalAdd(false))
      .catch(err => console.log(err))
  }
  async function submit(e) {
    e.preventDefault();
    let timerInterval
    Swal.fire({
      title: "Thêm dữ liệu?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Đang thêm...!',
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
            setCallApiContent(!callApiContent)
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
      show={showModalAdd}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Bài viết mới
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        < FormDataInput id='form' method="POST" onSubmit={(e) =>
          submit(e)
        }>
          <InPutContainer className="mb-6">
            <LableInput f className="form-label">Tiêu đề</LableInput>
            <Input ref={refImg} type='text' className="form-control" id='Title' name="Title" onChange={(e) => handleOnChange(e)} accept="image/*" />
          </InPutContainer>
          <InPutContainer className="mb-6">
            <LableInput f className="form-label">Nội dung</LableInput>
            <Textarea ref={refImg} type='text' className="form-control" id='Content' name="Content" onChange={(e) => handleOnChange(e)} accept="image/*" />
          </InPutContainer>
          <InPutContainer className="mb-6">
            <LableInput f className="form-label">Chọn ảnh</LableInput>
            <Input ref={refImg} type='file' hidden={true} className="form-control" id='Images' name="Images" onChange={(e) => handleOnChange(e)} accept="image/*" />
            <ImgPreview className='img__preview'>
              <ImgContentButton type='button' onClick={() => addImgHandle()}>
                + Thêm Ảnh
              </ImgContentButton>
              {selectedImage ? selectedImage.map((e, index) => (
                <ImgContent key={index} className='img__preview-content'>
                  <ImgPreviewItem
                    className='img__preview-image'
                    src={e.preview}
                    alt='Image Preview'
                  />
                  <BtnImgRemove onClick={() => removeSelectedImage(e, index)} className='btn__remove-img'>
                    <i class="fa-solid fa-xmark"></i>
                  </BtnImgRemove>
                </ImgContent>
              )) : ''
              }
            </ImgPreview>
          </InPutContainer>
          <ModalBtn className='modal__btn'>
            <BtnAdd type="submit" >Thêm bài viết</BtnAdd>
            <BtnCancel onClick={() => handleCancel()}>Hủy</BtnCancel>
          </ModalBtn>
        </ FormDataInput>
      </Modal.Body>
    </Modal>
  );
}

export default ModalAddPost

