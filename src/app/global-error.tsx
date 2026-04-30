"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global-error.tsx]", error);
  }, [error]);

  return (
    <html lang="fr">
      <body
        style={{
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          backgroundColor: "#f5f5f3",
          color: "#0b0b0c",
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "3rem 1.5rem",
        }}
      >
        <main style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#38bdf8",
              margin: 0,
            }}
          >
            [global-error] · application irrecuperable
          </p>

          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              fontWeight: 500,
              lineHeight: 1,
              marginTop: "1.5rem",
              marginBottom: 0,
            }}
          >
            Une erreur critique<br />
            a interrompu le site
            <span style={{ color: "#38bdf8" }}>.</span>
          </h1>

          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "rgba(11, 11, 12, 0.8)",
            }}
          >
            Le portfolio n&apos;a pas pu se charger correctement. Tu peux
            essayer de recharger la page. Si l&apos;erreur persiste,
            contacte-moi à{" "}
            <a
              href="mailto:mohamedelmazani.pro@gmail.com"
              style={{ color: "#0b0b0c" }}
            >
              mohamedelmazani.pro@gmail.com
            </a>
            .
          </p>

          {error.digest && (
            <p
              style={{
                marginTop: "1rem",
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#a1a1aa",
              }}
            >
              Digest · {error.digest}
            </p>
          )}

          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              padding: "0.75rem 1.25rem",
              border: "1px solid #0b0b0c",
              backgroundColor: "#0b0b0c",
              color: "#f5f5f3",
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Recharger l&apos;application
          </button>
        </main>
      </body>
    </html>
  );
}
