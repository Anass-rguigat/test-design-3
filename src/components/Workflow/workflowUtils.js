export const STEPS_PER_ROW = 3;

export function chunkSteps(steps, size = STEPS_PER_ROW) {
  const chunks = [];
  for (let i = 0; i < steps.length; i += size) {
    chunks.push(steps.slice(i, i + size));
  }
  return chunks;
}
