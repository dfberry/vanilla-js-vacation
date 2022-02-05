const getHouses = async () =>{
    return Promise.resolve([
        {
            id: 1, 
            name: "Louisiana Lake House",
            src: "images/pexels-eberhard-grossgasteiger-2098405.jpg"
        },
        {
            id: 2, 
            name: "Texas Waterfront",
            src: "images/pexels-frans-van-heerden-1438832.jpg"
        },
        {
            id: 3,
            name: "Pacific Northwest Coastal Retreat",
            src: "pexels-matthis-2091166.jpg"
        }

    ])
}

module.exports = {
    getHouses
}