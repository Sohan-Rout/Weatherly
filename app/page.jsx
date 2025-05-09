import Navbar from "@/app/components/navbar";
import Display from "@/app/components/display";

const Main = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex-grow overflow-y-auto">
        <Display />
      </div>
    </div>
  );
}

export default Main;