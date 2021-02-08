import React from 'react'
import ProductForm from './ProductForm'
import ProductsList from './ProductsList'

const ProductsContainer = (props) => {

    return (
            <div><br /><br /><br /><br /><br /><br />
                <div className='content'>
                <ProductsList />
                <ProductForm />
                </div>
            </div>
    )
}

export default ProductsContainer
