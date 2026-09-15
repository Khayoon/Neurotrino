import type { Source } from '@/lib/types';
import type { BodySystem } from './explorations';
import { collagenStudy, vitaminCSource, vitaminKSource } from './more-ingredients';

export interface IngredientPair {
  id: string; items: [string, string]; label: string; title: string;
  steps: [string, string, string]; explanation: string; limit: string;
  evidence: string; systems: BodySystem[]; sources: Source[];
}
const dSource: Source = { title: 'Vitamin D: calcium and health', publisher: 'NIH ODS', url: 'https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/' };
export const ingredientPairs: IngredientPair[] = [
  { id: 'collagen-c', items: ['collagen', 'vitamin-c'], label: 'Collagen + C', title: 'Building blocks meet a helper.', steps: ['Protein fragments', 'Vitamin C cofactor', 'Collagen formation'],
    explanation: 'Collagen supplies protein fragments; vitamin C supports the body’s collagen-making enzymes. The relationship concerns making collagen, not collagen boosting vitamin C.',
    limit: 'The small gelatin-and-exercise trial did not isolate the added benefit of vitamin C, or demonstrate injured-tendon repair. It does not prove a combined product is better when vitamin C intake is adequate.',
    evidence: 'Biological link · limited combination evidence', systems: ['tendons', 'skin'], sources: [collagenStudy, vitaminCSource] },
  { id: 'd-k2', items: ['vitamin-d', 'vitamin-k2'], label: 'D + K2', title: 'Related jobs. Different steps.', steps: ['D: calcium absorption', 'K: protein activation', 'Bone biology'],
    explanation: 'D supports calcium absorption; K activates proteins involved in bone metabolism. They have complementary biological roles.',
    limit: 'This does not prove everyone needs the combination, or that K2 prevents excess vitamin D toxicity. Warfarin users need prescriber guidance.',
    evidence: 'Biological link · clinical benefit varies', systems: ['gut', 'bones'], sources: [dSource, vitaminKSource] },
  { id: 'c-iron', items: ['vitamin-c', 'iron'], label: 'C + Iron', title: 'A hand with absorption.', steps: ['Non-haem iron', 'Vitamin C with food', 'Improved absorption'],
    explanation: 'Vitamin C helps the absorption of non-haem iron from plant foods. The relationship can begin with an ordinary meal.',
    limit: 'Better absorption is not a diagnosis of deficiency or a reason to add iron. Avoid unsupervised iron use with iron-overload conditions.',
    evidence: 'Established absorption relationship', systems: ['gut', 'blood'], sources: [{ title: 'Iron: absorption and intake', publisher: 'NIH ODS', url: 'https://ods.od.nih.gov/factsheets/Iron-Consumer/' }] },
  { id: 'd-calcium', items: ['vitamin-d', 'calcium'], label: 'D + Calcium', title: 'A mineral meets its doorway.', steps: ['Calcium intake', 'D supports absorption', 'Bone mineral supply'],
    explanation: 'Vitamin D helps the intestine absorb calcium. Adequate intake of both contributes to normal bone maintenance.',
    limit: 'Food and existing intake count. More of both is not automatically better; too much vitamin D can cause harmful high blood calcium.',
    evidence: 'Established nutrient relationship', systems: ['gut', 'bones'], sources: [dSource] },
];

export const collagenForms = [
  { id: 'powder', name: 'Plain powder', title: 'A scoop of the actual ingredient.', description: 'Look for the collagen type, animal source and grams of collagen per serving. A scoop’s total weight may include flavouring or other ingredients.', check: 'Compare collagen grams, not scoop size.', art: 'collagen-powder' },
  { id: 'capsules', name: 'Capsules', title: 'Same question. Smaller parcels.', description: 'For the same hydrolyzed collagen ingredient, the shell is a delivery format. Compare the full serving, which may be several capsules. Some capsules instead contain undenatured type II collagen—a different ingredient.', check: 'Check the ingredient before comparing amounts.', art: 'collagen-capsules' },
  { id: 'enhanced', name: 'Enhanced blend', title: 'What has actually been added?', description: 'Treat “enhanced” as a prompt to read the label. Added vitamin C, minerals or other ingredients need their own amounts and evidence. More additions do not establish better tendon outcomes.', check: 'An added ingredient is not proof of superiority.', art: 'collagen-enhanced' },
] as const;
