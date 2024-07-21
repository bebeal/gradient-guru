export const ShowObject = (props: { [key: string]: any }) => {
  const { object, ...rest } = props;
  return (
    <pre className="flex w-auto h-auto text-xs text-left border rounded p-1" {...rest}>
      {JSON.stringify(object, null, 2)}
    </pre>
  );
};
