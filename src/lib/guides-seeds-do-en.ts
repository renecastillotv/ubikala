// Dominican Republic guide seeds — English
// Each guide has metadata + body_html with the article content

const checkSvg = `<svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`;
const warnSvg = `<svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`;

// Helper builders
function docItem(title: string, desc: string, color = 'green') {
  const icon = color === 'green' ? checkSvg : `<svg class="w-4 h-4 text-${color}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`;
  return `<div class="bg-white border rounded-lg p-5"><div class="flex items-start gap-4"><div class="w-8 h-8 bg-${color}-100 rounded-full flex items-center justify-center flex-shrink-0">${icon}</div><div><h3 class="font-semibold text-gray-900">${title}</h3><p class="text-gray-600 text-sm mt-1">${desc}</p></div></div></div>`;
}

function step(n: number, title: string, desc: string) {
  return `<li class="flex gap-4"><span class="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">${n}</span><div><h4 class="font-semibold text-gray-900">${title}</h4><p class="text-gray-600">${desc}</p></div></li>`;
}

function alert(title: string, text: string) {
  return `<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4"><h4 class="font-semibold text-yellow-800 mb-2">${title}</h4><p class="text-yellow-700">${text}</p></div>`;
}

function callout(title: string, text: string, color = 'primary') {
  return `<div class="bg-${color}-50 border-l-4 border-${color}-500 p-4"><p class="text-${color}-800"><strong>${title}:</strong> ${text}</p></div>`;
}

function section(id: string, title: string, content: string) {
  return `<section id="${id}" class="mb-12"><h2 class="text-2xl font-bold text-gray-900 mb-4">${title}</h2>${content}</section>`;
}

// ─── Guide 1: Bono Primera Vivienda ────────────────────────────────
const bonoBody = [
  section('que-es', 'What Is the First-Time Home Buyer Bonus?', `
    <p class="text-gray-700 mb-4">The First-Time Home Buyer Bonus (Bono de Primera Vivienda) is a <strong>housing subsidy</strong> granted by the Dominican government through the Ministry of Housing and Buildings (MIVED). It is designed to help low- and middle-income families purchase their first property.</p>
    <p class="text-gray-700 mb-4">The program is governed by <strong>Law 189-11</strong> on the Development of the Mortgage Market and Trust in the Dominican Republic.</p>
    ${callout('Key fact', 'The bonus is not a loan — it is a direct subsidy you do not have to pay back. It is applied as a down payment or supplement to reduce the amount of your mortgage.', 'primary')}
  `),
  section('montos', 'Subsidy Amounts', `
    <div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-gray-100"><th class="border p-3 font-semibold">Housing Type</th><th class="border p-3 font-semibold">Maximum Value</th><th class="border p-3 font-semibold">Approximate Subsidy</th></tr></thead><tbody>
    <tr><td class="border p-3">Low-cost housing</td><td class="border p-3">Up to RD$2,500,000</td><td class="border p-3 font-semibold text-green-700">Up to RD$1,500,000</td></tr>
    <tr class="bg-gray-50"><td class="border p-3">Moderate-cost housing</td><td class="border p-3">RD$2,500,000 - RD$4,500,000</td><td class="border p-3 font-semibold text-green-700">Up to RD$750,000</td></tr>
    <tr><td class="border p-3">Medium-cost housing</td><td class="border p-3">RD$4,500,000 - RD$6,500,000</td><td class="border p-3 font-semibold text-green-700">Up to RD$400,000</td></tr>
    </tbody></table></div>
    <div class="mt-6">${callout('Additional benefit', 'Properties purchased under a trust (Fideicomiso, Law 189-11) may be exempt from the 3% real estate transfer tax.', 'green')}</div>
  `),
  section('requisitos', 'Requirements to Apply', `
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Personal Requirements</h3><ul class="text-sm text-gray-600 space-y-2"><li>• Be a Dominican citizen or legal resident</li><li>• Be at least 18 years old</li><li>• Not own any real estate property</li><li>• Not have received a previous housing subsidy</li></ul></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Financial Requirements</h3><ul class="text-sm text-gray-600 space-y-2"><li>• Family income within program limits</li><li>• Demonstrable ability to pay</li><li>• Favorable credit history (not mandatory)</li><li>• Active savings account</li></ul></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Property Requirements</h3><ul class="text-sm text-gray-600 space-y-2"><li>• Project registered under a trust (Fideicomiso, Law 189-11)</li><li>• Value within program limits</li><li>• New construction only (does not apply to resale)</li><li>• Project approved by MIVED</li></ul></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Conditions</h3><ul class="text-sm text-gray-600 space-y-2"><li>• Cannot sell the property for at least 5 years</li><li>• Must be used as primary residence</li><li>• Cannot rent during the restriction period</li><li>• Must maintain the property in good condition</li></ul></div>
    </div>
  `),
  section('documentos', 'Required Documents', `
    <div class="bg-white border rounded-lg divide-y">
      ${['National ID card (Cedula) - Original and copy of applicant and spouse', 'Employment letter - Stating position, salary, and length of employment', 'Bank statements - Last 3 to 6 months', 'Certificate of no property ownership - Issued by the Land Registry (Jurisdiccion Inmobiliaria)', 'DGII certification - Confirming you do not own real estate', 'Marriage certificate or notarized single-status declaration', 'MIVED application form'].map((item, i) => {
        const [title, desc] = item.split(' - ');
        return `<div class="p-4 flex items-start gap-3"><span class="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold">${i+1}</span><div><p class="font-medium text-gray-900">${title}</p>${desc ? `<p class="text-sm text-gray-600">${desc}</p>` : ''}</div></div>`;
      }).join('')}
    </div>
  `),
  section('proceso', 'Application Process', `
    <ol class="space-y-6">
      ${step(1, 'Choose an Eligible Project', 'Look for a housing project registered under a trust (Fideicomiso) and approved by MIVED.')}
      ${step(2, 'Gather Your Documents', 'Prepare all the required documents. The certificate of no property ownership is requested at the Land Registry (Jurisdiccion Inmobiliaria).')}
      ${step(3, 'Submit Your Application', 'Deliver your application and documents at the project sales office or directly at MIVED.')}
      ${step(4, 'Evaluation and Approval', 'MIVED evaluates your application and verifies you meet the requirements. This process takes 2 to 8 weeks.')}
      ${step(5, 'Bonus Disbursement', 'Once approved, the bonus is deposited into the project trust account.')}
      ${step(6, 'Closing and Delivery', 'Complete the remaining financing and receive your home once construction is finished.')}
    </ol>
  `),
  section('tipos-vivienda', 'Eligible Housing Types', `
    <div class="grid md:grid-cols-3 gap-6">
      <div class="bg-white border rounded-lg p-6 text-center"><div class="text-3xl font-bold text-primary-600 mb-2">Low Cost</div><p class="text-sm text-gray-600 mb-3">Up to RD$2,500,000</p><div class="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-medium inline-block">Highest subsidy</div><p class="text-sm text-gray-600 mt-3">Apartments and houses in social-interest projects.</p></div>
      <div class="bg-white border rounded-lg p-6 text-center"><div class="text-3xl font-bold text-primary-600 mb-2">Moderate Cost</div><p class="text-sm text-gray-600 mb-3">RD$2.5M - RD$4.5M</p><div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium inline-block">Partial subsidy</div><p class="text-sm text-gray-600 mt-3">Apartments in towers and houses in residential developments.</p></div>
      <div class="bg-white border rounded-lg p-6 text-center"><div class="text-3xl font-bold text-primary-600 mb-2">Medium Cost</div><p class="text-sm text-gray-600 mb-3">RD$4.5M - RD$6.5M</p><div class="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm font-medium inline-block">Smaller subsidy</div><p class="text-sm text-gray-600 mt-3">Apartments in high-demand areas.</p></div>
    </div>
  `),
  section('consideraciones', 'Important Considerations', `
    <div class="space-y-4">
      ${alert('New Construction Only', 'The bonus applies exclusively to new homes in trust-based projects (Fideicomiso). It cannot be used for resale properties.')}
      ${alert('Sale Restriction', 'You cannot sell, rent, or transfer the property during the first 5 years. If you do, you must return the subsidy.')}
      ${alert('One-Time Benefit', 'The bonus is a one-time benefit. You can only apply for it once in your lifetime.')}
      ${alert('Fund Availability', 'Funds are subject to government budget availability. Processing times may vary.')}
    </div>
  `),
].join('\n');

