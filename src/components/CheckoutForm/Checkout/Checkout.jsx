import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";

import useStyles from "./styles";
import AdressForm from "../AdressForm";
import PaymentForm from "../PaymentForm";
import Confirmation from "./Confirmation";
import { commerce } from "../../../lib/commerce";

const steps = ["Shipping Address", "Payment Details"];

const Checkout = ({ cart }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData,setShippingData] = useState({})

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (err) {}
    };
    generateToken();
  }, [cart]);

  const nextStep=() => setActiveStep((prevActiveStep)=> prevActiveStep+1)
  const backStep=() => setActiveStep((prevActiveStep)=> prevActiveStep-1)

  const next = (data) =>{
    setShippingData(data);
    nextStep();
  }
  const Form = () =>
    activeStep === 0 ? (
      <AdressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep}/>
    );

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            CheckOut
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
