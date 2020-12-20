import react, { useEffect, useState } from 'react'
import AnimateHeight from 'react-animate-height'; 
import {CartItem} from '../../interfaces/cartItem'
import {useDispatch} from 'react-redux'

/**
 * * @param productName: name of the product.
 * * @param price: price of the product being used
 * * @param unit: unit of the product being used
 * * @param submitting: check if it should dispatch the item to the redux store
 * *@param cost: cost of the product being used
 */
export interface productComponentProps {
    productName: String,
    price: number,
    unit: Number,
    submitting: boolean,
    cost: number
}


/**
 * Product component 
 * takes as props the following parameters:
 * * @param productName: name of the product.
 * * @param price: price of the product being used
 * * @param unit: unit of the product being used
 * * @param submitting: booleam passed from the parent component, if is true it dispatch the item to the redux store
 * *@param cost: cost of the product being used
 *
 * ```
 * <Product productName={} price={} submitting={} id={} cost={}/>
 * ```
 * @returns renders a responsive form that add's a new product to the db
 */
export default function product({productName,price,unit,submitting,cost}: productComponentProps) {
    
    /**
     * we define the states 
     */
    const[isCollapsed,setIsCollapsed]=useState(true)
    const[quantity,setQuantity]=useState(Number)
    const dispatch = useDispatch()

    /**
     * expand/collapses a particular card
     */
    const collapse = () : void => {
        setIsCollapsed(!isCollapsed)
    }

    
    const hanldeQuantity = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        try{
            setQuantity(parseInt(e.target.value))
        }catch(err){
            console.log(err)
        }
    }
    /**
     * creates the new item object of type CartItem
     */
    const item: CartItem = {
        productName: productName,
        quantity: quantity,
        totalPrice: price * quantity,
        totalCost: cost * quantity
    }
    /**
     * check if the boolean submitting is true, if it is true then it dispatch the item to the redux store
     */
    useEffect(()=> {
        if(submitting === true){
            dispatch({type: 'sale/addItemToCart',payload: item})
        }
    },[submitting])
    
    
   

    return (<>
        <div className="list-group-item" style={{marginTop: '2%'}}>
            <div
                className="justify-content-around container row"
                onClick={() => collapse()}
                style={{width: '100%'}}
            >
                <div className="col">
                        <span className="input-group-text col-sm">Producto: {productName}</span>
                    </div>
                    <div className="col">
                        <span className="input-group-text col-sm">Valor: {item.totalPrice} </span>
                    </div>
            </div>
            <AnimateHeight
            duration={ 500 }
            height={ isCollapsed === true? 0 : 'auto'}
            >
                <div className="container row flex-row" style={{marginTop: '2%'}}>
                    <div className="col-sm">
                        <span className="input-group-text col-sm">Cantidad</span>
                    </div>
                    <div className="input-group mb-3 col-sm">
                        <input type="text" className="form-control" required onChange={e => hanldeQuantity(e)} aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
                        <div className="input-group-append" >
                            <span className="input-group-text">{unit}</span>
                        </div>
                    </div>
                </div>
            </AnimateHeight>
        </div>
    </>)
}