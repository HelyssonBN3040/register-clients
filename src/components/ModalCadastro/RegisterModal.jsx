import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ResgiterModal() {
    const [show, setShow] = useState(false);
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [cpf, setCpf] = useState('');
    const [endereco, setEndereco] = useState(null);
    const [cep, setCep] = useState('');

    const [erro, setErro] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAtualizar = () => {
        // Aqui você pode fazer o que quiser com os dados preenchidos
        console.log('Nome Completo:', nomeCompleto);
        console.log('CPF:', cpf);
        console.log('Endereço:', endereco);
        console.log('CEP:', cep);

        // Fechar o modal após atualizar
        handleClose();
    };

    //Busca CEP
    const handleCepChange = (event) => {
        setCep(event.target.value);
    };

    const buscarEndereco = () => {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                setEndereco(response.data);
                setErro(null);
                // Preencher os campos restantes
                preencherCampos(response.data);
            })
            .catch(error => {
                setErro('CEP não encontrado.');
                setEndereco(null);
            });
    };

    const preencherCampos = (endereco) => {
        document.getElementById('logradouro').value = endereco.logradouro || '';
        document.getElementById('cidade').value = endereco.localidade || '';
    };

    const handleCepBlur = () => {
        if (cep.length === 8) {
            buscarEndereco();
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica para enviar o formulário, por exemplo:
        console.log('Formulário enviado');
    };
    //Fim Busca CEP

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <div>Adicionar Usuario</div>
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar dados</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Nome Completo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o Nome Completo*"
                                autoFocus
                                value={nomeCompleto}
                                onChange={(e) => setNomeCompleto(e.target.value)}
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
                        <Form.Group className="mb-3">
                            <Form.Label>CEP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o CEP*"
                                value={cep}
                                onChange={handleCepChange} onBlur={handleCepBlur}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o Endereço*"
                                required
                                id="logradouro"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite sua Cidade*"
                                required
                                id="cidade"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Numero</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Numero*"
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleAtualizar}>
                        Adicionar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ResgiterModal;