// ─── Guide 2: Fideicomiso Inmobiliario ─────────────────────────────
const fideicomisoBody = [
  section('que-es', 'What Is a Real Estate Trust (Fideicomiso)?', `
    <p class="text-gray-700 mb-4">A real estate trust (Fideicomiso Inmobiliario) is a legal structure regulated by <strong>Law 189-11</strong> of the Dominican Republic, which allows the transfer of real estate assets to a trust entity (Fiduciaria) for administration and eventual transfer to the beneficiaries.</p>
    <p class="text-gray-700 mb-4">In the context of property purchases, especially for projects under construction, the trust acts as a protection mechanism for both the buyer and the developer.</p>
    ${callout('Important', 'Real estate trusts are regulated by the Superintendency of Banks of the Dominican Republic, ensuring supervision and transparency.', 'primary')}
  `),
  section('beneficios', 'Benefits of the Trust', `
    <h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">For the Buyer:</h3>
    <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4"><li><strong>Investment protection:</strong> Funds are protected in case the developer goes bankrupt</li><li><strong>Transparency:</strong> The trust entity supervises the correct use of funds</li><li><strong>Legal certainty:</strong> The process is regulated by law</li><li><strong>Tax benefits:</strong> Exemption from certain transfer taxes</li></ul>
    <h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">For the Developer:</h3>
    <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4"><li><strong>Greater trust:</strong> Buyers feel more secure</li><li><strong>Access to financing:</strong> Facilitates obtaining bank loans</li><li><strong>Professional administration:</strong> The trust entity handles financial aspects</li></ul>
  `),
  section('partes', 'Parties Involved', `
    <div class="grid md:grid-cols-3 gap-6">
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Settlor (Fideicomitente)</h3><p class="text-sm text-gray-600">The developer or owner who transfers the assets to the trust.</p></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Trustee (Fiduciaria)</h3><p class="text-sm text-gray-600">The authorized financial entity that administers the trust and funds.</p></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Beneficiary (Fideicomisario)</h3><p class="text-sm text-gray-600">The buyer or beneficiary who will receive the property upon completion.</p></div>
    </div>
  `),
  section('proceso', 'Purchase Process', `
    <ol class="space-y-6">
      ${step(1, 'Project Selection', 'Choose a real estate project that operates under a trust. Verify that the trust entity is authorized.')}
      ${step(2, 'Reservation', 'Sign the reservation contract and make the initial payment (usually 10-20%).')}
      ${step(3, 'Trust Registration', 'You register as a beneficiary (Fideicomisario) in the trust agreement.')}
      ${step(4, 'Scheduled Payments', 'Make payments according to the schedule. Funds go directly to the trust account.')}
      ${step(5, 'Delivery and Transfer', 'Upon completion of construction and your payments, the trust entity transfers the property to your name.')}
    </ol>
  `),
  section('costos', 'Associated Costs', `
    <div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-gray-100"><th class="border p-3 font-semibold">Item</th><th class="border p-3 font-semibold">Approximate Cost</th></tr></thead><tbody>
    <tr><td class="border p-3">Trust administration fee</td><td class="border p-3">0.5% - 1% annually</td></tr>
    <tr class="bg-gray-50"><td class="border p-3">Legal fees</td><td class="border p-3">1% - 2% of the value</td></tr>
    <tr><td class="border p-3">Transfer tax</td><td class="border p-3">3% of the value (may be exempt)</td></tr>
    <tr class="bg-gray-50"><td class="border p-3">Title registration</td><td class="border p-3">Varies by jurisdiction</td></tr>
    </tbody></table></div>
    <div class="mt-6">${callout('Tax benefit', 'Under Law 189-11, transfers from a trust (Fideicomiso) may be exempt from the 3% transfer tax.', 'green')}</div>
  `),
  section('consideraciones', 'Important Considerations', `<div class="space-y-4">
    ${alert('Verify the Trust Entity', 'Make sure the trust entity (Fiduciaria) is authorized and supervised by the Superintendency of Banks.')}
    ${alert('Read the Contract', 'Carefully review the trust agreement. Consult with a specialized attorney.')}
    ${alert('Know Your Rights', 'As a beneficiary (Fideicomisario), you have the right to receive periodic reports on the project status.')}
    ${alert('Delivery Deadlines', 'Check the clauses regarding delivery deadlines and penalties for delays.')}
  </div>`),
].join('\n');

