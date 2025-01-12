import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom"
import Swal from "sweetalert2";

function UpdateCampaign() {

  const campData = useLoaderData();
  const [startDate, setStartDate] = useState(new Date());
  // console.log(campData);
  // console.log(startDate);
  const { _id, photo, title, type, amount, date, description, email, name } = campData || {};
  const [defaultType, setDefaultType] = useState(type);

  useEffect(() => {
    setStartDate(new Date(date))
  }, []);

  const handelAddCampaign = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const type = form.type.value;
    const date = form.date.value;
    const description = form.description.value;
    const amount = form.amount.value;
    const photo = form.photo.value;

    const updateCampaign = { _id, title, type, date, description, amount, photo }

      fetch(`${import.meta.env.VITE_URL}/updateCampaign`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(updateCampaign)
      })
        .then(res => res.json())
        .then(data => {
          if (data.modifiedCount) {
            Swal.fire({
              title: 'Success !',
              text: 'Campaign Update Successfully !',
              icon: 'success',
              confirmButtonText: 'Close'
            })
          }
        })
  }

  return (
    <section className="my-12">
      <div className="my-6 ml-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold outline outline-1 w-max py-1 px-3 rounded-full cursor-pointer hover:outline-2 hover:shadow-xl"><FaArrowLeft /> Back to home</Link>
      </div>
      <div>
        <div className="bg-base-200 w-full shadow-2xl border rounded-2xl py-6">
          <div className="text-center px-4">
            <h2 className="text-3xl font-semibold mb-3">Update Campaign</h2>
            <p className="">You can easily modify their existing campaigns. easily modify their <br /> existing campaigns. (Only authenticated users can make updates his campaigns.)</p>
          </div>
          {/* From Start Her - */}
          <form onSubmit={handelAddCampaign} className="card-body ">
            {/* Campaign Title */}
            <div className="md:flex justify-between gap-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" name="title" placeholder="Campaign Title" defaultValue={title} className="input input-bordered" required />
              </div>
              {/* Campaign type */}
              <div className="w-full grid grid-cols-4 justify-evenly items-end">
                <h1 className="col-span-4 md:mt-0 mt-2">Campaign type</h1>
                <label className="label justify-center gap-2 lg:col-span-1 md:col-span-2 col-span-2 sm:col-span-1">
                  <span className="label-text">Personal</span>
                  <input type="radio" name="type" value="Personal" defaultChecked={defaultType === "Personal"} className="radio radio-warning" />
                </label>
                <label className="label justify-center gap-2 lg:col-span-1 md:col-span-2 col-span-2 sm:col-span-1">
                  <span className="label-text">Startup</span>
                  <input type="radio" name="type" value="Startup" defaultChecked={defaultType === "Startup"} className="radio radio-warning" />
                </label>
                <label className="label justify-center gap-2 lg:col-span-1 md:col-span-2 col-span-2 sm:col-span-1">
                  <span className="label-text">Business</span>
                  <input type="radio" name="type" value="Business" defaultChecked={defaultType === "Business"} className="radio radio-warning" />
                </label>
                <label className="label justify-center gap-2 lg:col-span-1 md:col-span-2 col-span-2 sm:col-span-1">
                  <span className="label-text">Ideas</span>
                  <input type="radio" name="type" value="Ideas" defaultChecked={defaultType === "Ideas"} className="radio radio-warning" />
                </label>
              </div>
            </div>
            {/* Category */}
            <div className="md:flex justify-between gap-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Deadline </span>
                </label>
                <DatePicker className="input input-bordered w-full" name="date" selected={startDate} onChange={(date) => setStartDate(date)} />
              </div>
              {/* Minimum Donation Amount */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Amount</span>
                </label>
                <input type="number" name="amount" placeholder="Minimum donation amount" defaultValue={amount} className="input input-bordered" required />
              </div>
            </div>
            {/* Photo URL */}
            <div className="md:flex justify-between gap-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input type="text" name="photo" placeholder="Photo Url" defaultValue={photo} className="input input-bordered" required />
              </div>
            </div>
            {/* Description */}
            <div className="md:flex justify-between gap-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input type="text" name="description" placeholder="Description" defaultValue={description} className="input input-bordered" required />
              </div>
            </div>
            {/* Email & User Name - (Read Only/ you can not edit this field) */}
            <div className="md:flex justify-between gap-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="Email" defaultValue={email} readOnly className="input input-bordered" required />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name="name" placeholder="Name" defaultValue={name} readOnly className="input input-bordered" required />
              </div>
            </div>
            {/* Add Button */}
            <div className="mt-8 mx-8 text-center">
              <button className="btn btn-accent text-lg text-white outline-2 outline outline-black outline-offset-0 w-full">Update Campaign</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UpdateCampaign
