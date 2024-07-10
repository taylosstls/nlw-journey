import { ArrowRight, UserRoundPlus } from "lucide-react";
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { InviteGuestsModal } from './invite-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from "./steps/destination-and-date-step";

interface Suggestion {
  formatted: string;
}

interface EmailsInvite {
  email: string
}

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);


  const [emailsToInvite, setEmailsToInvite] = useState<EmailsInvite[]>([]);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

  useEffect(() => {
    if (query.length > 2) {
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&language=pt&pretty=1`)
        .then(response => response.json())
        .then(data => {
          setSuggestions(data.results.slice(0, 3));
        });
    } else {
      setSuggestions([]);
    }
  }, [query, apiKey]);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openConfirmTripModalOpen() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModalOpen() {
    setIsConfirmTripModalOpen(false);
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
    const emailsArray = emailsString.split(/[,;]+/).map(email => email.trim());

    // Expressão regular para validar e-mails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validar e adicionar e-mails únicos
    const newEmailsToAdd: EmailsInvite[] = [];
    const invalidEmails: string[] = [];
    const duplicateEmails: string[] = [];

    emailsArray.forEach(email => {
      if (email) {
        if (!emailRegex.test(email)) {
          invalidEmails.push(email);
        } else if (emailsToInvite.some(e => e.email === email)) {
          duplicateEmails.push(email);
        } else {
          newEmailsToAdd.push({ email });
        }
      }
    });

    if (newEmailsToAdd.length > 0) {
      setEmailsToInvite([...emailsToInvite, ...newEmailsToAdd]);
    }

    if (invalidEmails.length > 0) {
      setValidationMessage(
        invalidEmails.length === 1
          ? `E-mail ${duplicateEmails.join(', ')} inválido.`
          : `Os seguintes e-mails são inválidos: ${duplicateEmails.join(', ')}}`
      );
    } else if (duplicateEmails.length > 0) {
      setValidationMessage(
        duplicateEmails.length === 1
          ? `E-mail ${duplicateEmails.join(', ')} já está na lista.`
          : `Os seguintes e-mails já estão na lista: ${duplicateEmails.join(', ')}`
      );
    } else {
      setValidationMessage(null);
    }

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(e => e.email !== emailToRemove);

    setEmailsToInvite(newEmailList);
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    navigate('trips/123');
  }

  function handleSelectSuggestion(suggestion: Suggestion) {
    setQuery(suggestion.formatted);
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
            setQuery={setQuery}
            query={query}
          />

          {isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button type="button" onClick={openGuestsModal} className="flex items-center gap-2 flex-1 text-left">
                <UserRoundPlus className="size-5 text-zinc-400" />
                {emailsToInvite.length > 0 ? (
                  <span className="text-zinc-100 text-lg flex-1">
                    {emailsToInvite.length} {emailsToInvite.length === 1 ? 'pessoa convidada' : 'pessoas convidadas'}
                  </span>
                ) :
                  <span className="text-zinc-400 text-lg flex-1">Quem estará na viagem?</span>}
              </button>

              <div className="w-px h-6 bg-zinc-800" />

              <button onClick={openConfirmTripModalOpen} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400 transition-colors duration-300">
                Confirmar viagem
                <ArrowRight className="size-5" />
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
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
        />
      )}

    </div>
  );
}

