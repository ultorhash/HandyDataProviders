import { CoinLabel } from "../types";

/**
 * Generates chart title template.
 * @param label Cryptocurrency description.
 * @returns `HTML` element with configured title.
 */
export const getChartLabel = (label: CoinLabel): string => {
  return `
    <div class=chart__title>
      <img
        src=${label.image}
        alt=${label.id}
      />
      ${label.name}
    </div>
  `;
}
