import "./style.css";

export default function Loading() {
  return (
    <div className="min-w-[320px] w-[100vw] h-[100vh] inset-0 fixed top-0 left-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-60" />
      <span className="loader"/>
    </div>
  );
}
