import React from 'react'
import Header from './header';
import CarouselBase from './CarouselBase';
import Data from './Data';

const Myantra = () => {
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
            <Header/>
            <CarouselBase />
            <Data/>
        </>
    )
}

export default Myantra