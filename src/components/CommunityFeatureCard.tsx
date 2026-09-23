import type { CommunityFeature } from "../types/community";

interface CommunityFeatureCardProps {
  feature: CommunityFeature;
}

export default function CommunityFeatureCard({ feature }: CommunityFeatureCardProps) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-primary-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <span
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-2xl"
        aria-hidden="true"
      >
        {feature.icon}
      </span>
      <h3 className="text-base font-bold text-primary-900">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-primary-700">{feature.description}</p>
    </div>
  );
}
