import {CartItem} from './cartItem'
import firebase from 'firebase'

/**
 * keep in mind that firebase.firestore.FieldValue returns a timestamp value that typescript date object does not understand so we need to use
 * new firebase.firestore.Timestamp(seconds,nanoseconds).toDate() to translate the data
 */
export interface AddSale {
    cart: Array<CartItem>
    totalPrice: number
    date: firebase.firestore.FieldValue
    totalCost: number
}