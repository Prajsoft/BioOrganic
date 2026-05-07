import { ShieldCheck } from 'lucide-react'

type Props = { label: string }

export default function WarrantyBadge({ label }: Props) {
  return (
    <span className="inline-flex items-center gap-1 bg-primary-light text-primary text-xs font-medium px-2 py-0.5 rounded-full">
      <ShieldCheck size={11} />
      {label}
    </span>
  )
}
