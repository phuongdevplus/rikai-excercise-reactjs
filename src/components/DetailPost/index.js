import React from 'react';
import Modal from 'react-bootstrap/Modal';
function DetailPost(props) {
  const {showModalDetail, setShowModalDetail, dataDetail} = props.handle
  return (
      <Modal size="lg" show={showModalDetail}  onHide={() => setShowModalDetail(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{dataDetail?.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
            {
              dataDetail?.Images?
              <img style={{maxWidth: '400px'}} alt='images' src={dataDetail?.Images}></img>:''
            }
          </div>
          <div>
            <p>{dataDetail?.Content}</p>
          </div>
        </Modal.Body>
      </Modal>
  );
}

export default DetailPost;