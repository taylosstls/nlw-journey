import { useState } from "react";
import { Plus } from "lucide-react";

import { ImportantLinks } from "./components/important-links";
import { GuestsConfirmList } from "./components/guests-confirm-list";
import { ActivitiesList } from "./components/activities-list";
import { HeaderDestinationAndDate } from "./components/header-destination-and-date";

import { CreateActivityModal } from "./modals/create-activity-modal";
import { Button } from "../../components/Button";

export function TripDetailsPage() {
  const [isCreateActivyModalOpen, setIsCreateActivyModalOpen] = useState(false);

  function openCreateActivyModalOpen() {
    setIsCreateActivyModalOpen(true)
  }

  function closeCreateActivyModalOpen() {
    setIsCreateActivyModalOpen(false)
  }

  return (
    <div className="max-w-6xl w-full px-6 py-10 mx-auto space-y-8">
      <HeaderDestinationAndDate />

      <main className="w-full flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <Button onClick={openCreateActivyModalOpen}>
              <Plus className="size-5" />
              Cadastrar atividade
            </Button>
          </div>

          <ActivitiesList />
        </div>

        <aside className="w-80 space-y-6">
          <ImportantLinks />

          <div className="w-full h-px bg-zinc-800" />

          <GuestsConfirmList />
        </aside>
      </main>

      {isCreateActivyModalOpen && (
        <CreateActivityModal
          closeCreateActivyModalOpen={closeCreateActivyModalOpen}
        />
      )}

    </div>
  )
}