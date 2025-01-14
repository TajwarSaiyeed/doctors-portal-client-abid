import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import useTitle from "../../hooks/useTitle";

const MyReview = () => {
  const [myreviews, setMyreviews] = useState([]);
  const [reviewmessage, setReviewMessage] = useState(null);
  const [updateModal, setUpdateModal] = useState(null);
  const { user, loading, logOut } = useContext(AuthContext);
  useTitle("My Review");

  useEffect(() => {
    if (updateModal !== null) {
      fetch(
        `https://service-review-server-abid.vercel.app/updatereview/${updateModal}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem(
              "photography-token"
            )}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setReviewMessage(data.reviewMessage);
        });
    }
  }, [updateModal]);

  // fetch data for speficific user
  useEffect(() => {
    fetch(
      `https://service-review-server-abid.vercel.app/myreview?email=${user?.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("photography-token")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => setMyreviews(data));
  }, [logOut, user?.email]);

  //delete review
  const handleDelete = (id) => {
    const deleteConfirm = window.confirm("Are You Sure To Delete Your Review?");
    if (deleteConfirm) {
      fetch(`https://service-review-server-abid.vercel.app/myreview/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("photography-token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            const remainingReview = myreviews.filter(
              (myreview) => myreview._id !== id
            );
            setMyreviews(remainingReview);
            toast.success("Successfully Deleted");
          }
        });
    }
  };

  const update = (e) => {
    e.preventDefault();
    const form = e.target;
    const review = form.review.value;
    //update review
    fetch(
      `https://service-review-server-abid.vercel.app/myreview/${updateModal}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("photography-token")}`,
        },
        body: JSON.stringify({ review }),
      }
    )
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => {
        if (data.matchedCount) {
          setReviewMessage(review);
          window.location.reload();
          toast.success("Review Updated");
          form.reset();
        }
      });
  };

  if (loading) {
    return (
      <div className="flex w-full justify-center">
        <button className="btn loading">loading</button>;
      </div>
    );
  }
  return (
    <div className="relative">
      <div
        className={`${
          myreviews.length > 0
            ? "lg:grid-cols-3 md:grid-cols-2"
            : "justify-items-center lg:grid-cols-1"
        } grid grid-cols-1 gap-3 my-5 `}
      >
        {myreviews.length > 0 ? (
          myreviews.map((myreview) => (
            <div
              key={myreview._id}
              className="card min-w-96 bg-base-100 shadow-xl image-full"
            >
              <figure>
                <img
                  className="w-full"
                  src={myreview.servicePicture}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body h-96">
                <h2 className="card-title">{myreview.serviceTitle}</h2>
                <p>{myreview.reviewMessage}</p>

                <div className="card-actions justify-end">
                  <label
                    htmlFor="my-modal-3"
                    onClick={() => setUpdateModal(myreview._id)}
                    className="btn btn-success"
                  >
                    edit
                  </label>

                  <input
                    type="checkbox"
                    id="my-modal-3"
                    className="modal-toggle"
                  />
                  <div className="modal text-black absolute ">
                    <div className="modal-box relative">
                      <label
                        htmlFor="my-modal-3"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                      >
                        ✕
                      </label>
                      <h3 className="text-lg font-bold text-center">
                        Update Review
                      </h3>
                      <h3 className="text-error text-center">
                        You can only update your review!!
                      </h3>
                      <form
                        className="flex flex-col justify-center items-center"
                        onSubmit={update}
                      >
                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Type Your Review</span>
                          </label>
                          <textarea
                            className="textarea textarea-bordered h-24 w-full"
                            name="review"
                            defaultValue={reviewmessage}
                            required
                            placeholder="Your Message Here"
                          ></textarea>
                        </div>
                        <h3 className="text-error text-center">
                          When you click on update button it will update your
                          Review and Page will automatic reload.
                        </h3>
                        <input
                          type="submit"
                          value="Update"
                          className="btn mt-2 btn-success"
                        />
                      </form>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(myreview._id)}
                    className="btn btn-error btn-square"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center">
            <div className="bg-red-600 text-white p-3 text-center text-3xl font-bold rounded-lg">
              No reviews were added
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReview;
