// import { promises as fs } from 'fs';
import { useEffect, useState } from 'react';
import { DataGrid } from '@/components/DataGrid/DataGrid';
import { Loading } from '@/components/Primitives/Loading';
import { Erroring } from '@/components/Primitives/shared';
import { parse } from '@/utils/parsing';

const YoutubeDataGridPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>([]);
  const [columnNames, setColumnNames] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const largeUrl = '/csv/USvideos.csv';
        const smallUrl = '/csv/pokemonDB_dataset.csv';
        const response = await fetch(smallUrl);
        const text = await response.text();
        parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results: any) => {
            setData(results.data);
            setColumnNames(results.meta.fields);
            setLoading(false);
          },
          error: (err: any) => {
            console.error('Error parsing CSV:', err.message);
            setError('Failed to load data');
            setLoading(false);
          },
        });
      } catch (err: any) {
        console.error('Network or file access error:', err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full align-center justify-center">
        <Loading>Loading Data</Loading>
      </div>
    );
  }
  if (error) {
    return <Erroring error={error} />;
  }
  return <DataGrid data={data} columnNames={columnNames} />;
};

export default YoutubeDataGridPage;
