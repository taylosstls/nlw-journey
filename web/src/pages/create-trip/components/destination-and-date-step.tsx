import { ArrowRight, Calendar, MapPin, Settings2, X } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import { ptBR } from 'date-fns/locale';

import 'react-day-picker/dist/style.css';

import { Button } from '../../../components/Button';

import { formatDisplayedDate } from '../../../utils/format-date';
import { ErrorMessage } from '../../../components/ErrorMessage';

interface DestinationAndDateStepProps {
  closeGuestsInput: () => void;
  handleSelectSuggestion: (string: Suggestion) => void;
  openGuestsInput: () => void;
  setDestination: Dispatch<SetStateAction<string>>;
  isGuestsInputOpen: boolean;
  suggestions: Suggestion[];
  destination: string;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
  eventStartAndEndDates: DateRange | undefined;
}

interface Suggestion {
  formatted: string;
}

export function DestinationAndDateStep({
  closeGuestsInput,
  handleSelectSuggestion,
  openGuestsInput,
  setDestination,
  isGuestsInputOpen,
  suggestions,
  destination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  function openDatePicker() {
    return setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false);
  }

  function handleOpenGuestsInput() {
    if (!destination && !eventStartAndEndDates?.from) {
      setValidationMessage('Informe o destino e selecione uma data.');
      return;
    } else if (!destination) {
      setValidationMessage('Informe o destino de viagem.');
      return;
    } else if (!eventStartAndEndDates?.from) {
      setValidationMessage('Selecione a data de viagem.');
      return;
    }

    setValidationMessage('');
    openGuestsInput();
  }

  const displayedDate = formatDisplayedDate(eventStartAndEndDates);

  return (
    <>
      <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
        <div className="flex items-center gap-2 flex-1 relative">
          <MapPin className="size-5 text-zinc-400" />
          <input
            disabled={isGuestsInputOpen}
            type="text"
            placeholder="Para onde você vai?"
            className="bg-transparent text-sm placeholder-zinc-400 outline-none flex-1 truncate"
            onChange={(e) => setDestination(e.target.value)}
          />
          {suggestions.length > 0 && (
            <ul className="absolute top-full mt-2 left-0 w-full bg-zinc-900 border border-zinc-200 rounded-md z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="text-left text-sm text-zinc-200 px-4 py-2 hover:bg-zinc-200 hover:text-zinc-900 transition-colors duration-300 cursor-pointer"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  {suggestion.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Button
          variant="blank"
          onClick={openDatePicker}
          disabled={isGuestsInputOpen}
          className="flex items-center gap-2 text-left"
        >
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-sm text-zinc-400 w-40">
            {displayedDate ? displayedDate : 'Quando?'}
          </span>
        </Button>

        {isDatePickerOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-5">
            <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="font-lg font-semibold">Selecione a data</h2>
                  <Button
                    variant="blank"
                    type="button"
                    onClick={closeDatePicker}
                  >
                    <X className="size-5 text-zinc-400" />
                  </Button>
                </div>
              </div>

              <DayPicker
                numberOfMonths={2}
                showOutsideDays
                mode="range"
                selected={eventStartAndEndDates}
                onSelect={setEventStartAndEndDates}
                locale={ptBR}
              />
            </div>
          </div>
        )}

        <div className="w-px h-6 bg-zinc-800" />

        {isGuestsInputOpen ? (
          <Button onClick={closeGuestsInput} variant="secondary">
            Alterar local/data
            <Settings2 className="size-5" />
          </Button>
        ) : (
          <Button onClick={handleOpenGuestsInput}>
            Continuar
            <ArrowRight className="size-5" />
          </Button>
        )}
      </div>
      <ErrorMessage validationMessage={validationMessage} />
    </>
  );
}
