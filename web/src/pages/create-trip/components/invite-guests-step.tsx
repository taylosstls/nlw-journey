import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/Button";

interface InviteGuestsStep {
  openGuestsModal: () => void;
  openConfirmTripModalOpen: () => void;
  emailsToInvite: EmailsInvite[];
}

interface EmailsInvite {
  email: string
}

export function InviteGuestsStep({ openConfirmTripModalOpen, openGuestsModal, emailsToInvite }: InviteGuestsStep) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <Button variant="guest" type="button" onClick={openGuestsModal}>
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-zinc-100 text-lg flex-1">
            {emailsToInvite.length} {emailsToInvite.length === 1 ? 'pessoa convidada' : 'pessoas convidadas'}
          </span>
        ) :
          <span className="text-zinc-400 text-lg flex-1">Quem estará na viagem?</span>}
      </Button>

      <Button onClick={openConfirmTripModalOpen}>
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  )
}