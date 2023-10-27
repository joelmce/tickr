'use client'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AddToFavourite() {
    const [favourited, setFavourited] = useState(false)

    // const handleFavourite = async () => {
    //     const supabase = createClientComponentClient()
    //     const { data: {user}} = await supabase.auth.getUser()

    //     const { error } = await supabase.from("Favourites").insert({
    //         id: user.id,
    //     })
    // }

    return (
        <button  onClick={() => setFavourited(!favourited)}>
            {favourited ? <FavoriteIcon className="text-red-800"/> : <FavoriteBorderIcon className='text-red-800'/>}
             Favourite
        </button>
    )

}