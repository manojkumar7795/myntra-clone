import Button from '@restart/ui/esm/Button'
import React, { useEffect, useState } from 'react'
import { Image, Table } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineEye } from "react-icons/ai"
import Header from '../Header'
import { db } from '../../confing/confing'

const Collections = () => {

    const queryParams = useLocation().search;
    const cids = new URLSearchParams(queryParams).get('cids');


    const [state, setstate] = useState([])
    useEffect(() => {

        let collectionRef = db.collection('collections');
        if (cids !== null) {
            collectionRef = collectionRef.where('id', 'in', cids.split(',').map(v => parseInt(v)))
        }
        collectionRef.get().then(Snapshot => {
            const collections = Snapshot.docs
            setstate(() => collections)
        })
    }, [])

    const getproductId = (productIds) => {
        window.open(`/admin/products/?pids=${productIds.toString()}`, '_self')
    }

    return (
        <>
            <Header heading="Collection" action={{ title: "Collection", url: '/admin/collection/new' }} />
            <Table responsive>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Url</th>
                        <th>Description</th>
                        <th>ProductIds</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {state.map(collection => {
                        const collectionDetail = collection.data()
                        return (
                            <tr key={collectionDetail.id}>
                                <td>{collectionDetail.id}</td>
                                <td>{collectionDetail.title}</td>
                                <td className="variantsImageWidth" >
                                    <Image src={collectionDetail.image} thumbnail />
                                </td>
                                <td>{collectionDetail.slug}</td>
                                <td>{collectionDetail.description}</td>
                                <td className='productIds' onClick={() => getproductId(collectionDetail.productIds)}>
                                    <span className="mgr5">
                                        Total
                                    </span>
                                    {collectionDetail.productIds.length}
                                    <AiOutlineEye /></td>

                                <Link to={`/admin/collection/${collectionDetail.id}`} >
                                    <Button className="btn btn-success">Edit </Button>
                                </Link>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}


export default Collections