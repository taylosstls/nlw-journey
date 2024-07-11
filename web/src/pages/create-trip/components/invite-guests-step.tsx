import { ArrowRight, UserRoundPlus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/Button';

interface InviteGuestsStep {
  openGuestsModal: () => void;
  openConfirmTripModalOpen: () => void;
  emailsToInvite: EmailsInvite[];
}

interface EmailsInvite {
  email: string;
}

export function InviteGuestsStep({
  openConfirmTripModalOpen,
  openGuestsModal,
  emailsToInvite,
}: InviteGuestsStep) {
  const [validationMessage, setValidationMessage] = useState('');

  function handleConfirmTrip() {
    if (emailsToInvite.length === 0) {
      setValidationMessage(
        'Por favor, adicione pelo menos um e-mail para confirmar a viagem.',
      );
      return;
    }
    setValidationMessage('');
    openConfirmTripModalOpen();
  }

  return (
    <>
      <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
        <Button variant="guest" type="button" onClick={openGuestsModal}>
          <UserRoundPlus className="size-5 text-zinc-400" />
          {emailsToInvite.length > 0 ? (
            <span className="text-zinc-100 text-sm flex-1">
              {emailsToInvite.length}
              {emailsToInvite.length === 1
                ? ' pessoa convidada'
                : ' pessoas convidadas'}
            </span>
          ) : (
            <span className="text-zinc-400 text-sm flex-1">
              Quem estará na viagem?
            </span>
          )}
        </Button>

        <Button onClick={handleConfirmTrip}>
          Confirmar viagem
          <ArrowRight className="size-5" />
        </Button>
      </div>
      {validationMessage && (
        <div className="text-red-500 text-sm text-left">
          {validationMessage}
        </div>
      )}
    </>
  );
}
