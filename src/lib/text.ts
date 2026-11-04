/** Escapa HTML y convierte *palabra* en <em>palabra</em> (cursiva de acento en titulares). */
export function emphasize(text: string) {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return escaped.replace(/\*(.+?)\*/g, '<em>$1</em>');
}

/** Quita las marcas de énfasis (para <title>, schema, etc.). */
export const plain = (text: string) => text.replace(/\*(.+?)\*/g, '$1');
