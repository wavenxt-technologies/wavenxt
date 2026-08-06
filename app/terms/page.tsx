"use client";

import { motion } from "framer-motion";
import TableOfContents from "@/components/blog-toc";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "caps"; text: string }
  | { type: "list"; items: string[] };

type Section = {
  id: string;
  number: string;
  title: string;
  blocks: Block[];
};

const p = (text: string): Block => ({ type: "p", text });
const h = (text: string): Block => ({ type: "h", text });
const caps = (text: string): Block => ({ type: "caps", text });
const list = (items: string[]): Block => ({ type: "list", items });

const sections: Section[] = [
  {
    id: "controlling-terms",
    number: "01",
    title: "Controlling Terms",
    blocks: [
      h("Governing Terms"),
      p(
        "All sales and all purchase orders shall be governed exclusively by these Terms and Conditions, and nothing contained in any such purchase order will in any way modify or supplement these Terms and Conditions. Acceptance of Customer's order by Wavenxt is expressly conditional on the assent of Customer to these Terms and Conditions which assent will be conclusively presumed from Customer's acceptance of the Products. Any terms or conditions in the Customer's purchase order or otherwise proposed by Customer, whether written or oral, that add to, vary from, or conflict with these Terms and Conditions are objected to by Wavenxt and shall be deemed null and void."
      ),
      h("Use of Products"),
      p(
        "These Terms and Conditions set forth the terms and conditions for the Customer's purchase of Products, which Products are solely for (i) Customer's internal business use, or (ii) resale, only if and where Customer has been granted distribution rights by Wavenxt for the specific Products to be resold/distributed."
      ),
    ],
  },
  {
    id: "price-and-payment",
    number: "02",
    title: "Price and Payment",
    blocks: [
      h("Quoted Prices"),
      p(
        "The total price for the Products is the amount indicated on the Wavenxt quotation. Prices are valid for the period indicated on the quotation."
      ),
      h("Prices Exclusive of Taxes"),
      p(
        "Except as explicitly provided in the quotations or sales order acknowledgments, prices quoted do not include any taxes (including any excise, sales, use, value added, withholding, and similar taxes), customs duties, tariffs or license fees. To the extent such taxes or duties are required to be collected by Wavenxt, they will be added to the related invoice and are payable in full without reduction or setoff. If exemption from taxes or duties is claimed, Customer will provide a certificate of exemption."
      ),
      h("Currency"),
      p(
        "Unless otherwise indicated in the quotation, payment for Products shall be made in U.S. Dollars to Wavenxt's accounts in the United States of America, or such other place as Wavenxt may designate, by check, wire transfer, or, if required by Wavenxt, letter of credit in full in advance of shipment."
      ),
    ],
  },
  {
    id: "orders-and-delivery",
    number: "03",
    title: "Orders and Delivery",
    blocks: [
      h("Purchase Orders"),
      p(
        "All purchase orders from the Customer should be made directly to sales@wavenxt.com. Customers shall submit purchase orders to Wavenxt at least sixty (60) days prior to the requested delivery date, but no more than one hundred eighty (180) days before the requested delivery date. No order shall be binding upon Wavenxt until accepted by Wavenxt in writing, and Wavenxt shall have no liability to Customer with respect to purchase orders that are not accepted or with respect to the delivery of items not specified on Customer's purchase order. Wavenxt shall use its reasonable commercial efforts to notify Customer of the acceptance or rejection of an order and the anticipated delivery date for accepted orders within thirty (30) days after receipt of the purchase order. Any purchase order placed with less than the required lead time may result in additional charges should Wavenxt accept the requested delivery schedule."
      ),
      h("Cancellations and Rescheduling"),
      p(
        "Customers may cancel a purchase order without penalty by giving written notice of the cancellation to Wavenxt within forty-eight (48) hours of the initial placement of the order. After such time, Customer shall not cancel, modify, or reschedule orders for Products within 30 days of original requested delivery date. Customer may modify or cancel orders more than 30 days before original requested delivery date, subject to a ten percent (10%) cancellation fee on the entire order if cancelled, or in the case of a modification, a ten percent (10%) cancellation fee on the positive difference, if any, in price of the order prior to the modification and the price of the order subsequent to the modification."
      ),
      h("Delivery"),
      p(
        "Wavenxt shall use commercially reasonable efforts to supply the Product ordered by Customer in accordance with accepted purchase orders."
      ),
      h("Shipment"),
      p(
        "All Products delivered to Customer shall be suitably packaged, according to Wavenxt sole judgment, for surface or air shipment in Wavenxt standard shipping cartons. Unless otherwise agreed by the parties, Wavenxt shall select the carrier."
      ),
      p(
        'Unless otherwise indicated on the Wavenxt quotation or sales order acknowledgement, each shipment will be delivered Ex Works Wavenxt facilities at Bengaluru (the "Shipping Point") for delivery to the designated carrier.'
      ),
      p(
        "Customer shall also bear all applicable taxes, tariffs, duties, and similar charges that may be assessed against the Product after delivery to the Shipping Point."
      ),
      p(
        "If the Customer unreasonably fails to take delivery of the Products within 14 days after shipment date, Wavenxt may cancel this order without notice and charge a twenty percent (20%) cancellation fee."
      ),
      p(
        "If Customer requests delivery of Products to Customer's forwarding agent or another representative in the country of shipment, Customer shall assume responsibility for compliance with applicable export laws and regulations, including the preparation and filing of shipping documentation necessary for export clearance."
      ),
      caps(
        "Wavenxt shall not be liable for any loss, damage or penalty for delay in delivery or for failure to give notice of any delay in delivery of Products. Wavenxt shall not have any liability in connection with shipment, nor shall the carrier be deemed to be an agent of Wavenxt."
      ),
      h("Shipment Acceptance"),
      p(
        "Products are considered accepted by Customer upon transfer of the Product. Any other acceptance procedures must be agreed to by Wavenxt's authorized representative in writing, prior to shipment and may be subject to additional charges. Customer agrees that all sales are final and Wavenxt does not accept the return of any Product unless Wavenxt shipped a Product other than as specified in the purchase order."
      ),
    ],
  },
  {
    id: "software-license",
    number: "04",
    title: "Software License",
    blocks: [
      p(
        "Software accompanying hardware Products are provided under a written Software End User License Agreement which includes restrictions on use, disclosure and copying, and which is incorporated herein by reference. Customer shall obtain a copy of the Software End User License Agreement from Wavenxt."
      ),
    ],
  },
  {
    id: "warranty-and-disclaimer",
    number: "05",
    title: "Warranty and Disclaimer",
    blocks: [
      p(
        "Each Party represents that it has the legal right and corporate authority to enter into this Agreement and is not barred under Applicable Laws."
      ),
      p(
        "Each Party warrants that it will comply with applicable laws while performing its obligations under this Agreement including compliance with US Export Administration Regulations, EU export controls, the US International Traffic in Arms Regulations, economic sanctions laws, anti-boycott laws and regulations, anti-money laundering laws and regulations, other international trade controls, anti-bribery and corruption laws and regulations, the EU Electronic Waste Directive etc."
      ),
      p(
        "The Customer agrees that it will not reverse-engineer, decompile, or disassemble any products, prototypes, or software received from the Wavenxt."
      ),
      h("Limited Product Warranty"),
      p(
        "Wavenxt warrants, only to Customer that, for a period of one (1) year after delivery of the Wavenxt hardware Product (including system software incorporated therein and required to operate the hardware Product), or for a period of ninety (90) days from delivery with respect to replacement parts, that the Product or replacement parts will operate in substantial compliance with the specifications agreed by Wavenxt in writing. This limited Product warranty is applicable solely for any manufacturing defects in the Product. Wavenxt does not warranty that the Product will operate without interruption or will be error free, or that all errors will be corrected."
      ),
      h("Services"),
      p(
        "Wavenxt agrees to provide certain support and debugging services which would be agreed by Wavenxt in writing. Wavenxt warrants that it would perform such services in a workmanlike manner consistent with industry standards. Customer agrees that it must notify Wavenxt promptly, but in no event more than thirty (30) days after completion of the services, of any breach of this service warranty. Customer's sole and exclusive remedy for breach of this services warranty shall be, at Wavenxt option, (i) re-performance of the services, or (ii) return of the portion of the service fees paid to Wavenxt by Customer for such non-conforming services, termination of any remaining related services to be performed by Wavenxt, and termination of all other Wavenxt obligations with respect to those services under these Terms and Conditions."
      ),
      h("Limitations"),
      p(
        "Wavenxt warranty shall not extend to problems in the Product that result from (i) Customer's failure to implement all error corrections to the Product which are made available by Wavenxt, (ii) changes to the Product or system software or interacting Product made by parties other than Wavenxt, (iii) any use of the Product in a manner for which it was not designed or as not authorized under associated documentation or end user software licenses, (iv) negligence on the part of Customer, its employees, consultants, or agents, (v) any use of the Product with other products, hardware, software, or items not supplied by or inconsistent with the documentation provided by Wavenxt, (vi) misuse, abuse, accident, power surge, or operating conditions outside of the Product's operating specifications or, (vii) Customer use for beta, evaluation, testing, or demonstration purposes, or other circumstances for which Wavenxt does not receive a payment of a purchase price or license fee."
      ),
      h("Disclaimer"),
      caps(
        'Except as expressly set forth above, Wavenxt and its suppliers make no warranties, express, implied, statutory or otherwise, or by course of dealing or trade usage, and Wavenxt and its suppliers specifically disclaim all other warranties and conditions, including any implied conditions or warranties of merchantability, fitness for a particular purpose, non-infringement and satisfactory quality. Except as expressly stated herein, all Products are provided on an "as is" basis without warranty. Customer assumes the entire cost of any damage resulting from the information produced by the Product or any changes made by the Product to any third party or Customer hardware, software, or inventory. Customer assumes all responsibilities for selection of the Product to achieve Customer\'s intended results, and for the installation of, use of, and results obtained from the Product.'
      ),
    ],
  },
  {
    id: "infringement-indemnity",
    number: "06",
    title: "Infringement Indemnity",
    blocks: [
      h("Wavenxt Indemnity"),
      p(
        "Wavenxt shall defend or settle any third party claim, demand, suit or proceeding against Customer to the extent that such claim, demand, suit or proceeding is directly based on an allegation that any portion of the Product owned by Wavenxt, as furnished to Customer under these Terms and Conditions and used as authorized in these Terms and Conditions, infringes any third party's copyright or misappropriates such third party's trade secrets (an \"Action\"), provided that Customer (i) gives prompt written notice of the Action to Wavenxt, (ii) gives Wavenxt the exclusive authority to control and direct the defense or settlement of such Action, and (iii) gives Wavenxt, at Customer's own expense, all reasonably necessary information and assistance needed for the defense or settlement of such action. Wavenxt shall pay all amounts paid in settlement and all damages and costs awarded with respect to such Action defended by Wavenxt. Customer may participate in the defense of an Action after Wavenxt assumes the defense or settlement of the Action, provided that Customer shall pay any legal fees and expenses and other costs of defense it incurs in so participating. Wavenxt will not be liable for any costs or expenses incurred without its prior written authorization."
      ),
      h("Replacement Product"),
      p(
        "If any portion of the Product is held, or in Wavenxt opinion is likely to be held, to infringe or misappropriate a third party's intellectual property rights, then Wavenxt may at its sole option and expense: (i) procure for Customer the right to continue using the Product, (ii) replace the Product with non-infringing Product, or (iii) in the event that neither of the foregoing is reasonably practicable, terminate these Terms and Conditions and refund to Customer the amounts paid for the Product returned to Wavenxt, less a reasonable sum for prior use based on the price originally paid by Customer to Wavenxt for the Product, and reduced by an equal monthly amount on a straight line basis over three years from date of original shipment."
      ),
      h("Limit on Indemnity"),
      p(
        "The foregoing notwithstanding, Wavenxt shall have no liability for a claim of infringement to the extent the claim is based on: (i) the use by Customer of any Product more than thirty (30) days after Wavenxt notifies Customer in writing that continued use of the Product may subject Customer to such claim of infringement, provided that such claim of infringement would have been avoided by the use of a replacement release made available by Wavenxt; (ii) the combination of any Product with other products not provided by Wavenxt, which claim would have been avoided if Product had not been so combined; or, (iii) the modification of any of the Product by anyone other than Wavenxt or its suppliers; or (iv) Wavenxt compliance with Customer's designs, specifications, or instructions."
      ),
      h("Entire Liability"),
      caps(
        "The foregoing provisions of this section state the entire liability and obligations of Wavenxt, and the exclusive remedy of Customer, with respect to any actual or alleged infringement of or misappropriation of any intellectual property right by the Product and its documentation."
      ),
      p(
        "Customer shall indemnify, defend and hold harmless the Wavenxt against all damages, including costs and attorney's fees, arising from any demands, claims or legal actions by a third party that claim that Customer has infringed a third-party intellectual property right while using the Products in breach of the terms of the Agreement. The provisions of this Section shall survive termination of this Agreement."
      ),
    ],
  },
  {
    id: "limitation-of-liability",
    number: "07",
    title: "Limitation of Liability",
    blocks: [
      caps(
        "To the maximum extent allowed under law, in no event will Wavenxt be liable for any lost profits or incidental, special, consequential, exemplary, or indirect damages, and including but not limited to, loss of data, business interruption, loss of business information, the cost of procuring substitute or alternative goods and services, or other similar loss arising from the use of (or inability to use) the Product or documentation, the data collected or created in the use of the Product, or the accompanying documentation, no matter how caused and on any theory of liability."
      ),
      caps(
        "In no event shall Wavenxt's total liability to Customer for all damages, in any one or more causes of action, arising out of or in connection with the purchase or use of a Product (including without limitation pursuant to Section 6) exceed the amount paid by Customer for that Product (that are still within their warranty period) under which the claim arises."
      ),
    ],
  },
  {
    id: "term-and-termination",
    number: "08",
    title: "Term and Termination",
    blocks: [
      h("Term"),
      p(
        "These Terms and Conditions shall remain in full force and effect until otherwise terminated below."
      ),
      h("Termination"),
      list([
        "These Terms and Conditions will automatically and immediately terminate if Customer breaches any provision of the Software End User License Agreement.",
        "Wavenxt may elect to terminate these Terms and Conditions if Customer is late in its payment for Product.",
        "Either party may terminate these Terms and Conditions if the other party breaches a material term, and such breach is not cured within thirty (30) days of written notice of the breach as given by the non-breaching party.",
        "Either party may immediately terminate these Terms and Conditions by delivering written notice to the other party upon the occurrence of any of the following events: (i) a receiver is appointed for the other party or its property; (ii) the other party commences, or has commenced against it, proceedings under any bankruptcy, insolvency or debtor's relief law, which proceedings are not dismissed within ninety (90) days; or (iii) the other party is liquidated or dissolved.",
      ]),
    ],
  },
  {
    id: "governing-law-and-dispute-resolution",
    number: "09",
    title: "Governing Law and Dispute Resolution",
    blocks: [
      p("This Agreement shall be governed by the laws of India."),
      p(
        "In case of any disagreement or dispute between the Customer and Wavenxt, the dispute will be resolved in the manner as outlined hereunder."
      ),
      p(
        'The parties shall attempt to mutually and amicably resolve all disputes arising out of or in relation to this Agreement, including any question regarding its construction, interpretation, enforceability, breach, existence, validity or termination within 15 days of being brought to its attention ("Consultation Period") and if any such dispute is not resolved before the expiry of the Consultation Period, the dispute shall be finally settled under Arbitration & Conciliation Act, 1996 (as amended from time to time) by a sole arbitrator mutually appointed by the parties. The place/seat of arbitration shall be at Bengaluru, Karnataka and the language of the arbitral proceedings shall be English. Each party shall bear its own cost of arbitration proceedings. The award passed by the arbitrator shall be final and binding on the parties.'
      ),
    ],
  },
  {
    id: "confidential-information",
    number: "10",
    title: "Confidential Information",
    blocks: [
      p(
        '"Confidential Information" means any non-public or proprietary information and trade secrets relating to Wavenxt\'s business, disclosed or made available to the Customer, whether orally or in written, electronic or other form or media, and whether or not marked, designated or otherwise identified as "confidential" (including any proprietary information and trade secrets of Wavenxt) but not including information that:'
      ),
      list([
        "is or becomes publicly known through no act or omission of the Customer;",
        "was in the Customer's lawful possession prior to the disclosure;",
        "is lawfully disclosed to the Customer by a third party without restriction on disclosure; or",
        "is independently developed by the Customer, which independent development can be shown by written evidence.",
      ]),
      p(
        "The Customer shall use best efforts to prevent the disclosure of any Confidential Information to any other person. All materials containing Confidential Information delivered by the Wavenxt under this Agreement are and shall remain the property of the Wavenxt. At the time of termination, the Customer shall promptly return to Wavenxt, all Confidential Information and any copies thereof."
      ),
      p(
        "The Customer acknowledges that Confidential Information comprises valuable trade secret information of Wavenxt and that breach by the Customer of the terms hereof would result in substantial harm and irreparable injury to Wavenxt. Therefore, the Customer agrees and hereby consents to the entry of an injunction against it in the event of its actual or threatened breach of its obligations hereunder, and acknowledges such relief shall be in addition to such other and further relief as may be available to Wavenxt in law or in equity."
      ),
    ],
  },
  {
    id: "force-majeure",
    number: "11",
    title: "Force Majeure",
    blocks: [
      p(
        "Wavenxt shall not be liable for nonperformance or delays, not otherwise excused, which occur due to causes beyond its reasonable control. These causes shall include, but shall not be limited to, acts of God, wars, epidemic/pandemic, riots, strikes, fires, storms, flood, earthquake, shortages of labor or material, labor disputes, vendor failures, transportation embargoes, acts of any government or agency thereof, judicial action or any or all other causes beyond its reasonable control. In the event of any such excused delay or failure of performance, the date of delivery shall, at the request of Wavenxt, be deferred for a period equal to the time lost by the delay. Wavenxt shall notify Customer in writing of any such event or circumstances within a reasonable time after it learns of same."
      ),
    ],
  },
  {
    id: "proprietary-rights",
    number: "12",
    title: "Proprietary Rights",
    blocks: [
      p(
        "Wavenxt retains all proprietary rights in and to all designs, engineering details and other data pertaining to the Products specified in the order and to all discoveries, inventions, copyrights, patents and trade secrets which may be found or developed as a result of the efforts and work done by Wavenxt in connection with the order and to any and all Products developed by Wavenxt, including the sole right to manufacture or copy any and all such Products. Except as expressly set forth in Section 4 with respect to software, no license, express, implied, or otherwise, is granted by Wavenxt."
      ),
    ],
  },
  {
    id: "modification-and-substitutions",
    number: "13",
    title: "Modification and Substitutions",
    blocks: [
      p(
        "Wavenxt reserves the right to make substitutions and modifications in the specifications of Products manufactured by Wavenxt provided that such substitution or modification will not materially adversely affect the form, fit or function of the Product. Products may contain reconditioned parts."
      ),
    ],
  },
  {
    id: "restrictions",
    number: "14",
    title: "Restrictions",
    blocks: [
      p(
        "Products shall not be sold, exported, reexported, transferred, or diverted directly or indirectly to any person: (i) that is a target of Sanctions; (ii) located, organized or ordinarily residing in Iran, North Korea, Syria, Cuba or the Crimea, Donetsk or Luhansk region of the Ukraine or in violation of any applicable law/regulation."
      ),
      p(
        "Products shall not be sold, exported, reexported, transferred, or diverted directly or indirectly for any prohibited activities, including, but not limited to, prohibited nuclear, missile, unmanned aerial vehicle (drone), or chemical-biological weapons activities."
      ),
      p(
        "Customer confirms that it is not a military end user/military intelligence end user, shall not use the Product(s) for a military end use/military-intelligence end use and shall not sell, export, reexport, transfer or divert the Product(s) to a military end user/military-intelligence end-user."
      ),
    ],
  },
  {
    id: "no-agency",
    number: "15",
    title: "No Agency",
    blocks: [
      p(
        "These Terms and Conditions do not create any agency, partnership, joint venture, or franchise relationship. No employee of either party shall be or become, or shall be deemed to be or become, an employee of the other party by virtue of the existence or implementation of these Terms and Conditions. Each party hereto is an independent contractor. Neither party shall assume or create any obligation of any nature whatsoever on behalf of the other party or bind the other party in any respect whatsoever."
      ),
    ],
  },
  {
    id: "miscellaneous-provisions",
    number: "16",
    title: "Miscellaneous Provisions",
    blocks: [
      h("Entire agreement"),
      p(
        "These Terms and Conditions constitute the final, complete and exclusive agreement between the parties with respect to Customer's use of the Products and supersede any prior or contemporaneous representations or agreements, whether written or oral."
      ),
      h("Notices"),
      p(
        "Any notices provided for in this Agreement shall be in writing and shall be transmitted by Email to the official Email ID of the relevant Party."
      ),
      p(
        "The provisions that by their nature are intended to survive expiration or termination of the Agreement shall survive expiration or termination of this Agreement."
      ),
      p(
        "This Agreement may be amended only by the written agreement executed by the authorised signatories of the Parties."
      ),
      p(
        "Except where otherwise expressly stated herein, and subject to the limitations set forth under this Agreement, the rights and remedies provided for herein are cumulative and not exclusive of any rights or remedies that a Party would otherwise have."
      ),
      p(
        "The Parties agree that there will be no third-party beneficiaries to this Agreement, including, but not limited to any authorized person, end user, customer or the insurance providers for either Party."
      ),
      p(
        "No waiver of any breach of any provision of this Agreement will constitute a waiver of any prior, concurrent or subsequent breach of the same or any other provisions hereof, and no waiver will be effective unless made in writing and signed by an authorized representative of the waiving party. Any delay in exercising a right under the Agreement shall not operate as a waiver thereof."
      ),
      p(
        "Each party shall (i) execute and deliver any additional information, documents, instruments or agreements, and (ii) do or cause to be done any further acts, and (iii) provide all assurances, as may be reasonably necessary or desirable to give effect to the terms of this Agreement."
      ),
      p(
        "If any provision of this Agreement is held invalid or unenforceable, the provision will be deemed modified only to the extent necessary to render it valid or eliminated from this Agreement and this Agreement will be enforced and construed as if the provision had been included in this Agreement as modified or as if it had not been included."
      ),
      p(
        "Each party to this Agreement will bear its respective expenses incurred in connection with the preparation, execution and performance of this Agreement and the transactions contemplated hereby, including all fees and expenses of its legal counsel and other representatives."
      ),
    ],
  },
];