// ─── Guide 3: Proceso de Compra ────────────────────────────────────
const procesoBody = [
  section('pasos', 'Steps of the Buying Process', `
    <div class="space-y-8">
      <div class="relative pl-8 pb-8 border-l-2 border-primary-200"><div class="absolute -left-3 top-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"><span class="text-white text-xs font-bold">1</span></div><h3 class="text-xl font-semibold text-gray-900 mb-3">Define Your Needs and Budget</h3><p class="text-gray-700 mb-4">Before starting your search, clearly define:</p><ul class="list-disc list-inside text-gray-600 space-y-2 ml-4"><li>Property type (house, apartment, land)</li><li>Preferred location</li><li>Number of bedrooms and bathrooms</li><li>Maximum budget (including additional costs)</li><li>Whether it is for living, investing, or renting</li></ul></div>
      <div class="relative pl-8 pb-8 border-l-2 border-primary-200"><div class="absolute -left-3 top-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"><span class="text-white text-xs font-bold">2</span></div><h3 class="text-xl font-semibold text-gray-900 mb-3">Property Search</h3><p class="text-gray-700 mb-4">Use different channels:</p><ul class="list-disc list-inside text-gray-600 space-y-2 ml-4"><li>Real estate portals like Ubikala</li><li>Verified real estate agents</li><li>New project developers</li></ul>${callout('Tip', 'Visit several properties before deciding. Do not rush.', 'primary')}</div>
      <div class="relative pl-8 pb-8 border-l-2 border-primary-200"><div class="absolute -left-3 top-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"><span class="text-white text-xs font-bold">3</span></div><h3 class="text-xl font-semibold text-gray-900 mb-3">Legal Verification (Due Diligence)</h3><p class="text-gray-700 mb-4">The most important step. Verify:</p><ul class="list-disc list-inside text-gray-600 space-y-2 ml-4"><li><strong>Title certification:</strong> Request a legal status certificate</li><li><strong>Survey (Deslinde):</strong> Confirm the survey is approved</li><li><strong>Taxes up to date:</strong> Verify there are no IPI debts</li><li><strong>Liens:</strong> No mortgages or attachments</li></ul>${alert('Important', 'Hire a real estate attorney for this verification.')}</div>
      <div class="relative pl-8 pb-8 border-l-2 border-primary-200"><div class="absolute -left-3 top-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"><span class="text-white text-xs font-bold">4</span></div><h3 class="text-xl font-semibold text-gray-900 mb-3">Negotiation and Offer</h3><ul class="list-disc list-inside text-gray-600 space-y-2 ml-4"><li>Submit a formal written offer</li><li>Negotiate price and conditions</li><li>Agree on who pays each cost</li><li>Set a closing deadline</li></ul></div>
      <div class="relative pl-8 pb-8 border-l-2 border-primary-200"><div class="absolute -left-3 top-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"><span class="text-white text-xs font-bold">5</span></div><h3 class="text-xl font-semibold text-gray-900 mb-3">Promise of Sale Contract (Contrato de Promesa de Venta)</h3><ul class="list-disc list-inside text-gray-600 space-y-2 ml-4"><li>Complete property description</li><li>Agreed price and payment terms</li><li>Deposit (usually 10%)</li><li>Deadline for the final contract</li><li>Penalties for non-compliance</li></ul></div>
      <div class="relative pl-8 pb-8 border-l-2 border-primary-200"><div class="absolute -left-3 top-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"><span class="text-white text-xs font-bold">6</span></div><h3 class="text-xl font-semibold text-gray-900 mb-3">Payment and Sale Contract</h3><ul class="list-disc list-inside text-gray-600 space-y-2 ml-4"><li>Payment of the remaining balance</li><li>Signing before a notary</li><li>Payment of transfer tax (3%)</li><li>Legalization of signatures</li></ul></div>
      <div class="relative pl-8"><div class="absolute -left-3 top-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">${checkSvg.replace('text-green-600', 'text-white')}</div><h3 class="text-xl font-semibold text-gray-900 mb-3">Property Registration</h3><ul class="list-disc list-inside text-gray-600 space-y-2 ml-4"><li>Submission to the Title Registry (Registro de Titulos)</li><li>Payment of registration fees</li><li>Issuance of the new title certificate</li></ul>${callout('Congratulations!', 'Once registered, the property is officially yours.', 'green')}</div>
    </div>
  `),
  section('costos', 'Additional Costs to Consider', `
    <div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-gray-100"><th class="border p-3 font-semibold">Item</th><th class="border p-3 font-semibold">Cost</th><th class="border p-3 font-semibold">Who Pays</th></tr></thead><tbody>
    <tr><td class="border p-3">Transfer Tax</td><td class="border p-3">3%</td><td class="border p-3">Buyer</td></tr>
    <tr class="bg-gray-50"><td class="border p-3">Attorney Fees</td><td class="border p-3">1% - 2%</td><td class="border p-3">Buyer</td></tr>
    <tr><td class="border p-3">Notary Fees</td><td class="border p-3">RD$5,000 - RD$15,000</td><td class="border p-3">Buyer</td></tr>
    <tr class="bg-gray-50"><td class="border p-3">Title Registration</td><td class="border p-3">Variable</td><td class="border p-3">Buyer</td></tr>
    <tr><td class="border p-3">Agent Commission</td><td class="border p-3">3% - 5%</td><td class="border p-3">Seller</td></tr>
    </tbody></table></div>
  `),
  section('consejos', 'Useful Tips', `
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-primary-50 p-6 rounded-lg"><h3 class="font-semibold text-primary-900 mb-2">Work with Professionals</h3><p class="text-primary-800 text-sm">Hire a real estate attorney and work with verified agents.</p></div>
      <div class="bg-primary-50 p-6 rounded-lg"><h3 class="font-semibold text-primary-900 mb-2">Do Not Rush</h3><p class="text-primary-800 text-sm">Take your time to verify everything. A hasty decision can be very costly.</p></div>
      <div class="bg-primary-50 p-6 rounded-lg"><h3 class="font-semibold text-primary-900 mb-2">Budget for Extra Costs</h3><p class="text-primary-800 text-sm">Plan for an additional 5-8% on top of the price for closing costs.</p></div>
      <div class="bg-primary-50 p-6 rounded-lg"><h3 class="font-semibold text-primary-900 mb-2">Document Everything</h3><p class="text-primary-800 text-sm">Keep copies of all documents and payment receipts.</p></div>
    </div>
  `),
].join('\n');

// ─── Guide 4: Documentos ───────────────────────────────────────────
const documentosBody = [
  section('comprador', 'Buyer Documents', `<div class="space-y-4">
    ${docItem('National ID (Cedula) or Passport', 'Original and copy. For foreigners: valid passport.')}
    ${docItem('Marriage Certificate (if applicable)', 'If married and the property will be in both spouses\' names.')}
    ${docItem('RNC or Business Registration', 'If the purchase is under a company name.')}
    ${docItem('Proof of Funds', 'Bank statement or bank letter.')}
  </div>`),
  section('vendedor', 'Seller Documents', `<div class="space-y-4">
    ${docItem('National ID (Cedula) or Passport', 'Original and copy of the registered owner.')}
    ${docItem('Original Title Certificate (Certificado de Titulo)', 'The document proving ownership of the property.')}
    ${docItem('Legal Status Certificate (Certificacion de Estado Juridico)', 'Issued by the Title Registry (Registro de Titulos). Valid for 30 days.')}
    ${docItem('Approved Survey Plan (Plano de Deslinde)', 'Cadastral plan with the exact measurements of the property.')}
    ${docItem('Tax Clearance Certificate', 'Proof of payment of IPI and other municipal taxes.')}
    ${docItem('Marriage or Divorce Certificate', 'To verify marital regime and whether the spouse must sign.')}
  </div>`),
  section('transferencia', 'Documents for the Transfer', `<div class="space-y-4">
    ${docItem('Notarized Sale Contract (Contrato de Venta)', 'Sale deed signed before a notary public with legalized signatures.', 'primary')}
    ${docItem('3% Transfer Tax Payment Receipt', 'Proof of payment of the transfer tax to the DGII.', 'primary')}
    ${docItem('Transfer Application Form', 'Official form from the corresponding Title Registry (Registro de Titulos).', 'primary')}
    ${docItem('Registration Fee Receipt', 'Payment for Title Registry services.', 'primary')}
  </div>`),
  section('notas', 'Important Notes', `<div class="space-y-4">
    ${alert('Document Validity', 'The legal status certificate is valid for 30 days. Request it close to the closing date.')}
    ${alert('Original Documents', 'The Title Registry requires original documents. Keep certified copies.')}
    ${alert('Power of Attorney', 'If you cannot be present, you will need a specific notarized power of attorney.')}
    ${alert('Foreigners', 'Foreigners can buy with their passport. Residency is not required.')}
  </div>`),
  section('checklist', 'Verification Checklist', `
    <div class="bg-gray-50 rounded-lg p-6"><p class="text-gray-700 mb-4">Before closing the purchase, verify:</p><ul class="space-y-3">
    ${['Original title certificate verified', 'Valid legal status certificate', 'No outstanding liens or mortgages', 'IPI taxes up to date', 'Approved survey plan (Deslinde)', 'Seller identity verified'].map(item => `<li class="flex items-center gap-3"><input type="checkbox" class="w-5 h-5 rounded border-gray-300" /><span class="text-gray-700">${item}</span></li>`).join('')}
    </ul></div>
  `),
].join('\n');

