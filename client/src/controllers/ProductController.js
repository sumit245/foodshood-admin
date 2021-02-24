import axios from "axios";


export const getProducts=()=>{
    let Product=axios
      .get("/api/products/")
      .then((res) => {
        let Product;
        Product=res.data
        return Product
        
      })
      .catch((err) => {
        console.log(err);
      });
      return Product 
}

export const getProductbyID=(idofclient)=>{
  let Product=axios
      .get("/api/products/"+idofclient)
      .then((res) => {
        let Product;
        Product=res.data
        return Product
        
      })
      .catch((err) => {
        console.log(err);
      });
      return Product 
}
export const addProduct=(newProduct)=>{
  axios.post('/api/product/',newProduct).then((res)=>{
    console.log(res.data)
  }).catch((err)=>{
    console.log(err)
  })
}
export const deleteMultipleProduct=(arrProduct)=>{
  arrProduct.forEach(myfunction)
  function myfunction(item,index,arr){
    axios.delete('/api/products/',item).then((res)=>{
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }
  
}
export const deleteProduct=(idofclient)=>{
  axios.delete('/api/product/'+idofclient).then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
  })
}

export const updateProduct=(idofclient,newProduct)=>{
  axios.post('/api/product/'+idofclient,newProduct).then((res)=>{
    console.log(res.data)
  }).catch((err)=>{
    console.log(err)
  })
}
