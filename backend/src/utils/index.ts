import crypto from "crypto";

const generateIdentifier = (title: string) => {
  const slugifiedTitle = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with "-"
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens

  const randomString = crypto.randomBytes(4).toString("hex");

  return `${slugifiedTitle}-${randomString}`;
};

const generateCode = (length = 7) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export { generateIdentifier, generateCode };
