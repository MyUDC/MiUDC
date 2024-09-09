import {
  FaRegHeart,
  FaRegComment,
  FaRegBookmark
} from "react-icons/fa";
import SkeletonText from "@/shared/components/Skeletons/SkeletonText";
import { TfiExport } from "react-icons/tfi";


interface ReactionsProps {
  heartCount?: number;
  commentCount?: number;
}

export default function Reactions({
  heartCount,
  commentCount,
}: ReactionsProps) {
  return (
    <div className="ml-[4.3rem] flex space-x-4 mt-2">
      <button className="flex items-center space-x-1 text-green">
        <FaRegHeart />
        <span className="text-black">
          {heartCount !== undefined ? (
            heartCount
          ) : (
            <SkeletonText width="20px" height="1rem" />
          )}
        </span>
      </button>
      <button className="flex items-center space-x-1 text-green">
        <FaRegComment />
        <span className="text-black">
          {commentCount !== undefined ? (
            commentCount
          ) : (
            <SkeletonText width="20px" height="1rem" />
          )}
        </span>
      </button>
      <button title="share" className="flex items-center space-x-1 text-green">
        <FaRegBookmark />
      </button>
      <button title="share" className="flex items-center space-x-1 text-green">
        <TfiExport/>
      </button>
    </div>
  );
}
