import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ButtonDelete({ itemId }) {
  const [show, setShow] = useState(false);
  const [erro, setErro] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    axios.delete(`https://backend-julho-2024.onrender.com/item/${itemId}`)
      .then(res => {
        console.log('Item deletado com sucesso:', res.data);
        handleClose();
        // Opcional: Chamar uma função para atualizar a lista de itens na página
      })
      .catch(error => {
        console.error('Erro ao deletar o item:', error);
        setErro('Erro ao deletar o item.');
      });
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Deletar
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Deleção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {erro && <p className="text-danger">{erro}</p>}
          <p>Tem certeza que deseja deletar este item?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ButtonDelete;