import { createSlice } from "@reduxjs/toolkit";



let intialstat={
count:0,

}


export let counterSlice=createSlice({
    name:"counter",
    initialState:intialstat,
    reducers:{
        increment: (state) => {   
          state.count +=1
            },
          decrement: (state) => {
           state.count -=1
         },
         
         
    

    },
   
     



})
export let {increment,decrement}=counterSlice.actions
export default counterSlice.reducer


