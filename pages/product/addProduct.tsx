import React,{useState,useEffect} from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import fire from '../../config/fireConfig'
import * as uuid from 'uuid'
import {addProduct} from '../../config/repository'
import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'
import product from '../../components/product/product'

/**
 * @returns renders a form that let the user add a document to the product collection
 */
export default function products() {
  /**
   * state declariation
   */
  const[unit,setUnitValue]=useState('')
  const[productName,setProductName]=useState('')
  const[cost,setCost]=useState(Number)
  const[price,setPrice]=useState(Number)
  const[currentStock,setCurrentStock]=useState(Number)
  const[idealStock,setIdealStock]=useState(Number)
  const[minimumStock,setMinimumStock]=useState(Number)
  const[showModal,setShowModal]=useState(false)
  const[productNameStyle,setProductNameStyle]=useState('form-control')
  const[unitStyle,setUnitStyle]=useState('primary')
  const[priceStyle,setPriceStyle]=useState('form-control')
  const[currenStockStyle,setCurrentStockStyle]=useState('form-control')
  const[idealStockStyle,setIdealStockStyle]=useState('form-control')
  const[minimumStockStyle,setMinimumStockStyle]=useState('form-control')
  const[costStyle,setCostStyle]=useState('form-control')


  const closeModal = () => {
    setShowModal(false)
    clearAllFields()
  }
  const handleSelect= (e: any) : void =>{
    setUnitValue(e)
  }
  /**
   * we reset all of the sates
   */
  const clearAllFields = () : void => {
    setProductName("")
    setCost(0)
    setPrice(0)
    setCurrentStock(0)
    setIdealStock(0)
    setMinimumStock(0)
    setUnitValue('')
  }
  /**
   * add the product to the db and reset the states
   * 
   * @param event the formEvent
   */
  const handleSubmit = (event: React.FormEvent) : void => {
    event.preventDefault()
    if(productName.length > 1 && cost > 0 && price > 0 && currentStock > 0 && idealStock > 0 && minimumStock > 0 && unit !== ''){

        addProduct({
            productName: productName,
            cost:cost,
            price:price,
            currentStock:currentStock,
            idealStock:idealStock,
            minimumStock:minimumStock,
            unit:unit,
            id: uuid.v4()
          }).then(()=>{
            setShowModal(true)
          }).catch(err => console.log(err))

      }else{
        //validation
        if(productName.length < 2){
          setProductNameStyle('form-control is-invalid')
        }
        if(cost < 1){
          setCostStyle('form-control is-invalid')
        }
        if(currentStock < 1){
          setCurrentStockStyle('form-control is-invalid')
        }
        if(idealStock < 1){
          setIdealStockStyle('form-control is-invalid')
        }
        if(minimumStock < 1){
          setMinimumStockStyle('form-control is-invalid')
        }
        if(price < 1){
          setPriceStyle('form-control is-invalid')
        }
        if(unit == ''){
          setUnitStyle('danger')
        }
      }
  }
  
  useEffect(()=>{
    if(productName.length > 2){
      setProductNameStyle('form-control')
    }
    if(cost > 1){
      setCostStyle('form-control')
    }
    if(currentStock > 1){
      setCurrentStockStyle('form-control')
    }
    if(idealStock > 1){
      setIdealStockStyle('form-control')
    }
    if(minimumStock > 1){
      setMinimumStockStyle('form-control')
    }
    if(price > 1){
      setPriceStyle('form-control')
    }
    if(unit !== ''){
      setUnitStyle('primary')
    }
  },[unit,price,minimumStock,idealStock,currentStock,cost,productName])

  return (<>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Producto agregado</Modal.Title>
        </Modal.Header>
        <Modal.Body>Agregaste al inventorio:  {productName}</Modal.Body>
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
                  <input type="text" className={productNameStyle}  value={productName} onChange={({target}) => setProductName(target.value)} id="formGroupExampleInput" placeholder="Nombre del producto"/>
              </div>
              <div className="form-group">
                  <label>Costo</label>
                  <input type="text" className={costStyle} value={cost} onChange={({target}) => setCost(parseInt(target.value))} id="formGroupExampleInput2" placeholder="Costo"/>
              </div>
              <div className="form-group">
                  <label>Precio</label>
                  <input type="text" className={priceStyle}  value={price} onChange={({target}) => setPrice(parseInt(target.value))} id="formGroupExampleInput2" placeholder="Cuanta ganancia vas a tener en el producto"/>
              </div>
              <div className="form-group">
              <DropdownButton id="dropdown-basic-button" variant={unitStyle} onSelect={handleSelect} title={unit == ''? "Unidades de medida" : unit}>
                  <Dropdown.Item eventKey="gramos">Gramos</Dropdown.Item>
                  <Dropdown.Item eventKey="litros">Litro</Dropdown.Item>
                  <Dropdown.Item eventKey="unidades">Unidad</Dropdown.Item>
                  <Dropdown.Item eventKey="kilogramo">Kilogramo</Dropdown.Item>
                  <Dropdown.Item eventKey="mililitro">Mililitro</Dropdown.Item>
              </DropdownButton>
              </div>
              <div className="form-group">
                  <label>Stock actual</label>
                  <input type="text" className={currenStockStyle} required value={currentStock} onChange={({target}) => setCurrentStock(parseInt(target.value))} id="formGroupExampleInput2" placeholder="Cuantas unidades tenes.."/>
              </div>
              <div className="form-group">
                  <label>Stock Ideal</label>
                  <input type="text" className={idealStockStyle} required value={idealStock} onChange={({target}) => setIdealStock(parseInt(target.value))} id="formGroupExampleInput2" placeholder="Another input"/>
              </div>
              <div className="form-group">
                  <label>Stock minimo</label>
                  <input type="text" className={minimumStockStyle} required value={minimumStock} onChange={({target}) => setMinimumStock(parseInt(target.value))} id="formGroupExampleInput2" placeholder="Another input"/>
              </div>
              <div className="d-flex justify-content-end" style={{marginTop: "50px"}}>
                <button type="submit" className="btn btn-outline-success">Agregar Producto</button>
                <button type="button" onClick={clearAllFields} style={{marginLeft: "10px"}} className="btn btn-outline-danger">Cancelar</button>
            </div>
          </form>
      </div>
  </>)
}