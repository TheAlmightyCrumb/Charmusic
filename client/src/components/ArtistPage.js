import React from 'react'

export default function ArtistPage({match}) {
    
    console.log(match);

    return (
        <div>
            {match.params.id}
        </div>
    )
}
