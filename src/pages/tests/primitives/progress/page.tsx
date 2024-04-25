import { Progress } from '@/components/Primitives/Progress';

const useDownloader = ({ url, onDownloadProgress }: { url: string; onDownloadProgress: (downloadPercentage: number, bytes: number, total: number | undefined) => void }) => {
  return {
    downloader: undefined,
    downloadPercentage: 0,
    bytesDownloaded: 0,
    total: undefined,
    url,
  } as any;
};

const DownloadComponent = () => {
  const { downloader, downloadPercentage, bytesDownloaded, total, url } = useDownloader({
    url: 'https://jsonplaceholder.typicode.com/posts',
    onDownloadProgress: (downloadPercentage: number, bytes: number, total: number | undefined) => {
      console.log(`Downloaded: ${bytes} / ${total} (${downloadPercentage}%)`);
    },
  });

  return (
    <div className="w-full flex h-auto flex-col flex-nowrap text-xs">
      <button className="bg-gray-400 hover:bg-gray-500" onClick={() => downloader?.mutate()}>
        Download {url}
      </button>
      <div>Progress: {downloadPercentage.toFixed(2)}%</div>
      <div className="w-full flex">
        Bytes Downloaded: {bytesDownloaded} / {total || '??'}
      </div>
      <Progress progress={downloadPercentage} total={total} />
    </div>
  );
};

const ProgressPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-primary gap-10">
      <div className="flex flex-col justify-center gap-2 w-[500px] p-4 border border-primary">
        <DownloadComponent />
      </div>
    </div>
  );
};
export default ProgressPage;
