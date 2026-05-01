import type { Proof } from "@/data/activities";

export default function ProofDetails({ proof }: { proof: Proof }) {
  return (
    <div className="mt-6 grid gap-6 border border-rule p-6 md:grid-cols-[180px_1fr] md:gap-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
        Type
      </p>
      <p className="font-mono text-sm">{proof.type}</p>

      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
        Description
      </p>
      <p className="text-sm leading-relaxed text-ink/80">{proof.description}</p>

      {proof.file && (
        <>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
            Fichier source
          </p>
          <p className="font-mono text-sm text-ink/70">{proof.file}</p>
        </>
      )}
    </div>
  );
}
