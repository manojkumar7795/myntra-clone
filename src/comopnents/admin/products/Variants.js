import React, { useState } from 'react'
import { Image, Table } from 'react-bootstrap'
import Variant from './Variant'
import firebase from 'firebase/compat/app';
import { db } from '../../confing/confing';
import Button from '@restart/ui/esm/Button';
import Header from '../Header';
import { Link } from 'react-router-dom';

let initial = true;
const Variants = (props) => {
    const pid = Number(props.match.params.pid);
    const [variants, setVariants] = useState([])
    // show variant if click product
    if (variants.length == 0 && initial) {// && props.vid != null && props.vid.length > 0) {
        initial = false;
        getVariants()
    }

    function getVariants() {
        db.collection('variant')
            .where('productId', '==', pid)
            .get()
            .then(Snapshot => {
                const variantDetails = Snapshot.docs
                setVariants(() => variantDetails)
            })
    }
    // add variant id to product
    // const addVariant = (vid) => {
    //     console.log('addVariantfunctionTest')
    //     // product.variantIds.push(vid)
    //     db.collection('products').doc(`${pid}`).update({
    //         "variantIds": firebase.firestore.FieldValue.arrayUnion(`${vid}`)
    //     });
    // }
    return (
        <>

            <Header heading="Variants" action={{ title: "Add Variant", url: `/admin/products/${pid}/variants/new` }} />
            <a href='/admin/products'>
                <button type="button" class="btn btn-success btn btn-primary">back </button>
            </a>
            {variants.length > 0 &&

                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th>Sell Price</th>
                            <th>Rack Price</th>
                            <th>Sku</th>
                            <th>Barcode</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>

                        {

                            variants.map(variantDetails => {
                                const variant = variantDetails.data();
                                return (
                                    <tr key={variant.variantId}>
                                        <td>{variant.variantId}</td>
                                        <td className="variantsImageWidth" >

                                            <Image src={variant.images[0]} thumbnail />
                                            {variant.images.length - 1 !== 0 ?
                                                <span className='variatnImagesCount'>+ {variant.images.length - 1}</span> : ''

                                            }
                                        </td>
                                        <td>{variant.pricing.sellPrice}</td>
                                        <td>{variant.pricing.rackPrice}</td>
                                        <td>{variant.inventory.sku}</td>
                                        <td>{variant.inventory.barcode}</td>
                                        <td>{variant.inventory.quantity}</td>
                                        <td>
                                            <Link to={`/admin/products/${pid}/variants/${variant.variantId}`} >
                                                <Button className="btn btn-success">Edit </Button>
                                            </Link>

                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            }
        </>
    )
}

export default Variants
