import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { db } from '../confing/confing';
import Header from '../header';
import ProductList from './ProductList';

const SearchProduct = () => {
  const queryParams = useLocation().search;
  const tag = new URLSearchParams(queryParams).get('q');
  const [searchProduct, setSearchProduct] = useState([])
  // const [state, setstate] = useState(initialState);

  useEffect(() => {
    db.collection('products').where('productTags', 'array-contains', tag).get().then(querySnapshot => {
      querySnapshot.docs.map(searchTag => {
        searchProduct.push(searchTag.data())
      })
    })
  }, [])

  return (
    <>
      <Header />
      <div className='searchProHeaderCon'>
       <span > Search result for product tag :</span>
         <span> {tag}</span>      
         </div>
      <div className="collections-container">
        {searchProduct && searchProduct.map((product, index) => {
          return (
            <div key={index}>
              <ProductList product={product} />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default SearchProduct
