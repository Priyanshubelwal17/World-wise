function Flag({ flag = "" }) {
  if (!flag) return null;

  let countryCode = "";

  // If emoji string (length > 2), try converting
  if (typeof flag === "string" && flag.length > 2) {
    countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
  }

  // If it's already a country code like "IN"
  else if (typeof flag === "string" && flag.length === 2) {
    countryCode = flag.toLowerCase();
  }

  // If nothing valid, don't render
  else {
    return null;
  }

  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt="flag"
      style={{ marginRight: "4px", verticalAlign: "middle" }}
    />
  );
}

export default Flag;
