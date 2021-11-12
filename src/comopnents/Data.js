import React, { useState } from "react";
import { db } from './confing/confing';

const typeOfCollections = {
    DEALS_OF_THE_DAY: "DEALS OF THE DAY",
    BIGGEST_DEALS_ON_TOP_BRANDS: "BIGGEST DEALS ON TOP BRANDS",
    CATEGORIES_TO_BAG: "CATEGORIES TO BAG",
    EXPLORE_TOP_BRANDS: "EXPLORE TOP BRANDS",
    TRENDING_IN_WESTERN_WEAR: "TRENDING IN WESTERN WEAR",
    TRENDING_IN_INDIAN_WEAR: "TRENDING IN INDIAN WEAR",
    TRENDING_IN_SPORTS_WEAR: "TRENDING IN SPORTS WEAR",
    TRENDING_IN_FOOTWEAR: "TRENDING IN FOOTWEAR",
    TRENDING_IN_ACCESSORIES: "TRENDING IN ACCESSORIES"
}


const Data = () => {
    const [collectionsList, setCollectionsList] = useState({
        list: []
    })
    if (Object.keys(collectionsList.list).length === 0) {
        Object.keys(typeOfCollections).forEach(collectionType => {
            db.collection('homepage_cards').doc(collectionType).onSnapshot(querySnapshot => {
                setCollectionsList((prevCollectionsList) => {
                    const newCollectonList = { ...prevCollectionsList };
                    newCollectonList.list.push(querySnapshot.data());
                    return newCollectonList;
                })

            })

        })
    }

    return (
        <>
            {collectionsList.list.map(collectionsData => {
                return (
                    <section className="main-card--container">
                        <div className="card-contaner ">
                            <div className="title-banner">
                                {collectionsData.title}
                            </div>
                            <div className="cards">
                                {collectionsData.cards && collectionsData.cards.map(data => {
                                    return (
                                        <>
                                            <a href={data.url} className="card-ankar">
                                                <img className="card-img" src={data.image} alt="" />
                                            </a>
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











