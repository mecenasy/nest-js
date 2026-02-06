export const getRolesByType = (type: string) => {
  switch (type) {
    case 'admin':
      return ['admin', 'teacher', 'student'];
    case 'teacher':
      return ['student', 'admin'];
    case 'student':
      return ['teacher', 'admin'];
    default:
      return ['admin', 'teacher', 'student'];
  }
};
