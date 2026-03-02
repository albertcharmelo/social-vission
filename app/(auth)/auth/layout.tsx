import Image from "next/image";
import Link from "next/link";
import { Animate } from "@/components/ui/animate";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      {/* Left — Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12">
        <div className="w-full max-w-md mx-auto">
          <Animate animation="fadeUp">
            <Link href="/" className="flex items-center gap-2 mb-10">
              <span className="material-symbols-outlined text-meadow" style={{ fontSize: "28px" }}>
                eco
              </span>
              <span className="text-deep font-bold text-xl tracking-tight">
                Social Vission
              </span>
            </Link>
            {children}
          </Animate>
        </div>
      </div>

      {/* Right — Decorative image (hidden on mobile) */}
      <div className="hidden lg:block lg:w-[45%] relative">
        <Animate animation="fadeRight" delay={200} className="h-full">
          <div className="h-full relative">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=1200&fit=crop"
              alt="Equipo colaborando"
              fill
              className="object-cover"
              priority
              sizes="45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-deep/20 to-transparent" />
            <div className="absolute bottom-12 left-8 right-8">
              <p className="text-cloud font-bold text-2xl leading-tight tracking-tight">
                Cada servicio contratado genera impacto social real.
              </p>
              <p className="text-cloud/70 text-sm mt-2">
                10% de cada transacción va a causas verificadas.
              </p>
            </div>
          </div>
        </Animate>
      </div>
    </div>
  );
}
