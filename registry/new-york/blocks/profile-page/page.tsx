import ProfileContent from "./components/profile-content";
import ProfileHeader from "./components/profile-header";

/**
 * Perfil — LAB / DESIGN.
 *
 * Cabeçalho com avatar e abas de dados pessoais, conta, segurança e
 * notificações. Base: `shadcn-examples` (shadcn/ui, MIT), adaptado.
 */
export default function Page() {
  return (
    <div className="container mx-auto space-y-6 px-4 py-10">
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
}
