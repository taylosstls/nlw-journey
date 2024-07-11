import { FormEvent } from 'react';
import { DateRange } from 'react-day-picker';
import { Mail, User, X, Loader } from 'lucide-react';

import { Button } from '../../../components/Button';

import { formatDisplayedDate } from '../../../utils/format-date';
import { ErrorMessage } from '../../../components/ErrorMessage';

interface ConfirmTripModalProps {
  closeConfirmTripModalOpen: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  validationMessage: string | null;
  destination: string;
  eventStartAndEndDates: DateRange | undefined;
  isLoading: boolean;
}

export function ConfirmTripModal({
  closeConfirmTripModalOpen,
  createTrip,
  validationMessage,
  destination,
  eventStartAndEndDates,
  isLoading,
}: ConfirmTripModalProps) {
  const displayedDate = formatDisplayedDate(eventStartAndEndDates);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-5">
      <div className="w-full max-w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <Button
              variant="blank"
              type="button"
              onClick={closeConfirmTripModalOpen}
            >
              <X className="size-5 text-zinc-400" />
            </Button>
          </div>

          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para
            <span className="font-semibold text-zinc-100">
              {' ' + destination + ' '}
            </span>
            nas datas de
            <span className="font-semibold text-zinc-100">
              {' ' + displayedDate?.toLocaleLowerCase() + ' '}
            </span>
            preencha seus dados abaixo.
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-sm placeholder-zinc-400 outline-none flex-1"
              disabled={isLoading}
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="text-zinc-400 size-5" />
            <input
              type="text"
              name="email"
              placeholder="Seu e-mail pessoal"
              className="bg-transparent text-sm placeholder-zinc-400 outline-none flex-1"
              disabled={isLoading}
            />
          </div>

          <Button type="submit" size="full" disabled={isLoading}>
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              'Confirmar criação da viagem'
            )}
          </Button>
        </form>

        <ErrorMessage validationMessage={validationMessage} />
      </div>
    </div>
  );
}
