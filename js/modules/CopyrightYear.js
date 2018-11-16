export default function updateCopyrightYear(id) {
  const dt = new Date();
  const curYear = dt.getYear() + 1900;
  const $cpYear = document.getElementById(id);
  let cpYear;
  if ($cpYear) {
    cpYear = parseInt($cpYear.innerText);
    if (cpYear !== curYear) $cpYear.innerText = curYear;
  }
}
