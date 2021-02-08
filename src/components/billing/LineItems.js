import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { startDeleteLineItem } from '../../actions/lineItem-action'

const LineItems = (props) => {

    let displayProducts = []
    const [result, setResult] = useState([])
    const lineItems = useSelector(state => state.lineItem)
    const products = useSelector(state => state.products)

    const dispatch = useDispatch()

    useEffect(() => {
            lineItems.forEach((prod) => {
                const product = products.find((item) => {
                    return prod.product === item._id
                })
                displayProducts.push(product)
           })
           setResult(displayProducts)
   },[lineItems])


   const handleDelete = (id) => {
       const confirmRemove = window.confirm('Are you sure?')
       if(confirmRemove) {
           dispatch(startDeleteLineItem(id))
       }
   }

    return (
        <div>
            {result.length > 0 && <h1>{result.map((res) => {
                return <ul key={res._id}>
                    <>Product Name - {res.name} </><br />
                    <>Product Price -  {res.price} </><br />
                    <><button onClick={() => {
                        handleDelete(res._id)
                    }}><DeleteOutlineOutlinedIcon /></button></>
                </ul>
            })}</h1>}
        </div>
    )
}

export default LineItems
