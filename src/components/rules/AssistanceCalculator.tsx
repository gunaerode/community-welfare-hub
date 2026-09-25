import { useId, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import Icon from "../common/Icon";

/** Rule numbers — keep in sync with RULES_SECTIONS in src/data/community.ts. */
const MONTHLY_CONTRIBUTION = 500;
const ASSISTANCE_MULTIPLIER = 2;
const MAX_ASSISTANCE = 5000;
const INTEREST_FREE_MONTHS = 2;
const MONTHLY_INTEREST_RATE = 0.01;

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

/** Pure calculation of eligibility, interest and total repayment. */
function calculateAssistance(monthsPaid: number, loanAmount: number, repayMonths: number) {
  const contributed = monthsPaid * MONTHLY_CONTRIBUTION;
  const eligible = Math.min(contributed * ASSISTANCE_MULTIPLIER, MAX_ASSISTANCE);
  const loan = Math.min(Math.max(loanAmount, 0), eligible);
  const interestMonths = Math.max(repayMonths - INTEREST_FREE_MONTHS, 0);
  const interest = loan * MONTHLY_INTEREST_RATE * interestMonths;
  return { contributed, eligible, capped: contributed * ASSISTANCE_MULTIPLIER >= MAX_ASSISTANCE, loan, interest, total: loan + interest };
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const id = useId();
  const pct = max === min ? 100 : ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="field-label">
          {label}
        </label>
        <span className="shrink-0 rounded-lg bg-primary-50 px-2.5 py-1 text-sm font-extrabold whitespace-nowrap text-primary-800 tabular-nums dark:bg-primary-800 dark:text-white">
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full accent-primary-700 dark:accent-accent-500"
        style={{
          background: `linear-gradient(to right, var(--color-primary-600) ${pct}%, var(--color-primary-100) ${pct}%)`,
        }}
      />
    </div>
  );
}

export default function AssistanceCalculator() {
  const { t } = useLanguage();
  const [months, setMonths] = useState(3);
  const [loanRequest, setLoanRequest] = useState(3000);
  const [repayMonths, setRepayMonths] = useState(2);

  const result = calculateAssistance(months, loanRequest, repayMonths);

  return (
    <section aria-labelledby="calc-heading" className="card overflow-hidden" data-reveal>
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-100 text-accent-700 dark:bg-accent-900/60 dark:text-accent-300">
              <Icon name="calculator" />
            </span>
            <div>
              <h2 id="calc-heading" className="text-lg font-extrabold text-primary-900 dark:text-white">
                {t.calcHeading}
              </h2>
              <p className="text-sm text-primary-600 dark:text-primary-300">{t.calcSubtitle}</p>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-6">
            <Slider
              label={t.calcMonthsLabel}
              value={months}
              min={1}
              max={12}
              step={1}
              display={`${months} ${t.monthsUnit}`}
              onChange={setMonths}
            />
            <Slider
              label={t.calcLoanLabel}
              value={Math.min(loanRequest, result.eligible)}
              min={0}
              max={result.eligible}
              step={100}
              display={inr(result.loan)}
              onChange={setLoanRequest}
            />
            <Slider
              label={t.calcRepayLabel}
              value={repayMonths}
              min={1}
              max={6}
              step={1}
              display={`${repayMonths} ${t.monthsUnit}`}
              onChange={setRepayMonths}
            />
          </div>
        </div>

        <div className="relative flex flex-col justify-center gap-4 overflow-hidden bg-gradient-to-br from-primary-700 to-primary-900 p-6 text-white sm:p-8">
          <div className="bg-dots-light absolute inset-0 opacity-50" aria-hidden="true" />
          <dl className="relative grid grid-cols-2 gap-4" aria-live="polite">
            <div>
              <dt className="text-xs text-primary-200">{t.calcPaid}</dt>
              <dd className="text-xl font-extrabold tabular-nums">{inr(result.contributed)}</dd>
            </div>
            <div>
              <dt className="text-xs text-primary-200">{t.calcEligible}</dt>
              <dd className="text-xl font-extrabold text-accent-300 tabular-nums">{inr(result.eligible)}</dd>
            </div>
            <div>
              <dt className="text-xs text-primary-200">{t.calcInterest}</dt>
              <dd className="text-xl font-extrabold tabular-nums">{inr(result.interest)}</dd>
            </div>
            <div className="col-span-2 mt-1 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
              <dt className="text-xs text-primary-100">{t.calcTotalRepay}</dt>
              <dd className="text-3xl font-black tabular-nums">{inr(result.total)}</dd>
            </div>
          </dl>
          {result.capped && (
            <p className="relative inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-500 px-3 py-1 text-xs font-bold text-primary-950">
              <Icon name="info" className="h-3.5 w-3.5" />
              {t.calcCapReached}
            </p>
          )}
          <p className="relative text-xs leading-relaxed text-primary-200">
            {t.calcInterestNote} {t.calcDisclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
