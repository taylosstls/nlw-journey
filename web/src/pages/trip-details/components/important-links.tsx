import { Link2, Plus } from "lucide-react";
import { Button } from "../../../components/Button";

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <span className="block font-medium text-zinc-100">Reserva do AirBNB</span>
            <a href="#" className="block text-sm text-zinc-400 truncate transition-colors duration-300 hover:text-zinc-200">https://www.airbnb.com.br/rooms/104700011104700011</a>
          </div>
          <a href="#">
            <Link2 className="size-5 text-zinc-400 transition-colors duration-300 hover:text-zinc-200" />
          </a>
        </div>
      </div>

      <Button variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  )
}