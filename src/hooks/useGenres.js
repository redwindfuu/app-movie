const useGenres = (ListGenrnes) => {
    if(ListGenrnes.length < 1) return ''
    const GeneresID = ListGenrnes.map((val) =>{
        return val.id
    })
    return GeneresID.reduce((acc, val) => acc +','+ val)
}

export default useGenres