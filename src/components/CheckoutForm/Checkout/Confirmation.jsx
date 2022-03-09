import React from 'react'
import {Typography,Divider,Button,CircularProgress} from "@material-ui/core";
import {Link} from 'react-router-dom'
import useStyles from "./styles";

const Confirmation = ({order}) => {
  const classes = useStyles();
  if (order.customer) {
    return (
      <>
      <div>
      <Typography variant='h5'>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
      <Divider className={classes.divider} />
      <Typography variant='subtitle2'>Order ref:{order.customer_reference}</Typography>
      </div>
      <br/>
      <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
      </>
    )
  } else {
    return (
      <div className={classes.spinner}>
        <CircularProgress/>
      </div>
    )
  }
 
}

export default Confirmation