import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../../components/Button";

interface CreateActivityModal {
  closeCreateActivyModalOpen: () => void;
}

export function CreateActivityModal({ closeCreateActivyModalOpen, }: CreateActivityModal) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-5">
      <div className="w-full max-w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Cadastrar atividade</h2>
            <Button variant="blank" type="button" onClick={closeCreateActivyModalOpen}>
              <X className="size-5 text-zinc-400" />
            </Button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              type="text"
              name="title"
              placeholder="Qual a atividade?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="w-full flex items-center gap-2">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 flex-1">
              <Calendar className="text-zinc-400 size-5" />
              <input
                type="datetime-local"
                name="occurs_at"
                placeholder="Data e horário da atividade"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>
          </div>

          <Button type="submit" size="full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  )
}