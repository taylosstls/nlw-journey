import { MapPin, Calendar, ArrowRight } from 'lucide-react'

export function App() {

  return (
    <div className="w-full h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center bg-contain">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="Plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="h-16 bg-zinc-900 px-4 gap-3 rounded-xl flex items-center shadow-shape">
          <div className='flex items-center gap-2 flex-1'>
            <MapPin className='size-5 text-zinc-400' />
            <input type="text" className="bg-transparent text-lg outline-none flex-1 placeholder:text-zinc-400" placeholder="Para onde você vai?" />
          </div>

          <div className='flex items-center gap-2'>
            <Calendar className='size-5 text-zinc-400' />
            <input type="text" className="bg-transparent text-lg outline-none w-40 placeholder:text-zinc-400" placeholder="Quando?" />
          </div>

          <div className='w-px h-6 bg-zinc-800' />

          <button className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
            Continuar
            <ArrowRight className='size-5' />

          </button>
        </div>

        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </p>
      </div>
    </div>
  )
}
