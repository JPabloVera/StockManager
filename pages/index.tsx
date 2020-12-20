import { useState,useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Product from '../components/product/product'
import {getProducts} from '../config/repository'
import {CartItem} from '../interfaces/cartItem'
import {useSelector} from 'react-redux'
import {useCartFetcher,useInsertCache} from '../store/hooks'
import {addSale} from '../config/repository'
import firebase from 'firebase'
import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'
import {useDispatch} from 'react-redux'

/**
 * we define the props
 */
export interface indexComponentProps {
    products: firebase.firestore.DocumentData[]
}
/**
 * we export getStaticProps to force next.js to use ssg (even thorught it doest that from default) while we also fetch the data from the db
 */
export async function getStaticProps() {
  return {
    props: {
      products: await getProducts()
    }
  }
}
/**
 * 
 * @param {product} typeof indexComponentProps
 */
export default function home({products}: indexComponentProps) {
  const dispatch = useDispatch()
  /**
   * state declaration
   */
  const [multiSelections, setMultiSelections] = useState([]);
  const[submitSale,setSubmitSale]=useState(false)
  const[showModal,setShowModal]=useState(false)
  const[modalText,setModalText]=useState('')
  /**
   * we filter the arrays
   */
  const productToSelect = products.map(prod => prod.productName)
  const selectedProducts = products.filter(prod => multiSelections.includes(prod.productName))

  /**
   * we retrieve data from the redux store
   */
  const cart = useCartFetcher()

  /**
   * we momentarily set submitSale to true, so we can add the cart
   */
  const handleSubmit = () : void => {
    if(multiSelections.length < 1){
      setModalText('No pusiste ningun item')
      setShowModal(true)
    }else{
      setSubmitSale(true)
      setTimeout(()=>{
        setSubmitSale(false)
      },2000)
    }
  }

  
  useEffect(()=>{
    if(submitSale === true){
      if(cart !== null && cart.totalPrice >= 1){
        addSale(cart).then(
          () => {
            setModalText('Venta Exitosa')
            setShowModal(true)
            dispatch({type: 'sale/resetCart'})
          }
        )
        console.log(cart)
      }else{
        setModalText('No se puede realizar una venta de 0 valor')
        setShowModal(true)
        dispatch({type: 'sale/resetCart'})
      }
    }
  },[cart])
  
  const closeModal = () => {
    setMultiSelections([])
    setShowModal(false)
  }
  
  

  return (<>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalText}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container" style={{height: '100%'}}>
        <form className="d-flex flex-column" style={{minHeight: '70vh',height: '80%'}} >
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label>Seleccionar productos</label>
              <Typeahead
                id="basic-typeahead-multiple"
                labelKey="name"
                multiple
                onChange={setMultiSelections}
                options={productToSelect}
                placeholder="Choose several states..."
                selected={multiSelections}
              />
            </div>
            <div className="form-group">
              <div style={{width: "100%"}}>
                <div className="list-group">
                  {
                   selectedProducts.map(el => <Product unit={el.unit}  submitting={submitSale} cost={el.cost} price={el.price} productName={el.productName} key={el.productName}/>)
                  }
                </div>
              </div>
            </div>
        </form>
        <div className="d-flex justify-content-end" style={{marginTop: "50px"}}>
          <button type="button" onClick={handleSubmit} className="btn btn-outline-success">Success</button>
          <button type="button" style={{marginLeft: "10px"}} className="btn btn-outline-danger">Danger</button>
        </div>
      </div>
  </>)
}