// ─── Guide 5: Impuestos ────────────────────────────────────────────
const impuestosBody = [
  section('transferencia', 'Real Estate Transfer Tax', `
    <div class="bg-white border rounded-lg p-6 mb-6"><div class="grid md:grid-cols-2 gap-6"><div><h3 class="font-semibold text-gray-900 mb-2">Rate</h3><p class="text-3xl font-bold text-primary-600">3%</p><p class="text-gray-600 text-sm mt-1">of the sale price or appraisal value (whichever is higher)</p></div><div><h3 class="font-semibold text-gray-900 mb-2">Who Pays</h3><p class="text-gray-700">The buyer (generally)</p></div></div></div>
    <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6"><li>Paid once at the time of transfer</li><li>Must be paid before registering the property</li><li>Calculated on the higher value between sale price and appraisal</li><li>Paid at the DGII (tax authority)</li></ul>
    ${callout('Exemptions', 'Properties through a trust (Fideicomiso, Law 189-11), first-time low-cost housing, and transfers by inheritance.', 'green')}
  `),
  section('ipi', 'IPI - Real Estate Property Tax (Impuesto al Patrimonio Inmobiliario)', `
    <div class="bg-white border rounded-lg p-6 mb-6"><div class="grid md:grid-cols-2 gap-6"><div><h3 class="font-semibold text-gray-900 mb-2">Annual Rate</h3><p class="text-3xl font-bold text-primary-600">1%</p><p class="text-gray-600 text-sm mt-1">on the value exceeding the exempt amount</p></div><div><h3 class="font-semibold text-gray-900 mb-2">Exempt Amount (2024)</h3><p class="text-2xl font-bold text-gray-700">RD$9,860,649</p><p class="text-gray-600 text-sm mt-1">Adjusted annually for inflation</p></div></div></div>
    <p class="text-gray-700 mb-4">The IPI is an annual tax applied to the total real estate holdings of an individual.</p>
    <div class="bg-gray-50 rounded-lg p-6 mb-6"><h4 class="font-semibold text-gray-900 mb-3">Calculation Example:</h4><table class="w-full text-sm"><tbody>
    <tr><td class="py-2">Total property value:</td><td class="py-2 text-right font-semibold">RD$15,000,000</td></tr>
    <tr><td class="py-2">Less: Exempt amount:</td><td class="py-2 text-right font-semibold">- RD$9,860,649</td></tr>
    <tr class="border-t"><td class="py-2">Taxable base:</td><td class="py-2 text-right font-semibold">RD$5,139,351</td></tr>
    <tr class="border-t bg-primary-50"><td class="py-2 font-semibold">IPI to pay (1%):</td><td class="py-2 text-right font-bold text-primary-600">RD$51,394</td></tr>
    </tbody></table></div>
    <h3 class="text-lg font-semibold text-gray-900 mb-3">Payment Dates:</h3>
    <div class="grid md:grid-cols-2 gap-4 mb-6"><div class="bg-white border rounded-lg p-4"><p class="font-semibold text-gray-900">First Installment</p><p class="text-gray-600 text-sm">March 11</p></div><div class="bg-white border rounded-lg p-4"><p class="font-semibold text-gray-900">Second Installment</p><p class="text-gray-600 text-sm">September 11</p></div></div>
    ${callout('IPI Exemptions', 'Primary residence with value below the exempt amount, agricultural properties, low-cost housing land, free-zone properties.', 'primary')}
  `),
  section('ganancia-capital', 'Capital Gains Tax', `
    <div class="bg-white border rounded-lg p-6 mb-6"><div class="grid md:grid-cols-2 gap-6"><div><h3 class="font-semibold text-gray-900 mb-2">Rate</h3><p class="text-3xl font-bold text-primary-600">27%</p><p class="text-gray-600 text-sm mt-1">on the profit obtained</p></div><div><h3 class="font-semibold text-gray-900 mb-2">Who Pays</h3><p class="text-gray-700">The seller</p></div></div></div>
    <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6"><li>Sale of properties by companies or corporations</li><li>Sale of properties that are not the primary residence</li><li>Sale within the first 5 years (habitual activity)</li></ul>
    ${callout('Exemption', 'The sale of a primary residence by an individual is generally exempt, as long as it is not a habitual activity.', 'green')}
  `),
  section('otros', 'Other Costs and Taxes', `<div class="space-y-4">
    <div class="bg-white border rounded-lg p-5"><h3 class="font-semibold text-gray-900 mb-2">Municipal Taxes</h3><p class="text-gray-600 text-sm">Fees for waste collection, public beautification services, etc.</p></div>
    <div class="bg-white border rounded-lg p-5"><h3 class="font-semibold text-gray-900 mb-2">Registration Fees</h3><p class="text-gray-600 text-sm">Title Registry (Registro de Titulos) fees. Varies by jurisdiction.</p></div>
    <div class="bg-white border rounded-lg p-5"><h3 class="font-semibold text-gray-900 mb-2">Notary Fees</h3><p class="text-gray-600 text-sm">Notary fees for legalization and preparation of the sale deed.</p></div>
    <div class="bg-white border rounded-lg p-5"><h3 class="font-semibold text-gray-900 mb-2">Legal Fees</h3><p class="text-gray-600 text-sm">Generally between 1% and 2% of the property value.</p></div>
  </div>`),
  section('resumen', 'Summary of Costs When Buying', `
    <div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-gray-100"><th class="border p-3 font-semibold">Item</th><th class="border p-3 font-semibold">Percentage/Amount</th><th class="border p-3 font-semibold">When</th></tr></thead><tbody>
    <tr><td class="border p-3">Transfer Tax</td><td class="border p-3">3%</td><td class="border p-3">At purchase</td></tr>
    <tr class="bg-gray-50"><td class="border p-3">Legal and Notary Fees</td><td class="border p-3">1% - 2%</td><td class="border p-3">At purchase</td></tr>
    <tr><td class="border p-3">Title Registration</td><td class="border p-3">Variable</td><td class="border p-3">At purchase</td></tr>
    <tr class="bg-gray-50"><td class="border p-3">IPI (if applicable)</td><td class="border p-3">1% annually</td><td class="border p-3">Every year</td></tr>
    </tbody></table></div>
    <div class="mt-6">${alert('Tip', 'Budget an additional 5% to 8% on top of the purchase price to cover all costs.')}</div>
  `),
].join('\n');

