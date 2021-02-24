import axios from "axios";


export const getChallans=()=>{
    let Challans=axios
      .get("/api/challan/")
      .then((res) => {
        let Challans;
        Challans=res.data

        return Challans
      })
      .catch((err) => {
        console.log(err);
      });
      return Challans 
}

export const getChallansByMobile=(mobile)=>{
  let Challans=axios
    .get("/api/challan/mobile/?mobile_number="+mobile)
    .then((res) => {
      let Challans;
      Challans=res.data

      return Challans
    })
    .catch((err) => {
      console.log(err);
    });
    return Challans 
}

export const getChallansbyID=(idofclient)=>{
  let Challans=axios
      .get("/api/challan/"+idofclient)
      .then((res) => {
        let Challans;
        Challans=res.data
        return Challans
        
      })
      .catch((err) => {
        console.log(err);
      });
      return Challans 
}
export const addChallans=(newChallans)=>{
  axios.post('/api/challan/',newChallans).then((res)=>{
    console.log(res.data)
  }).catch((err)=>{
    console.log(err)
  })
}
export const deleteMultipleChallans=(arrChallans)=>{
  axios.delete('/api/challan/',arrChallans).then((res)=>{
    console.log(res.data);
  }).catch((err)=>{
    console.log(err);
  })
}
export const deleteChallans=(idofclient)=>{
  axios.delete('/api/challan/'+idofclient).then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
  })
}

export const updateChallans=(idofclient,newChallans)=>{
  axios.post('/api/challan/'+idofclient,newChallans).then((res)=>{
    console.log(res.data)
  }).catch((err)=>{
    console.log(err)
  })
}
