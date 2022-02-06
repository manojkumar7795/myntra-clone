import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import LoderContainer from '../../containers/LoderContainer';
import { db } from '../confing/confing';
import Header from '../header';
import ProductList from './ProductList';

const SearchProduct = (props) => {
  const queryParams = useLocation().search;
  const tag = new URLSearchParams(queryParams).get('q');
  const [searchProduct, setSearchProduct] = useState([])
  useEffect(() => {
    db.collection('products').where('productTags', 'array-contains', tag).get().then(querySnapshot => {
      props.LoderCloseHandler({visible: false})
      querySnapshot.docs.map(searchTag => {
        searchProduct.push(searchTag.data())
      })
    })
  }, [])
  
  return (
      <>
        <Header />   
        {props.data.visible && <LoderContainer.loder/>}
        {(searchProduct.length == 0) ?
            <div className='notSearchProduct' >
              <div className='notSearchProHeader'>
                <span> You Search  for :</span>
                <span> {tag}</span>
              </div>
              <img src="https://constant.myntassets.com/web/assets/img/11488523304066-search404.png" alt="not search product" />
              <div className='notSearchProductDescription'>
                We couldn't find any matches!
              </div>
              <div>Please check the spelling or try searching something else</div>
            </div>
           :
          <div>
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
          </div>}
      </>
  )
}

export default SearchProduct
