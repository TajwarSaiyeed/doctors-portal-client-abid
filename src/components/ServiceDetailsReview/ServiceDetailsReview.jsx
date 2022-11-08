import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const ServiceDetailsReview = () => {
  const service = useLoaderData();
  const { name, picture, description, price } = service;
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-2">
        <div
          className="hero min-h-screen rounded-tl-3xl overflow-hidden"
          style={{
            backgroundImage: `url(${picture})`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-3xl font-bold">{name}</h1>
              <p className="mb-5 text-justify">{description}</p>
              <div className="indicator">
                <span className="indicator-item badge badge-primary">
                  ${price}
                </span>
                <div className="grid w-32 h-10 bg-orange-600 rounded-full place-items-center">
                  Buy Now
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-3 w-full lg:w-96 rounded-tr-3xl bg-slate-200 flex flex-col items-center">
          <h1 className="text-green-500 font-bold text-xl my-2">Review</h1>
          <div className="flex justify-center items-center gap-3 my-2 bg-slate-300 p-2 rounded-md">
            <div>
              <img
                className="w-12 h-10 rounded-full"
                src="https://lh3.googleusercontent.com/a/ALm5wu0-9l_dlxAsCD616HBJUQlubpseKag2aHrE6MjCOw=s96-c"
                alt=""
              />
            </div>
            <div>
              <h1>Tajwar Saiyeed</h1>
              <p>Tljsadfl;jalfjsl adsfkljsaflk adsfjas;lk</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3 my-2 bg-slate-300 p-2 rounded-md">
            <div>
              <img
                className="w-12 h-10 rounded-full"
                src="https://lh3.googleusercontent.com/a/ALm5wu0-9l_dlxAsCD616HBJUQlubpseKag2aHrE6MjCOw=s96-c"
                alt=""
              />
            </div>
            <div>
              <h1>Tajwar Saiyeed</h1>
              <p>Tljsadfl;jalfjsl adsfkljsaflk adsfjas;lk</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-200 mt-3 p-3 flex justify-center rounded-bl-3xl rounded-br-3xl">
        {user?.email ? (
          <form
            // onSubmit={handleUserLogin}
            className="w-2/4 flex flex-col justify-center items-center"
          >
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="Type here"
                className="input input-bordered w-full"
                readOnly
                defaultValue={user?.email}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 w-full"
                name="message"
                placeholder="Your Message Here"
              ></textarea>
            </div>
            <input
              type="submit"
              className="btn btn-outline btn-warning my-5 w-96 "
              value="Review"
            />
          </form>
        ) : (
          <>
            Please Login To Add A Review &nbsp;
            <Link className="link link-error" to="/login">
              {" "}
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceDetailsReview;
