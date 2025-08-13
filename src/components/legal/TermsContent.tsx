"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";

type Props = {
  compact?: boolean;
};

export default function TermsContent({ compact = false }: Props) {
  const h2 = compact ? "text-lg font-semibold" : "text-xl font-semibold";
  const h3 = compact ? "text-sm font-semibold" : "text-base font-semibold";
  const section = compact ? "space-y-2" : "space-y-3";
  const sep = compact ? "my-4" : "my-6";

  return (
    <div className="text-sm">
      <section id="sec1" className={section}>
        <h2 className={h2}>1. Cost of service &amp; payment terms</h2>
        <h3 className={h3}>Deposit payment</h3>
        <p>
          To secure your move date, binding flat price quote and your requested
          moving services, a <strong>£50</strong> deposit is required on
          booking.
        </p>
        <p>
          You have <strong>24 hours</strong> to pay your deposit to secure your
          move date and binding flat price quote, from the date and time your
          confirmation is sent. <strong>Tranzr Moves</strong> reserves the right
          to change the original quoted flat price for the requested services if
          the deposit is not paid within 24 hours. Availability is not
          guaranteed, as we operate on a first come first serve basis. The
          quoted flat price is subject to change due to peak moving days,
          customer time window request and availability if the deposit is not
          paid within 24 hours.
        </p>
        <p>
          If your quoted move is greater than <strong>£2,000</strong> a
          <strong>10%</strong> deposit of your total quoted moving fee is
          required on booking to secure your move date and your requested moving
          services.
        </p>
        <p>
          All deposit payments are to be paid electronically via the secure
          payment link shared with you, or over the phone. We accept major
          debit/credit cards (Visa, Mastercard, American Express).
        </p>
        <p>
          Your deposit is fully refundable up to <strong>1 business day</strong>
          prior to your move day if you request in writing via email that you
          wish to cancel your services with <strong>Tranzr Moves</strong>. Allow
          up to <strong>5 business days</strong> for the refund to be processed.
          For example, if your move day is on a Wednesday and you would like to
          cancel your move you must cancel on Monday afternoon to have your
          deposit fully refunded. If you cancel on the Tuesday which is the
          business day prior to your move your deposit will not be refunded. For
          Saturday and Sunday moving dates <strong>Thursday close of business</strong>
          is the cutoff to cancel and be fully refunded the deposit amount.
        </p>
        <p>
          If you request a refund either the day of your move, or within 1
          business day before your move date, you will not be refunded your
          deposit.
        </p>
        <p>
          In the instance that the customer postpones their moving date
          <strong>Tranzr Moves</strong> will refund the customer’s deposit
          <strong>30 days</strong> from the postponed move date if the customer
          does not move with <strong>Tranzr Moves</strong>, this refund will be
          directly refunded into the customer’s card which the original deposit
          was paid with. If the customer wishes to move with
          <strong>Tranzr Moves</strong> post the 30 days of their postponed move
          date they must rebook and pay a new deposit.
        </p>
        <h3 className={h3}>Outstanding balance payment</h3>
        <p>
          The remaining balance of your invoice is due <strong>1 business day</strong>
          prior to your move date (except for Long Distance Inbound moves).
          <strong>Tranzr Moves</strong> cannot move you unless the remaining
          balance of your invoice has been received.
        </p>
        <p>
          For Long Distance Inbound moves the remaining balance of your invoice
          is due 1 business day prior to the start of your pick up window.
          <strong>Tranzr Moves</strong> cannot move you unless the remaining
          balance of your invoice has been received.
        </p>
        <p>
          We accept bank transfer and all major debit/credit cards for the
          remaining balance of your invoice. Cash or cheque on the day is by
          prior written agreement only.
        </p>
        <p>
          If you have opted to pay cash or cheque on the day of your move you
          must in writing notify <strong>Tranzr Moves</strong> when you receive
          your invoice and/or during the booking process. You must provide the
          total outstanding balance in cash or cheque to the
          <strong>Tranzr Moves</strong> foreman on arrival. We will not begin
          moving and loading the vehicle unless payment has been made first.
        </p>
        <p>
          If any outstanding payment is not made a third party debt collector
          may be engaged and this may impact your credit score.
        </p>
        <h3 className={h3}>Cancellations and moving date changes</h3>
        <p>
          To cancel your move and requested <strong>Tranzr Moves</strong>
          service, a minimum period of notice of no less than
          <strong>1 business day</strong> prior to your move date is required in
          order for you to obtain a full refund of your deposit and avoid
          additional penalties.
        </p>
        <p>
          To reschedule your move date or requested <strong>Tranzr Moves</strong>
          service, we require a minimum period of notice of
          <strong>1 business day</strong> prior to your booked move date,
          penalties will apply if we are not informed within these guidelines of
          our rescheduling date.
        </p>
        <p>
          <strong>Peak periods</strong> require additional notice for
          rescheduling. All moving and storage services booked between the
          <strong>25th to the 31st</strong> of any month, and the
          <strong>1st to the 2nd</strong> of any month are subject to a penalty
          of <strong>100% of the total price</strong> if the rescheduling and
          cancellation notice is not provided within
          <strong>3 business days</strong> of the original move date.
        </p>
        <h3 className={h3}>Additional charges</h3>
        <p>
          If on the day of your move, you have more items that are not reflected
          on your quoted and original inventory list you will be provided with
          an updated quote for moving the additional items. For
          <strong>Tranzr Moves</strong> to move your additional items you will
          be required to review your updated quote and will be charged an
          additional moving fee for those items. Payment for additional items
          can be made over the phone by card or, where agreed, by cash/cheque
          prior to work commencing.
        </p>
        <p>
          If there is no parking within <strong>45 metres</strong> of the
          entrance of the pickup and drop off locations an excessive carrying
          and pushing fee is applicable depending on volume and distance, with
          the maximum fee of <strong>£250</strong>. Where local councils offer
          parking suspensions/permits, the customer is responsible for arranging
          and paying for them.
        </p>
        <p>
          If the drop off destination is correctly provided at the time of
          booking, your guaranteed flat price quote includes fuel and mileage.
          For any additional <strong>10 miles (16 km)</strong> we have to travel
          to complete services that were not originally accounted for an
          additional fuel and mileage fee will be applied.
        </p>
        <h3 className={h3}>Storage services billing</h3>
        <p>
          <strong>Tranzr Moves</strong> accepts valid debit/credit cards and
          bank transfer to process storage move in, partial move out and move
          services, and monthly storage billing. Cash and certified cheques are
          not accepted payment methods for recurring storage services.
        </p>
        <p>
          Payments are processed via <strong>Tranzr Moves’</strong> secure
          payment portal or by phone with a representative. By providing card
          details you authorise secure tokenised storage and recurring billing
          for storage-related charges, including adjustments for inventory
          changes. All storage services are subject to VAT, itemised on each
          invoice.
        </p>
        <p>
          Monthly storage fees will be automatically processed every month on
          the customer’s original storage move-in date, using the customer’s
          card on file. If the card is declined, a reminder will be sent to
          update payment. Failure to pay may incur late fees. After
          <strong>3 months</strong> of non-payment goods may be disposed of or
          sold in accordance with the <em>Torts (Interference with Goods) Act
          1977</em>.
        </p>
        <p>
          Storage monthly rates are not prorated. If you move out mid-cycle,
          previously paid fees are not refunded. Any outstanding balances must
          be paid prior to scheduling any storage move out service.
        </p>
        <p>
          If a customer schedules a partial storage move out where items remain
          in storage the monthly storage fee may be adjusted; automatic payments
          continue. For complete storage move outs, automatic payments cease on
          the next billing date after all balances are settled.
        </p>
        <h3 className={h3}>Hourly labour billing</h3>
        <p>
          Customers must specify requested hours for hourly services. Minimums
          apply: <strong>2 hours</strong> for 2 movers; <strong>4 hours</strong>
          for 3 movers. Time begins when the crew arrives and commences work.
          Additional time is billed in hourly or 30-minute increments at the
          agreed rate and must be paid before completion. Hourly services apply
          only to local moves and at management’s discretion.
        </p>
        <h3 className={h3}>Promotional codes and discounts</h3>
        <p>
          Promotional codes, discounts and coupons must be applied prior to your
          finalised quote. They cannot be applied afterwards. Comparable
          competitor quote matching is at Tranzr Moves’ discretion and not
          guaranteed. Referral commissions and promo code discounts cannot be
          combined.
        </p>
        <h3 className={h3}>Cost of service</h3>
        <p>
          Costs of services are subject to change if the date or time of
          reservation is changed by the customer. <strong>1 business day</strong>
          notice is required for rescheduling and cancellation of moving
          materials delivery and pickup (boxes, bins, packing materials);
          otherwise a <strong>£50</strong> fee applies.
        </p>
        <p>
          The total quoted cost includes blankets and tape for furniture
          protection, dollies for the duration of the move, fuel, mileage &amp;
          tolls. Waiting time charges may apply for delays caused by the
          customer or building management. Cost is subject to change if
          additional items or services are added.
        </p>
        <p>
          If any flights of stairs are involved, a stair fee charge will be
          applied (a ‘flight’ is 6 stairs or more). If additional stairs were
          not originally disclosed a stair fee will be applied.
        </p>
        <p>
          For video estimates, quotes are based on items shown and the agreed
          inventory. If additional items/services are added, the cost is subject
          to change.
        </p>
        <p>
          The flat price includes wrapping and protection of basic furniture and
          large items (e.g., TVs, dressers, sofas). It does not include packing
          of household goods (books, kitchen items, clothing, etc.) unless
          packing service is purchased. Additional packing not in the original
          inventory incurs extra fees. Minimum job size for local moving or
          local storage services is <strong>200 cubic feet</strong>; jobs under
          this are charged at 200cf.
        </p>
      </section>

      <Separator className={sep} />

      <section id="sec2" className={section}>
        <h2 className={h2}>2. Customer responsibility and expectations</h2>
        <p>
          The customer or their legal representative <strong>must</strong> be
          present at all times of the move. If not present,
          <strong>Tranzr Moves</strong> will not be responsible for any claims.
        </p>
        <p>
          Strictly prohibited to be moved or packed: scuba gear, nail
          polish/remover, oils and fuels, BBQ fuel, pets, firearms/ammunition,
          fireworks, alcohol, chemistry sets, and <strong>hazardous materials</strong>
          including but not limited to fertiliser, paints, aerosols, pesticides,
          motor oil, batteries, and acids. We reserve the right to refuse
          transportation of such items.
        </p>
        <p>
          All furniture must be emptied by the customer prior to the move (e.g.,
          dressers, drawers, fridge, freezer) unless Tranzr packing services have
          been purchased. Fridge/freezer/perishables must still be customer-packed
          to food safety standards; Tranzr Moves accepts no liability for any food
          safety issues.
        </p>
        <p>
          Customers must unplug and disconnect all electronic components; our crew
          will not unplug or install electronics.
        </p>
        <p>
          Televisions/monitors must have power cables available for testing at both
          addresses; failing which Tranzr Moves will not be liable for any damage or
          malfunction discovered later.
        </p>
        <p>
          Self-packed items must be in durable boxes with suitable packing
          material. Perishables can only be moved locally and at customer’s risk.
        </p>
        <p>
          Pets and live animals are not moved. House plants of reasonable size (max
          height <strong>2m</strong>) may be moved on local moves only (&lt;= 400 km).
          We do not move live plants for long-distance moves, nor into storage except
          in emergencies; plants placed into storage may be disposed of without
          liability.
        </p>
        <p>
          Waterbeds can be moved but we are not technicians; customer must inspect
          before crew leaves. We only move <strong>empty aquariums</strong>.
        </p>
        <p>
          If you pack fragile items yourself, we move them carefully but are not
          responsible for breakage unless Tranzr packed them. To be covered by
          basic/enhanced cover, fragile items must be Tranzr-packed; otherwise a
          waiver will be required.
        </p>
        <p>
          We can move pianos, appliances, and items over <strong>136kg</strong> if safe;
          the foreman decides based on assessment.
        </p>
        <p>
          The customer signs the <strong>Bill of Lading</strong> at pick up and
          delivery. TV condition is signed at both addresses after testing.
        </p>
        <p>
          Where roommates/partners are splitting items with separate drop-offs,
          Tranzr is not liable for missing/misdirected items. Customers must provide
          accurate, labelled inventories.
        </p>
        <p>
          Self-packed boxes must not exceed <strong>16kg</strong> each and must be
          durable for stacking.
        </p>
        <p>
          Standard service includes one placement per item at destination; multiple
          rearrangements are not included.
        </p>
        <p>
          Unless a contactless move is confirmed, customers are responsible for
          securing premises (doors, windows, gates, garages) at both origin and
          destination. Tranzr is not liable for any security breach after crew
          departure.
        </p>
        <p>
          No hoisting through windows/balconies. Items must fit through staircases,
          lifts, and doorways. Basic disassembly (≤8 screws; no permanent joints/
          electrics) may be provided; otherwise Tranzr may refuse to move the item.
        </p>
        <p>
          We may refuse service if the property or items are not sanitary or pose a
          health risk.
        </p>
        <p>
          Appliances containing water must be drained before moving. Tranzr is not
          responsible for leaks/spillage from undrained appliances.
        </p>
        <p>
          We may take photos/videos at collection and delivery for operational
          quality and insurance evidence.
        </p>
        <p>
          Keep personal/essential items with you (phones, laptops, IDs, cards,
          wallets, keys, prescriptions, cash). Tranzr is not liable if such items
          are packed and transported.
        </p>
      </section>

      <Separator className={sep} />

      {/* Sections 3-21 condensed for brevity in this shared component. */}
      <section id="sec3" className={section}>
        <h2 className={h2}>3. Insurance and valuation coverage for customer belongings</h2>
        <p>
          Your belongings are covered by <strong>Basic Liability Cover</strong> by
          default, providing compensation of <strong>£40 per item</strong> (or actual
          value if lower) for loss or damage.
        </p>
        <p>
          You may purchase <strong>Enhanced Liability Cover</strong> from Tranzr Moves
          or arrange your own UK third‑party removals insurance. Any additional cover
          must be arranged at least <strong>48 hours</strong> prior to the move and
          cannot be added on the day or post‑move.
        </p>
        <p>
          If enhanced cover is taken, additional materials/packing standards may be
          required (including bespoke crates), which can require up to
          <strong>3 business days</strong> notice.
        </p>
        <p>
          Tranzr Moves is not liable for claims relating to items noted as
          pre‑damaged at collection; such items will be listed and photographed on the
          Bill of Lading and acknowledged by signature.
        </p>
        <p>
          Where an item belongs to a set, compensation applies to the item only, not
          the entire set.
        </p>
        <p>
          It is unlawful to submit the same claim to Tranzr and a third‑party
          insurer; duplicate claims will be rejected and reported to the relevant
          insurer.
        </p>
      </section>

      <Separator className={sep} />
      <section id="sec4" className={section}>
        <h2 className={h2}>
          4. Building Insurance – COI (Certificate of Liability Insurance)
        </h2>
        <p>
          Upon confirmed and paid booking, Tranzr Moves can provide a
          <strong>Certificate of Liability Insurance</strong> where required by
          building management.
        </p>
        <p>
          Customers must obtain building requirements and provide them to Tranzr at
          least <strong>48 hours</strong> prior to move day. Failure to do so may
          result in refusal or additional fees for delays.
        </p>
        <p>
          Standard flat price does not include wall/floor protection (masonite). If
          required by the building, request at least 48 hours prior; additional
          material and handling fees apply.
        </p>
        <p>
          Customers must confirm building restrictions (hours, lift bookings, loading
          bay access, etc.) directly with management and inform Tranzr. Generic COI
          details are not sufficient confirmation. Issues arising from unverified
          restrictions are the customer’s responsibility.
        </p>
      </section>

      <Separator className={sep} />
      <section id="sec5" className={section}>
        <h2 className={h2}>5. Claims and refunds</h2>
        <p>
          We aim to resolve claims quickly upon receiving your claim form, photos and
          documentation.
        </p>
        <p>
          You have <strong>90 days</strong> from the move/delivery date (or scheduled
          delivery date in case of loss) to file your claim. Claims outside this
          period will not be accepted.
        </p>
        <p>If you purchased third‑party insurance, follow your insurer’s Policy terms and timelines.</p>
        <p>
          We acknowledge claims within <strong>30 days</strong> and provide
          disposition within <strong>120 days</strong> (with possible 60‑day extension
          where necessary).
        </p>
        <p>
          If Tranzr is late to the <strong>pick‑up window</strong> for a local move, a
          late compensation of <strong>5% per late hour</strong> (capped at
          <strong>15%</strong>) may be paid. This applies only to pick‑up windows. You
          must submit the claim on the day or day after the move via our claims form.
        </p>
        <p>
          Once submitted, you have <strong>48 hours</strong> to add additional issues
          before the claim is finalised.
        </p>
        <p>
          If a claim is raised before delivery completion, refunds/compensation may
          be issued only after delivery and completion.
        </p>
        <p>
          Tranzr is not responsible for items reported as damaged where Tranzr did
          not perform the transport and/or final delivery.
        </p>
      </section>

      <Separator className={sep} />
      <section id="sec6" className={section}>
        <h2 className={h2}>6. Safety of moving crews and customers</h2>
        <p>
          All Tranzr crew receive training covering safety, packing, lifting, load
          securing, safe driving and customer service. Crews are covered by
          Employer’s Liability and Public Liability insurance.
        </p>
        <p>
          Customers should not carry items alongside our crew; if they do, they do so
          at their own risk. Tranzr is not liable for self‑injury.
        </p>
        <p>
          Respectful conduct is expected. Tranzr may stop a move if staff are
          harassed or abused.
        </p>
      </section>

      <Separator className={sep} />
      <section id="sec7" className={section}>
        <h2 className={h2}>7. Contactless moving services</h2>
        <p>
          If the customer or their representative cannot be present, a
          <strong>contactless move</strong> must be arranged during booking. The
          customer must be available by phone/video, and must e‑sign the Bill of
          Lading.
        </p>
        <p>
          Customers accept Tranzr will not be liable for building scuffs/dents or
          pre‑existing item damage. Customer‑packed items are covered only by Basic
          Liability Cover. Tranzr will not dispose of items unless listed in the
          inventory as disposal items.
        </p>
        <p>
          Customer must ensure access (keys/codes/management). Tranzr is not
          responsible for security of premises during/after a contactless move once
          the crew departs.
        </p>
        <p>
          Contactless packing relies on the inventory and remote guidance. If the
          customer cannot remain available throughout packing/loading, Tranzr is not
          liable for items not packed or overlooked.
        </p>
      </section>

      <Separator className={sep} />
      <section id="sec8" className={section}>
        <h2 className={h2}>8. Long distance moving services</h2>
        <p>
          Tranzr offers: (1) <strong>Consolidated shipping</strong> with delivery
          windows; (2) <strong>Direct delivery</strong> with a dedicated vehicle and
          an agreed delivery window.
        </p>
        <p>
          We may use a vetted third‑party carrier. Tranzr remains your point of
          contact. Any claims are submitted to Tranzr per Section 5.
        </p>
        <p>
          Consolidated shipping provides a delivery window based on distance,
          seasonality and logistics. We provide status updates: (i) post‑pickup
          processing; (ii) in‑transit confirmation; (iii) confirmed delivery
          date/time. Windows are in business days; deliveries may occur on
          weekends.
        </p>
        <p>
          We are not responsible for delays due to road conditions, closures,
          incidents or enforcement stops. Where 7.5t/18t/53ft access is not possible,
          a shuttle transfer may be used at no extra cost.
        </p>
        <p>
          If no one is present to receive within the guaranteed window, items may be
          placed in storage and re‑delivered at additional cost. First available
          delivery date (FADD) should be communicated at pickup; changes after pickup
          may incur fees.
        </p>
      </section>

      <Separator className={sep} />
      <section id="sec9" className={section}>
        <h2 className={h2}>9. Storage services</h2>
        <p>
          <strong>Warehouse Storage.</strong> Items are wrapped at pickup,
          transported to Tranzr’s secure warehouse, palletised and further wrapped.
          24/7 CCTV in operation. Public visits are not offered.
        </p>
        <p>
          Monthly storage fees are based on volume (cubic feet/metres) plus VAT,
          fixed at booking. Tranzr may amend fees if inventory changes (partial move
          out/additional items).
        </p>
        <p>
          Move‑out requires <strong>3 business days</strong> notice. Self move‑out may
          incur a handling fee equal to one month’s storage fee. Third‑party carrier
          collections may be permitted with prior arrangement and prepayment.
        </p>
        <p>
          Emergency in‑transit storage: up to <strong>14 days</strong> from move‑in;
          thereafter standard monthly billing applies from day 14.
        </p>
        <p>
          Non‑payment for <strong>3 months</strong> may result in sale/disposal under
          the <em>Torts (Interference with Goods) Act 1977</em>.
        </p>
        <p>
          Self‑packed/incorrectly packed items are stored at customer’s risk; Tranzr
          is not liable for damage to such items in transit or storage.
        </p>
        <p>
          <strong>Prohibited in storage:</strong> perishables, plants/flora, weapons,
          dangerous chemicals, prohibited substances. Customers are liable for any
          costs/damages (incl. pest control) arising from prohibited items.
        </p>
        <p>
          Tranzr may move your crate/pallet between facilities. Musty odours can
          naturally occur from cloth items in enclosed boxes; Tranzr is not liable
          for such odours.
        </p>
        <p>
          By paying a move deposit, the payment card may be used as default for
          storage charges unless you instruct otherwise before billing.
        </p>
      </section>

      <Separator className={sep} />
      <section id="sec10" className={section}>
        <h2 className={h2}>10. Packing and unpacking</h2>
        <p>
          Moving materials used during the move remain Tranzr property and are
          retrieved at completion unless purchased. Purchased materials prior to the
          move belong to the customer.
        </p>
        <p>
          <strong>Fragile items</strong> (e.g., glass, lamps/lampshades, mirrors,
          marble/stone, pottery, TVs, artwork) must be in proper boxes/crates. Claims
          will not be honoured unless packed/crated per Tranzr recommendations.
          Shipper accepts responsibility for items loaded without proper packaging.
        </p>
        <p>
          Full packing/unpacking services are available at additional cost. Where
          packing service is booked, Tranzr provides boxes and packing paper. Bubble
          wrap is provided only if requested at booking.
        </p>
        <p>
          Packing is organised by room/category and labelled accordingly. Tranzr does
          not produce a detailed itemised list per box. Unpacking includes removing
          materials; it does not include stylistic/organisational placement.
        </p>
      </section>

      <Separator className={sep} />
      <section id="sec11" className={section}>
        <h2 className={h2}>11. Plastic moving totes/bins for hire</h2>
        <p>
          Plastic moving totes are available for hire. Tranzr will deliver totes
          prior to packing and collect them post‑move. Totes must be returned
          <strong>clean</strong> within <strong>5 days</strong> after move‑in.
        </p>
        <p>Damaged or missing totes are charged at <strong>£40</strong> each.</p>
      </section>

      <Separator className={sep} />
      <section id="sec12" className={section}>
        <h2 className={h2}>12. Moving supplies to purchase</h2>
        <p>
          Tranzr offers supply bundles (boxes, packing paper, tape) for purchase.
          Order at least <strong>3 business days</strong> prior to move for
          delivery. Individual units are not sold unless as add‑ons to a bundle. No
          refunds/returns on sold goods (used or unused).
        </p>
      </section>

      <Separator className={sep} />
      <section id="sec13" className={section}>
        <h2 className={h2}>13. TVs and electronics</h2>
        <p>
          Tranzr is not liable for internal components of appliances/electronics.
          Tilting and vehicle vibration may expose pre‑existing faults.
        </p>
        <p>
          Customers must power on TVs at pickup; foreman and customer acknowledge
          working status on the Bill of Lading at both addresses. If a TV works at
          pickup and not at drop‑off with <em>external</em> damage visible, Tranzr
          will process the claim. If self‑packed by customer, Tranzr is not
          responsible for damage.
        </p>
        <p>
          TV wall <strong>unmounting</strong> can be performed if agreed at booking;
          additional TVs may incur a <strong>£40</strong> fee each. Tranzr does not
          provide wall <strong>mounting</strong> services. Tranzr is not liable for
          wall damage arising from prior mounting or the unmounting process.
        </p>
      </section>

      <Separator className={sep} />
      <section id="sec14" className={section}>
        <h2 className={h2}>14. Special handling</h2>
        <p>
          Special handling covers packing/handling/assembly for heavy, valuable,
          fragile, or unique items. Additional labour, equipment, planning and
          materials may be required and charged.
        </p>
        <p>
          <strong>Additional padding/protection</strong> may be required for items
          including but not limited to: marble/stone, glass, crystal, mirrors, large
          screens, picture frames &gt; 120cm × 120cm. Wooden crating or extra
          materials may be necessary.
        </p>
        <p>
          <strong>Additional disassembly/reassembly</strong> fees apply where items
          require more than 8 screws removed or &gt; 20 minutes per item (e.g.,
          armoires, wall units, storage/cabin beds, loft/bunk/adjustable beds, gym
          equipment).
        </p>
        <p>
          <strong>Heavy item handling</strong> applies to items &gt; 136kg (300 lbs):
          pianos, large tables, gym equipment, large dressers, recliners, white
          goods, sculptures, full‑wood furniture, etc.
        </p>
        <p>
          Tranzr does not assemble out‑of‑box flat‑pack furniture, nor assemble
          items previously disassembled by others. Tranzr may refuse items requiring
          specialist instructions or training.
        </p>
        <p>
          Where pickup is from a third‑party storage facility and condition cannot be
          inspected there, Tranzr is not responsible for undiscoverable damage
          apparent only upon delivery.
        </p>
      </section>

      <Separator className={sep} />
      <section id="sec15" className={section}>
        <h2 className={h2}>15. Furniture assembly &amp; disassembly</h2>
        <p>
          Tranzr is not liable for damages arising during assembly/disassembly.
          Customers must fully disclose complexity and provide manuals where
          applicable. Large wall units and complex items require advance notice and
          may incur additional fees.
        </p>
        <p>
          Tranzr will not assemble items it did not disassemble at pickup. For items
          requiring specialist handling not disclosed at least
          <strong>4 business days</strong> before move day, Tranzr may refuse
          disassembly; customers should procure specialist services. Tranzr is not
          obliged to refund for items not moved due to undisclosed special handling
          requirements.
        </p>
      </section>

      <Separator className={sep} />
      <section id="sec16" className={section}>
        <h2 className={h2}>16. Furniture &amp; mattress disposal</h2>
        <p>
          Disposal to licensed centres can be arranged for an additional fee
          covering extra mileage, labour, additional stops and disposal charges.
          Mattress protective covers are provided for disposal. Curbside disposal is
          only performed if pre‑arranged and compliant with local council rules; any
          fines arising from customer‑requested unlawful disposal are the
          customer’s responsibility.
        </p>
        <p>
          Tranzr does not provide ad‑hoc disposal of miscellaneous items during
          moving/unpacking unless pre‑packed and marked “For disposal” or
          pre‑booked; additional fees apply.
        </p>
      </section>

      <Separator className={sep} />
      <section id="sec17" className={section}>
        <h2 className={h2}>17. Client referral programme</h2>
        <p>
          Referral commissions are paid only on completed, fully paid moves and must
          be submitted via Tranzr’s referral web form prior to the referral’s
          booking. Method of payment and commission percentages are defined by Tranzr
          and may change at any time. Referrers cannot claim commission where promo
          codes were used by the referred customer, where the referred customer is a
          repeat Tranzr customer, or where the customer had already contacted Tranzr
          before the referral submission. Referral commissions cannot be exchanged
          for service credits.
        </p>
      </section>

      <Separator className={sep} />
      <section id="sec18" className={section}>
        <h2 className={h2}>18. Military moving discount programme</h2>
        <p>
          Tranzr may offer discounts to serving and former UK armed forces personnel
          and eligible dependants. A valid UK military ID must be provided
          <strong>before</strong> booking. Discounts cannot be applied retroactively.
          Tranzr reserves the right to amend or withdraw this programme at any time.
        </p>
      </section>

      <Separator className={sep} />
      <section id="sec19" className={section}>
        <h2 className={h2}>19. Customer privacy</h2>
        <p>
          Tranzr Moves complies with <strong>UK GDPR</strong> and the
          <strong>Data Protection Act 2018</strong>. We collect personal
          information (e.g., name, contact details, addresses, payment information)
          via phone, email, web forms or trusted third‑party lead providers to
          process bookings, provide services and manage billing.
        </p>
        <p>
          We may contact you about Tranzr products or services, surveys, and service
          feedback. We may engage trusted third parties to provide limited services
          (e.g., long‑distance carriage, support, payments, analytics) and will share
          only necessary data with them under contract.
        </p>
        <p>
          We do not collect sensitive categories of data without explicit consent. We
          may access or disclose information where required by law, to protect Tranzr
          rights/property, or to protect safety. Personal data may be processed in
          the UK or other jurisdictions subject to adequate safeguards.
        </p>
        <p>
          Security measures include restricted access, encryption at rest/in transit
          (where applicable), and PCI‑DSS compliant payment processors. Please refer
          to our full <a href="#" rel="nofollow">Privacy Notice</a> for details.
        </p>
      </section>

      <Separator className={sep} />
      <section id="sec20" className={section}>
        <h2 className={h2}>
          20. Liability waiver during a state of emergency, pandemic or natural
          disaster
        </h2>
        <p>
          During officially declared emergencies (e.g., public health incidents,
          extreme weather), Tranzr will follow applicable government guidance. By
          electing to proceed with a move during such periods, the customer accepts
          associated risks. Tranzr will not be liable for illness, service
          interruptions or delays caused by such events beyond our control.
        </p>
      </section>

      <Separator className={sep} />
      <section id="sec21" className={section}>
        <h2 className={h2}>21. Disclaimer of warranties; limitation of liability</h2>
        <p>
          We do not guarantee that your use of our service will be uninterrupted,
          timely, secure or error‑free, or that results obtained will be accurate or
          reliable.
        </p>
        <p>
          Tranzr Moves is not responsible for delays due to traffic or building
          restrictions. From time to time we may suspend or cancel services without
          notice.
        </p>
        <p>
          You expressly agree that your use of, or inability to use, the service is
          at your sole risk. Except as required by law, the service and all products
          and services are provided “as is” and “as available”, without warranties of
          any kind, express or implied, including merchantability, satisfactory
          quality, fitness for a particular purpose, durability, title and
          non‑infringement.
        </p>
        <p>
          To the maximum extent permitted by law, in no case shall Tranzr Moves, its
          directors, officers, employees, affiliates, agents, contractors, suppliers
          or licensors be liable for any indirect, incidental, punitive, special or
          consequential damages, including loss of profits, revenue, savings, data,
          or replacement costs, arising from your use of the service or products,
          even if advised of the possibility. In jurisdictions that do not allow such
          exclusions, liability is limited to the maximum extent permitted by law.
        </p>
        <p className="text-muted-foreground">
          These Terms are governed by the laws of England and Wales. Nothing in these
          Terms limits your statutory rights under the Consumer Rights Act 2015 or
          excludes liability for death or personal injury caused by negligence,
          fraud, or other liabilities that cannot be excluded by law.
        </p>
        {!compact && (
          <footer className="text-muted-foreground mt-4">
            © {new Date().getFullYear()} Tranzr Moves. All rights reserved.
          </footer>
        )}
      </section>
    </div>
  );
}
