import React, { useEffect, useState } from "react";
import { db } from './confing/confing';



const Data = () => {
    const [collectionsList, setCollectionGroups] = useState([])

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
        const collectionData = JSON.parse(sessionStorage.getItem('collectionGroupData'))
        if (collectionData == null || Date.now() - collectionData.timestamp > 600000) {
            db.collection('collection-groups').where('showOnHomepage', '==', true).get()
                .then(collectionGroupsSnapshot => {
                    collections(collectionGroupsSnapshot.docs.map(s => s.data()))
                        .then(data => {
                            // let emptydata = new Array(collectionsList[0].products.length).fill(null)
                            // console.log("emptydata", collectionsList.products.length)
                            setCollectionGroups(data)
                            sessionStorage.setItem('collectionGroupData', JSON.stringify({
                                data: data,
                                timestamp: Date.now()
                            }))
                        });

                })
        }
        else {
            setCollectionGroups(collectionData.data)
        }
    }, [])


    return (
        <>
            {collectionsList.map(collectionGroupdata => {
                return (
                    <section className="main-card--container">
                        <div className="card-contaner ">
                            <div className="title-banner">
                                {collectionGroupdata.title}
                            </div>
                            <div className="cards">
                                {collectionGroupdata.collections.map(data => {

                                    return (
                                        <>
                                            <div>
                                                <a href={"/collections/" + data.slug} className="card-ankar">
                                                    <img className="card-img" src={data.image} alt="" />
                                                </a>

                                            </div>

                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                )
            })}
        </>
    )

}


export default Data











