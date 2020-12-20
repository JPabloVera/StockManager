import react from 'react'
import Router from 'next/router'

/**
 * 
 */
export interface editProductProps {
    productName: string,
    price: number,
    unit: string,
    stock: number,
    id: string,
    cost: number

}

/**
 * EditProduct component, takes as props the following parameters:
 * * @param productName: name of the product.
 * * @param price: price of the product being used
 * * @param unit: unit of the product being used
 * * @param stock: available stock of the product being used
 * *@param id: id of the product being used
 * *@param cost: cost of the product being used
 *
 * ```
 * <EditProduct productName={} price={} unit= {} id={} cost={}/>
 * ```
 * @returns renders a responsive card that contains the data about the product
 */
export default function editProduct({productName,price,unit,stock,id,cost} : editProductProps){
    
    const handleClick = () =>{
        Router.push({
            pathname: '/product/edit',
            query: { id: id,productName: productName,price: price,stock: stock,cost: cost },
        })
    }

    return(
        <div className="card justify-content-center" style={{marginTop: '5%'}}>
            <div className="card-body column">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Product: {productName}</li>
                    <li className="list-group-item">Precio: {price}</li>
                    <li className="list-group-item">Stock: {stock}</li>
                </ul>
                <button type="button" onClick={handleClick} className="btn btn-outline-success" style={{marginLeft: '2%',marginTop: "2%"}}>Edit</button>
            </div>
        </div>
    )
}