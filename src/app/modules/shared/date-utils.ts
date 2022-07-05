export namespace DateUtils {
  export function duration(createdAt?: Date): string {
    const now = new Date();
    const milliSeconds = now.getTime() - (createdAt || new Date())?.getTime();

    const seconds = Math.floor(milliSeconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0)
      if (days == 1) return `قبل يوم`;
      else return `قبل ${days} أيام`;
    if (hours > 0)
      if (hours == 1) return `قبل ساعة`;
      else return `قبل ${hours} ساعات`;
    if (minutes > 0)
      if (minutes == 1) return `قبل دقيقة`;
      else return `قبل ${minutes} دقائق`;
    if (seconds > 0)
      if (seconds == 1) return `قبل ثانية`;
      else return `قبل ${seconds} ثواني`;
    return '';
  }
}
