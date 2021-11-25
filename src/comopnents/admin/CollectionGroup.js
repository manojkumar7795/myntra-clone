import React, { useState } from 'react'
import { db } from '../confing/confing'

const CollectionGroup = () => {
    const [collectionGroup, setCollectionGroup] = useState([])
    console.log("hallo")
    db.collection("variant").orderBy('variantId').startAfter(null).limit(10).get().then(result=>{
        result.docs.map(data=>{
            console.log("data",data.data())
        })
    })
    return (
        <>
            
        </>
    )
}

export default CollectionGroup
