export function formatIndonesianDate(dateString: string): string {
  try {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ]
    
    // Parse the date (adding midday time to prevent timezone offset issues)
    const date = new Date(`${dateString}T12:00:00`)
    if (isNaN(date.getTime())) return dateString
    
    const dayName = days[date.getDay()]
    const dayNum = date.getDate()
    const monthName = months[date.getMonth()]
    const year = date.getFullYear()
    
    return `${dayName}, ${dayNum} ${monthName} ${year}`
  } catch (e) {
    return dateString
  }
}

export function getCalendarDates(dateString: string, akadTime: string): { start: string; end: string } {
  // Return format suitable for Google Calendar link
  // e.g. 20260815T080000 / 20260815T130000
  try {
    const cleanDate = dateString.replace(/-/g, '')
    // Parse time like "08:00 - 10:00 WIB"
    const times = akadTime.split('-')
    const startTimeRaw = times[0]?.trim() || '08:00'
    const endTimeRaw = times[1]?.trim().split(' ')[0] || '13:00'
    
    const startHour = startTimeRaw.replace(':', '') + '00'
    const endHour = endTimeRaw.replace(':', '') + '00'
    
    return {
      start: `${cleanDate}T${startHour}`,
      end: `${cleanDate}T${endHour}`
    }
  } catch (e) {
    return { start: '20260815T080000', end: '20260815T130000' }
  }
}
