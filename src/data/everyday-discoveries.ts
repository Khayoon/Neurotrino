import type { Ingredient, Source } from '@/lib/types';

export const mulleinSource: Source = { title: 'Mullein Leaf Extract: product licence NPN 80140235', publisher: 'Health Canada', url: 'https://health-products.canada.ca/lnhpd-bdpsnh/info?licence=80140235' };
export const mulleinFlowerSource: Source = { title: 'Mullein flower: traditional use and evidence limits', publisher: 'European Medicines Agency', url: 'https://www.ema.europa.eu/en/medicines/herbal/verbasci-flos' };
export const nacSource: Source = { title: 'N-acetylcysteine and glutathione: roles, formulations and evidence', publisher: 'NIH Office of Dietary Supplements', url: 'https://ods.od.nih.gov/factsheets/ImmuneFunction-HealthProfessional/' };
export const nacMonograph: Source = { title: 'Oral N-acetyl-L-cysteine monograph (December 2025)', publisher: 'Health Canada', url: 'https://webprod.hc-sc.gc.ca/nhpid-bdipsn/dbImages/mono_nacetyllcysteine_english.pdf' };
export const gingerSource: Source = { title: 'Ginger: usefulness and safety', publisher: 'NIH NCCIH', url: 'https://www.nccih.nih.gov/health/ginger' };
export const psylliumSource: Source = { title: 'Psyllium — Plantago ovata monograph', publisher: 'Health Canada', url: 'https://webprod.hc-sc.gc.ca/nhpid-bdipsn/dbImages/mono_psyllium--plantago-ovata_english.pdf' };
export const b12Source: Source = { title: 'Vitamin B12: fact sheet for consumers', publisher: 'NIH Office of Dietary Supplements', url: 'https://ods.od.nih.gov/factsheets/VitaminB12-Consumer/' };

