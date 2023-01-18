import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button, Card } from '@mui/material'
import ReactCrop, { Crop } from 'react-image-crop'

import './style.scss'
import 'react-image-crop/src/ReactCrop.scss'

type prop = {
    imgFile: File,
    setshowCropper: Function,
    setImage: Function
}
function ImageCrop({ imgFile, setshowCropper, setImage }: prop) {
    const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null)
    const [imageUri, setImageUri] = useState<any>('')
    const [crop, setCrop] = useState<Crop>({
        unit: 'px', // Can be 'px' or '%'
        x: 100,
        y: 100,
        width: 150,
        height: 150,
    })

    useEffect(() => {
        setImageUri(URL.createObjectURL(imgFile))
        if (imageRef) {
            imageRef.addEventListener('load', (e) => {
                // console.log(imageRef.naturalHeight);
                // console.log(imgFile);
            })
        }
    }, [imageRef])


    function handleShowCroper() {
        setshowCropper(false)
        setImageRef(null)
    }

    async function cropImage() {
        if (imageRef) {
            const canvas = document.createElement("canvas");
            const scaleX = imageRef.naturalWidth / imageRef.width;
            const scaleY = imageRef.naturalHeight / imageRef.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

            ctx.drawImage(
                imageRef,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            canvas.toBlob((blob) => {
                setImage(blob);
                handleShowCroper()
            },"image/jpeg");
            
        }
    }




    return (
        <div className='set-profile-croper'>
            <ReactCrop crop={crop} locked={true} onChange={c => setCrop(c)} keepSelection={true} minHeight={100} minWidth={100}>
                <img src={imageUri} id='image-crop' ref={image => setImageRef(image)} alt='img' />
            </ReactCrop>
            <div className="btns">
                <Button variant='outlined' onClick={() => handleShowCroper()} sx={{ borderColor: 'red', color: 'red' }}>Cancel</Button>
                <Button variant='outlined' onClick={cropImage} sx={{ borderColor: 'green', color: 'green' }}>Confirm</Button>
            </div>
        </div>
    )
}

export default ImageCrop