export const formatMemberSince = (inputDataString) => {
  const options = { month: "short", day: "2-digit", year: "numeric" };
  const formmatedDate = new Date(inputDataString).toLocaleDateString(
    "en-US",
    options
  );
  return formmatedDate;
};
