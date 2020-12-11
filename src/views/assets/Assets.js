import React, { useState } from 'react'
// import { useHistory, useLocation } from 'react-router-dom'
// import { CIcon } from '@coreui/icons-react'
import {
  CBadge,
  CCardBody,
  CDataTable,
  CButton,
  CRow, CCol, 
  CCollapse, CModal, CModalHeader,CModalBody, CModalFooter, CInputCheckbox,
} from '@coreui/react'

import { Route } from 'react-router-dom'
import assetsData from './AssetsData'
import Button from '../addButton/AddButton'

const Assets = () => {
const [details, setDetails] = useState([])
// const [items, setItems] = useState(assetsData)

const toggleDetails = (index) => {
  const position = details.indexOf(index)
  let newDetails = details.slice()
  if (position !== -1) {
    newDetails.splice(position, 1)
  } else {
    newDetails = [...details, index]
  }
  setDetails(newDetails)
}

const tableFilter = {
  label: 'Search',
  placeholder: 'type here...'
}
const fields = [
  {
    key: 'select',
    label: 'Select',
    _style: { width: '1%'}
  },
  { key: 'id'},
  { key: 'name'},
   'serial_number', 'asset_tag','location', 'status',
  {
    key: 'show_details',
    label: 'Actions',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  }
]


const getBadge = (status)=>{
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const [modal, setModal] = useState(false)

const toggle = () => {
  setModal(!modal);
}

return (
  <>
  <Button label="+ Create New" />
  <CDataTable
    items={assetsData}
    tableFilter={tableFilter}
    itemsPerPage={5}
    itemsPerPageSelect
    header
    fields={fields}
    hover
    pagination
    
    scopedSlots = {{
      'select' : () =>{
        return (
        <div className="d-flex justify-content-center align-items-center">
          <input id ="select" type="checkbox">
          </input>
        </div>
        )
        
      },
      'status':
        (item)=>(
          <td>
            <CBadge color={getBadge(item.status)}>
              {item.status}
            </CBadge>
          </td>
        ),
      'show_details':
        (item, index)=>{
          return (
            <td className="py-2">
              
              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                onClick={()=>{toggleDetails(index)}}
              >
                {details.includes(index) ? 'Hide' : 'Show'}
              </CButton>
            </td>
            )
        },
      'details':
          (item, index)=>{
            return (
            <CCollapse show={details.includes(index)}>
              <CCardBody>
                <h4>
                  {item.name}
                </h4>
                <p className="text-muted">Role: {item.user_role}</p>
                <Route render={({ history}) => (
              <CButton size="sm" color="dark" className="mr-1" onClick= {() => { history.push('/views/assets/viewmoreassets') }}>
                    View More
              </CButton>
                )}/>
                <CButton size="sm" color="primary" className="mr-1">
                  Update
                </CButton>
                
                <CButton size="sm" color="danger" className="mr-1" onClick={toggle}>Delete</CButton>
                <CButton size="sm" color="success" className="mr-1">
                  Borrow
                </CButton>
                <CButton size="sm" color="warning" className="mr-1">
                  Return
                </CButton>
                <CModal
                  show={modal}
                  onClose={toggle}
                >
                  <CModalHeader closeButton>Delete User</CModalHeader>
                  <CModalBody>
                    Are you sure you want to delete User?
                  </CModalBody>
                  <CModalFooter>
                    <CButton color="primary">Yes</CButton>{' '}
                    <CButton
                      color="secondary"
                      onClick={toggle}
                    >Cancel</CButton>
                  </CModalFooter>
                </CModal>
              </CCardBody>
            </CCollapse>
          )
        }
        
    }}
        
  />

          
  </>
)
}
export default Assets
