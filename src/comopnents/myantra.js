import React, { useEffect } from 'react'
import Header from './header';
import CarouselBase from './CarouselBase';
import Data from './Data';
import { useHistory } from 'react-router-dom';
import { fAuth } from './confing/confing';

const Myantra = ({user}) => {
    // const history = useHistory();
   
// useEffect(() => {
//     fAuth.onAuthStateChanged(user=>{
//         if(!user){
//             history.push('/login')
//         }
//     })
// },[])
    return (
        <>
            <Header user = {user}  />
            <CarouselBase />
            <Data/>
        </>
    )
}

export default Myantra