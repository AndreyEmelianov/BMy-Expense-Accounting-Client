export const formatDate = (date: string): string => {
  const formatedDate = new Date(date);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return formatedDate.toLocaleDateString('ru-Ru', options);
};
