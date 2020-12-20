import {useSelector} from 'react-redux'
import {AddSale} from '../interfaces/sale'
import {Product} from '../interfaces/product'
import {useDispatch} from 'react-redux'
import firebase from 'firebase'


/**
 * @returns Object of type AddSale made from cart state
 */
export const useCartFetcher = () : AddSale =>{
    const cartItems = useSelector(state => state.sale.cart)
    if (cartItems === undefined || cartItems.length == 0) {
        return null
    }else{
        const price = cartItems.reduce((accum,item) => accum + item.totalPrice, 0)
        const cost = cartItems.reduce((accum,item) => accum + item.totalCost, 0)
    
        return {
            cart: cartItems,
            totalPrice: price,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            totalCost: cost,
        }
    }
}
/**
 * functionality unused for now
 * 
 * @returns insert an array of objects in the cache
 * @param products array of product
 */
export const useInsertCache = (products: []) => {
    const dispatch = useDispatch()

    const productsCache = useSelector(state => state.sale.products)
    if (productsCache === undefined || productsCache.length == 0) {
        dispatch({type:'sale/addProductsCache',payload:products})
    }
}
/**
 * check if there is some object in the cache
 * @return boolean value
 */
export const useCheckCache = () => {
    const productsCache = useSelector(state => state.sale.products)
    if (productsCache === undefined || productsCache.length == 0) {
        return false
    }else{
        return true
    }
}
/**
 * @returns all of the objects in the cache
 */
export const useCacheSelector = (): [] => {
    const productsCache = useSelector(state => state.sale.products)
    if (productsCache === undefined || productsCache.length == 0) {
       return null
    }else{
        return productsCache
    }
}
/**
 * @returns a single of the objects in the cache
 * 
 * @param id: id of the object to be retrieved
 */
export const useProductFromCache = (id: string) => {
    const productsCache = useSelector(state => state.sale.products)
    return productsCache.filter( (product) => {
        if(product.id === id){
            return product
        }
    })
}