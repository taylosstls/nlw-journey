import { Calendar, MapPin, Settings2 } from 'lucide-react';

import { Button } from '../../../components/Button';

import { formatDisplayedDate } from '../../../utils/format-date';

import { Trip } from '../../../types/trip';

interface HeaderDestinationAndDateProps {
  destinationInfo: Trip | undefined
}

export function HeaderDestinationAndDate({ destinationInfo }: HeaderDestinationAndDateProps) {
  const displayedDate = destinationInfo
    ? formatDisplayedDate({
      from: new Date(destinationInfo.starts_at),
      to: new Date(destinationInfo.ends_at),
    })
    : null;
  return (
    <div className="w-full px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{destinationInfo?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}
