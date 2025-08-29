const timeZone = 'Asia/Jakarta';

// Helper to format parts into dd/MM/yyyy, HH:mm
const formatParts = (parts: Intl.DateTimeFormatPart[]): string => {
    const map = new Map(parts.map(p => [p.type, p.value]));
    const day = map.get('day');
    const month = map.get('month');
    const year = map.get('year');
    const hour = map.get('hour');
    const minute = map.get('minute');
    if(hour && minute) {
        return `${day}/${month}/${year}, ${hour}:${minute}`;
    }
    return `${day}/${month}/${year}`;
}

export function formatDateTimeShort(isoString: string | null | undefined): string {
    if (!isoString) return 'N/A';
    try {
        const date = new Date(isoString);
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, timeZone };
        const formatter = new Intl.DateTimeFormat('id-ID', options);
        return `${formatParts(formatter.formatToParts(date))} WIB`;
    } catch (e) { return 'Invalid Date'; }
}

export function formatDateTimeLong(isoString: string | null | undefined): string {
  if (!isoString) return 'N/A';
  try {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, timeZone };
    return new Intl.DateTimeFormat('id-ID', options).format(date) + ' WIB';
  } catch (e) { return 'Invalid Date'; }
}

export function formatDateOnlyShort(isoString: string | null | undefined): string {
    if (!isoString) return 'N/A';
    try {
        const date = new Date(isoString);
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone };
        const formatter = new Intl.DateTimeFormat('id-ID', options);
        const parts = formatter.formatToParts(date);
        const map = new Map(parts.map(p => [p.type, p.value]));
        return `${map.get('day')}/${map.get('month')}/${map.get('year')}`;
    } catch(e) { return 'Invalid Date'; }
}
