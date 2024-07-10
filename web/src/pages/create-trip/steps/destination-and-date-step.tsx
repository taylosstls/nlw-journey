import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface DestinationAndDateStepProps {
  closeGuestsInput: () => void;
  handleSelectSuggestion: (string: Suggestion) => void;
  openGuestsInput: () => void;
  setQuery: Dispatch<SetStateAction<string>>;
  isGuestsInputOpen: boolean;
  suggestions: Suggestion[];
  query: string;
}

interface Suggestion {
  formatted: string;
}

export function DestinationAndDateStep({ closeGuestsInput, handleSelectSuggestion, openGuestsInput, setQuery, isGuestsInputOpen, suggestions, query }: DestinationAndDateStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1 relative">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 truncate"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

      <div className="flex items-center gap-2">
        <Calendar className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Quando?"
          className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
        />
      </div>

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <button onClick={closeGuestsInput} className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700 transition-colors duration-300">
          Alterar local/data
          <Settings2 className="size-5" />
        </button>
      ) : (
        <button onClick={openGuestsInput} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400 transition-colors duration-300">
          Continuar
          <ArrowRight className="size-5" />
        </button>
      )}
    </div>
  )
}