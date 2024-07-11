import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';

export function formatDisplayedDate(
  eventStartAndEndDates: DateRange | undefined,
): string | null {
  if (!eventStartAndEndDates || !eventStartAndEndDates.from) {
    return null;
  }

  return eventStartAndEndDates.to &&
    eventStartAndEndDates.to > eventStartAndEndDates.from
    ? format(eventStartAndEndDates.from, 'dd/MM', { locale: ptBR })
      .concat(' até ')
      .concat(format(eventStartAndEndDates.to, 'dd/MM', { locale: ptBR }))
    : format(eventStartAndEndDates.from, "d' de 'LLLL", { locale: ptBR });
}