const tocHeadings = sections.map((s) => ({
  id: s.id,
  text: `${s.number}. ${s.title}`,
  level: 2 as const,
}));

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      {/* ── Hero ── */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-40">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500"
          >
            Legal
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mt-6 max-w-4xl font-heading text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl"
          >
            Terms and Conditions of Sale
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-8 max-w-3xl leading-relaxed text-zinc-600"
          >
            These Terms and Conditions govern the purchase of products and
            services from Wavenxt Technologies Pvt. Ltd (&quot;Wavenxt&quot;),
            including any software provided with, or for use with, such
            products or services.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Content ── */}
      <section className="border-t border-zinc-200/80 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-10 md:py-20 xl:grid-cols-12">
          {/* Document */}
          <div className="xl:col-span-8">
            <div className="divide-y divide-zinc-200/80">
              {sections.map((section, idx) => (
                <SectionBlock key={section.id} section={section} index={idx} />
              ))}
            </div>
          </div>

          {/* Sticky TOC */}
          <aside className="hidden xl:block xl:col-span-4">
            <div className="sticky top-32">
              <div className="max-h-[calc(100vh-9rem)] overflow-y-auto rounded-3xl border border-zinc-200 bg-white/50 p-8 backdrop-blur-sm">
                <TableOfContents headings={tocHeadings} />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function SectionBlock({ section, index }: { section: Section; index: number }) {
  return (
    <motion.article
      id={section.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.04, ease }}
      className="scroll-mt-28 py-10 first:pt-0"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-heading text-sm font-medium text-zinc-400">
          {section.number}
        </span>
        <h2 className="font-heading text-2xl font-medium tracking-tight text-zinc-900 md:text-[1.75rem]">
          {section.title}
        </h2>
      </div>

      <div className="mt-6 space-y-5 pl-0 md:pl-9">
        {section.blocks.map((block, i) => {
          if (block.type === "h") {
            return (
              <h3
                key={i}
                className="pt-1 text-sm font-semibold text-zinc-900"
              >
                {block.text}
              </h3>
            );
          }
          if (block.type === "list") {
            return (
              <ul key={i} className="space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-zinc-600">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-zinc-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          }
          if (block.type === "caps") {
            return (
              <div
                key={i}
                className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-[13px] font-medium uppercase leading-relaxed tracking-wide text-zinc-600"
              >
                {block.text}
              </div>
            );
          }
          return (
            <p key={i} className="text-[15px] leading-relaxed text-zinc-600">
              {block.text}
            </p>
          );
        })}
      </div>
    </motion.article>
  );
}
