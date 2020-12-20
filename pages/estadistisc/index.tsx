import {getSales,getProducts} from '../../config/repository'
import EditProduct from '../../components/product/editProduct'
import {useInsertCache} from '../../store/hooks'
import firebase from 'firebase'

/**
 * props declaration
 */
export interface estatisticsIndexComponentProps {
  sale: string[]
}

/**
 * we export getStaticProps to force next.js to use ssg (even thorught it doest that from default) while we also fetch the data from the db
 */
export async function getStaticProps() {
    const sales = await getSales()
    return {
      props: {
        sale: sales 
      }
    }
  }

export default function index({sale} : estatisticsIndexComponentProps) {

  //#region formattingDates
    /**
     * deserialized json data
     * @return array of objects
     */
    const sales = sale.map(el => JSON.parse(el))

    const date = new Date()
    /**
     * we filter the sales array to get the object that where created from 7 days ago until now
     */
    const salesMadeSevenDaysAgo = sales.filter((el)=> {
      const sevenDays = new Date()
      /**
       * we set the date to a week ago
       */
      sevenDays.setDate(date.getDate() - 7)
      /**
       * firebase returns a timestamp instead of a date object so we need to convert in to a new date object
       * @return date object
       */
      const saleDate = new firebase.firestore.Timestamp(el.date.seconds,el.date.nanoseconds).toDate()
      if(saleDate >= sevenDays){
        return el
      }
    })
    /**
     * we reduce the arrays 
     */
    const costFromSalesMadeSevenDaysAgo = salesMadeSevenDaysAgo.reduce((acc,item)=> acc + item.totalCost,0)
    const totalSalesFromSalesMadeSevenDaysAgo = salesMadeSevenDaysAgo.reduce((acc,item)=> acc + item.totalPrice,0)

    const salesMadeThirtyDaysAgo = sales.filter((el)=> {
      const thirtyDays = new Date()
       /**
       * we set the date to 30 days ago
       */
      thirtyDays.setDate(date.getDay() - 30)
      /**
       * firebase returns a timestamp instead of a date object so we need to convert in to a new date object
       * @return date object
       */
      const saleDate = new firebase.firestore.Timestamp(el.date.seconds,el.date.nanoseconds).toDate()
      if(saleDate >= thirtyDays){
        return el
      }
    })
    /**
     * we reduce the arrays 
     */
    const costFromSalesMadeThirtyDaysAgo = salesMadeThirtyDaysAgo.reduce((acc,item)=> acc + item.totalCost,0)
    const totalSalesFromSalesMadeThirtyDaysAgo = salesMadeThirtyDaysAgo.reduce((acc,item)=> acc + item.totalPrice,0)

    const salesMadeToday = sales.filter((el)=> {
      const today = new Date()
       /**
       * we set the date to 8 hours ago
       */
      today.setHours(date.getHours() - 8)
      /**
       * firebase returns a timestamp instead of a date object so we need to convert in to a new date object
       * @return date object
       */
      const saleDate = new firebase.firestore.Timestamp(el.date.seconds,el.date.nanoseconds).toDate()
      if(saleDate >= today){
        return el
      }
    })
    //#endregion formattingDates
    /**
     * we reduce the arrays 
     */
    const costFromSalesMadeToday = salesMadeToday.reduce((acc,item)=> acc + item.totalCost,0)
    const totalSalesFromSalesMadeToday = salesMadeToday.reduce((acc,item)=> acc + item.totalPrice,0)
    
    return(<>
    <div className="container">
      <div className="card" style={{marginTop: '5%'}}>
              <div className="card-body row">
              <span className="input-group-text col"> Ventas del dia</span>
                  <div className="input-group-text col">
                      <span className="input-group-text col">Total: {totalSalesFromSalesMadeToday}</span>
                      <span className="input-group-text col">Ganancia:{totalSalesFromSalesMadeToday - costFromSalesMadeToday} </span>
                  </div>
              </div>
          </div>
          <div className="card" style={{marginTop: '5%'}}>
              <div className="card-body row">
              <span className="input-group-text col"> Ventas de la semana</span>
                  <div className="input-group-text col">
                      <span className="input-group-text col">Total: {totalSalesFromSalesMadeSevenDaysAgo}</span>
                      <span className="input-group-text col">Ganancia: {totalSalesFromSalesMadeSevenDaysAgo - costFromSalesMadeSevenDaysAgo}</span>
                  </div>
              </div>
          </div>
          <div className="card" style={{marginTop: '5%'}}>
              <div className="card-body row">
              <span className="input-group-text col"> Ventas del mes</span>
                  <div className="input-group-text col">
                      <span className="input-group-text col">Total: {totalSalesFromSalesMadeThirtyDaysAgo}</span>
                      <span className="input-group-text col">Ganancia: {totalSalesFromSalesMadeThirtyDaysAgo - costFromSalesMadeThirtyDaysAgo} </span>
                  </div>
              </div>
        </div>
    </div>
    </>)
}