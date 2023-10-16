'use client'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

export default function AddToFavourite() {
    const [favourited, setFavourited] = useState(false)

    return (
        <button  onClick={() => setFavourited(!favourited)}>
            {favourited ? <FavoriteIcon className="text-red-800"/> : <FavoriteBorderIcon className='text-red-800'/>}
             Favourite
        </button>
    )

}