export default function ErrorMessage({ error }: { error?: string }) {
  if (!error) return null;

  return (
    <span role="alert" className="text-sm text-red-500">
      * {error}
    </span>
  );
}
