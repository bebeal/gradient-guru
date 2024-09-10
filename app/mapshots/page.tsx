import { MapshotList } from "@/components/Mapshot/MapshotList";

const MapshotsPage = () => {
  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <MapshotList />
    </div>
  )
};

export default MapshotsPage;