// ─── Guide 6: Extranjeros ──────────────────────────────────────────
const extranjerosBody = [
  section('pueden', 'Can Foreigners Buy Property?', `
    <div class="bg-green-50 border-l-4 border-green-500 p-6 mb-8"><h2 class="text-xl font-bold text-green-800 mb-3">Great News!</h2><p class="text-green-700">The Dominican Republic is one of the most friendly countries for foreign investment. Foreigners have the <strong>same rights as Dominican citizens</strong> to buy and own property, with no restrictions.</p></div>
    <p class="text-gray-700 mb-4"><strong>Yes, absolutely.</strong> The Dominican Constitution guarantees the right to property for everyone. You do not need:</p>
    <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4"><li>Permanent or temporary residency</li><li>Special investor visa</li><li>A Dominican partner</li><li>Special government authorization</li></ul>
  `),
  section('requisitos', 'Requirements for Foreigners', `<div class="space-y-4">
    ${docItem('Valid Passport', 'It is the only identification document required.')}
    ${docItem('Purchase Funds', 'You can bring funds from abroad or use Dominican bank accounts.')}
    ${docItem('RNC (Optional but Recommended)', 'The National Taxpayer Registry (Registro Nacional de Contribuyentes) facilitates tax procedures.')}
  </div>`),
  section('proceso', 'Purchase Process for Foreigners', `
    <p class="text-gray-700 mb-6">The process is essentially the same as for Dominican citizens:</p>
    <ol class="space-y-6">
      ${step(1, 'Search and Selection', 'Find the ideal property. You can do this remotely or by visiting the country.')}
      ${step(2, 'Legal Due Diligence', 'Hire a local attorney to verify the legal status.')}
      ${step(3, 'Contract and Deposit', 'Sign the promise of sale contract and make the initial deposit.')}
      ${step(4, 'Fund Transfer', 'Transfer payment via international bank wire.')}
      ${step(5, 'Closing and Registration', 'Sign the final contract and register the property in your name.')}
    </ol>
  `),
  section('poder', 'Buying Without Being Present', `
    <p class="text-gray-700 mb-4">If you cannot travel, you can grant a <strong>Power of Attorney</strong> to a local attorney.</p>
    <div class="bg-primary-50 border rounded-lg p-6 mb-6"><h3 class="font-semibold text-primary-900 mb-3">Types of Power of Attorney:</h3><ul class="space-y-3">
    <li class="flex items-start gap-3"><span class="w-6 h-6 bg-primary-200 rounded-full flex items-center justify-center text-sm">1</span><div><strong class="text-primary-900">Special Power of Attorney (Poder Especial):</strong> <span class="text-primary-700">For a specific transaction. The most recommended.</span></div></li>
    <li class="flex items-start gap-3"><span class="w-6 h-6 bg-primary-200 rounded-full flex items-center justify-center text-sm">2</span><div><strong class="text-primary-900">General Power of Attorney (Poder General):</strong> <span class="text-primary-700">For multiple transactions. Use with caution.</span></div></li>
    </ul></div>
    ${alert('Power of Attorney Requirements', 'Must be notarized in your country, requires a Hague Apostille, and must be translated to Spanish by a certified translator.')}
  `),
  section('fondos', 'Fund Transfer', `
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-3">Payment Options</h3><ul class="text-gray-600 text-sm space-y-2"><li>• International bank transfer (SWIFT)</li><li>• Cashier's check from a local bank</li><li>• Dominican bank account</li><li>• Services like Wise</li></ul></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-3">Considerations</h3><ul class="text-gray-600 text-sm space-y-2"><li>• Document the source of funds</li><li>• Consider USD/DOP exchange rates</li><li>• Large payments require a declaration</li><li>• Keep all receipts</li></ul></div>
    </div>
    ${callout('Opening a Bank Account', 'Foreigners can open accounts in the DR with a passport, proof of address, and bank references.', 'green')}
  `),
  section('impuestos', 'Taxes for Foreigners', `
    <p class="text-gray-700 mb-4">Foreigners pay the same taxes as Dominican citizens:</p>
    <div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-gray-100"><th class="border p-3 font-semibold">Tax</th><th class="border p-3 font-semibold">Rate</th><th class="border p-3 font-semibold">When</th></tr></thead><tbody>
    <tr><td class="border p-3">Transfer Tax</td><td class="border p-3">3%</td><td class="border p-3">At purchase</td></tr>
    <tr class="bg-gray-50"><td class="border p-3">IPI</td><td class="border p-3">1% annually</td><td class="border p-3">If exceeds exempt amount</td></tr>
    <tr><td class="border p-3">Capital Gains</td><td class="border p-3">27%</td><td class="border p-3">At sale</td></tr>
    </tbody></table></div>
  `),
  section('residencia', 'Residency by Investment', `
    <div class="bg-white border rounded-lg p-6 mb-6"><h3 class="font-semibold text-gray-900 mb-3">Investor Residency</h3><p class="text-gray-600 mb-4">With an investment of <strong>US$200,000 or more</strong>, you can apply for temporary residency.</p><ul class="text-gray-600 text-sm space-y-1"><li>• Initial duration: 1 year, renewable</li><li>• After 5 years: permanent residency</li><li>• After that: option for naturalization</li></ul></div>
    ${callout('Benefits of Residency', 'Longer stays, easier bank account access, ability to work legally, access to local services.', 'primary')}
  `),
  section('consejos', 'Tips for Foreigners', `
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Hire a Local Attorney</h3><p class="text-gray-600 text-sm">It is essential to have legal representation familiar with the Dominican system.</p></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Visit the Property</h3><p class="text-gray-600 text-sm">If possible, visit in person before buying.</p></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Research the Developer</h3><p class="text-gray-600 text-sm">Verify their reputation and previous projects.</p></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Consider Property Management</h3><p class="text-gray-600 text-sm">If you will not live there permanently, hire professional property management.</p></div>
    </div>
  `),
].join('\n');

