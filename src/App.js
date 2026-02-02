import Countdown from "./components/Countdown";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 bg-pink-100 px-6">
      <h1 className="text-5xl font-extrabold text-pink-600 text-center">
        Nika & Jasiu reunion
      </h1>

      <Countdown />
    </div>
  );
}
