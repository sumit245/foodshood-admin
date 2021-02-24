import axios from "axios";

export const getPayments = () => {
  let Payments = axios
    .get("/api/payments/")
    .then((res) => {
      let Payments;
      Payments = res.data;
      return Payments;
    })
    .catch((err) => {
      console.log(err);
    });
  return Payments;
};

export const getPaymentsbyID = (idofclient) => {
  let Payments = axios
    .get("/api/payments/" + idofclient)
    .then((res) => {
      let Payments;
      Payments = res.data;
      return Payments;
    })
    .catch((err) => {
      console.log(err);
    });
  return Payments;
};
export const addPayments = (newPayments) => {
  axios
    .post("/api/payments/", newPayments)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const deleteMultiplePayments = (arrPayments) => {
  axios
    .delete("/api/payments/", arrPayments)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const deletePayments = (idofclient) => {
  axios
    .delete("/api/payments/" + idofclient)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updatePayments = (idofclient, newPayments) => {
  axios
    .post("/api/payments/" + idofclient, newPayments)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
