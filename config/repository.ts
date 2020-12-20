import fire from './fireConfig'
import * as util from 'util' // has no default export
import {AddSale} from '../interfaces/sale'
import {Product} from '../interfaces/product'
import * as uuid from 'uuid'
import firebase from 'firebase'

/**
 * 
 * @param collection name of the firebase collection
 * 
 * @returns a ref to the collection
 */
const dataRef = (collection : string) => fire.firestore().collection(collection)

/**
 * @returns asynchronously return all of the documents of the 'products' collection
 */
export const getProducts = async () => {
    const snapshot = await dataRef('products').get()
    return snapshot.docs.map(doc => doc.data())
}
/**
 * Adds a document to the sales collection
 * 
 * @param sale Object to be added
 */
export const addSale = async (sale: AddSale) => {
    try{
        return dataRef('sales').add({...sale,id: uuid.v4()}).then(resp => {
            return resp
        }).catch(err => {
            console.log(err)
        })
    }catch(err){
        console.log(err)
    }
}
/**
 * Adds a documnet to the 'products' collection
 * @param product Object to be added
 */
export const addProduct = async (product: Product) => {
    
    try{
        return dataRef('products').add(product).then(resp => {
            return resp
        }).catch(err => {
            console.log(err)
        })
    }catch(err){
        console.log(err)
    }
}
/**
 * edits a document from the 'products' collection
 * @param id id of the product to be edited
 * @param product edited object
 */
export const editProduct = async (id: string,product) => {
    try{
        /**
         * 
         */
        const fireId = await getProductById(id)
        return dataRef('products').doc(fireId[0] as string).update(product).then(resp => {
            return resp
        }).catch(err => {
            console.log(err)
        })
    }catch(err){
        console.log(err)
    }
}
/**
 * Retrives the id of a document using the id field inside the document
 * @param id the id of the project
 */
export const getProductById = async (id: string) : Promise<String[]> =>{
    try{
        const snapshot = await dataRef('products').where('id','==',id).get()
        return snapshot.docs.map(doc => doc.id)
    }catch(err){
        console.log(err)
    }
}
/**
 * @returns asynchronously return all of the documents of the 'sales' collection
 */
export const getSales = async () : Promise<String[]> => {
    const snapshot = await dataRef('sales').get()
    return snapshot.docs.map(doc => JSON.stringify(doc.data()))
}
