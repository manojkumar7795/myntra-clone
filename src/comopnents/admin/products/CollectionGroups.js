import React, { useEffect, useState } from 'react'
import { Image, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from '../Header'
import Button from '@restart/ui/esm/Button';
import { AiOutlineEye } from "react-icons/ai"
import { db } from '../../confing/confing'

const CollectionGroups = () => {
    const [collectionGroups, setCollectionGroups] = useState([])
    useEffect(() => {
        db.collection("collection-groups").get().then(snapshot => {
            const collectionGroupDetails = snapshot.docs
            setCollectionGroups(() => collectionGroupDetails)

        })
    }, [])
    const getCollection = (collectionId) => {

        window.open(`/admin/collections/?cids=${collectionId.toString()}`, '_self')
    }
    return (
        <>
            <Header heading="Collection Group" action={{ title: "Collection Group", url: '/admin/collection-groups/add' }} />
            <Table responsive>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>Collections</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>

                    {collectionGroups.map(collections => {
                        const collection = collections.data();
                        return (
                            <tr key={collection.id}>
                                <td>{collection.id}</td>
                                <td>{collection.title}</td>
                                <td className="collectionIds" onClick={() => getCollection(collection.collectionIds)} >
                                    <span className="mgr5">
                                        Total
                                    </span>
                                    {collection.collectionIds.length}
                                    <AiOutlineEye />
                                </td>
                                <Link to={`/admin/collection-groups/${collection.id}/cid==${collection.collectionIds}`} >
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

export default CollectionGroups
