import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function AllCampaign() {

  const [allCamp, setAllCamp] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/campaigns`)
      .then(res => res.json())
      .then(data => {
        setAllCamp(data);
        setLoading(false);
      })
  }, []);

  const handelSortClick = () => {
    fetch(`${import.meta.env.VITE_URL}/campaigns/sort`)
      .then((res) => res.json())
      .then((data) => setAllCamp([...data]))
  }

  if (loading) {
    return <div className='text-3xl min-h-[70vh] grid place-items-center'><span className="loading loading-spinner text-info loading-lg"></span></div>
  }

  if (!allCamp?.length) return <h1 className="text-center text-4xl my-16 font-semibold">No Campaign Available Yet</h1>

  return (
    <div className="mb-16">
      <div className="text-right mr-6"><button onClick={handelSortClick} className="btn btn-warning text-black text-xl">Sort</button></div>
      <h1 className="text-center text-4xl mb-8 font-semibold">All Campaigns: {allCamp?.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th className="hidden sm:block">Campaign Type</th>
              <th>Dateline</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {
              allCamp.map((data, idx) =>
                <tr key={data?._id}>
                  <th>{idx + 1}</th>
                  <th>{data?.title}</th>
                  <td className="hidden sm:block">{data?.type}</td>
                  <td>{data?.date}</td>
                  <td>${data?.amount}</td>
                  <td><Link to={`/campaign/${data?._id}`} className="badge badge-accent min-w-max">See more</Link></td>
                </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllCampaign
