import React, { useEffect, useState } from 'react'
import "../DataTable/DataTable.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component'
import SideBar from '../../components/sidebar/SideBar.jsx'
import Modal from '../../components/Modal/Modal.jsx'
import ResgiterModal from '../../components/ModalCadastro/RegisterModal.jsx'

const DataTablePage = () => {

  //Alterar Cores dos inputs de aprovado ou negado
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleSelectChange = (id, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [id]: value
    });
  };
  //Alterar Cores dos inputs de aprovado ou negado
  const getSelectClass = (id) => {
    const selectedOption = selectedOptions[id];
    if (selectedOption === 'aprovado') {
      return 'bg-success text-white';
    } else if (selectedOption === 'negado') {
      return 'bg-danger text-white';
    } else if (selectedOption === 'select') {
      return 'bg-white';
    }
    else {
      return '';
    }
  };

  const columns = [
    {
      name: 'Id',
      selector: row => row.id,
      sortable: true
    },
    {
      name: 'Nome',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'CPF',
      selector: row => row.cpf,
    },
    {
      name: "Status",
      cell: row => <select name="status"
        className={`form-select ${getSelectClass(row.id)}`}
        value={selectedOptions[row.id] || ''}
        onChange={(e) => handleSelectChange(row.id, e.target.value)}>
        <option value="select">Selecione...</option>
        <option value="aprovado" >Aprovado</option>
        <option value="negado">Negado</option>
      </select>
    },
    {
      name: "Editar",
      cell: row => <Modal />
    }

  ]

  const initialData = [
    {
      id: 1,
      name: "Helysson Cavalcante",
      cpf: "00000000001"
    },
    {
      id: 2,
      name: "Mabyle Jeandressa",
      cpf: "00000000002"
    },
    {
      id: 3,
      name: "João Victor Almeida",
      cpf: "00000000003"
    },
    // Restante dos dados...
  ];

  const [records, setRecords] = useState(initialData);

  const handleAddUser = (newUser) => {
    setRecords([...records, newUser]);
  };

  //função de filtro
  function handleFilterName(e) {
    const searchTerm = e.target.value.toLowerCase();
    const newData = initialData.filter(row => {
      return (
        row.name.toLowerCase().includes(searchTerm) ||
        row.cpf.includes(searchTerm)
      );
    });
    setRecords(newData);
  }

  return (
    <div className="d-flex">
      <div className="col-auto">
        <SideBar />
      </div>
      <div className='ContainerDataTable'>
        <h1 className='text-center'>Lista de Pessoas</h1>
        <DataTable
          columns={columns}
          data={records}
          selectableRowsHighlight
          highlightOnHover
          fixedHeader
          pagination
          subHeader
          actions={<ResgiterModal onAddUser={handleAddUser} records={records} />}
          subHeaderComponent={<input type='text' placeholder='Pesquise por nome ou CPF' className='w-25 form-control' onChange={handleFilterName} />}
        />
      </div>
    </div>
  )
}

export default DataTablePage;