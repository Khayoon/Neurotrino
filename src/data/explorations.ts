import type { Source } from '@/lib/types';
import { collagenStudy, peptideStudy, vitaminCSource, vitaminKSource } from './more-ingredients';
import { mulleinSource, nacSource, gingerSource, psylliumSource, b12Source } from './everyday-discoveries';

export const bodySystems = [
  { id: 'brain', name: 'Brain & nerves', x: 75, y: 16 },
  { id: 'clock', name: 'Body clock', x: 20, y: 12 },
  { id: 'muscles', name: 'Muscles', x: 17, y: 39 },
  { id: 'gut', name: 'Digestion', x: 77, y: 47 },
  { id: 'cells', name: 'Cells & energy', x: 80, y: 68 },
  { id: 'bones', name: 'Bones', x: 26, y: 79 },
  { id: 'tendons', name: 'Tendons', x: 73, y: 87 },
  { id: 'skin', name: 'Skin & repair', x: 20, y: 59 },
  { id: 'blood', name: 'Blood', x: 81, y: 31 },
  { id: 'lungs', name: 'Lungs & airways', x: 20, y: 26 },
] as const;
export type BodySystem = typeof bodySystems[number]['id'];
export interface Connection { system: BodySystem; title: string; text: string }
export interface Exploration { color: string; pale: string; connections: Connection[]; source: Source }
const nih = (name: string): Source => ({ title: `${name}: the biology and evidence`, publisher: 'NIH Office of Dietary Supplements', url: `https://ods.od.nih.gov/factsheets/${name === 'Omega-3' ? 'Omega3FattyAcids' : name.replaceAll(' ', '')}-HealthProfessional/` });

