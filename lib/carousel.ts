export function wrapIndex(index:number, length:number):number {
  if (!Number.isInteger(length) || length < 1) return 0;
  return ((index % length) + length) % length;
}
export function canAutoplay(requested:boolean, reduced:boolean, focused:boolean, hovered:boolean, visible:boolean, count:number) {
  return requested && !reduced && !focused && !hovered && visible && count > 1;
}
