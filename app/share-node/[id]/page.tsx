'use client'

import { SharedPreviewNode, Form, Loading } from '@/components';
import { useApi } from '@/hooks';
import { useParams, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';

// Route -> /share-node/[id]
// URL -> /share-node/c6kq7nq_
// `params` -> { id: 'c6kq7nq_' }
const ShareNodePage = () => {
  const { id } = useParams<{ id: string }>();
  const searchParams  = useSearchParams();
  const [mounted, setMounted] = useState<boolean>(false);
  const [preview, setPreview] = useState<boolean>(Boolean(searchParams?.get('preview')));
  const [version, setVersion] = useState<number>(parseInt(searchParams?.get('version') || '0'));
  const [versions, setVersions] = useState<number[]>([]);
  const [versionIds, setVersionIds] = useState<string[]>([]);
  const [source, setSource] = useState<string>("");
  const [dateCreated, setDateCreated] = useState<any>(0);
  const { listVersions } = useApi();

  // fetch versions available for this node id (node id is unique entry into a versioned S3 bucket)
  const fetchVersions = useCallback(async () => {
    const versionsIdsArray = await listVersions({ id });
    setVersionIds(versionsIdsArray);
    // 0...n for length of versionsArray
    const versionsIndexArray = Array.from(Array(versionsIdsArray.length).keys());
    setVersions(versionsIndexArray);
  }, [listVersions, id]);

  const onVersionChange = useCallback(async (data: any) => {
    setVersion((oldVersion) => {
      const newVersion = data.version;
      if (newVersion !== oldVersion) {
        return newVersion;
      }
      return oldVersion;
    });
  }, []);

  const MetaDataSchema = useMemo(() => {
    const versionOptions = versions.includes(version) ? versions : [version];
    return yup.object().shape({
      id: yup.string().meta({ label: "ID", item: "readonly" }),
      version: yup
        .number()
        .oneOf(versionOptions, `Invalid Version: ${version}`)
        .meta({ item: "select", label: "Version" }),
      // source: yup.string().meta({ label: 'Source', item: 'readonly' }),
      dateCreated: yup
        .string()
        .meta({ label: "Date Created", item: "displayDate" }),
    }).meta({ item: "object" });
  }, [versions, version]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      fetchVersions();
    }
  }, [fetchVersions, mounted]);
  
  return (
    <div className={`flex flex-col justify-center items-center w-full h-full overflow-auto bg-primary`}>
      <div key={`form-share-node-${id}-${version}`} className="absolute flex flex-col gap-1 max-w-[150px] top-0 left-0 text-primary font-semibold p-2 rounded z-10 text-xs flex-wrap text-pretty overflow-auto">
        <Form
          key={JSON.stringify({ id, version, source, dateCreated })}
          className="bg-primary/90"
          fieldClassName="grid-cols-1"
          object={{ id, version, source, dateCreated }}
          schema={MetaDataSchema}
          onSubmit={onVersionChange}
        />
      </div>
      <Suspense fallback={<Loading />}>
        <SharedPreviewNode key={`shared-preview-node-${id}-${version}`} id={id} version={version} preview={preview} />
      </Suspense>
    </div>
  );
};

export default ShareNodePage;
