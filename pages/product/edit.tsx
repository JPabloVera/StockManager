import React,{useState,useEffect} from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import fire from '../../config/fireConfig'
import * as uuid from 'uuid'
import {editProduct,getProductById} from '../../config/repository'
import {useProductFromCache,useCheckCache} from '../../store/hooks'
import { useRouter } from 'next/router'
import Router from 'next/router'
import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'


export default function edit() {
  /**
   * we retrieve the paremeters from the endpoint
   */
  const router = useRouter()
  const id = router.query.id as string
  const stock = router.query.stock as string
  const price = router.query.price as string
  const productName = router.query.productName as string
  const cost = router.query.cost as string
  
  
  /**
   * state declaration
   */
  const[showModal,setShowModal]=useState(false)
  const[editProductName,setProductName]=useState('')
  const[editCost,setCost]=useState('')
  const[editPrice,setPrice]=useState('0')
  const[editCurrentStock,setCurrentStock]=useState('')

  /**
   * we updatethe state with the values of the router.query
   */

  const closeModal = () => {
    setShowModal(false)
    Router.push({pathname: '/product'})
  }

  useEffect(()=>{
    setProductName(productName)
    setCurrentStock(stock)
    setCost(cost)
    setPrice(price)

  },[price])
  
  /**
   * @returns reset all of the states
   */
  const clearAllFields = () : void => {
    setProductName("")
    setCost("0")
    setPrice("0")
    setCurrentStock("0")
  }
  
  /**
   * 
   * @param event formEvent
   * 
   * @returns edits a given document in the db
   */
  const handleSubmit = (event: React.FormEvent) : void => {
    event.preventDefault()
    editProduct(id,{
        productName: editProductName,
        price:parseInt(editPrice),
        currentStock:parseInt(editCurrentStock),
        cost: parseInt(cost)
      }).then(()=> {
        setShowModal(true)
      })
  }
  
  return (<>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editanto Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>Editaste el producto {productName}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container">
          <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <label>Nombre del producto</label>
                  <input type="text" className="form-control" required value={editProductName == undefined? '' : editProductName} onChange={({target}) => setProductName(target.value)} id="formGroupExampleInput" placeholder="Nombre del producto"/>
              </div>
              <div className="form-group">
                  <label>Costo</label>
                  <input type="text" className="form-control" required value={editCost == undefined? '' : editCost} onChange={({target}) => setCost(target.value)} id="formGroupExampleInput2" placeholder="Costo"/>
              </div>
              <div className="form-group">
                  <label>Precio</label>
                  <input type="text" className="form-control" required value={editPrice == undefined? '' : editPrice} onChange={({target}) => setPrice(target.value)} id="formGroupExampleInput2" placeholder="Cuanta ganancia vas a tener en el producto"/>
              </div>
              <div className="form-group">
                  <label>Stock actual</label>
                  <input type="text" className="form-control" required value={editCurrentStock == undefined? '' : editCurrentStock} onChange={({target}) => setCurrentStock(target.value)} id="formGroupExampleInput2" placeholder="Cuantas unidades tenes.."/>
              </div>
              <div className="d-flex justify-content-end" style={{marginTop: "50px"}}>
                <button type="submit" className="btn btn-outline-success">Success</button>
                <button type="button" onClick={clearAllFields} style={{marginLeft: "10px"}} className="btn btn-outline-danger">Danger</button>
            </div>
          </form>
      </div>
  </>)
}

