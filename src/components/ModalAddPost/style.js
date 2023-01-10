import styled from "styled-components"

const  FormDataInput = styled.form`


`
const InPutContainer = styled.div`


`
const LableInput = styled.label`
margin-top: 15px;
font-weight: bold;

`
const Input = styled.input`

`
const Textarea = styled.textarea`
min-height: 100px!important;
`
const ModalBtn = styled.div`
margin-top:30px;
display: flex;
justify-content: space-between;

`
const BtnAdd = styled.button`
position: relative;
border: none;
background-color: #0D6EFD;
color: #fff;
padding: 8px;
border-radius: 5px;
&:hover{
  opacity: .8;
}

`
const BtnCancel = styled.div`
position: relative;
border: none;
background-color: #6C757D;
color: #fff;
padding: 8px;
border-radius: 5px;
&:hover{
  opacity: .8;
  cursor: pointer;
}

`

const ImgPreview = styled.div`
width: 100%;
height: 100%;
min-height: 100px;
margin-top: 15px;
display: flex;
align-items: center;
font-weight: bold;
color: #cccccc;
position: relative;

`
const ImgContentButton = styled.button`
  background-color: #fff;
  width: 150px;
  height: 150px;
  border: 1px solid #cccccc;
  &:hover{
    cursor: pointer,
  }
  &:focus{
    transform: scaleZ(.2)
  }
`
const ImgContent = styled.div`
display:block;
position: relative;
left: 0px;
width: 150px;
height: 150px;
border: 1px solid #cccccc;
`
const ImgPreviewItem = styled.img`
width: 100%;
height: 100%;
  object-fit: contain;

`
const BtnImgRemove = styled.button`
  top: 2px;
  position: absolute;
  background-color: #dc3545;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

`
const IconRemove = styled.i`
  color: #fff;
`

export {
  IconRemove,
  BtnImgRemove,
  ImgContent,
  ImgPreview,
  ImgPreviewItem,
  ImgContentButton,
  BtnAdd,
  BtnCancel,
  ModalBtn,
  Input,
  LableInput,
  InPutContainer,
  FormDataInput,
  Textarea
}