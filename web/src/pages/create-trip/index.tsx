import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { DestinationAndDateStep } from './components/destination-and-date-step';
import { InviteGuestsStep } from './components/invite-guests-step';

import { InviteGuestsModal } from './modals/invite-guests-modal';
import { ConfirmTripModal } from './modals/confirm-trip-modal';

import { isValidEmail } from '../../utils/validate-email';
import { DateRange } from 'react-day-picker';

interface Suggestion {
  formatted: string;
}

interface EmailsInvite {
  email: string;
}

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  const [emailsToInvite, setEmailsToInvite] = useState<EmailsInvite[]>([]);
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (destination.length > 2) {
      timeoutId = setTimeout(() => {
        fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${destination}&key=${apiKey}&language=pt&pretty=1`,
        )
          .then((response) => response.json())
          .then((data) => {
            setSuggestions(data.results.slice(0, 3));
          });
      }, 1000);
    } else {
      setSuggestions([]);
    }

    return () => {
      clearTimeout(timeoutId); // Limpando o timeout para evitar execução indesejada
    };
  }, [destination, apiKey]);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
    setValidationMessage('');
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
    setValidationMessage('');
  }

  function openConfirmTripModalOpen() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModalOpen() {
    setIsConfirmTripModalOpen(false);
    setValidationMessage('');
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const emailsString = data.get('email')?.toString();

    if (!emailsString?.trim()) {
      setValidationMessage('Por favor, insira um e-mail.');
      event.currentTarget.reset();
      return;
    }

    // Dividir a string de e-mails usando os separadores "," e ";"
    const emailsArray = emailsString
      .split(/[,;]+/)
      .map((email) => email.trim());

    // Validar e adicionar e-mails únicos
    const newEmailsToAdd: EmailsInvite[] = [];
    const invalidEmails: string[] = [];
    const duplicateEmails: string[] = [];

    emailsArray.forEach((email) => {
      if (email) {
        if (!isValidEmail(email)) {
          invalidEmails.push(email);
        } else if (emailsToInvite.some((e) => e.email === email)) {
          duplicateEmails.push(email);
        } else {
          newEmailsToAdd.push({ email });
        }
      }
    });

    if (newEmailsToAdd.length > 0) {
      setEmailsToInvite([...emailsToInvite, ...newEmailsToAdd]);
      setValidationMessage('');
    }

    if (invalidEmails.length > 0) {
      setValidationMessage(
        invalidEmails.length === 1
          ? `E-mail ${invalidEmails.join(', ')} inválido.`
          : `Os seguintes e-mails são inválidos: ${invalidEmails.join(', ')}`,
      );
    } else if (duplicateEmails.length > 0) {
      setValidationMessage(
        duplicateEmails.length === 1
          ? `E-mail ${duplicateEmails.join(', ')} já está na lista.`
          : `Os seguintes e-mails já estão na lista: ${duplicateEmails.join(', ')}`,
      );
    } else {
      setValidationMessage('');
    }

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (e) => e.email !== emailToRemove,
    );

    setEmailsToInvite(newEmailList);
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name')?.toString();
    const email = data.get('email')?.toString();

    console.log(destination);
    console.log(eventStartAndEndDates);
    console.log(emailsToInvite);
    console.log(name);
    console.log(email);

    if (!name?.trim() && !email?.trim()) {
      setValidationMessage(
        'Por favor, preencha seu nome completo e e-mail pessoal.',
      );
      return;
    } else if (!name?.trim()) {
      setValidationMessage('Por favor, preencha seu nome completo.');
      return;
    } else if (!email?.trim()) {
      setValidationMessage('Por favor, preencha seu e-mail pessoal.');
      return;
    } else if (!isValidEmail(email)) {
      setValidationMessage('Por favor, insira um e-mail válido.');
      return;
    }

    // Resetar a mensagem de validação antes de prosseguir
    setValidationMessage(null);

    navigate('trips/123');
  }

  function handleSelectSuggestion(suggestion: Suggestion) {
    setDestination(suggestion.formatted);
    setSuggestions([]);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            suggestions={suggestions}
            handleSelectSuggestion={handleSelectSuggestion}
            openGuestsInput={openGuestsInput}
            setDestination={setDestination}
            destination={destination}
            setEventStartAndEndDates={setEventStartAndEndDates}
            eventStartAndEndDates={eventStartAndEndDates}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              openGuestsModal={openGuestsModal}
              openConfirmTripModalOpen={openConfirmTripModalOpen}
              emailsToInvite={emailsToInvite}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          <br />
          com nossos{' '}
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>{' '}
          e{' '}
          <a className="text-zinc-300 underline" href="#">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          removeEmailFromInvites={removeEmailFromInvites}
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          validationMessage={validationMessage}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModalOpen={closeConfirmTripModalOpen}
          createTrip={createTrip}
          validationMessage={validationMessage}
          destination={destination}
          eventStartAndEndDates={eventStartAndEndDates}
        />
      )}
    </div>
  );
}