export const everydayDiscoveries: Ingredient[] = [
  {
    slug: 'mullein', name: 'Mullein leaf', subtitle: 'A soft leaf. A respiratory tradition.', number: '14', category: 'Airways', theme: 'green', symbol: 'Ml',
    tags: ['Lungs & airways', 'Leaf extract', 'Traditional use'], tidbit: 'Meet a traditional respiratory herb, and the limits of a “lung cleanse” claim.',
    summary: 'A Canadian mullein leaf extract licence describes traditional use for cough and excess mucus with respiratory infections. That wording is not proof of lung detoxification.',
    role: 'Traditional-use claim', limitation: 'This licence does not establish that mullein clears pollutants, reverses smoking damage, or treats asthma or COPD.',
    caution: 'The linked product excludes pregnancy and breastfeeding. Its warnings advise seeking care for persistent or worsening symptoms, symptoms beyond a week, or fever.',
    facts: [
      { title: 'What expectorant means', body: 'The traditional claim concerns helping with mucus and cough. Demulcent refers to soothing irritation.', source: 0 },
      { title: 'Leaf is not flower', body: 'The EMA assessment concerns mullein flower, with insufficient clinical-trial evidence. Its findings cannot automatically be transferred to a leaf extract.', source: 1 },
      { title: 'Read the exact preparation', body: 'The linked licence is for a liquid product. An extract’s plant part and preparation matter; a shared plant name is not a clinical comparison.', source: 0 },
    ], sources: [mulleinSource, mulleinFlowerSource],
  },
  {
    slug: 'nac', name: 'NAC', subtitle: 'Mucus, molecules and context', number: '15', category: 'Airways', theme: 'blue', symbol: 'NAC',
    tags: ['Lungs & airways', 'N-acetylcysteine', 'Glutathione'], tidbit: 'One molecule connects mucus-thinning medicines with antioxidant biology.',
    summary: 'N-acetylcysteine can thin mucus and help replenish glutathione. Medical formulations and oral supplement claims need separate interpretation.',
    role: 'Evidence depends on formulation and use', limitation: 'Much respiratory research involves inhaled medicine. It cannot establish that an oral supplement cleans healthy lungs or replaces prescribed care.',
    caution: 'The Canadian oral NHP monograph excludes use with antibiotics or nitroglycerin, and calls for advice with pregnancy, breastfeeding or kidney stones.',
    facts: [
      { title: 'A formulation matters', body: 'Inhaled acetylcysteine is used medically to make respiratory secretions less viscous. A supplement capsule is a different route.', source: 0 },
      { title: 'A cellular connection', body: 'NAC helps raise intracellular glutathione, a molecule involved in antioxidant defence.', source: 0 },
      { title: 'The Canadian label scope', body: 'Health Canada’s oral NHP monograph describes antioxidant claims. It does not supply a general lung-cleansing claim.', source: 1 },
    ], sources: [nacSource, nacMonograph],
  },
  {
    slug: 'ginger', name: 'Ginger', subtitle: 'A little root with a gut story', number: '16', category: 'Digestion', theme: 'peach', symbol: 'Gi',
    tags: ['Digestion', 'Nausea research', 'Rhizome'], tidbit: 'The kind of nausea matters when you read ginger research.',
    summary: 'Ginger supplements have been studied for nausea. Evidence is more encouraging for pregnancy-related nausea than for motion sickness.',
    role: 'Evidence for specific symptoms', limitation: 'Different causes of nausea are not interchangeable, and most studies tested supplements rather than ginger foods or drinks.',
    caution: 'Ginger may cause heartburn, abdominal discomfort or diarrhoea. Check medicines and consult a clinician about use during pregnancy.',
    facts: [
      { title: 'A nausea question', body: 'Research suggests ginger may help nausea and vomiting during pregnancy; that does not make it a universal anti-nausea remedy.', source: 0 },
      { title: 'Not every journey', body: 'Most motion-sickness studies have not shown a benefit.', source: 0 },
      { title: 'Root, technically rhizome', body: 'The part commonly called ginger root is an underground stem.', source: 0 },
    ], sources: [gingerSource],
  },
  {
    slug: 'psyllium', name: 'Psyllium husk', subtitle: 'The fibre that holds water', number: '17', category: 'Digestion', theme: 'lavender', symbol: 'Ps',
    tags: ['Digestion', 'Soluble fibre', 'Regularity'], tidbit: 'This fibre works by increasing stool bulk and water content.',
    summary: 'Psyllium from Plantago ovata is a bulk-forming fibre used for constipation and irregularity.',
    role: 'Established bulk-forming laxative use', limitation: 'Its water-holding action is not a toxin-removal process or a treatment for every cause of abdominal symptoms.',
    caution: 'Follow the label’s liquid instructions; inadequate fluid can cause choking or obstruction. Do not use with swallowing difficulty. Separate it from medicines as directed.',
    facts: [
      { title: 'Make room for water', body: 'Psyllium increases the bulk and water content of stool to promote bowel movements.', source: 0 },
      { title: 'Liquid is part of use', body: 'The fluid directions are essential. Do not swallow dry psyllium powder.', source: 0 },
      { title: 'A timing question', body: 'The Canadian monograph directs taking psyllium a few hours before or after other medicines or health products.', source: 0 },
    ], sources: [psylliumSource],
  },
  {
    slug: 'vitamin-b12', name: 'Vitamin B12', subtitle: 'Nerves and the blood-cell workshop', number: '18', category: 'Everyday', theme: 'pink', symbol: 'B₁₂',
    tags: ['Brain & nerves', 'Red blood cells', 'DNA'], tidbit: 'A vitamin involved in nerve function and making healthy blood cells.',
    summary: 'Vitamin B12 supports nerve cells, red blood-cell formation and DNA production.',
    role: 'Established nutrient role', limitation: 'B12 supplements do not boost energy or endurance in people who already get enough.',
    caution: 'Deficiency can involve neurological symptoms as well as anaemia. Suspected deficiency needs assessment; metformin and acid-suppressing medicines can affect B12 status.',
    facts: [
      { title: 'Two connected systems', body: 'B12 matters for both nerves and blood cells. That does not mean every tingling sensation or episode of fatigue is a deficiency.', source: 0 },
      { title: 'Absorption is a process', body: 'A stomach protein called intrinsic factor helps the body absorb B12.', source: 0 },
      { title: 'Food and fortification', body: 'Animal foods naturally provide B12. People eating few or no animal foods need reliable fortified foods or another suitable source.', source: 0 },
    ], sources: [b12Source],
  },
];
