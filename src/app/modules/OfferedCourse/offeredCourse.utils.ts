
import { TSchedule } from './offeredCourse.interface';

const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newSchedule: TSchedule,
) => {
    for (const schedule of assignedSchedules) {
        const existingStartTime = new Date(`1970-01-01T${schedule.startTime}:00`);
        const existingEndTime = new Date(`1970-01-01T${schedule.endTime}:00`);
        const newStartingTime = new Date(`1970-01-01T${newSchedule.startTime}:00`);
        const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}:00`);
        if (newStartingTime < existingEndTime && newEndTime > existingStartTime) {
            return true
        }
    }
    return false
};

export default hasTimeConflict;