import React from "react";
import assets from "../../assets/assets";
import { useAppContext } from "../../context/AppContest";
import toast from "react-hot-toast";

function CommentTableItem({ comment, fetchComments }) {
  const { axios } = useAppContext();

  if (!comment || !comment.blog) return null;

  const { blog, createdAt } = comment;
  const commentDate = new Date(createdAt);

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: comment._id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to approve comment");
    }
  };

  const deleteComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/delete-comment", {
        id: comment._id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  return (
    <tr className="border-y border-gray-300">
      {/* Comment Info */}
      <td className="px-6 py-4 text-sm leading-relaxed">
        <p>
          <b className="text-gray-700">Blog:</b> {blog.title}
        </p>

        <br />

        <p>
          <b className="text-gray-700">Name:</b> {comment.name}
        </p>

        <p>
          <b className="text-gray-700">Comment:</b> {comment.content}
        </p>

        <p className="text-xs text-gray-400 mt-2">
          {commentDate.toDateString()}
        </p>
      </td>

      {/* Date column */}
      <td className="px-6 py-4 max-sm:hidden text-xs text-gray-500">
        {commentDate.toDateString()}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              src={assets.tick_icon}
              alt="Approve"
              onClick={approveComment}
              className="w-7 cursor-pointer hover:scale-110 transition"
            />
          ) : (
            <p className="text-xs border border-green-600 text-green-700 px-2 py-1 rounded-full">
              Approved
            </p>
          )}

          <img
            src={assets.bin_icon}
            alt="Delete"
            onClick={deleteComment}
            className="w-7 cursor-pointer hover:scale-110 transition"
          />
        </div>
      </td>
    </tr>
  );
}

export default CommentTableItem;
