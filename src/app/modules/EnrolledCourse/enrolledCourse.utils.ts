export const calculateGradeAndGradePoints = (totalMarks: number) => {
  let results = {
    grade: 'NA',
    gradePoints: 0,
  };

  /**
   * 0-19 F
   * 20-49 D
   * 40-59 C
   * 60-79 B
   * 80-100 A
   */

  if (totalMarks >= 0 && totalMarks <= 19) {
    results = {
      grade: 'F',
      gradePoints: 0.0,
    };
  } else if (totalMarks >= 20 && totalMarks <= 39) {
    results = {
      grade: 'D',
      gradePoints: 2.0,
    };
  } else if (totalMarks >= 40 && totalMarks <= 59) {
    results = {
      grade: 'C',
      gradePoints: 3.0,
    };
  } else if (totalMarks >= 60 && totalMarks <= 79) {
    results = {
      grade: 'B',
      gradePoints: 3.5,
    };
  } else if (totalMarks >= 80 && totalMarks <= 100) {
    results = {
      grade: 'A',
      gradePoints: 4.0,
    };
  } else {
    results = {
      grade: 'NA',
      gradePoints: 0.0,
    };
  }
  return results;
};
