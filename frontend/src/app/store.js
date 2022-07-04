import {configureStore} from "@reduxjs/toolkit"
import {test,test2} from "./reducer"
const store = configureStore(
    {
        reducer :{
            test,
            test2
        }
    }
)

export default store ;
