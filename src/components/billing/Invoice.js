import React from 'react'
import { useSelector } from 'react-redux'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from '@material-ui/core'
import Pdf from "react-to-pdf";
const ref = React.createRef();

const Invoice = (props) => {
    const currentBill = useSelector(state => state.currentBill)
    const customers = useSelector(state => state.customers)
    const products = useSelector(state => state.products)

    let lineItems = currentBill?.lineItems
    let customerDetails = []
    let productDetails = []

    if (Object.keys(currentBill).length > 0) {
        customerDetails = customers.filter((customer) => {
          return customer._id === currentBill.customer
        })
      }

      if (lineItems?.length > 0) {
        lineItems.forEach((item) => {
          const result = products.filter((product) => {
            return product._id === item.product
          })
          productDetails.push(result[0])
        })
      }

    return (
        <div ref={ref}>
        <h1 className='textAlign'>Invoice</h1>
        <h2>Date - {currentBill?.date?.slice(0, 10)}</h2>
        <h2>Customer Name - {customerDetails[0]?.name}</h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <h4>Product</h4>
                </TableCell>
                <TableCell>
                  <h4>Price</h4>
                </TableCell>
                <TableCell>
                  <h4>Quantity</h4>
                </TableCell>
                <TableCell>
                  <h4>SubTotal</h4>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productDetails.map((prod,i) => {
                return (
                  <TableRow key={prod._id}>
                    <TableCell>{prod.name}</TableCell>
                    <TableCell>{prod.price}</TableCell>
                    <TableCell>{currentBill?.lineItems[i].quantity}</TableCell>
                    <TableCell>{currentBill?.lineItems[i].subTotal}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <h2> Total Amount = {currentBill.total}</h2>
        <Pdf targetRef={ref} filename="code-example.pdf">
          {({ toPdf }) => (
            <div style={{ textAlign: "center" }}>
              <Button color="primary" onClick={toPdf}>
                Download Bill
              </Button>
            </div>
          )}
        </Pdf>
        </div>
    )
}

export default Invoice
