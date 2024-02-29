import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../DataTable/DataTable.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component'
import SideBar from '../../components/sidebar/SideBar.jsx'
import Modal from '../../components/Modal/Modal.jsx'
import ResgiterModal from '../../components/ModalCadastro/RegisterModal.jsx'

const DataTablePage = () => {

  const [filteredRecords, setFilteredRecords] = useState([]);

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

  const data = [
    {
      id: 1,
      name: "Helysson Cavalcante",
      cpf: "05265540296"
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
    {
      id: 4,
      name: "Jose Silva Souza",
      cpf: "00000000004"
    },
    {
      id: 5,
      name: "Ana Carolina",
      cpf: "00000000005"
    },
    {
      id: 6,
      name: "Fernando Oliveira",
      cpf: "00000000006"
    },
    {
      id: 7,
      name: "Mariana Santos",
      cpf: "00000000007"
    },
    {
      id: 8,
      name: "Lucas Pereira",
      cpf: "00000000008"
    },
    {
      id: 9,
      name: "Amanda Silva",
      cpf: "00000000009"
    },
    {
      id: 10,
      name: "Rafael Souza",
      cpf: "00000000010"
    },
    {
      id: 11,
      name: "Juliana Oliveira",
      cpf: "00000000011"
    },
    {
      id: 12,
      name: "Carlos Eduardo",
      cpf: "00000000012"
    },
    {
      id: 13,
      name: "Patrícia Santos",
      cpf: "00000000013"
    },
    {
      id: 14,
      name: "Bruno Ferreira",
      cpf: "00000000014"
    },
    {
      id: 15,
      name: "Camila Lima",
      cpf: "00000000015"
    },
    {
      id: 16,
      name: "Marcelo Oliveira",
      cpf: "00000000016"
    },
    {
      id: 17,
      name: "Isabela Alves",
      cpf: "00000000017"
    },
    {
      id: 18,
      name: "Ricardo Mendes",
      cpf: "00000000018"
    },
    {
      id: 19,
      name: "Fernanda Rodrigues",
      cpf: "00000000019"
    },
    {
      id: 20,
      name: "Diego Martins",
      cpf: "00000000020"
    }
  ];


  //função de filtro
  const [records, setRecords] = useState([]);
  //ferramenta de filtro
  function handleFilter(e) {
    const value = e.target.value.toLowerCase();
    const newData = records.filter(row => 
      row.name.toLowerCase().includes(value) || 
      row.cpf.toLowerCase().includes(value)
    );
    setFilteredRecords(newData);
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
          data={data}
          selectableRowsHighlight
          highlightOnHover
          fixedHeader
          pagination
          subHeader
          actions={<ResgiterModal />}
          subHeaderComponent={<input type='text' placeholder='Pesquise por nome ou CPF' className='w-25 form-control' onChange={handleFilter} />}
        />
      </div>
    </div>
  )
}

export default DataTablePage