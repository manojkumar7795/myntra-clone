import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { db, fStorage } from '../../confing/confing';
import firebase from 'firebase/compat/app';
import { Link } from 'react-router-dom';
import { MToast, toast } from '../MToast';


const Collection = (props) => {
    let collectionId = props.match.params.cid
    const [collection, setCollection] = useState({
        slug: '',
        title: '',
        image: null,
        description: '',
        productIds: [],
        id: ''

    })
    const newToast = (type) => {
        if (type == "success") {
            toast.success('Collection success ', 'Collection success Upload!')
        }
        else if (type == 'imageErrror') {
            toast.error('image not valid  ', ' Error :- Please select a valid image type (jpg,png or webp)!')
        }
        else if (type == 'uploadImageError') {
            toast.error('pleace selcet image', 'Error :- Please select a valid image ')
        }
        else if (type == 'slug') {
            toast.error(' pleace select unique slug ', 'this  slug is already exist')
        }
        else {
            toast.error('Error ', type)
        }
    }

    const generateCollactionId = () => {
        return Date.now() + Math.floor(1000 + Math.random() * 9000)
    }
    const setInputValue = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setCollection((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }
    const fillUrlSlug = (event) => {
        const value = event.target.value;
        if (collection.slug == undefined) {
            setCollection((preValue) => {
                return {
                    ...preValue,
                    slug: value.toLowerCase().replace(/\s/g, '-')
                }
            })
        }
    }

    const updateProductIds = (e) => {
        const value = e.target.value
        setCollection((preValue) => {
            return {
                ...preValue,
                productIds: value
            }
        })

    }
    // fech claction data from db 
    useEffect(() => {
        if (collectionId !== 'new')
            db.collection('collections').doc(`${collectionId}`).get().then(querySnapshot => {
                const collectionDetaile = querySnapshot.data()
                setCollection((preValue) => {
                    return {
                        ...preValue,
                        title: collectionDetaile.title,
                        slug: collectionDetaile.slug,
                        image: collectionDetaile.image,
                        description: collectionDetaile.description,
                        productIds: collectionDetaile.productIds


                    }
                })
            })

    }, [])
    const types = ['image/png', 'image/jpeg', 'image/webp'];
    const collectionImageHandler = (e) => {
        const selectedFile = e.target.files[0];
        showFile(selectedFile, document.getElementById('slectfile'))
        if (selectedFile && types.includes(selectedFile.type)) {
            setCollection((preData) => {
                return {
                    ...preData,
                    image: selectedFile
                }
            })
        }
        else {
            newToast('imageErrror')
        }

    }
    function showFile(file, container) {
        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                container.src = e.target.result
            }
            reader.readAsDataURL(file);
            container.classList.add("show");
        }
    }
    // const addCollectionId = (cid) => {
    //     db.collection('Collection-Groups').doc(`${props.match.params.cgid}`).update({
    //         "collection": firebase.firestore .FieldValue.arrayUnion(`${cid}`)
    //     });
    // }
    const updateCollection = (url) => {
        collectionId = (collectionId == 'new') ? generateCollactionId() : collectionId
        db.collection('collections').doc(`${collectionId}`).set({
            "title": collection.title,
            "id": Number(collectionId),
            'image': url,
            'slug': collection.slug,
            'productIds': (collection.productIds.length > 0 && typeof collection.productIds == 'string') ? collection.productIds.split(',').map(Number) : collection.productIds,
            'description': collection.description

        }).then(() => {
            setCollection((preValue) => {
                return {
                    ...preValue,
                    title: '',
                    slug: '',
                    image: null,
                    description: '',
                    productIds: [],
                    id: collectionId

                }
            })
            newToast('success')
            // addCollectionId(collectionId);
            // window.open(`/admin/collection-groups/${props.match.params.cgid}/collection`, '_self')
        }).catch(err => {
            newToast(err.message)
        });



    }


    const addCollection = (e) => {
        e.preventDefault();
        db.collection('collections').where('slug', '==', collection.slug).onSnapshot(snapshot => {
            if (snapshot.docs.length > 0 && collectionId !== snapshot.docs[0].id) {
                newToast('slug')
                return
            }

            if (typeof collection.image == 'object') {
                if (collection.image == null) {
                    newToast('uploadImageError')
                    return
                }

                fStorage.ref(`product/${collection.image.name}`).put(collection.image);
                fStorage.ref("product").child(collection.image.name).getDownloadURL().then(url => {
                    updateCollection(url)
                })
            }
            else {
                updateCollection(collection.image)
            }
        })

    }


    return (
        <div className='add-Product-container'>
            <MToast />
            <Link to={'/admin/collections'} >
                <Button className="btn btn-success">back </Button>
            </Link>
            <h2>Collection</h2>
            <hr />
            <form className="form-group" autoComplete="off" onSubmit={(e) => {
                addCollection(e)
            }}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" className='add-Product-form' name="title" onBlur={(e) => fillUrlSlug(e)} onChange={setInputValue} value={collection.title} />
                <br />

                <div>
                    <label htmlFor="mainImage" className='file-control' >
                        <img id="slectfile" alt='slectfile' width="100%" height="100%" src={collection.image} className={collection.image ? "show" : ""} />
                        <BsPencilSquare className={collection.image ? "editImgBtn" : "hedden"} id="editImage" />
                    </label>
                    <input type="file" id="mainImage" className='form-control' name="mainImage" onChange={collectionImageHandler} />
                    <br />
                </div>
                <div className="urlCon">
                    <label htmlFor="slug">Slug</label>
                    <input type="text" name="slug" id="slug" className="form-control" onChange={setInputValue} value={collection.slug} />
                </div>
                <br />
                <label htmlFor="description">Description</label>
                <textarea name="description" className='add-Product-form' id="description" onChange={setInputValue} value={collection.description} />
                <br />
                <label htmlFor="productIds">ProductIds</label>
                <input type="text" id="productIds" className='add-Product-form' name="productIds" onChange={updateProductIds} value={collection.productIds} />
                <br />

                <Button type="submit" className=' btn-success btn-md ' >Add</Button>
            </form>
        </div>
    )
}

export default Collection
