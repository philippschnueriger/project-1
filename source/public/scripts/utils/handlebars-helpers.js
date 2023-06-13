// eslint-disable-next-line no-undef
Handlebars.registerHelper("times", (n, block) => {
  let accum = "";
  for (let i = 0; i < n; ++i) accum += block.fn(i);
  return accum;
});

// eslint-disable-next-line no-undef
Handlebars.registerHelper("relativeDate", (date) => {
  const rtf1 = new Intl.RelativeTimeFormat("en", { style: "short" });
  const today = new Date().toISOString();
  const diff = Math.ceil((Date.parse(date) - Date.parse(today)) / 86400000);
  return rtf1.format(diff, "days");
});

// eslint-disable-next-line no-undef, func-names
Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
  switch (operator) {
    case "==":
      // eslint-disable-next-line eqeqeq
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case "!=":
      // eslint-disable-next-line eqeqeq
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});