// These are educational associations, not numerical responses to ingestion.
// New associations require a source; selection never changes a health statistic.
export const explorations: Record<string, Exploration> = {
  mullein: { color: '#61856a', pale: '#e5eedc', source: mulleinSource, connections: [
    { system: 'lungs', title: 'Follow the respiratory tradition.', text: 'The linked Canadian leaf-extract licence describes traditional relief of cough and excess mucus. The highlighted airways locate that use; they do not show cleaned or repaired lungs.' },
  ] },
  nac: { color: '#4d8d95', pale: '#e0eff0', source: nacSource, connections: [
    { system: 'lungs', title: 'Mucus thinning has a context.', text: 'Acetylcysteine has medical mucolytic uses. Evidence from an inhaled drug does not automatically apply to an oral supplement or healthy lungs.' },
    { system: 'cells', title: 'Meet glutathione’s precursor.', text: 'NAC can help replenish intracellular glutathione. This biochemical link is not a prediction of a clinical benefit for everyone.' },
  ] },
  ginger: { color: '#b28a49', pale: '#f7edd9', source: gingerSource, connections: [
    { system: 'gut', title: 'Which kind of nausea?', text: 'Ginger research depends on the cause of nausea and the preparation. This digestive marker locates the symptom topic rather than a measured change in digestion.' },
  ] },
  psyllium: { color: '#82799e', pale: '#eeebf3', source: psylliumSource, connections: [
    { system: 'gut', title: 'A fibre with room for water.', text: 'Psyllium adds water and bulk to stool. Its place on the digestive map is about bowel regularity, not increasing nutrient absorption.' },
  ] },
  'vitamin-b12': { color: '#ad737c', pale: '#f5e7e8', source: b12Source, connections: [
    { system: 'brain', title: 'A nutrient behind nerve function.', text: 'B12 supports healthy nerve cells. Extra B12 is not a general brain or energy upgrade when intake is sufficient.' },
    { system: 'blood', title: 'The blood-cell workshop.', text: 'B12 is needed for red blood-cell formation and DNA synthesis.' },
  ] },
  collagen: { color: '#5b8891', pale: '#e4efeb', source: collagenStudy, connections: [
    { system: 'tendons', title: 'Tiny threads. Tensile strength.', text: 'Collagen fibres help tendons transmit force from muscle to bone. Supplement studies explore whether nutrition supports remodelling; a scoop is not a direct patch for a tear.' },
    { system: 'skin', title: 'A shared structural material.', text: 'Collagen also forms part of skin. A finding about collagen markers cannot establish that a particular powder improves skin or heals wounds.' },
  ] },
  'vitamin-c': { color: '#b37828', pale: '#faecd1', source: vitaminCSource, connections: [
    { system: 'tendons', title: 'Meet the braid’s helper.', text: 'Vitamin C is required to make collagen, the structural protein in tendons. Extra supplementation is a separate question from this essential role.' },
    { system: 'skin', title: 'The same link, at the surface.', text: 'Collagen formation connects vitamin C with normal wound healing.' },
    { system: 'gut', title: 'A partner for plant iron.', text: 'Vitamin C can increase absorption of non-haem iron.' },
  ] },
  'vitamin-k2': { color: '#557d4c', pale: '#e8efdb', source: vitaminKSource, connections: [
    { system: 'bones', title: 'Proteins need preparation.', text: 'Vitamin K supports activation of osteocalcin, a bone protein. See how this differs from vitamin D’s role in the pair explorer.' },
    { system: 'blood', title: 'A connection that needs care.', text: 'Vitamin K participates in clotting-protein function and interacts with warfarin.' },
  ] },
  'bpc-157': { color: '#537c91', pale: '#e4edf2', source: peptideStudy, connections: [
    { system: 'tendons', title: 'A question mark, not a repair button.', text: 'Laboratory work examined tendon-cell migration and survival. The dotted tendon is a research locator; it does not depict demonstrated healing in humans.' },
  ] },
  calcium: { color: '#8a769f', pale: '#eee8f2', source: nih('Calcium'), connections: [
    { system: 'bones', title: 'A scaffold that stays alive.', text: 'Bone stores calcium and continually renews itself. Calcium intake is one part of maintaining that structure.' },
    { system: 'muscles', title: 'Minerals behind movement.', text: 'Calcium participates in muscle contraction. Its biological role does not mean an extra tablet improves strength.' },
  ] },
  iron: { color: '#ab6463', pale: '#f5e5df', source: nih('Iron'), connections: [
    { system: 'blood', title: 'Meet an oxygen courier.', text: 'Red blood cells carry haemoglobin, an iron-containing protein that transports oxygen. This does not diagnose low iron from tiredness.' },
    { system: 'muscles', title: 'An oxygen store in muscle.', text: 'Myoglobin is an iron-containing protein that helps supply oxygen within muscle tissue.' },
  ] },
  zinc: { color: '#4f8491', pale: '#e2eff0', source: nih('Zinc'), connections: [
    { system: 'skin', title: 'A small part of the repair workshop.', text: 'Zinc is involved in normal wound healing. Extra zinc does not necessarily accelerate it when intake is already sufficient.' },
    { system: 'cells', title: 'Making the things cells need.', text: 'Zinc participates in protein and DNA synthesis.' },
  ] },
  magnesium: { color: '#7663ab', pale: '#eee8f7', source: nih('Magnesium'), connections: [
    { system: 'brain', title: 'A little mineral. A lot of messages.', text: 'Magnesium helps the movement of calcium and potassium across cell membranes. That matters for nerve signals.' },
    { system: 'muscles', title: 'Behind an everyday movement.', text: 'Magnesium participates in normal muscle contraction. That biological role does not mean extra magnesium will make a muscle stronger.' },
    { system: 'cells', title: 'Part of the energy machinery.', text: 'Your cells need magnesium for energy production. It works within everyday metabolism, rather than acting as an instant energy boost.' },
  ] },
  'vitamin-d': { color: '#aa731f', pale: '#fbefd3', source: nih('Vitamin D'), connections: [
    { system: 'gut', title: 'Meet calcium’s helpful connection.', text: 'Vitamin D helps the intestine absorb calcium. The connection starts with making use of a nutrient you take in.' },
    { system: 'bones', title: 'A structure that keeps renewing.', text: 'Calcium and phosphate help mineralize bone. Vitamin D supports their availability and normal bone maintenance.' },
  ] },
  'omega-3': { color: '#357f97', pale: '#e1eff3', source: nih('Omega-3'), connections: [
    { system: 'cells', title: 'The boundary around a cell.', text: 'Omega-3 fats form part of cell membranes. Think of a structural ingredient, rather than a universal health upgrade.' },
    { system: 'brain', title: 'Structure is part of the story.', text: 'DHA is a component of membranes in the brain. Having that role does not mean a fish-oil capsule will improve memory.' },
  ] },
  creatine: { color: '#ad5b71', pale: '#f7e5e9', source: { title: 'Creatine: exercise and athletic performance', publisher: 'NIH Office of Dietary Supplements', url: 'https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-HealthProfessional/' }, connections: [
    { system: 'muscles', title: 'For the next short burst.', text: 'Creatine monohydrate has evidence for repeated, brief, high-intensity exercise. The type of activity matters.' },
    { system: 'cells', title: 'A quick way to replenish ATP.', text: 'Phosphocreatine helps regenerate ATP, an energy source used by cells. This is a diagram of that role, not a prediction of your performance.' },
  ] },
  'l-theanine': { color: '#4e8063', pale: '#e4efdf', source: { title: 'L-theanine: Canadian product licence', publisher: 'Health Canada · NPN 80119840', url: 'https://health-products.canada.ca/lnhpd-bdpsnh/info?licence=80119840' }, connections: [
    { system: 'brain', title: 'A question about relaxation.', text: 'The linked Canadian product is licensed to temporarily promote relaxation. This marker locates the topic; it does not establish a brain target or a neurotransmitter change.' },
  ] },
  melatonin: { color: '#7463a0', pale: '#eee8f5', source: { title: 'Melatonin: what you need to know', publisher: 'NIH NCCIH', url: 'https://www.nccih.nih.gov/health/melatonin-what-you-need-to-know' }, connections: [
    { system: 'clock', title: 'Your body has a sense of time.', text: 'The brain produces melatonin in response to darkness. It helps signal the biological night and coordinate sleep timing.' },
  ] },
};
