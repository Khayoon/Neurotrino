import type { Ingredient, Source } from '@/lib/types';

export const vitaminCSource: Source = { title: 'Vitamin C: roles and evidence', publisher: 'NIH Office of Dietary Supplements', url: 'https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/' };
export const vitaminKSource: Source = { title: 'Vitamin K: forms, bone health and medicines', publisher: 'NIH Office of Dietary Supplements', url: 'https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessional/' };
export const collagenStudy: Source = { title: 'Vitamin C-enriched gelatin before intermittent activity (2017)', publisher: 'Shaw et al. · American Journal of Clinical Nutrition', url: 'https://pubmed.ncbi.nlm.nih.gov/27852613/' };
export const collagenFormsStudy: Source = { title: 'Different vitamin C-enriched collagen derivatives (2019)', publisher: 'Lis & Baar · International Journal of Sport Nutrition and Exercise Metabolism', url: 'https://pubmed.ncbi.nlm.nih.gov/30859848/' };
export const collagenMonograph: Source = { title: 'Hydrolyzed collagen monograph (2024)', publisher: 'Health Canada', url: 'https://webprod.hc-sc.gc.ca/nhpid-bdipsn/atReq?atid=hydrolized.collagen' };
export const nativeCollagenStudy: Source = { title: 'Undenatured type II collagen: ingredient and trial methods (2013)', publisher: 'Lugo et al. · Journal of the International Society of Sports Nutrition', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4015808/' };
export const peptideAdvisory: Source = { title: 'Unauthorized injectable peptides: public advisory, 9 April 2026', publisher: 'Health Canada', url: 'https://recalls-rappels.canada.ca/en/alert-recall/think-twice-injecting-peptides-bought-online-unauthorized-products-can-seriously-harm' };
export const peptideStudy: Source = { title: 'BPC-157 and tendon fibroblasts: laboratory study (2011)', publisher: 'Chang et al. · Journal of Applied Physiology', url: 'https://pubmed.ncbi.nlm.nih.gov/21030672/' };
const nutrient = (name: string): Source => ({ title: `${name}: fact sheet for consumers`, publisher: 'NIH Office of Dietary Supplements', url: `https://ods.od.nih.gov/factsheets/${name}-Consumer/` });

export const moreIngredients: Ingredient[] = [
  {
    slug: 'collagen', name: 'Collagen', subtitle: 'The threads that hold us together', number: '07', category: 'Structure', theme: 'blue', symbol: 'Co',
    tags: ['Tendons', 'Connective tissue', 'Powder & capsules'], tidbit: 'Follow the fibres from a scoop of peptides to the questions about tendons.',
    summary: 'Collagen is a structural protein in connective tissue. Oral collagen supplies digested protein fragments; it does not travel intact from a scoop to an injured tendon.',
    role: 'Early, formulation-specific research', limitation: 'A small gelatin-and-exercise study measured collagen-related markers, not recovery of injured human tendons. That finding cannot validate every collagen product.',
    caution: 'Check the animal source and allergens. A blend may add other active ingredients. Persistent tendon pain needs assessment and appropriate rehabilitation.',
    facts: [
      { title: 'A fibre, then a food', body: 'Tendons contain collagen. Eating it is a different step from building it: digestion and tissue remodelling sit in between.', source: 0 },
      { title: 'The vitamin C question', body: 'An eight-person study combined vitamin C-enriched gelatin with exercise. A synthesis marker increased; tendon healing was not measured.', source: 0 },
      { title: 'Powder is a format', body: 'Compare the actual collagen ingredient and grams per serving. A capsule, scoop or “enhanced” label alone does not establish a better clinical result.', source: 1 },
    ], sources: [collagenStudy, collagenFormsStudy, collagenMonograph, nativeCollagenStudy],
  },
  {
    slug: 'vitamin-c', name: 'Vitamin C', subtitle: 'A helper in the tissue workshop', number: '08', category: 'Structure', theme: 'peach', symbol: 'C',
    tags: ['Collagen formation', 'Iron absorption', 'Antioxidant'], tidbit: 'Your body needs vitamin C to make its own collagen.',
    summary: 'Vitamin C supports collagen formation, antioxidant activity and absorption of non-haem iron. Its connective-tissue role includes normal wound healing.',
    role: 'Established nutrient role', limitation: 'Correcting inadequate intake and adding more when already sufficient are different questions. Extra vitamin C is not a proven tendon-repair shortcut.',
    caution: 'Large amounts can cause diarrhoea and cramps. Iron overload conditions require particular care.',
    facts: [
      { title: 'Behind the braid', body: 'Vitamin C is needed in collagen production, linking it to tendons and other connective tissues.', source: 0 },
      { title: 'A plant-iron companion', body: 'Vitamin C improves absorption of non-haem iron, the form in plant foods.', source: 0 },
      { title: 'Food belongs in the picture', body: 'Peppers, kiwifruit and citrus can supply vitamin C. A separate pill is not the only route.', source: 0 },
    ], sources: [vitaminCSource],
  },
  {
    slug: 'vitamin-k2', name: 'Vitamin K2', subtitle: 'Meet the calcium conversation', number: '09', category: 'Structure', theme: 'green', symbol: 'K₂',
    tags: ['Bone proteins', 'Vitamin D pairing', 'MK-4 & MK-7'], tidbit: 'Vitamin K helps activate proteins involved in bone metabolism and clotting.',
    summary: 'K2 is a family of vitamin K forms, including MK-4 and MK-7. Vitamin K supports the activation of several proteins.',
    role: 'Established role; mixed outcome evidence', limitation: 'A role in bone biology does not establish that everyone taking vitamin D needs K2.',
    caution: 'Vitamin K can seriously interact with warfarin. Changes in intake need coordination with the prescriber.',
    facts: [
      { title: 'Two letters, several forms', body: 'MK-4 and MK-7 are different members of the K2 family.', source: 0 },
      { title: 'A protein connection', body: 'Osteocalcin in bone depends on vitamin K.', source: 0 },
      { title: 'A marker is not an outcome', body: 'Changes in protein activation do not necessarily translate into fewer fractures.', source: 0 },
    ], sources: [vitaminKSource],
  },
  {
    slug: 'bpc-157', name: 'BPC-157', subtitle: 'An open question in the lab', number: '10', category: 'Research', theme: 'blue', symbol: '157', kind: 'research',
    tags: ['Experimental peptide', 'Tendon research', 'Not established therapy'], tidbit: 'Explore the tendon research—and the distance between a lab result and a treatment.',
    summary: 'BPC-157 is an experimental peptide investigated in animal and cell studies. Those experiments do not establish an effective or safe human tendon treatment.',
    role: 'Preclinical tendon evidence', limitation: 'The linked experiment studied tendon tissue and cells in the laboratory. Human tendon-healing benefits and long-term safety are not established by it.',
    caution: 'Health Canada lists BPC-157 among seized unauthorized injectable peptides and advises against buying or using those products. This is a research field note, not a product recommendation.',
    facts: [
      { title: 'Why tendons appear here', body: 'Researchers investigated tendon-cell outgrowth and migration. The dotted map marks the research topic, not a proven effect in your body.', source: 0 },
      { title: 'Fifteen building blocks', body: 'BPC-157 is a chain of 15 amino acids. Being a peptide does not establish safety or equivalence to collagen nutrition.', source: 0 },
      { title: 'The Canadian context', body: 'Health Canada’s April 2026 advisory includes BPC-157 among unauthorized injectable products. A “research use” label does not make a product approved.', source: 1 },
    ], sources: [peptideStudy, peptideAdvisory],
  },
  {
    slug: 'calcium', name: 'Calcium', subtitle: 'A living mineral scaffold', number: '11', category: 'Structure', theme: 'lavender', symbol: 'Ca',
    tags: ['Bones', 'Muscle contraction', 'Vitamin D pairing'], tidbit: 'Your skeleton is a store of calcium—and it is constantly remodelling.',
    summary: 'Calcium builds and maintains bones and teeth, and participates in muscle movement and nerve signalling.',
    role: 'Established nutrient role', limitation: 'Intake includes food. More supplemental calcium does not automatically produce stronger bones.',
    caution: 'Supplements can cause constipation and interact with medicines, including levothyroxine and some antibiotics. Excess intake can be harmful.',
    facts: [
      { title: 'A living store', body: 'Most body calcium is in bones and teeth. Bone tissue is continually renewed.', source: 0 },
      { title: 'D opens a door', body: 'Vitamin D is needed to help absorb calcium. Explore their relationship in the pair explorer.', source: 0 },
      { title: 'Read elemental calcium', body: 'Calcium carbonate and citrate contain different proportions of calcium. The nutrient amount on the label is the useful comparison.', source: 0 },
    ], sources: [nutrient('Calcium')],
  },
  {
    slug: 'iron', name: 'Iron', subtitle: 'The oxygen courier', number: '12', category: 'Everyday', theme: 'pink', symbol: 'Fe',
    tags: ['Oxygen transport', 'Blood', 'Vitamin C pairing'], tidbit: 'Iron sits inside the proteins that carry and store oxygen.',
    summary: 'Haemoglobin in red blood cells uses iron to carry oxygen. Myoglobin in muscle also contains iron.',
    role: 'Established nutrient role', limitation: 'Tiredness alone does not diagnose iron deficiency. Adding iron without a need can cause harm.',
    caution: 'Excess iron is toxic, especially to children. Keep products securely stored and get advice before treating suspected deficiency.',
    facts: [
      { title: 'An oxygen passenger', body: 'Haemoglobin transports oxygen from lungs to tissues. Iron is part of that protein.', source: 0 },
      { title: 'Two dietary forms', body: 'Animal foods can contain haem iron; plants supply non-haem iron. Their absorption differs.', source: 0 },
      { title: 'C makes a connection', body: 'Vitamin C improves non-haem iron absorption. This is not a reason for everyone to take iron tablets.', source: 0 },
    ], sources: [nutrient('Iron')],
  },
  {
    slug: 'zinc', name: 'Zinc', subtitle: 'A tiny workshop essential', number: '13', category: 'Everyday', theme: 'blue', symbol: 'Zn',
    tags: ['Skin & repair', 'Immune function', 'Protein synthesis'], tidbit: 'A small mineral involved in making proteins and normal wound healing.',
    summary: 'Zinc contributes to protein and DNA synthesis, normal immune function, taste and wound healing.',
    role: 'Established nutrient role', limitation: 'A normal immune role is not a promise that extra zinc will prevent illness or speed every wound’s recovery.',
    caution: 'Too much zinc can cause nausea and copper deficiency. It can interfere with certain antibiotics.',
    facts: [
      { title: 'Inside the workshop', body: 'Cells use zinc in the processes that produce proteins and DNA.', source: 0 },
      { title: 'Skin has a story', body: 'Zinc is involved in normal wound healing. A deficiency and a healthy intake are different starting points.', source: 0 },
      { title: 'Balance matters', body: 'Long-term high zinc intake can reduce copper absorption. More is not automatically better.', source: 0 },
    ], sources: [nutrient('Zinc')],
  },
];
