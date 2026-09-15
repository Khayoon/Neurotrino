import type { Ingredient } from '../lib/types';
import { moreIngredients } from './more-ingredients';
import { everydayDiscoveries } from './everyday-discoveries';

export const ingredients: Ingredient[] = [
  {
    slug: 'magnesium', name: 'Magnesium', subtitle: 'The everyday mineral', number: '01', category: 'Everyday',
    theme: 'lavender', symbol: 'Mg', tags: ['Muscles', 'Nerves', 'Energy metabolism'],
    tidbit: 'A small mineral with a part in hundreds of everyday processes.',
    summary: 'Magnesium helps your muscles and nerves do their jobs. It also participates in energy production and the maintenance of bones.',
    role: 'Established nutrient role', limitation: 'A biological role does not mean taking extra will improve sleep, mood, or energy in someone who already gets enough.',
    caution: 'Supplemental magnesium can cause diarrhoea and interfere with some medicines, including certain antibiotics. Kidney problems call for particular care.',
    facts: [
      { title: 'A quiet team player', body: 'Magnesium participates in the processes that keep muscles, nerves, and energy metabolism working.', source: 0 },
      { title: 'The form matters', body: 'Different forms are absorbed differently. Compare the elemental magnesium amount, not just the weight of the compound.', source: 0 },
      { title: 'Food counts, too', body: 'Seeds, nuts, legumes, and leafy greens are food sources. A supplement is one possible source of this nutrient.', source: 0 },
    ],
    sources: [{ title: 'Magnesium: fact sheet for consumers', publisher: 'NIH Office of Dietary Supplements', url: 'https://ods.od.nih.gov/factsheets/Magnesium-Consumer/' }],
  },
  {
    slug: 'vitamin-d', name: 'Vitamin D', subtitle: 'A little sunshine science', number: '02', category: 'Everyday',
    theme: 'peach', symbol: 'D₃', tags: ['Bones', 'Calcium absorption', 'Immune function'],
    tidbit: 'Helps your body make use of the calcium it takes in.',
    summary: 'Vitamin D supports calcium absorption, bone maintenance, and normal immune function. Your needs depend on your situation and existing intake.',
    role: 'Established nutrient role', limitation: 'Normal immune function is different from a promise to prevent infections. More vitamin D is not automatically better.',
    caution: 'Excess vitamin D can raise blood calcium and cause harm. Check overlapping sources and the product label, especially with kidney conditions or medicines.',
    facts: [
      { title: 'The calcium connection', body: 'Vitamin D helps the intestine absorb calcium, contributing to the maintenance of bones.', source: 0 },
      { title: 'More than sunshine', body: 'Food, supplements, and skin production contribute to vitamin D status. Sunlight alone is not a reliable measure of your level.', source: 0 },
      { title: 'A little label maths', body: 'Vitamin D labels can use micrograms or IU. For vitamin D, 25 micrograms equals 1,000 IU.', source: 0 },
    ],
    sources: [{ title: 'Vitamin D: fact sheet for consumers', publisher: 'NIH Office of Dietary Supplements', url: 'https://ods.od.nih.gov/factsheets/VitaminD-Consumer/' }],
  },
  {
    slug: 'omega-3', name: 'Omega-3', subtitle: 'Meet the essential fats', number: '03', category: 'Everyday',
    theme: 'blue', symbol: 'ω₃', tags: ['Cell membranes', 'EPA & DHA', 'Nutrition'],
    tidbit: 'These fats are part of the membranes surrounding your cells.',
    summary: 'Omega-3s are a family of fats. Fish-oil labels commonly list EPA and DHA; the total oil weight can be much larger than the amount of these omega-3s.',
    role: 'Established nutrient role', limitation: 'The benefits of eating fish and the effects of taking fish-oil supplements are not interchangeable. Clinical outcomes depend on the context.',
    caution: 'Check fish or other allergen sources. Talk to a pharmacist about medicines, including anticoagulants, and follow the specific product warnings.',
    facts: [
      { title: 'Look past “fish oil”', body: 'Compare EPA and DHA on the label. A 1,000 mg fish-oil capsule does not necessarily contain 1,000 mg of EPA and DHA.', source: 0 },
      { title: 'A family of fats', body: 'ALA, EPA, and DHA are different omega-3s. The body converts only small amounts of ALA to EPA and DHA.', source: 0 },
      { title: 'Structure, not a shortcut', body: 'Omega-3s have structural roles in cells. This does not establish a universal benefit from supplementation.', source: 0 },
    ],
    sources: [{ title: 'Omega-3 fatty acids: fact sheet for consumers', publisher: 'NIH Office of Dietary Supplements', url: 'https://ods.od.nih.gov/factsheets/Omega3FattyAcids-Consumer/' }],
  },
  {
    slug: 'creatine', name: 'Creatine', subtitle: 'For the next burst', number: '04', category: 'Performance',
    theme: 'pink', symbol: 'Cr', tags: ['Short bursts', 'Strength training', 'Energy supply'],
    tidbit: 'Helps replenish a fast source of energy during brief, intense effort.',
    summary: 'Creatine supports the phosphocreatine energy system. Creatine monohydrate has evidence for performance during repeated, brief, high-intensity activity.',
    role: 'Evidence for specific exercise uses', limitation: 'Exercise evidence does not establish the same benefit for every sport or a guaranteed improvement in cognition.',
    caution: 'Check the product warnings and consult a health professional if you have kidney concerns, are pregnant, or take medicines. Water-related weight gain can occur.',
    facts: [
      { title: 'Quick energy, explained', body: 'Phosphocreatine helps regenerate ATP, which cells use for energy. This matters during repeated bouts of high-intensity effort.', source: 0 },
      { title: 'Read the exact form', body: 'Creatine monohydrate is the form described in Health Canada’s monograph. Marketing a different form does not establish superiority.', source: 0 },
      { title: 'Check the whole product', body: 'A pure creatine powder and a multi-ingredient pre-workout are different products. Their ingredients and cautions need separate review.', source: 0 },
    ],
    sources: [{ title: 'Creatine monohydrate monograph', publisher: 'Health Canada', url: 'https://webprod.hc-sc.gc.ca/nhpid-bdipsn/dbImages/mono_creatine-monohydrate_english.pdf' }],
  },
  {
    slug: 'l-theanine', name: 'L-Theanine', subtitle: 'A moment of calm curiosity', number: '05', category: 'Focus & calm',
    theme: 'green', symbol: 'L–T', tags: ['Temporary relaxation', 'Amino acid', 'Tea'],
    tidbit: 'An amino acid found in tea, studied for temporary relaxation.',
    summary: 'L-theanine appears in some Canadian products licensed to temporarily promote relaxation. That is a narrower claim than treating anxiety or improving attention.',
    role: 'Specific licensed relaxation claim', limitation: 'A licence claim is not a head-to-head clinical ranking. Effects vary, and the evidence does not justify predicting neurotransmitter percentages.',
    caution: 'Read the exact product label. Blends may contain caffeine, melatonin, or other ingredients with additional effects and warnings.',
    facts: [
      { title: 'A specific purpose', body: 'The Canadian licence for the linked 250 mg product includes temporary promotion of relaxation.', source: 0 },
      { title: 'Tea is a mixture', body: 'An isolated L-theanine capsule and a cup of tea are different exposures; tea can also contain caffeine.', source: 1 },
      { title: 'Keep the claim in focus', body: '“Temporarily promotes relaxation” does not mean a treatment for an anxiety disorder or a guaranteed focus enhancer.', source: 0 },
    ],
    sources: [
      { title: 'L-theanine product licence, NPN 80119840', publisher: 'Health Canada', url: 'https://health-products.canada.ca/lnhpd-bdpsnh/info?licence=80119840' },
      { title: 'L-Theanine 250 mg: product and label information', publisher: 'Webber Naturals (manufacturer)', url: 'https://webbernaturals.com/products/l-theanine-250-mg' },
    ],
  },
  {
    slug: 'melatonin', name: 'Melatonin', subtitle: 'Get to know your night signal', number: '06', category: 'Rest',
    theme: 'lilac', symbol: 'M', tags: ['Body clock', 'Sleep timing', 'Hormone'],
    tidbit: 'A timing signal for your body’s sleep–wake cycle.',
    summary: 'Melatonin is a hormone involved in the body clock. Supplement effects depend on the reason for use, timing, formulation, and individual circumstances.',
    role: 'Evidence varies by sleep condition', limitation: 'Melatonin is not a universal fix for poor sleep. Long-term safety information is limited, and higher-dose products are not necessarily better.',
    caution: 'Melatonin may cause drowsiness. Avoid driving after taking it, and check medicine interactions. Children, pregnancy, and long-term use need professional guidance.',
    facts: [
      { title: 'Timing is the idea', body: 'The body releases melatonin in response to darkness. It helps signal the biological night.', source: 0 },
      { title: 'Different sleep questions', body: 'Evidence for jet lag or a delayed sleep schedule cannot automatically be applied to chronic insomnia.', source: 0 },
      { title: 'More is not the goal', body: 'Strength and release type vary between products. Comparing labels is useful; choosing the largest number is not a treatment plan.', source: 0 },
    ],
    sources: [{ title: 'Melatonin: what you need to know', publisher: 'NIH National Center for Complementary and Integrative Health', url: 'https://www.nccih.nih.gov/health/melatonin-what-you-need-to-know' }],
  },
  ...moreIngredients,
  ...everydayDiscoveries,
];
export const ingredientBySlug = (slug: string) => ingredients.find(item => item.slug === slug);
