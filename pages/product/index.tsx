import {getProducts} from '../../config/repository'
import EditProduct from '../../components/product/editProduct'
import {useInsertCache} from '../../store/hooks'
import Router from 'next/router'
import style from '../../components/product/product.module.css'
import firebase from 'firebase'

/**
 * props definition
 */
export interface productIndexComponentProps {
  products : firebase.firestore.DocumentData[]
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
   * @param products: typeof productIndexComponentProps
   */
export default function index({products} : productIndexComponentProps) {

  /**
   * @returns redirect the page to product/addProduct
   */
  const handleClick = () =>{
    Router.push({
        pathname: '/product/addProduct'
    })
  }

  return(<>
  <div className="row">
      <div className={`container ${style.containerLayout}`}>
        <div className="row" >
          <div className={`.col-xl- flex-column justify-content-center ${style.productsLayour}`}>
            {products.map(product => <EditProduct productName={product.productName} unit={product.unit} key={product.productName} 
            cost={product.cost} price={product.price} stock={product.currentStock} id={product.id}></EditProduct>)}
          </div>
        </div>
      </div>
      <div className={`col- justify-content-end ${style.buttonLayout}`}>
            <button type="button" onClick={handleClick} className="btn btn-outline-success col" style={{marginLeft: '2%',marginTop: "2%"}}>Agregar Producto</button>
      </div>
  </div>
  </>)
}