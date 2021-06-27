export function allowNumbersOnly(e: KeyboardEvent) {
  const code = e.which ? e.which : e.keyCode;
  if (code > 31 && (code < 48 || code > 57)) {
    e.preventDefault();
  }
}
