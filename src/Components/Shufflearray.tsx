import React, { useEffect } from 'react'

function Shufflearray() {
    const originalarray = [
        {
            name: "ha1",
            value: 1
        },
        {
            name: "ha2",
            value: 2
        },
        {
            name: "ha3",
            value: 3
        },
        {
            name: "ha4",
            value: 4
        }
        ,
        {
            name: "ha5",
            value: 5
        }

    ]
    useEffect(()=>{
        const shuffleArray = (array:any) => {
            const newArray = [...array]; // Create a copy to avoid mutating the original
            for (let i = newArray.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
            }
            return newArray;
          };
          shuffleArray(originalarray)
          console.log(shuffleArray(originalarray));
          
    })

    return (
        <div>

        </div>
    )
}

export default Shufflearray
