import axios from "axios";


export const getBills=()=>{
    let Bills=axios
      .get("/api/bills/")
      .then((res) => {
        let Bills;
        Bills=res.data
        return Bills
        
      })
      .catch((err) => {
        console.log(err);
      });
      return Bills 
}

export const getBillsbyID=(idofclient)=>{
  let Bills=axios
      .get("/api/bills/"+idofclient)
      .then((res) => {
        let Bills;
        Bills=res.data
        return Bills
        
      })
      .catch((err) => {
        console.log(err);
      });
      return Bills 
}
export const addBills=(newBills)=>{
  axios.post('/api/bills/',newBills).then((res)=>{
    console.log(res.data)
  }).catch((err)=>{
    console.log(err)
  })
}
export const deleteMultipleBills=(arrBills)=>{
  axios.delete('/api/bills/',arrBills).then((res)=>{
    console.log(res.data);
  }).catch((err)=>{
    console.log(err);
  })
}
export const deleteBills=(idofclient)=>{
  axios.delete('/api/bills/'+idofclient).then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
  })
}

export const updateBills=(idofclient,newBills)=>{
  axios.post('/api/bills/'+idofclient,newBills).then((res)=>{
    console.log(res.data)
  }).catch((err)=>{
    console.log(err)
  })
}
