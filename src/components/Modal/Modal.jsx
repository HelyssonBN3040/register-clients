import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ModalEdit({ itemId, itemNome, itemCpf, onUpdate }) {  // Adicionando onUpdate como prop
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState(itemNome || '');
  const [cpf, setCpf] = useState(itemCpf || '');
  const [erro, setErro] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAtualizar = async (event) => {
    event.preventDefault();

    if (!itemId) {
      setErro('ID do item não fornecido.');
      return;
    }

    const updatedData = { nome, cpf };

    try {
      await axios.put(`https://backend-julho-2024.onrender.com/item/${itemId}`, updatedData);
      onUpdate(itemId, updatedData);  // Chamando a função de atualização passada como prop
      handleClose();
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      setErro('Erro ao atualizar dados.');
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Atualizar dados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {erro && <p className="text-danger">{erro}</p>}
          <Form onSubmit={handleAtualizar}>
            <Form.Group className="mb-3">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o Nome Completo*"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o Novo CPF*"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
              <Button variant="primary" type="submit">
                Atualizar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalEdit;