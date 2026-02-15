export const getRolesByType = (type: string) => {
  switch (type) {
    case 'admin':
      return ['admin', 'teacher', 'student'];
    case 'teacher':
      return ['student', 'admin'];
    case 'student':
      return ['teacher', 'admin'];
    case 'onlyTeacher':
      return ['teacher'];
    default:
      return ['admin', 'teacher', 'student'];
  }
};
