import { concat, set } from 'lodash';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MToastContainer from '../../../containers/MToastContainer';
import { db } from '../../confing/confing';

const CollectionGroupDetails = (props) => {
    let collectionGroupId = props.match.params.cgId
    const [collectionGroups, setCollectionGroups] = useState({
        title: '',
        id: '',
        collectionIds: [],
        showOnHomepage: false,
        slug: ''
    })
    const genreateCollectionGroupsId = () => {
        return Date.now() + Math.floor(1000 + Math.random() * 9000)
    }

    const setInputValue = (event) => {
        const { value, name } = event.target
        setCollectionGroups((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }
    const fillUrlSlug = (event) => {
        const value = event.target.value;
        if (collectionGroups.slug.length == 0) {
            setCollectionGroups((preValue) => {
                return {
                    ...preValue,
                    slug: value.toLowerCase().replace(/\s/g, '-')
                }
            })
        }
    }
    const updateCollectionId = (e) => {
        const value = e.target.value

        setCollectionGroups((preValue) => {
            return {
                ...preValue,
                collectionIds: value

            }
        })


    }

    const showHomepage = (event) => {
        const value = event.target.checked
        setCollectionGroups((prevalue) => {
            return {
                ...prevalue,
                showOnHomepage: JSON.parse(value)

            }
        })
    }
    // fech data from db 
    useEffect(() => {


        if (collectionGroupId !== "add") {
            db.collection('collection-groups').doc(`${collectionGroupId}`).get().then(qerySnaphot => {
                const collectionGroups = qerySnaphot.data();
                setCollectionGroups((preValue) => {
                    return {
                        ...preValue,
                        title: collectionGroups.title,
                        collectionIds: collectionGroups.collectionIds,
                        showOnHomepage: collectionGroups.showOnHomepage,
                        slug: collectionGroups.slug
                    }
                })

            })
        }
    }, [])
    const updateTitle = (e) => {
        e.preventDefault();
        db.collection('collection-groups').where('slug', '==', collectionGroups.slug).onSnapshot(snapshot => {
            if (snapshot.docs.length > 0 && collectionGroupId !== snapshot.docs[0].id) {
                props.MToastDangerHandler({title:'pleace select unique slug ',description:'this  slug is already exist'})
                return
            }

            collectionGroupId = (collectionGroupId == 'add') ? genreateCollectionGroupsId() : collectionGroupId
            db.collection('collection-groups').doc(`${collectionGroupId}`).set({
                "title": collectionGroups.title,
                "id": Number(collectionGroupId),
                'collectionIds': collectionGroups.collectionIds.split(',').map(Number),
                'showOnHomepage': collectionGroups.showOnHomepage,
                'slug': collectionGroups.slug
            }).then(() => {
                setCollectionGroups(() => {
                    return {
                        title: '',
                        id: '',
                        collectionIds: [],
                        showOnHomepage: false,
                        slug: '',

                    }
                })
                props.MToastSuccessHandler({title:'Collection success ', description:'Collection success Upload!'})
            }).catch(err => {
                props.MToastDangerHandler({Title:'error',description:err.message})
            });

            // window.history.pushState(true, `${collectionGroupId}`, `/admin/collection-groups/${collectionGroupId}`);
        })
    }



    return (
        <div className='add-Product-container'>
            <MToastContainer.MToast />
            <Link to={'/admin/collection-groups'} >
                <Button className="btn btn-success">back </Button>
            </Link>
            <h2>collection Group</h2>
            <hr />
            <form className="form-group" autoComplete="off" onSubmit={updateTitle}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" className='add-Product-form' name="title" onBlur={(e) => fillUrlSlug(e)} onChange={setInputValue} value={collectionGroups.title} />
                <br />
                <lebel htmlFor='showOnHomepage'> Homepage Show </lebel>
                <input type="checkbox" name="showOnHomepage" id="showOnHomepage" onChange={showHomepage} checked={collectionGroups.showOnHomepage} />
                <br />
                <div className="urlCon">
                    <label htmlFor="slug">Slug</label>
                    <input type="text" name="slug" id="slug" className="form-control" onChange={setInputValue} value={collectionGroups.slug} />
                </div>
                <br />
                <label htmlFor="collectionIds">CollectionIds</label>
                <input type="text" id="collectionIds" className='add-Product-form' name="collectionIds" onChange={updateCollectionId} value={collectionGroups.collectionIds} />
                <br />
                <Button type="submit" className=' btn-success btn-md ' >Add</Button>
            </form>

        </div>
    )
}

export default CollectionGroupDetails
