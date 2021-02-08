import React,{ useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { Button } from '@material-ui/core'
import Modal from 'react-modal'
import { startDeleteProd, startGetProd } from '../../actions/products-action'
import ProductForm from './ProductForm'

const ProductItem = (props) => {
    const [open, setOpen] = useState(false)
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()

    const deleteProduct = (id) => {
        const confirmRemove = window.confirm('Are you sure?')
        if(confirmRemove) {
            dispatch(startDeleteProd(id))
        }
    }

    const handleToggle = () => {
        setOpen(!open)
    }

    const handleEdit = (product) => {
        handleToggle()
        setId(product._id)
        setName(product.name)
        setPrice(product.price)
    }

    return (
        <>
            {products.map((product) => {
                return <TableRow key={product._id}>
                    <TableCell> {product.name} </TableCell>
                    <TableCell> {product.price} </TableCell>
                    <TableCell><button onClick={() => {
                        dispatch(startGetProd(product._id))
                    }}><VisibilityOutlinedIcon /></button></TableCell>
                    <TableCell><button onClick={() => {
                        handleEdit(product)
                    }}><EditOutlinedIcon /></button></TableCell>
                    <TableCell><button onClick={() => {
                        deleteProduct(product._id)
                    }}><DeleteOutlineOutlinedIcon /></button></TableCell>
                </TableRow>
            })}

                {open && (
                    <Modal isOpen={open}>
                    <ProductForm
                        id={id}
                        name={name}
                        price={price}
                        handleToggle={handleToggle}
                    />
                    <Button variant="contained" color="secondary"  onClick={() => {
                        handleToggle()
                    }}>close</Button>
                    </Modal>
                )}
        </>
    )
}

export default ProductItem