// ─── Guide 7: Invertir en Punta Cana ───────────────────────────────
const invertirBody = [
  section('por-que', 'Why Invest in Punta Cana?', `
    <p class="text-gray-700 mb-6">Punta Cana is the most visited tourist destination in the Caribbean, with millions of tourists annually.</p>
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white border rounded-lg p-6 text-center"><p class="text-3xl font-bold text-primary-600 mb-2">7M+</p><p class="text-gray-600 text-sm">Annual tourists to DR</p></div>
      <div class="bg-white border rounded-lg p-6 text-center"><p class="text-3xl font-bold text-primary-600 mb-2">85%</p><p class="text-gray-600 text-sm">Average hotel occupancy</p></div>
      <div class="bg-white border rounded-lg p-6 text-center"><p class="text-3xl font-bold text-primary-600 mb-2">8-12%</p><p class="text-gray-600 text-sm">Average annual return</p></div>
    </div>
    <div class="bg-green-50 border-l-4 border-green-500 p-6"><h3 class="font-semibold text-green-800 mb-3">Advantages</h3><ul class="text-green-700 space-y-2"><li>• Year-round stable tourism</li><li>• High demand for vacation rentals</li><li>• Steady property appreciation</li><li>• World-class infrastructure</li><li>• International airport with direct flights</li><li>• Political and economic stability</li></ul></div>
  `),
  section('zonas', 'Investment Zones', `<div class="space-y-6">
    <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 text-lg">Bavaro</h3><p class="text-gray-600 mt-2">The most developed and touristy area. Ideal for short-term rentals.</p><div class="mt-3 flex gap-4 text-sm"><span class="text-green-600">Profitability: High</span><span class="text-primary-600">Price: $$$$</span></div></div>
    <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 text-lg">Cap Cana</h3><p class="text-gray-600 mt-2">Exclusive luxury development. Premium properties, golf, private marina.</p><div class="mt-3 flex gap-4 text-sm"><span class="text-green-600">Profitability: Medium-High</span><span class="text-primary-600">Price: $$$$$</span></div></div>
    <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 text-lg">Punta Cana Village</h3><p class="text-gray-600 mt-2">Growing area near the airport. Good appreciation opportunities.</p><div class="mt-3 flex gap-4 text-sm"><span class="text-green-600">Profitability: Medium</span><span class="text-primary-600">Price: $$$</span></div></div>
    <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 text-lg">Los Corales / El Cortecito</h3><p class="text-gray-600 mt-2">Most accessible and popular area. Excellent for Airbnb.</p><div class="mt-3 flex gap-4 text-sm"><span class="text-green-600">Profitability: High</span><span class="text-primary-600">Price: $$</span></div></div>
  </div>`),
  section('tipos', 'Investment Types', `
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 text-lg mb-3">Vacation Apartments</h3><p class="text-gray-600 text-sm mb-4">Studios and 1-2 bedroom apartments. High demand on Airbnb.</p><ul class="text-sm text-gray-600 space-y-1"><li>• Investment: US$80,000 - US$250,000</li><li>• Return: 8-12% annually</li><li>• Occupancy: 60-80%</li></ul></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 text-lg mb-3">Condo-Hotels</h3><p class="text-gray-600 text-sm mb-4">Units in professionally operated hotels.</p><ul class="text-sm text-gray-600 space-y-1"><li>• Investment: US$150,000 - US$400,000</li><li>• Return: 6-8% guaranteed</li><li>• Management: Included</li></ul></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 text-lg mb-3">Luxury Villas</h3><p class="text-gray-600 text-sm mb-4">Weekly rentals to high-net-worth groups.</p><ul class="text-sm text-gray-600 space-y-1"><li>• Investment: US$500,000+</li><li>• Return: 6-10% annually</li><li>• Rate: $500-$2,000/night</li></ul></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 text-lg mb-3">Land</h3><p class="text-gray-600 text-sm mb-4">Long-term investment for appreciation.</p><ul class="text-sm text-gray-600 space-y-1"><li>• Investment: From US$30,000</li><li>• Return: 5-15% annual appreciation</li><li>• Liquidity: Low</li></ul></div>
    </div>
  `),
  section('rentabilidad', 'Profitability Analysis', `
    <div class="bg-gray-50 rounded-lg p-6 mb-6"><h3 class="font-semibold text-gray-900 mb-4">Example: 1-Bedroom Apartment in Bavaro</h3><table class="w-full text-sm"><tbody>
    <tr class="border-b"><td class="py-3 text-gray-600">Purchase price:</td><td class="py-3 text-right font-semibold">US$150,000</td></tr>
    <tr class="border-b"><td class="py-3 text-gray-600">Average rate/night:</td><td class="py-3 text-right font-semibold">US$120</td></tr>
    <tr class="border-b"><td class="py-3 text-gray-600">Annual occupancy:</td><td class="py-3 text-right font-semibold">70% (255 nights)</td></tr>
    <tr class="border-b"><td class="py-3 text-gray-600">Gross annual income:</td><td class="py-3 text-right font-semibold">US$30,600</td></tr>
    <tr class="border-b"><td class="py-3 text-gray-600">Operating expenses (30%):</td><td class="py-3 text-right font-semibold">- US$9,180</td></tr>
    <tr class="bg-primary-50"><td class="py-3 font-semibold">Net annual income:</td><td class="py-3 text-right font-bold text-primary-600">US$21,420</td></tr>
    <tr class="bg-primary-50"><td class="py-3 font-semibold">Return on investment:</td><td class="py-3 text-right font-bold text-primary-600">14.3%</td></tr>
    </tbody></table></div>
    ${alert('Expenses to Consider', 'Management 15-25%, common area maintenance (HOA), utilities, cleaning, IPI taxes, insurance.')}
  `),
  section('temporadas', 'Tourist Seasons', `
    <div class="grid md:grid-cols-3 gap-6">
      <div class="bg-green-50 border border-green-200 rounded-lg p-6"><h3 class="font-semibold text-green-800 mb-2">High Season</h3><p class="text-sm text-green-700 mb-3">December - April</p><ul class="text-sm text-green-600 space-y-1"><li>• Occupancy: 80-95%</li><li>• Rates: +40-60%</li></ul></div>
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6"><h3 class="font-semibold text-yellow-800 mb-2">Mid Season</h3><p class="text-sm text-yellow-700 mb-3">May - July, November</p><ul class="text-sm text-yellow-600 space-y-1"><li>• Occupancy: 60-75%</li><li>• Rates: Standard</li></ul></div>
      <div class="bg-orange-50 border border-orange-200 rounded-lg p-6"><h3 class="font-semibold text-orange-800 mb-2">Low Season</h3><p class="text-sm text-orange-700 mb-3">August - October</p><ul class="text-sm text-orange-600 space-y-1"><li>• Occupancy: 40-55%</li><li>• Rates: -20-30%</li></ul></div>
    </div>
  `),
  section('consejos', 'Investment Tips', `<div class="space-y-4">
    ${callout('Location Is Key', 'Prefer properties close to the beach. Tourists value proximity to the sea.', 'primary')}
    ${callout('Verify the Developer', 'Research their track record. Visit previous projects and talk to owners.', 'primary')}
    ${callout('Consider Property Management', 'If you do not live in DR, you will need professional management. Factor in the cost.', 'primary')}
    ${callout('Do Not Overpay', 'Compare prices. Work with a trusted local agent.', 'primary')}
  </div>`),
  section('riesgos', 'Risks to Consider', `
    <div class="bg-red-50 border border-red-200 rounded-lg p-6"><ul class="space-y-3">
      <li class="flex items-start gap-3">${warnSvg}<div><strong class="text-red-800">Hurricanes:</strong> <span class="text-red-700">Season runs June-November. Get good insurance.</span></div></li>
      <li class="flex items-start gap-3">${warnSvg}<div><strong class="text-red-800">Oversupply:</strong> <span class="text-red-700">Continuous development may create excessive competition.</span></div></li>
      <li class="flex items-start gap-3">${warnSvg}<div><strong class="text-red-800">Tourism dependency:</strong> <span class="text-red-700">Global events can affect demand.</span></div></li>
      <li class="flex items-start gap-3">${warnSvg}<div><strong class="text-red-800">Poor management:</strong> <span class="text-red-700">Bad property management can ruin profitability.</span></div></li>
    </ul></div>
  `),
].join('\n');

