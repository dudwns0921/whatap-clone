export default function Storybook() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="w-full h-full">
      <iframe
        src={`${baseUrl}storybook/index.html`}
        className="w-full h-full border-0"
        title="Storybook"
      />
    </div>
  );
}
