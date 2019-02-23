const createFilterTemplate = ({name = ``, checked = false, count = 0} = {}) => {
  const attributeName = name.toLowerCase();
  const countTemplate = count > 0 ? `<span class="filter__${attributeName}-count">${count}</span>` : ``;
  const disabledAttribute = count <= 0 ? `disabled` : ``;
  const checkedAttribute = checked ? `checked` : ``;

  return `
    <input
      type="radio"
      id="filter__${attributeName}"
      class="filter__input visually-hidden"
      name="filter"
      ${checkedAttribute}
      ${disabledAttribute}
    />
    <label for="filter__${attributeName}" class="filter__label">
      ${name} ${countTemplate}
    </label>
  `;
};
const mergeFilters = (node) => createFilterTemplate(node);

const buildFiltersTemplate = (arr = []) => {
  return arr.map(mergeFilters).join(``);
};

export default buildFiltersTemplate;
