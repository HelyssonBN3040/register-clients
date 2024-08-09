import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ButtonDelete({ itemId, onDelete }) {  // Adicionando onDelete como prop
  const [show, setShow] = useState(false);
  const [erro, setErro] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    if (itemId && itemId.length === 24) {
      try {
        await axios.delete(`https://backend-julho-2024.onrender.com/item/${itemId}`);
        onDelete(itemId);  // Chamando a função de exclusão passada como prop
        handleClose();
      } catch (error) {
        console.error('Erro ao deletar item:', error);
        setErro('Erro ao deletar item.');
      }
    } else {
      console.error('ID inválido:', itemId);
      setErro('ID inválido.');
    }
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
          <Modal.Title>Deletar item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {erro && <p className="text-danger">{erro}</p>}
          <p>Tem certeza de que deseja deletar este item?</p>
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