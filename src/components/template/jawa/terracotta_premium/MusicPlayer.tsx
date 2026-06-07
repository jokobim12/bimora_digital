interface MusicPlayerProps {
  playing: boolean
  onToggle: () => void
}

export default function MusicPlayer({ playing, onToggle }: MusicPlayerProps) {
  return (
    <button
      className="w-10 h-10 bg-[#FAF6EC]/90 hover:bg-[#F2EAD6] border border-[#8B3D30]/30 hover:border-[#8B3D30] rounded-full text-[#8B3D30] flex items-center justify-center transition-all duration-300 active:scale-95 shadow-md backdrop-blur-md"
      onClick={onToggle}
      aria-label={playing ? 'Matikan musik' : 'Nyalakan musik'}
    >
      <div className="flex gap-[2.5px] items-end h-3.5">
        <div className={`w-[2.5px] rounded-[1px] bg-[#8B3D30] ${playing ? 'music-bar-1' : 'h-1'}`} />
        <div className={`w-[2.5px] rounded-[1px] bg-[#8B3D30] ${playing ? 'music-bar-2' : 'h-1.5'}`} />
        <div className={`w-[2.5px] rounded-[1px] bg-[#8B3D30] ${playing ? 'music-bar-3' : 'h-1'}`} />
        <div className={`w-[2.5px] rounded-[1px] bg-[#8B3D30] ${playing ? 'music-bar-4' : 'h-2'}`} />
      </div>
    </button>
  )
}
