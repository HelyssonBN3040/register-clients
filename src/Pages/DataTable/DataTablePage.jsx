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

  useEffect(() => {
    const fetchData = async () => {
      axios.get("http://localhost:3030/users")
        .then(res => {
          setRecords(res.data);
          setFilteredRecords(res.data); // Garanta que os dados filtrados também sejam definidos
        })
        .catch(err => console.log(err));
    };
    fetchData();
  }, []);


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
          data={filteredRecords}
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