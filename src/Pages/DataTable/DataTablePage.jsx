import React, { useEffect, useState } from 'react'
import "../DataTable/DataTable.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component'
import SideBar from '../../components/sidebar/SideBar.jsx'
import Modal from '../../components/Modal/Modal.jsx'
import ResgiterModal from '../../components/ModalCadastro/RegisterModal.jsx'
import axios from 'axios'

const DataTablePage = () => {

  const [data, setData] = useState([])
  //Alterar Cores dos inputs de aprovado ou negado
  const [selectedOptions, setSelectedOptions] = useState({});
  const [records, setRecords] = useState([]);


  useEffect(() => {
    axios.get('https://backend-julho-2024.onrender.com/item')
      .then(res => {
        setData(res.data)
        setRecords(res.data)
      })
      .catch(error => console.error("Erro na requisição: ", error))
  }, [])


  const handleSelectChange = (_id, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [_id]: value
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
      return 'bg-white';
    }
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
      cell: row => <select name="status"
        className={`form-select ${getSelectClass(row._id)}`}
        value={selectedOptions[row._id] || ''}
        onChange={(e) => handleSelectChange(row._id, e.target.value)}>
        <option value="select">Selecione...</option>
        <option value="aprovado" >Aprovado</option>
        <option value="negado">Negado</option>
      </select>
    },
    {
      name: "Editar",
      cell: row => <Modal key={row._id}/>
    }

  ]

  const handleAddUser = (newUser) => {
    setRecords([...records, newUser]);
  };

  //função de filtro
  function handleFilterName(e) {
    const searchTerm = e.target.value.toLowerCase();
    const newData = data.filter(row => {
      return (
        row.nome.toLowerCase().includes(searchTerm) ||
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