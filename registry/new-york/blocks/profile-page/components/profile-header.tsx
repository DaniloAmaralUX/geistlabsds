import { CalendarIcon, CameraIcon, MailIcon, MapPinIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileHeader() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <Avatar className="size-24">
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            <Button
              aria-label="Alterar foto do perfil"
              className="absolute -right-2 -bottom-2"
              shape="circle"
              size="sm"
              variant="secondary"
            >
              <CameraIcon />
            </Button>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="font-bold text-2xl">John Doe</h1>
              <Badge appearance="subtle" color="gray">
                Membro Pro
              </Badge>
            </div>
            <p className="text-muted-foreground">Designer de produto sênior</p>
            <div className="flex flex-wrap gap-4 text-muted-foreground text-sm">
              <div className="flex items-center gap-1">
                <MailIcon aria-hidden="true" className="size-4" />
                john.doe@example.com
              </div>
              <div className="flex items-center gap-1">
                <MapPinIcon aria-hidden="true" className="size-4" />
                São Paulo, SP
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon aria-hidden="true" className="size-4" />
                Entrou em março de 2023
              </div>
            </div>
          </div>
          <Button variant="primary">Editar perfil</Button>
        </div>
      </CardContent>
    </Card>
  );
}
