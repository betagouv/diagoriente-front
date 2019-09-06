export function showTuto(ModalIndex: number) {
  const storedTuto = localStorage.getItem('Tuto');
  if (storedTuto) {
    return !JSON.parse(storedTuto)[ModalIndex];
  }
  return false;
}
export function tutoShowed(ModalIndex: number) {
  const storedTuto = localStorage.getItem('Tuto');
  if (storedTuto) {
    const newStoredTuto = JSON.parse(storedTuto);
    newStoredTuto[ModalIndex] = true;
    localStorage.removeItem('Tuto');
    localStorage.setItem('Tuto', JSON.stringify(newStoredTuto));
  }
}
/* export function initializeTuto(userId: string) {
  const newUser = {
    userId,
    show: [false, false, false, false, false, false, false, false, false],
  };
  const Tuto = [];
  Tuto.push(newUser);
  localStorage.setItem('Tuto', JSON.stringify(Tuto));

  const storedTuto = localStorage.getItem('Tuto');
  if (!storedTuto) {
    localStorage.setItem(
      'Tuto',
      JSON.stringify([false, false, false, false, false, false, false, false, false]),
    );
  }
}
 */
