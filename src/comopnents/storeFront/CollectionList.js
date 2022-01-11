import React, { useEffect, useState } from 'react'
import { db } from '../confing/confing';
import Header from '../header';

const CollectionList = (props) => {
    const slug = props.match.params.slug;
    const [collectionList, setCollectionList] = useState({})

    const collections = async (collectionGroups) => {
        const promises = []
        collectionGroups.forEach(collectionGroup => {
            const promise = db.collection('collections')
                .where("id", 'in', collectionGroup.collectionIds)
                .get().then(async collectionsSnapshot => {
                    collectionGroup.collections = collectionsSnapshot.docs.map(s => s.data());
                })
            promises.push(promise)
        })

        await Promise.all(promises);

        return collectionGroups;
    };




    useEffect(() => {
        db.collection("collection-groups")
            .where('slug', "==", slug).get()
            .then(collectionGrupSnapshot => {
                collections(collectionGrupSnapshot.docs.map(S => S.data()))
                    .then(data => {
                        const emptyData = new Array(4 - data[0].collections.length % 4).fill(null)
                        const collections = data[0].collections.map(s => s);
                        setCollectionList({
                            ...data[0],
                            collections: collections.concat(emptyData)
                        })

                    })
            })
    }, [])


    return (
        <>
            <Header/>
            <div className="collectionTitle"  >{collectionList.title}</div>
            <div className="collections-container">
                {Object.keys(collectionList).length && collectionList.collections.map(collection => {
                   
                    return (
                        <>
                            <div className="product-container pdr-30 pdb-30">
                                {collection && <a href={"/products/" + collection.slug}>
                                    <img className="collectionImage" src={collection.image} alt="productimg" />
                                    <h3 className='collectionsTitle'>{collection.title}</h3>
                                    <h4 className='collectionSub'   >{collection.description}</h4>
                                </a>}
                            </div>



                        </>
                    )
                })}
            </div>


        </>
    )
}

export default CollectionList
