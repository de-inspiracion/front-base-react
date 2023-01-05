const CardV: any  = ({itemData, key}: any) => {

  return (
    <div key={key} className="movieRow--item">
        <img src={`https://image.tmdb.org/t/p/w300${itemData.poster_path}`}/>
    </div>
  )
}

export default CardV;