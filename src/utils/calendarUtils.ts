import {
    addDays,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    getWeek,
    startOfISOWeek,
    startOfMonth,
    startOfWeek
} from "date-fns";

export const isToday = (calendarDate: Date): boolean => {
    return calendarDate.toLocaleDateString() === new Date().toLocaleDateString();
}

export const getAllDaysInMonth = (month: number, year: number): Date[] => {
    const firstDay = startOfMonth(new Date(year, month - 1));
    const lastDay = endOfMonth(firstDay);
    const firstCalendarDay = startOfWeek(firstDay, {weekStartsOn: 1});
    const lastCalendarDay = endOfWeek(lastDay, {weekStartsOn: 1});
    return eachDayOfInterval({start: firstCalendarDay, end: lastCalendarDay});
};

export const getAllDaysInWeek = (week: number, year: number) => {
    const firstMonday = startOfISOWeek(new Date(year, 0, 4));
    const mondayOfWeek = addDays(firstMonday, (week - 1) * 7);
    return eachDayOfInterval({
        start: mondayOfWeek,
        end: addDays(mondayOfWeek, 6)
    });
};

export const getWeekNumber = (date: Date): number => {
    return getWeek(date, {
        weekStartsOn: 1
    });
};