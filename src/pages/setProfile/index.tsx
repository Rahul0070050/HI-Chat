import React, { ChangeEvent, useLayoutEffect, useState } from 'react'
import { Button, Card, FormControl, InputAdornment, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import ImageCrop from '../../components/imageCrop'
import { auth, uploadProfile } from '../../firebase/config'

import './style.scss'

function SetProfile() {
    const location = useNavigate()
    const [userData, setuserData] = useState({ username: '', about: `I'm Using HI`, mobile: '', email: '', uid: '' })
    const [userDataErr, setuserDataErr] = useState({ username: false, mobile: false })
    const [image, setImage] = useState<any>()
    const [imageURI, setImageURI] = useState<Blob | undefined>(undefined)
    const [profileImage, setProfileImage] = useState<any>('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIsAAACLCAMAAABmx5rNAAAAMFBMVEXk5ueutLfo6uunrrGrsbTJzc/BxsjT1ti5vsHe4OGxt7rP0tTa3d7h4+S8wcTX2ttehllwAAADC0lEQVR4nO2a23LrIAxFQTYXgy///7cHbDdN2zhIxJI9c1gvTd/WbAQGhFKNRqPRaDQajUaj0Wj8JwCAmrYfV4uoxdjZez/PNo4X6sAQfdf3vV5JP7rZTZfowGDDrvGg74NR4jbJpPttsuloI60S9UuTzWYUjcYemqw2Rk5m+FMov2VmKZXxvYikDEIlyXiJYZowKkLJeJyLQAHD+xn0Q8YxqzisSYbZhaLSW85RAoMeoVVmYXQZAkUlzSW+YIixJJmRzUXRTHLFcJmAI8aSZLhc1Ex3iVwVQ1bRmqt6l47uEiYWFcLy/wTPEgPYr+IzfWRxmWgL3e7C8x0gLro7PHsq1H7uLywuS5VKx+JCX3X5XJYbudwqlxoVJpc7zaM7rS93Wnfv9D0i73ZXmI4C4332L/Stt+bb1xVuo17Btt+91TmAdJpeVdjOR/c6NxKXO87zNDkYxliSDCUY3vsX4oaK+cKOMErc93X5C4mUkbiIx97v8i0tTwwoFZF7bwWIVUauOVHuk4gM0I59u5Xhu416BbjjaPowyLYcYTrqNzLtcEs2L/qw3lzTpIbJ+bUvvWmkP3aR7wg/bEAtcW3cz9Zc2rffbJ64TCJrTGOKxdiMMdEtg7xRklii9brr8nOGb9L/OtjoBqFHH6AmZ0PQ/dH6kos4zJHdB2A0/ljj5+y2js8mi6A8HjppjrO8QQGI/vg9xXE657/6gMmUvs2HOvbUZx/JhBzJk40+0QZiZSZPNufUDbgPMnnY9Ce8XUpf489NVhv/6UCdEsqXzYeHlJNC2WV8/YYPFPZchpXRS6UM1F26v6WrGyfa8xIsVXcPUNeiKVKRTMU9IRJyMlyprDK0ZAB1fq+WoR0rq9ozeAhTG+gPOmgEtAu4iiYECfxla1XTiiiDHKW69xxEAi6WUUAFObHZC3eXwcQycBfu7oIIRqRaMojun8Ak2kA8kIxCsSBugGEWUkFUL0jFknsXhWBEFpfdpTCTQKxcEoV7erEZnfGFepEr3fIKEzpBhkIwIEhBpdFoNBqNK/gH2kAk3HwBy34AAAAASUVORK5CYII=')
    const [showCropper, setshowCropper] = useState(false)
    let profileInputRef: any;


    useLayoutEffect(() => {
        const unSub = auth.onAuthStateChanged((user) => {
            if (user) {
                const email = auth.currentUser?.email || ''
                const image = auth.currentUser?.photoURL || ''
                const username = auth.currentUser?.displayName || ''
                setuserData(prev => {
                    return {
                        ...prev,
                        email,
                        username
                    }
                })
                if(image) {
                    setProfileImage(`${image}`)
                }
            } else {
                location('/')
            }
        })
        return () => {
            unSub()
        }
    }, [])


    function handleSubmit() {
        try {

            if (userData.username === '' || 'number' !== typeof (Number(userData.mobile)) || userData.mobile.length !== 10) {
                console.log(imageURI);
                setuserDataErr(prev => {
                    return {
                        ...prev,
                        username: userData.username === '' ? true : false,
                        mobile: userData.mobile === '' ? true : false
                    }
                })
                return
            } else {
                console.log('userdata from set profile ', userData);
                uploadProfile({ username: userData.username, mobile: userData.mobile, about: userData.about, file: imageURI }).then(() => {
                    location('/')
                })
            }
        } catch (error) {
            alert()
        }
    }

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setuserData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }


    function changeProfile() {
        profileInputRef.click()
    }


    function handleProfileOnchange(file: React.FormEvent<HTMLInputElement>) {
        const imageFile = file.currentTarget.files
        if (imageFile?.length == 1) {
            setshowCropper(true)
            setImage(imageFile[0])
        }
    }


    return (
        <div className='set-profile'>
            <div className="set-profile-header">
                <Typography className='username'>Hi, {userData.username ? userData.username : ''}</Typography>
                <input type="file" accept='image/*' onChange={(e) => handleProfileOnchange(e)} ref={input => profileInputRef = input} name="" id="" />
                <img
                    onClick={changeProfile}
                    alt="Remy Sharp"
                    src={imageURI ? URL.createObjectURL(imageURI) : profileImage}
                />
            </div>
            {showCropper && <div className="crop-image-background">
                <Card className="crop-image" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ImageCrop setshowCropper={setshowCropper} setImage={setImageURI} imgFile={image} />
                </Card>
            </div>}
            <div className="set-profile-body">
                <form>
                    <div className="text-field">
                        <div className='username-err'>{userDataErr.username ? 'invalid username' : ''}</div>
                        <TextField name='username' value={userData.username} onChange={handleOnChange} variant='standard' placeholder="Username" />
                        <TextField variant='standard' value={userData.email} placeholder="Email" disabled />
                        <TextField name='about' onChange={handleOnChange} variant='standard' defaultValue="I'm Using HI" placeholder="About" />
                        <div className='mobile-err'>{userDataErr.mobile ? 'invalid Number' : ''}</div>
                        <TextField
                            onChange={handleOnChange}
                            type="number"
                            name='mobile'
                            id="input-with-icon-textfield"
                            placeholder='mobile'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        +91
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </div>
                    <FormControl sx={{ m: '1.5rem' }}>
                        <Button onClick={handleSubmit} sx={{ borderColor: "rebeccapurple", color: "rebeccapurple" }} variant="outlined">Continue</Button>
                    </FormControl>
                </form>
            </div>
        </div>
    )
}

export default SetProfile