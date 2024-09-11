import { CreditBadge } from "@/components/Credit/CreditBadge";
import { MapshotList } from "@/components/Mapshot/MapshotList";

const MapshotsPage = () => {
  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <MapshotList />
      <div className="absolute bottom-2 left-2 z-[9999]">
      <CreditBadge text={"mapshot"} link={"https://github.com/Palats/mapshot"} />
      </div>
    </div>
  )
};

export default MapshotsPage;
