import Dashboard from "/components/dashboard/Dashboard.js"

async function getDashboard(id) {}

export default async function Page({ params }) {

  return (
    <>
      <h1 className="text-3xl">Dashboard</h1>
      <Dashboard _={layout}/>
      
    </>
  );
}
