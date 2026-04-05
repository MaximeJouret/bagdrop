import { Play, Camera, Music, Briefcase } from "lucide-react";

const platforms = [
  {
    name: "YouTube",
    icon: Play,
    label: "Regardez nos coulisses",
    href: "#",
    className:
      "bg-[#FF0000]/10 hover:bg-[#FF0000]/15 text-[#FF0000] border-[#FF0000]/20",
  },
  {
    name: "Instagram",
    icon: Camera,
    label: "Suivez nos aventures",
    href: "#",
    className:
      "bg-[#E4405F]/10 hover:bg-[#E4405F]/15 text-[#E4405F] border-[#E4405F]/20",
  },
  {
    name: "TikTok",
    icon: Music,
    label: "Decouvrez nos tips",
    href: "#",
    className:
      "bg-foreground/5 hover:bg-foreground/10 text-foreground border-foreground/10",
  },
  {
    name: "LinkedIn",
    icon: Briefcase,
    label: "Rejoignez le reseau",
    href: "#",
    className:
      "bg-[#0077B5]/10 hover:bg-[#0077B5]/15 text-[#0077B5] border-[#0077B5]/20",
  },
];

export function SocialCTA() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-4">
          Rejoignez la communaute
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Suivez BagDrop sur les reseaux pour des conseils voyage, des
          coulisses et des offres exclusives.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center gap-3 rounded-xl border p-6 transition-all duration-150 hover:scale-[1.02] hover:shadow-md ${p.className}`}
            >
              <p.icon className="h-8 w-8" />
              <span className="font-semibold text-sm">{p.name}</span>
              <span className="text-xs opacity-70">{p.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
