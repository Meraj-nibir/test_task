import Header from "@/components/Header";
import WeekSelector from "@/components/WeekSelector";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <WeekSelector />
      </main>
    </div>
  );
}
