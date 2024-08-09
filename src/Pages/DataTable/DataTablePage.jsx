import React, { useEffect, useState } from 'react';
import "../DataTable/DataTable.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import SideBar from '../../components/sidebar/SideBar.jsx';
import RegisterModal from '../../components/ModalCadastro/RegisterModal.jsx';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';
import ButtonDelete from '../../components/ButtonDelete/index.jsx';
import ModalEdit from '../../components/Modal/Modal.jsx';

const DataTablePage = () => {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({}); // Adicionando estado para armazenar opções selecionadas

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://backend-julho-2024.onrender.com/item');
      setData(response.data);
      setRecords(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro na requisição: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backend-julho-2024.onrender.com/item/${id}`);
      fetchData(); // Atualizar dados após a exclusão
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  };

  const handleUpdate = async (id, updatedItem) => {
    try {
      await axios.put(`https://backend-julho-2024.onrender.com/item/${id}`, updatedItem);
      fetchData(); // Atualizar dados após a atualização
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
    }
  };

  const handleAddUser = (newUser) => {
    setRecords([...records, newUser]);
  };

  const handleFilterName = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const newData = data.filter(row => row.nome.toLowerCase().includes(searchTerm) || row.cpf.includes(searchTerm));
    setRecords(newData);
  };

  const handleSelectChange = (id, status) => {
    setSelectedOptions(prev => ({ ...prev, [id]: status }));
    const updatedItem = { status }; // Ajuste conforme a estrutura esperada pelo backend
    handleUpdate(id, updatedItem);
  };

  const getSelectClass = (id) => {
    return selectedOptions[id] === 'aprovado' ? 'bg-success' : selectedOptions[id] === 'negado' ? 'bg-danger' : '';
  };

  const columns = [
    {
      name: 'Nome',
      selector: row => row.nome,
      sortable: true
    },
    {
      name: 'CPF',
      selector: row => row.cpf,
    },
    {
      name: "Status",
      cell: row => (
        <select
          name="status"
          className={`form-select ${getSelectClass(row._id)}`}
          value={selectedOptions[row._id] || 'select'}
          onChange={(e) => handleSelectChange(row._id, e.target.value)}
        >
          <option value="select">Selecione...</option>
          <option value="aprovado">Aprovado</option>
          <option value="negado">Negado</option>
        </select>
      ),
    },
    {
      name: "Editar",
      cell: row => (
        <ModalEdit
          itemId={row._id}
          itemNome={row.nome}
          itemCpf={row.cpf}
          onUpdate={handleUpdate}
        />
      ),
    },
    {
      name: "Delete",
      cell: row => (
        <ButtonDelete
          itemId={row._id}
          onDelete={handleDelete}
        />
      ),
    }
  ];

  return (
    <div className="d-flex">
      <div className="col-auto">
        <SideBar />
      </div>
      <div className='ContainerDataTable'>
        <h1 className='text-center'>Lista de Pessoas</h1>
        {loading ? (
          <div className='loading-spin'>
            <TailSpin height="40" width="40" color="#0D6EFD" ariaLabel="loading" />
            <p>Carregando...</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={records}
            selectableRowsHighlight
            highlightOnHover
            fixedHeader
            pagination
            subHeader
            actions={<RegisterModal onAddUser={handleAddUser} records={records} />}
            subHeaderComponent={<input type='text' placeholder='Pesquise por nome ou CPF' className='w-25 form-control' onChange={handleFilterName} />}
          />
        )}
      </div>
    </div>
  );
};

export default DataTablePage;