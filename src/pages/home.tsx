import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout";
import { Search } from "lucide-react";

function HomePage() {
  return (
    <>
      <Layout>
      <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input
        placeholder="Search..."
        className="pl-10" // 👈 เพิ่ม padding ด้านซ้ายให้ไม่ชน icon
      />
    </div>
      </Layout>
    </>
  );
}

export default HomePage;