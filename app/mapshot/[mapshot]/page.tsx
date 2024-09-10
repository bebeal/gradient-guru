'use client'

import { Mapshot } from "@/components/Mapshot/Mapshot";
import { useParams } from "next/navigation";

const MapshotPage = () => {
  const { mapshot } = useParams<{ mapshot: string }>();
  return <Mapshot mapshot={mapshot} />;
};

export default MapshotPage;
