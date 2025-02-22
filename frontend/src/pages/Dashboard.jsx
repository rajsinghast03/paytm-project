import Header from "../components/Header";

function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <Header />
      <h2 className="text-center">Your Balance : INR 10000</h2>
    </div>
  );
}

export default Dashboard;
