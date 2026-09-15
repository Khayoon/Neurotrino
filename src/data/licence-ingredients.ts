// Only nutrition/product guides belong in the Canadian NPN import workflow.
// Experimental research cards intentionally have no matcher.
export const licenceIngredientPatterns: Record<string, RegExp> = {
  magnesium: /magnesium/i,
  'vitamin-d': /vitamin d|cholecalciferol|ergocalciferol/i,
  'omega-3': /eicosapentaenoic|docosahexaenoic|fish oil|omega.3/i,
  creatine: /creatine/i,
  'l-theanine': /theanine/i,
  melatonin: /melatonin/i,
  collagen: /collagen|gelatin/i,
  'vitamin-c': /vitamin c|ascorbic acid|ascorbate/i,
  'vitamin-k2': /menaquinone|menatetrenone|vitamin k2/i,
  calcium: /calcium/i,
  iron: /iron|ferrous|ferric/i,
  zinc: /zinc/i,
  mullein: /verbascum thapsus|mullein/i,
  nac: /n[ -]?acetyl[ -]?(?:l[ -]?)?cysteine|acetylcysteine/i,
  ginger: /zingiber officinale|ginger/i,
  psyllium: /plantago ovata|psyllium/i,
  'vitamin-b12': /cobalamin|vitamin b[ -]?12/i,
};
