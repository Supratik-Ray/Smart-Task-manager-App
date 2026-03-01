export function formatAvatarName(name: string) {
  return name
    .split(" ")
    .map((word) => word.slice(0, 1).toUpperCase())
    .join("");
}