// ─── Export all seeds ──────────────────────────────────────────────
export const guideSeedsDO_EN = [
  {
    country_code: 'DO', lang: 'en', slug: 'bono-primera-vivienda', sort_order: 0,
    title: 'First-Time Home Buyer Bonus in Dominican Republic',
    description: 'Complete guide to the First-Time Home Buyer Bonus (Bono de Primera Vivienda) in DR. Requirements, subsidies up to RD$1,500,000, process, and documents.',
    keywords: 'first home buyer bonus dominican republic, housing subsidy dr, bono primera vivienda',
    category: 'Buying', icon: 'money', tag: 'Government Subsidy',
    hero_description: 'Receive up to RD$1,500,000 in government subsidy to buy your first home. Learn about the requirements, process, and how to apply.',
    toc: [{id:'que-es',label:'What Is the Bonus?'},{id:'montos',label:'Subsidy Amounts'},{id:'requisitos',label:'Requirements'},{id:'documentos',label:'Documents'},{id:'proceso',label:'Process'},{id:'tipos-vivienda',label:'Housing Types'},{id:'consideraciones',label:'Considerations'}],
    body_html: bonoBody,
    faqs: [{question:'What is the First-Time Home Buyer Bonus?',answer:'It is a Dominican government subsidy that grants up to RD$1,500,000 to families for the purchase of their first home, regulated by Law 189-11.'},{question:'How much money can I receive?',answer:'For low-cost housing (up to RD$2,500,000), the bonus can cover up to RD$1,500,000. For moderate-cost housing, up to RD$750,000.'},{question:'What are the requirements?',answer:'Be a Dominican citizen or legal resident, of legal age, not own property, income within program limits, property in a trust-based project (Fideicomiso).'},{question:'How do I apply for the bonus?',answer:'Choose a trust-based project (Fideicomiso), gather your documents, and apply through the trust entity or MIVED.'}],
    related_guides: [{slug:'fideicomiso-inmobiliario',title:'Real Estate Trust (Fideicomiso)',description:'How purchasing through a trust works.'},{slug:'proceso-compra-propiedad',title:'Property Buying Process',description:'Step-by-step buying guide.'},{slug:'documentos-compra-venta',title:'Documents for Buying and Selling',description:'Complete list of documents.'}],
    cta_title: 'Ready to Buy Your First Home?', cta_description: 'Explore properties in projects eligible for the first-time home buyer bonus.', cta_link: '/comprar', cta_link_text: 'View Available Properties',
  },
  {
    country_code: 'DO', lang: 'en', slug: 'fideicomiso-inmobiliario', sort_order: 1,
    title: 'Real Estate Trust (Fideicomiso) in Dominican Republic',
    description: 'Complete guide to real estate trusts (Fideicomiso) in DR. Benefits, process, costs, and legal considerations.',
    keywords: 'real estate trust dominican republic, fideicomiso inmobiliario, law 189-11 dr',
    category: 'Legal', icon: 'shield', tag: 'Legal',
    hero_description: 'Everything you need to know about buying property through a trust (Fideicomiso): benefits, process, costs, and legal considerations.',
    toc: [{id:'que-es',label:'What Is It?'},{id:'beneficios',label:'Benefits'},{id:'partes',label:'Parties Involved'},{id:'proceso',label:'Process'},{id:'costos',label:'Costs'},{id:'consideraciones',label:'Considerations'}],
    body_html: fideicomisoBody,
    faqs: [{question:'What is a real estate trust (Fideicomiso)?',answer:'A legal structure regulated by Law 189-11 that allows the transfer of assets to a trust entity for administration and transfer to beneficiaries.'},{question:'What are the benefits?',answer:'Investment protection, transparency, legal certainty, and possible exemption from the 3% transfer tax.'},{question:'How much does it cost?',answer:'Trust administration fee 0.5%-1% annually, legal fees 1%-2%, possible exemption from the 3% transfer tax.'},{question:'Who regulates trusts?',answer:'The Superintendency of Banks of the Dominican Republic.'}],
    related_guides: [{slug:'proceso-compra-propiedad',title:'Property Buying Process',description:'Step-by-step guide.'},{slug:'documentos-compra-venta',title:'Documents for Buying and Selling',description:'Required documents.'},{slug:'impuestos-inmobiliarios',title:'Real Estate Taxes',description:'Everything about taxes.'}],
    cta_title: 'Looking for Trust-Based Properties?', cta_description: 'Find projects with trust (Fideicomiso) in the Dominican Republic.', cta_link: '/comprar', cta_link_text: 'View Available Properties',
  },
  {
    country_code: 'DO', lang: 'en', slug: 'proceso-compra-propiedad', sort_order: 2,
    title: 'Property Buying Process in DR',
    description: 'Step-by-step guide to buying a property in the Dominican Republic.',
    keywords: 'buy property dominican republic, home buying process dr, real estate purchase guide',
    category: 'Buying', icon: 'house', tag: 'Buying',
    hero_description: 'Complete step-by-step guide to buying your house, apartment, or land in the Dominican Republic.',
    toc: [{id:'pasos',label:'Process Steps'},{id:'costos',label:'Additional Costs'},{id:'consejos',label:'Tips'}],
    body_html: procesoBody,
    faqs: [{question:'What are the steps?',answer:'1) Define needs, 2) Search, 3) Due diligence, 4) Negotiation, 5) Promise of sale contract, 6) Payment and contract, 7) Registration.'},{question:'How much does it cost beyond the price?',answer:'5-8% additional: 3% transfer tax, 1-2% attorney fees, notary RD$5-15K.'},{question:'Do I need a lawyer?',answer:'Yes, highly recommended for due diligence and legal verification.'},{question:'How long does it take?',answer:'30-90 days: verification 1-2 weeks, contracts 1-2 weeks, registration 2-4 weeks.'}],
    related_guides: [{slug:'documentos-compra-venta',title:'Documents for Buying and Selling',description:'Required documents.'},{slug:'fideicomiso-inmobiliario',title:'Real Estate Trust (Fideicomiso)',description:'Buying through a trust.'},{slug:'impuestos-inmobiliarios',title:'Real Estate Taxes',description:'Everything about taxes.'}],
    cta_title: 'Ready to Search for Your Property?', cta_description: 'Explore thousands of properties for sale in the Dominican Republic.', cta_link: '/comprar', cta_link_text: 'View Properties for Sale',
  },
  {
    country_code: 'DO', lang: 'en', slug: 'documentos-compra-venta', sort_order: 3,
    title: 'Documents for Buying and Selling Property',
    description: 'Complete list of documents needed to buy or sell a property in the Dominican Republic.',
    keywords: 'documents buy property dr, real estate requirements, title certificate dominican republic',
    category: 'Legal', icon: 'document', tag: 'Legal',
    hero_description: 'Complete list of all documents you need to buy or sell a property in the Dominican Republic.',
    toc: [{id:'comprador',label:'Buyer Documents'},{id:'vendedor',label:'Seller Documents'},{id:'transferencia',label:'For the Transfer'},{id:'notas',label:'Important Notes'},{id:'checklist',label:'Checklist'}],
    body_html: documentosBody,
    faqs: [{question:'What does the buyer need?',answer:'ID (Cedula) or passport, marriage certificate if applicable, RNC if company, proof of funds.'},{question:'What does the seller provide?',answer:'ID (Cedula), title certificate, legal status certificate (30 days), survey plan (Deslinde), taxes up to date.'},{question:'What is the legal status certificate?',answer:'A document from the Title Registry confirming legal status, liens, and mortgages. Valid for 30 days.'},{question:'Can foreigners buy with a passport?',answer:'Yes, only a valid passport is needed. Residency is not required.'}],
    related_guides: [{slug:'proceso-compra-propiedad',title:'Property Buying Process',description:'Step-by-step guide.'},{slug:'impuestos-inmobiliarios',title:'Real Estate Taxes',description:'Everything about taxes.'},{slug:'extranjeros-comprando-rd',title:'Foreigners Buying in DR',description:'Requirements for foreigners.'}],
    cta_title: 'Need Help with Documents?', cta_description: 'Explore available properties in the Dominican Republic.', cta_link: '/comprar', cta_link_text: 'View Properties',
  },
  {
    country_code: 'DO', lang: 'en', slug: 'impuestos-inmobiliarios', sort_order: 4,
    title: 'Real Estate Taxes in Dominican Republic',
    description: 'Guide to real estate taxes in DR: IPI, transfer tax, capital gains, and more.',
    keywords: 'real estate taxes dominican republic, ipi property tax, 3% transfer tax dr',
    category: 'Legal', icon: 'calculator', tag: 'Legal',
    hero_description: 'Everything you need to know about taxes when buying, owning, and selling property in the DR.',
    toc: [{id:'transferencia',label:'Transfer Tax'},{id:'ipi',label:'IPI'},{id:'ganancia-capital',label:'Capital Gains'},{id:'otros',label:'Other Costs'},{id:'resumen',label:'Summary'}],
    body_html: impuestosBody,
    faqs: [{question:'How much is the transfer tax?',answer:'3% of the sale price or appraisal value. Paid once at the time of purchase.'},{question:'What is the IPI?',answer:'Annual tax of 1% on the value exceeding RD$9,860,649. Payments: March 11 and September 11.'},{question:'Are there exemptions?',answer:'Yes, trust (Fideicomiso) under Law 189-11, first-time low-cost housing, inheritance.'},{question:'Do foreigners pay the same?',answer:'Yes, same taxes: 3% transfer, IPI if applicable, 27% capital gains.'}],
    related_guides: [{slug:'fideicomiso-inmobiliario',title:'Real Estate Trust (Fideicomiso)',description:'Tax benefits.'},{slug:'proceso-compra-propiedad',title:'Property Buying Process',description:'Step-by-step guide.'},{slug:'invertir-punta-cana',title:'Invest in Punta Cana',description:'Investment guide.'}],
    cta_title: 'Questions About Taxes?', cta_description: 'Explore available properties in the Dominican Republic.', cta_link: '/comprar', cta_link_text: 'View Properties',
  },
  {
    country_code: 'DO', lang: 'en', slug: 'extranjeros-comprando-rd', sort_order: 5,
    title: 'Foreigners Buying Property in DR',
    description: 'Complete guide for foreigners who want to buy property in the Dominican Republic.',
    keywords: 'foreigners buying property dominican republic, expat real estate dr, buy house as foreigner',
    category: 'Buying', icon: 'globe', tag: 'Buying',
    hero_description: 'Everything you need to know as a foreigner to buy property in the Dominican Republic.',
    toc: [{id:'pueden',label:'Can Foreigners Buy?'},{id:'requisitos',label:'Requirements'},{id:'proceso',label:'Process'},{id:'poder',label:'Buying Without Being Present'},{id:'fondos',label:'Fund Transfer'},{id:'impuestos',label:'Taxes'},{id:'residencia',label:'Residency by Investment'},{id:'consejos',label:'Tips'}],
    body_html: extranjerosBody,
    faqs: [{question:'Can foreigners buy property?',answer:'Yes, same rights as Dominican citizens. No residency, visa, or local partner required.'},{question:'What documents does a foreigner need?',answer:'Only a valid passport. Optionally a RNC (tax ID).'},{question:'Can I buy without being present?',answer:'Yes, with a notarized Power of Attorney, apostilled and translated to Spanish.'},{question:'Can I obtain residency?',answer:'Yes, with an investment of US$200,000+ you can apply for temporary investor residency.'}],
    related_guides: [{slug:'proceso-compra-propiedad',title:'Property Buying Process',description:'Step-by-step guide.'},{slug:'invertir-punta-cana',title:'Invest in Punta Cana',description:'Popular area for foreigners.'},{slug:'impuestos-inmobiliarios',title:'Real Estate Taxes',description:'Taxes in DR.'}],
    cta_title: 'Ready to Invest in DR?', cta_description: 'Explore available properties in the Dominican Republic.', cta_link: '/comprar', cta_link_text: 'View Properties',
  },
  {
    country_code: 'DO', lang: 'en', slug: 'invertir-punta-cana', sort_order: 6,
    title: 'Punta Cana Real Estate Investment Guide',
    description: 'Complete guide to investing in Punta Cana real estate. Zones, profitability, and tips.',
    keywords: 'invest punta cana, punta cana real estate, investment return dominican republic',
    category: 'Investment', icon: 'trending', tag: 'Investment',
    hero_description: 'Everything you need to know to invest successfully in the most important tourist destination in the Caribbean.',
    toc: [{id:'por-que',label:'Why Punta Cana?'},{id:'zonas',label:'Investment Zones'},{id:'tipos',label:'Investment Types'},{id:'rentabilidad',label:'Profitability'},{id:'temporadas',label:'Seasons'},{id:'consejos',label:'Tips'},{id:'riesgos',label:'Risks'}],
    body_html: invertirBody,
    faqs: [{question:'Is it profitable?',answer:'Yes, returns of 8-12% annually. Hotel occupancy 85%, 7M+ annual tourists.'},{question:'Best areas?',answer:'Bavaro (touristy), Cap Cana (luxury), Punta Cana Village (growing), Los Corales (affordable).'},{question:'How much does an apartment cost?',answer:'US$80K-250K. Villas from US$500K. Land from US$30K.'},{question:'What are the risks?',answer:'Hurricanes, oversupply, tourism dependency, poor management.'}],
    related_guides: [{slug:'extranjeros-comprando-rd',title:'Foreigners Buying in DR',description:'Requirements for foreigners.'},{slug:'fideicomiso-inmobiliario',title:'Real Estate Trust (Fideicomiso)',description:'Protection for your investment.'},{slug:'impuestos-inmobiliarios',title:'Real Estate Taxes',description:'Taxes in DR.'}],
    cta_title: 'Ready to Invest in Punta Cana?', cta_description: 'Explore available properties in Punta Cana.', cta_link: '/propiedades/la-altagracia', cta_link_text: 'View Properties in Punta Cana',
  },
];
