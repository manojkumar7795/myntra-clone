import React from 'react'
import { db } from './confing/confing';
const CollectionTypeDropdown = (props) => {
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
    const fetchCollectionsByType = (collectionType) => {
        db.collection('homepage_cards')
            .doc(collectionType).get().then(document => {
                if (!document.exists) {
                    props.setCollections((preValue) => {
                        return {
                            ...preValue,
                            type: collectionType,
                            cards: [],
                            title: typeOfCollections[collectionType]
                        }
                    })
                    return;
                }

                props.setCollections((preValue) => {
                    return {
                        ...preValue,
                        cards: document.data().cards,
                        type: collectionType,
                        title: typeOfCollections[collectionType]
                    }
                })
            });
    };

    const onUpdateCollectionType = (e) => {
        const collectionType = e.target.value;
        fetchCollectionsByType(collectionType);
    }



    return (
        <>
            <div className="homepage-card">
                <div className='collectionType'>
                    <label htmlFor="type">Title:-</label>
                    <select name="type" id="type" className="card-fields" onChange={onUpdateCollectionType}>
                        {Object.keys(typeOfCollections).map(id => {
                            return <option key={id} value={id}>{typeOfCollections[id]}</option>
                        })}
                    </select>
                </div>
            </div>
            {props.collections.cards.map(card => {
                return (
                    <div className="homepage-card">
                        <div className="collectionsImage">
                            <img src={card.image} alt="collectionsCards" />
                        </div>

                        <div className="urlCon">
                            <label htmlFor="url">URL:-</label>
                            <input type="url" name="url" className="form-control" value={card.url} readOnly />
                        </div>
                    </div>

                )
            })}

        </>
    )
}

export default CollectionTypeDropdown
