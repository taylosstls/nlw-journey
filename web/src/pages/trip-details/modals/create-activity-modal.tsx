import { FormEvent, useState } from 'react';
import { Calendar, Loader, Tag, X } from 'lucide-react';
import DateTimePicker from 'react-datetime-picker';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import { Button } from '../../../components/Button';
import { ErrorMessage } from '../../../components/ErrorMessage';

import { api } from '../../../lib/axios';

import { Trip } from '../../../types/trip';


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CreateActivityModalProps {
  closeCreateActivyModalOpen: () => void;
  tripId: string | undefined;
  timeInfo: Trip | undefined
}

export function CreateActivityModal({
  tripId,
  timeInfo,
  closeCreateActivyModalOpen,
}: CreateActivityModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [dataPicker, setDataPicker] = useState<Value>(new Date());


  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    const title = data.get('title')?.toString();

    try {
      if (!title?.trim()) {
        setValidationMessage('Informe a atividade.');
        setIsLoading(false);
        return;
      } else if (!dataPicker) {
        setValidationMessage('Informe o horário da atividade.');
        setIsLoading(false);
        return;
      }
      setValidationMessage('');

      await api.post(`/trips/${tripId}/activities`, {
        title,
        occurs_at: dataPicker,
      });

      closeCreateActivyModalOpen();
    } catch (error) {
      console.error('Erro ao criar atividade:', error);
      setValidationMessage('Erro ao criar atividade. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

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

        <form onSubmit={createActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              type="text"
              name="title"
              placeholder="Qual a atividade?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              disabled={isLoading}
            />
          </div>

          <div className="w-full flex items-center gap-2">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 flex-1">
              <Calendar className="text-zinc-400 size-5" />
              <DateTimePicker className="bg-transparent border-none text-lg placeholder-zinc-400 outline-none flex-1" onChange={setDataPicker} value={dataPicker} locale="pt-BR" minDate={new Date(timeInfo ? timeInfo.starts_at : '')} maxDate={new Date(timeInfo ? timeInfo.ends_at : '')} />
            </div>
          </div>

          <div>

          </div>

          <Button type="submit" size="full" disabled={isLoading}>
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              'Salvar atividade'
            )}
          </Button>
        </form>

        <ErrorMessage validationMessage={validationMessage} />
      </div>
    </div>
  );
}
