import styled from "styled-components";

export const Main = styled.main`
  margin-top: 50px;
  font-family: 'Barlow', sans-serif;
  padding: 0 10px;
`
export const ContainerDefault = styled.div`
  margin: auto;
`
export const ContainerRestore = styled.div`
  margin: auto;
`

export const BoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  `
export const BoxNav = styled.div`
  justify-content: space-between;
  display: flex;
    flex-wrap: wrap;
`
export const Button = styled.button`
  background-color: #57B0E3;
  border-radius: 5px;
  border: none;
  padding: 5px 10px;
  color: #fff;
  margin-left: 10px;
  &:hover{
    opacity: .8;
  }
`


export const AddRequest = styled.div`
border: 1px solid var(--border-btn);
box-shadow: 1px 3px 10px #e9ecef;
font-size: 1em;
padding: .5em 1em;
`
export const Span = styled.span`
font-weight: 600;
display: flex;
align-items: center;
`
export const FormSearch = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    position: relative;
    background-color: #fff;
    border-radius: 5px;
    padding-left: 5px;
    border: 2px solid #8000FF;
    height: 40px;
    .react-datepicker-wrapper{
      #SearchDate{
        border: none;
        padding-left:8px;
        outline: none;
        width: 125px;
      }
    }
    .react-datepicker-popper{
      z-index: 10000;
    }
  
    
`
export const SearchHeaderText = styled.h3`
  font-size: 16px;
  display: inline-block;
  align-items: center;
  position: absolute;
  left: -40%;
`
export const InputSearch = styled.input`
border: none;
outline: none;
`

export const FormData = styled.form`
margin: 2em 0;
`
export const Table = styled.table`
border-spacing: 0px;
width: 100%;

`
export const TableScroll = styled.div`
 overflow: auto;
 height: 60vh;
`
export const Thead = styled.thead`
  position: sticky;
  top: -2px;
  background-color: #57B0E3;
  z-index: 1;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.4);

`
export const Tbody = styled.tbody`

`

export const Tr = styled.tr`
border: 5px solid #ccc;
border-width: 1px;
&:hover{
  background-color:#ACD3F0 ;
}
}
`
export const TrHead = styled.tr`
th{
  font-weight: bold;
}
`
export const ThContent = styled.div`
display: flex;
max-height: 100px;
align-Items: center;
justify-content: center;
`
export const Th = styled.th`
  border-width: 1px;
text-align: center;
font-weight: 400;
margin: 0;
`
export const SelectRequest = styled.input`
padding: .75em;
vertical-align: top;
text-align: center;
border-top: 1px solid var(--border);
`
export const ThContentCss = styled.div`
  height: 100%;
  max-height: 100px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
`
