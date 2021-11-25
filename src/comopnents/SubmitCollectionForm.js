import React, { useState } from 'react';
import CollectionTypeDropdown from './CollectionTypeDropdown';
import { db, fStorage } from './confing/confing';
import firebase from 'firebase/compat/app';

const SubmitForm = () => {
    const [collections, setCollections] = useState({
        type: "",
        cards: [],
        title: ""
    });
    const [cards, setCard] = useState({
        image: null,
        url: "",
        error: ""
    });

    const types = ['image/png', 'image/jpeg'];
    const imageHandler = (e) => {
        const selectedFile = e.target.files[0];
        renderFile(selectedFile, document.getElementById('slectfile'))
        if (selectedFile && types.includes(selectedFile.type)) {
            setCard((preData) => {
                return {
                    ...preData,
                    image: selectedFile
                }
            })
        }
        else {
            setCard((preData) => {
                return {
                    ...preData,
                    image: null,
                    error: "Please select a valid image type (png,jpg)"
                }
            })

        }

    }

    const getUrlData = (e) => {
        const url = e.target.value;
        setCard((preData) => {
            return {
                ...preData,
                url: url
            }
        })

    }
    function renderFile(file, container) {
        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                container.src = e.target.result
            }

            reader.readAsDataURL(file);
            // container.style.display = 'block'
            container.classList.add("show");
        }
    }

    const SubmitForm = (e) => {
        e.preventDefault();
        if (cards.error) {
            return;
        }

        const uplodTask = fStorage.ref(`images/collections/${cards.image.name}`).put(cards.image);

        uplodTask.on(`State_changed`, snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress)
        }, err => {
            cards.error = err.message
        }, () => {
            fStorage.ref('images/collections').child(cards.image.name).getDownloadURL().then(imageUrl => {
                const newCollecton = {
                    ...cards,
                    id: collections.type + "_" + collections.cards.length,
                    image: imageUrl
                }
                delete newCollecton.error

                const collectionDoc = db.collection('homepage_cards').doc(collections.type);
                let dbResposne = null;
                if (collections.cards.length) {
                    dbResposne = collectionDoc.update({
                        "cards": firebase.firestore.FieldValue.arrayUnion(newCollecton)
                    });
                }
                else {
                    dbResposne = collectionDoc.set({
                        "type": collections.type,
                        "title": collections.title,
                        "cards": [newCollecton]
                    });
                }

                dbResposne
                    .then(() => {
                        document.getElementById("imageFill").value = null;
                        document.getElementById('slectfile').classList.remove('show')
                        setCard(() => {
                            return {
                                image: null,
                                url: "",
                                error: ""
                            }
                        });
                        setCollections(() => {
                            const updatedCollecitons = { ...collections };
                            updatedCollecitons.cards.push(newCollecton);
                            return updatedCollecitons;
                        })
                    })
            }).catch(err => {
                cards.error = err.message
            })
        })
    }

    return (
        <>
            <div>
                <form onSubmit={SubmitForm}>
                    <CollectionTypeDropdown collections={collections} setCollections={setCollections} />
                    <div className="homepage-cards">

                        <div className="homepage-card">
                            <div>
                                <label htmlFor="imageFill" className='file-control'>
                                    <img id="slectfile" alt='slectfile' width="100%" height="100%"/>
                                </label>
                                <input type="file" name="imageFill" id="imageFill" className='form-control' onChange={imageHandler} />
                            </div>


                            <div className="urlCon">
                                <label htmlFor="url">URL:-</label>
                                <input type="url" name="url" id="url" className="form-control" onChange={getUrlData} value={cards.url} />
                                {cards.error && <span className='error-msg'>{cards.error}<br /></span>}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='btn'>Save</button>

                </form>
            </div>





        </>
    )
}

export default SubmitForm
