import { cn } from "@/lib/utils"

export function Logo({
  className,
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 40 40"
        className="size-9 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="40" height="40" rx="10" fill="#0F2744" />
        <path
          d="M20 29s-7.2-4.4-9.4-8.2C8.7 18 9.4 14.6 12.3 13.5c1.8-.7 3.7.1 4.7 1.6L20 18.4l3-3.3c1-1.5 2.9-2.3 4.7-1.6 2.9 1.1 3.6 4.5 1.7 7.3C27.2 24.6 20 29 20 29z"
          fill="#C41E3A"
        />
        <path
          d="M6 21h5l2.2-5 3.1 10 2.4-5H34"
          fill="none"
          stroke="#F8FAFC"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {compact ? (
        <span className="sr-only">Pulse CPR</span>
      ) : (
        <span className="flex flex-col leading-none">
          <span className="text-base font-bold tracking-tight text-navy">
            Pulse CPR
          </span>
          <span className="mt-0.5 text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Oklahoma
          </span>
        </span>
      )}
    </span>
  )
}
