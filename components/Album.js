const Album = ({ album }) => {
  return (
    <div className="rounded-lg bg-slate-900 cursor-pointer hover:scale-110 focus:scale-110 hover:bg-slate-800 focus:bg-slate-800 transition-all">
        <img className="rounded-t-lg" src={album?.images[0]?.url} alt="" />
        <div className="p-4">
            <h3 className="text-lg text-white">{album?.name}</h3>
            <p className="text-white text-md">{album?.artists[0]?.name}</p>
        </div>
    </div>
  )
}

export default Album