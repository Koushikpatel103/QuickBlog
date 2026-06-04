import React, { useEffect, useState } from "react";
import CommentTableItem from "../../Components/admin/CommentTableItem";
import { useAppContext } from "../../context/AppContest";
import toast from "react-hot-toast";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      if (data.success) {
        setComments(Array.isArray(data.comments) ? data.comments : []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load comments");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Comments</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`border rounded-full px-4 py-1 text-xs ${
              filter === "Approved" ? "text-blue-600" : "text-gray-700"
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter("Not Approved")}
            className={`border rounded-full px-4 py-1 text-xs ${
              filter === "Not Approved" ? "text-blue-600" : "text-gray-700"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 uppercase text-left">
            <tr>
              <th className="px-6 py-3">Blog Title & Comment</th>
              <th className="px-6 py-3 max-sm:hidden">Date</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(comments) &&
              comments
                .filter((comment) =>
                  filter === "Approved"
                    ? comment.isApproved
                    : !comment.isApproved
                )
                .map((comment, index) => (
                  <CommentTableItem
                    key={comment._id ? String(comment._id) : index}
                    comment={comment}
                    index={index + 1}
                    fetchComments={fetchComments}
                  />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comment;
